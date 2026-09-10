// Follow Deno standards and Supabase edge functions
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GATEWAY_URL = "https://app-e84qhhad10xt-api-VaOwP8E7dJqa.gateway.appmedo.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse";

async function callGeminiStream(systemInstruction: string, userPrompt: string, apiKey: string): Promise<string> {
  const payload = {
    contents: [
      {
        role: "user",
        parts: [
          { text: `${systemInstruction}\n\nUser Question/Prompt: "${userPrompt}"\n\nProvide your direct, substantive, and comprehensive response now:` }
        ]
      }
    ]
  };

  const res = await fetch(GATEWAY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Gateway-Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gateway returned ${res.status}: ${errText}`);
  }

  const reader = res.body?.getReader();
  if (!reader) throw new Error("No response body");

  const decoder = new TextDecoder();
  let buffer = "";
  let fullText = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith(":")) continue;

      if (trimmed.startsWith("data:")) {
        const jsonStr = trimmed.replace(/^data:\s*/, "");
        if (jsonStr === "[DONE]") continue;

        try {
          const parsed = JSON.parse(jsonStr);
          const parts = parsed.candidates?.[0]?.content?.parts;
          if (Array.isArray(parts)) {
            for (const part of parts) {
              if (part.text) fullText += part.text;
            }
          }
        } catch (_) {
          // ignore partial frame parse errors
        }
      }
    }
  }

  return fullText.trim();
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { action, prompt, modelId, systemPrompt } = await req.json();
    const apiKey = Deno.env.get("INTEGRATIONS_API_KEY");

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "INTEGRATIONS_API_KEY is not configured" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
      );
    }

    if (!prompt || typeof prompt !== "string") {
      return new Response(
        JSON.stringify({ error: "Prompt is required" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    const defaultSystem = `You are an elite frontier AI model answering as part of the PARALLAX Multi-Model Intelligence Engine. 
Directly and thoroughly answer the user's question with deep domain expertise, clear formatting, relevant code/math where appropriate, and actionable insights. Do not use generic boilerplate templates. Answer what was actually asked.`;

    const systemInstruction = systemPrompt || defaultSystem;
    const answer = await callGeminiStream(systemInstruction, prompt, apiKey);

    return new Response(
      JSON.stringify({
        success: true,
        answer,
        modelId: modelId || "gemini-2.5-flash",
        timestamp: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || "Unknown error" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
