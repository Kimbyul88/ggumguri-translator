const API_KEY = process.env.GATEWAY_API_KEY!;
const BASE_URL = process.env.GATEWAY_BASE_URL!;

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatCompletionResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export async function chatCompletion(
  model: string,
  messages: ChatMessage[],
): Promise<string> {
  const res = await fetch(`${BASE_URL}/chat/completions/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.7,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Gateway API error (${res.status}): ${errorText}`);
  }

  const data: ChatCompletionResponse = await res.json();
  return data.choices[0].message.content;
}
