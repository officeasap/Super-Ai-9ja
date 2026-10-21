import { createClient } from "npm:@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": Deno.env.get("SITE_URL") ?? "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  const respond = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...cors, "Content-Type": "application/json" },
    });

  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return respond({ error: "Method not allowed" }, 405);

  try {
    const url = Deno.env.get("SUPABASE_URL");
    const anon = Deno.env.get("SUPABASE_ANON_KEY")
      ?? Deno.env.get("SUPABASE_PUBLISHABLE_KEY");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const flutterwaveKey = Deno.env.get("FLUTTERWAVE_SECRET_KEY");

    if (!url || !anon || !serviceKey || !flutterwaveKey) {
      return respond({ error: "Payment verification is not configured" }, 500);
    }

    const authorization = req.headers.get("Authorization");
    if (!authorization?.startsWith("Bearer ")) {
      return respond({ error: "Sign in to verify this payment" }, 401);
    }

    const auth = createClient(url, anon, {
      global: { headers: { Authorization: authorization } },
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data: { user }, error: authError } = await auth.auth.getUser();
    if (authError || !user) return respond({ error: "Invalid session" }, 401);

    const body = await req.json();
    const reference = body?.transactionReference;
    const transactionId = String(body?.transactionId ?? "");

    if (typeof reference !== "string" ||
        !/^sai9ja-[0-9a-f-]{36}$/i.test(reference) ||
        !/^\d{1,30}$/.test(transactionId)) {
      return respond({ error: "Invalid payment reference" }, 400);
    }

    const admin = createClient(url, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data: intent, error: intentError } = await admin
      .from("sai9ja_course_payment_intents")
      .select("*")
      .eq("transaction_reference", reference)
      .eq("user_id", user.id)
      .maybeSingle();

    if (intentError || !intent) {
      return respond({ error: "Payment record not found for this account" }, 404);
    }

    if (intent.status === "failed") {
      return respond({ error: "This payment attempt is closed" }, 409);
    }

    const providerResponse = await fetch(
      `https://api.flutterwave.com/v3/transactions/${encodeURIComponent(transactionId)}/verify`,
      { headers: { Authorization: `Bearer ${flutterwaveKey}` } },
    );
    const providerResult = await providerResponse.json();
    const payment = providerResult?.data;

    const valid =
      providerResponse.ok &&
      providerResult?.status === "success" &&
      payment?.status === "successful" &&
      payment?.tx_ref === intent.transaction_reference &&
      Math.abs(Number(payment?.amount) - Number(intent.amount)) < 0.005 &&
      String(payment?.currency).toUpperCase() === String(intent.currency).toUpperCase();

    if (!valid) {
      return respond({ error: "Payment could not be verified" }, 402);
    }

    if (intent.status === "paid" && intent.transaction_id !== transactionId) {
      return respond({ error: "This payment record is already settled" }, 409);
    }

    const { error: entitlementError } = await admin
      .from("sai9ja_course_entitlements")
      .upsert({
        user_id: user.id,
        course_slug: intent.course_slug,
        payment_provider: "flutterwave",
        transaction_reference: intent.transaction_reference,
        transaction_id: transactionId,
        amount: Number(intent.amount),
        currency: intent.currency,
        status: "active",
      }, { onConflict: "user_id,course_slug" });

    if (entitlementError) {
      console.error("Entitlement grant failed:", entitlementError.message);
      return respond({ error: "Payment verified, but access could not be activated yet" }, 500);
    }

    const { error: updateError } = await admin
      .from("sai9ja_course_payment_intents")
      .update({
        status: "paid",
        transaction_id: transactionId,
        updated_at: new Date().toISOString(),
      })
      .eq("transaction_reference", reference)
      .eq("user_id", user.id);

    if (updateError) {
      console.error("Payment intent update failed:", updateError.message);
      return respond({ error: "Payment verified; please retry access confirmation" }, 500);
    }

    return respond({
      verified: true,
      courseSlug: intent.course_slug,
      message: "Payment verified and course entitlement activated",
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    return respond({ error: "Unable to verify payment right now" }, 500);
  }
});
