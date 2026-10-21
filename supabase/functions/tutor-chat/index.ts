import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function reply(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (request: Request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (request.method !== "POST") {
    return reply({ error: "Method not allowed." }, 405);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseKey =
    Deno.env.get("SUPABASE_ANON_KEY") ??
    Deno.env.get("SUPABASE_PUBLISHABLE_KEY");
  const geminiKey = Deno.env.get("GEMINI_API_KEY");
  const model = Deno.env.get("GEMINI_MODEL") ?? "gemini-2.5-flash";

  if (!supabaseUrl || !supabaseKey || !geminiKey) {
    return reply({
      error: "Tutor service is not configured. Please contact the platform team.",
    }, 503);
  }

  const authorization = request.headers.get("Authorization") ?? "";
  const token = authorization.replace(/^Bearer\s+/i, "");
  if (!token || token === authorization) {
    return reply({ error: "Please sign in to use the learning tutor." }, 401);
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: `Bearer ${token}` } },
  });

  const { data: userData, error: authError } = await supabase.auth.getUser(token);
  if (authError || !userData.user) {
    return reply({ error: "Your session is invalid or expired. Please sign in again." }, 401);
  }

  let body: {
    message?: unknown;
    history?: unknown;
    language?: unknown;
  };
  try {
    body = await request.json();
  } catch {
    return reply({ error: "Please send a valid JSON request." }, 400);
  }

  if (typeof body.message !== "string" || !body.message.trim()) {
    return reply({ error: "Enter a question before sending." }, 400);
  }
  if (body.message.length > 4000) {
    return reply({ error: "Your question is too long. Limit it to 4,000 characters." }, 400);
  }

  const language = ["en", "pcm", "yo", "ha", "ig"].includes(String(body.language))
    ? String(body.language)
    : "en";

  const history = Array.isArray(body.history)
    ? body.history.slice(-8).filter((item): item is { role: string; content: string } =>
        typeof item === "object" && item !== null &&
        ["user", "model"].includes(String((item as { role?: unknown }).role)) &&
        typeof (item as { content?: unknown }).content === "string" &&
        ((item as { content: string }).content.length <= 4000)
      )
    : [];

  const languageNames: Record<string, string> = {
    en: "English",
    pcm: "Nigerian Pidgin",
    yo: "Yorùbá",
    ha: "Hausa",
    ig: "Igbo",
  };

  const contents = [
    ...history.map((item) => ({
      role: item.role,
      parts: [{ text: item.content }],
    })),
    { role: "user", parts: [{ text: body.message.trim() }] },
  ];

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(geminiKey)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{
              text: `You are the SUPER-AI 9ja learning tutor. Teach artificial intelligence clearly and practically, adapting to the learner's level. Explain concepts, examples, applications, limitations, risks and responsible use. Guide the learner through reasoning rather than simply supplying answers to assessments. Keep responses structured and useful. Reply in ${languageNames[language]}.`,
            }],
          },
          contents,
          generationConfig: {
            temperature: 0.5,
            maxOutputTokens: 1800,
          },
        }),
      },
    );

    if (!response.ok) {
      const details = await response.text();
      console.error("Gemini request failed:", response.status, details.slice(0, 500));
      return reply({ error: "The tutor could not generate a response. Please try again shortly." }, 502);
    }

    const result = await response.json();
    const answer = result?.candidates?.[0]?.content?.parts
      ?.map((part: { text?: string }) => part.text ?? "")
      .join("")
      .trim();

    if (!answer) {
      return reply({ error: "The tutor returned an empty answer. Please try again." }, 502);
    }

    return reply({ answer });
  } catch (error) {
    console.error("Tutor request failed:", error);
    return reply({ error: "The tutor service is temporarily unavailable." }, 502);
  }
});
