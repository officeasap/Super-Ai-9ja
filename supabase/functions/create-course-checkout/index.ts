import { createClient } from "npm:@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": Deno.env.get("SITE_URL") ?? "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors });
  }

  const respond = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...cors, "Content-Type": "application/json" },
    });

  if (req.method !== "POST") {
    return respond({ error: "Method not allowed" }, 405);
  }

  try {
    const url = Deno.env.get("SUPABASE_URL");
    const anon = Deno.env.get("SUPABASE_ANON_KEY")
      ?? Deno.env.get("SUPABASE_PUBLISHABLE_KEY");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const flutterwaveKey = Deno.env.get("FLUTTERWAVE_SECRET_KEY");
    const siteUrl = Deno.env.get("SITE_URL");

    if (!url || !anon || !serviceKey || !flutterwaveKey || !siteUrl) {
      return respond({ error: "Server payment configuration is incomplete" }, 500);
    }

    const authorization = req.headers.get("Authorization");
    if (!authorization?.startsWith("Bearer ")) {
      return respond({ error: "Please sign in before purchasing" }, 401);
    }

    const authClient = createClient(url, anon, {
      global: { headers: { Authorization: authorization } },
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data: { user }, error: authError } = await authClient.auth.getUser();

    if (authError || !user) {
      return respond({ error: "Your session is invalid. Please sign in again." }, 401);
    }

    const body = await req.json();
    const courseSlug = body?.courseSlug;

    if (typeof courseSlug !== "string" ||
        !/^[a-z0-9-]{3,120}$/.test(courseSlug)) {
      return respond({ error: "Invalid course" }, 400);
    }

    const admin = createClient(url, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data: price, error: priceError } = await admin
      .from("sai9ja_course_prices")
      .select("course_slug,amount,currency,active")
      .eq("course_slug", courseSlug)
      .eq("active", true)
      .maybeSingle();

    if (priceError || !price) {
      return respond({ error: "This course is not available for purchase" }, 404);
    }

    const reference = `sai9ja-${crypto.randomUUID()}`;
    const origin = new URL(siteUrl).origin;

    const { error: intentError } = await admin
      .from("sai9ja_course_payment_intents")
      .insert({ transaction_reference: reference, user_id: user.id, course_slug: price.course_slug, amount: Number(price.amount), currency: price.currency, status: "pending" });

    if (intentError) {
      console.error("Could not record payment intent:", intentError.message);
      return respond({ error: "Could not prepare this payment. Please try again." }, 500);
    }

    const checkout = await fetch("https://api.flutterwave.com/v3/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${flutterwaveKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tx_ref: reference,
        amount: Number(price.amount),
        currency: price.currency,
        redirect_url: `${origin}/payment/return`,
        customer: {
          email: user.email,
          name: user.user_metadata?.full_name ?? user.email,
        },
        meta: {
          user_id: user.id,
          course_slug: price.course_slug,
        },
        customizations: {
          title: "SUPER-AI 9ja Course Access",
          description: `Course: ${price.course_slug}`,
        },
      }),
    });

    const result = await checkout.json();

    if (!checkout.ok || result?.status !== "success" ||
        typeof result?.data?.link !== "string") {
      console.error("Flutterwave checkout request failed:", result?.message);
      return respond({ error: "Could not start checkout. Please try again." }, 502);
    }

    return respond({
      checkoutUrl: result.data.link,
      transactionReference: reference,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return respond({ error: "Unable to start checkout" }, 500);
  }
});
