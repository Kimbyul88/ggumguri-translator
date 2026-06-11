import { NextResponse } from "next/server";
import { chatCompletion } from "@/lib/gateway";
import {
  GENERATE_SYSTEM_PROMPT,
  buildGenerateUserPrompt,
} from "@/lib/prompts";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { summary, selectedElements, protagonist, messageRatio, videoDuration, generateCount } = body;

    if (!summary || !selectedElements?.length) {
      return NextResponse.json(
        { error: "요약과 선택된 요소가 필요합니다" },
        { status: 400 },
      );
    }

    const userPrompt = buildGenerateUserPrompt({
      summary,
      selectedElements,
      protagonist,
      messageRatio,
      videoDuration,
      generateCount,
    });

    const raw = await chatCompletion("claude-sonnet-4-6", [
      { role: "system", content: GENERATE_SYSTEM_PROMPT },
      { role: "user", content: userPrompt },
    ]);

    // Parse JSON array from response
    const jsonMatch = raw.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error("AI 응답에서 JSON을 파싱할 수 없습니다");
    }

    const scenarios = JSON.parse(jsonMatch[0]);

    // Add color classes
    const colors = ["bg-blue-500", "bg-emerald-500", "bg-pink-500"];
    const result = scenarios.map(
      (s: { id: string; label: string; title: string; subtitle: string; scenes: unknown[] }, i: number) => ({
        ...s,
        colorClass: colors[i % colors.length],
      }),
    );

    return NextResponse.json({ scenarios: result });
  } catch (error) {
    console.error("Generate error:", error);
    const message =
      error instanceof Error ? error.message : "생성 중 오류가 발생했습니다";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
