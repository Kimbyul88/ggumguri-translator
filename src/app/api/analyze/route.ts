import { NextResponse } from "next/server";
import { extractVideoId, getTranscript, getVideoMeta } from "@/lib/youtube";
import { chatCompletion } from "@/lib/gateway";
import {
  ANALYZE_SYSTEM_PROMPT,
  buildAnalyzeUserPrompt,
} from "@/lib/prompts";

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "URL이 필요합니다" },
        { status: 400 },
      );
    }

    const videoId = extractVideoId(url);
    if (!videoId) {
      return NextResponse.json(
        { error: "유효한 YouTube URL이 아닙니다" },
        { status: 400 },
      );
    }

    // 1. Extract transcript + metadata in parallel
    const [transcript, meta] = await Promise.all([
      getTranscript(videoId),
      getVideoMeta(videoId),
    ]);

    // 2. Send to GPT for analysis
    const userPrompt = buildAnalyzeUserPrompt(url, meta.title, transcript);
    const raw = await chatCompletion("gpt-5.4-mini", [
      { role: "system", content: ANALYZE_SYSTEM_PROMPT },
      { role: "user", content: userPrompt },
    ]);

    // 3. Parse JSON from response
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("AI 응답에서 JSON을 파싱할 수 없습니다");
    }

    const parsed = JSON.parse(jsonMatch[0]);

    // Add category colors
    const colorMap: Record<string, string> = {
      "후킹 구조": "text-amber-500",
      "공감 트리거": "text-emerald-500",
      "킥 포인트": "text-blue-500",
      "카피 패턴": "text-violet-500",
      "시각적 코드": "text-pink-500",
      "캐릭터 구조": "text-red-500",
      호흡: "text-cyan-500",
      "공유 동인": "text-orange-500",
    };

    const elements = parsed.elements.map(
      (el: { id: string; category: string; description: string }) => ({
        ...el,
        categoryColor: colorMap[el.category] || "text-gray-500",
        checked: false,
      }),
    );

    return NextResponse.json({
      videoId,
      title: meta.title,
      thumbnailUrl: meta.thumbnailUrl,
      authorName: meta.authorName,
      viewCount: meta.viewCount,
      likeCount: meta.likeCount,
      publishedAt: meta.publishedAt,
      duration: meta.duration,
      summary: parsed.summary,
      elements,
    });
  } catch (error) {
    console.error("Analyze error:", error);
    const message =
      error instanceof Error ? error.message : "분석 중 오류가 발생했습니다";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
