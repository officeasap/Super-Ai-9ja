import { createClient } from "npm:@supabase/supabase-js@2";

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  const webhookHash = Deno.env.get("FLUTTERWAVE_WEBHOOK_HASH");
  const fwKey = Deno.env.get("FLUTTERWAVE_SECRET_KEY");
  const url = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!webhookHash || !fwKey || !url || !serviceKey) {
    return new Response("Webhook is not configured", { status: 503 });
  }

  if (req.headers.get("verif-hash") !== webhookHash) {
    return new Response("Unauthorized", { status: 401 });
  }

  const event = await req.json().catch(() => null);
  const txId = String(event?.data?.id ?? "");
  const txRef = String(event?.data?.tx_ref ?? "");
  if (event?.event !== "charge.completed" || !/^\d+$/.test(txId) ||
      !/^sai9ja-[0-9a-f-]{36}$/i.test(txRef)) {
    return new Response("Ignored", { status: 200 });
  }

  const verifiedResponse = await fetch(
    `https://api.flutterwave.com/v3/transactions/${encodeURIComponent(txId)}/verify`,
    { headers: { Authorization: `Bearer ${fwKey}` } },
  );
  const verified = await verifiedResponse.json().catch(() => ({}));
  const tx = verified?.data;
  if (!verifiedResponse.ok || verified.status !== "success" ||
      tx?.status !== "successful" || tx?.tx_ref !== txRef) {
    return new Response("Payment not verified", { status: 400 });
  }

  const userId = String(tx?.meta?.user_id ?? "");
  const courseSlug = String(tx?.meta?.course_slug ?? "");
  if (!userId || !/^[a-z0-9-]{3,120}$/.test(courseSlug)) {
    return new Response("Missing payment metadata", { status: 400 });
  }

  const admin = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: price, error: priceError } = await admin
    .from("sai9ja_course_prices")
    .select("amount,currency")
    .eq("course_slug", courseSlug)
    .eq("active", true)
    .maybeSingle();

  if (priceError || !price ||
      tx.currency !== price.currency ||
      Math.abs(Number(tx.amount) - Number(price.amount)) > 0.009) {
    return new Response("Amount or currency mismatch", { status: 400 });
  }

  const { error } = await admin.from("sai9ja_course_entitlements").upsert({
    user_id: userId,
    course_slug: courseSlug,
    payment_provider: "flutterwave",
    transaction_reference: txRef,
    transaction_id: String(tx.id),
    amount: Number(price.amount),
    currency: price.currency,
    status: "active",
  }, { onConflict: "user_id,course_slug" });

  if (error) {
    console.error("Could not grant entitlement:", error);
    return new Response("Could not record entitlement", { status: 500 });
  }

  return new Response("OK", { status: 200 });
});
