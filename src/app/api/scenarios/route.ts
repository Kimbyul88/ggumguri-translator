import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET - 아카이브 목록 조회
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";
  const favOnly = searchParams.get("favorites") === "true";

  let q = supabase
    .from("scenarios")
    .select("id, title, reference_title, thumbnail_url, is_favorite, created_at")
    .order("created_at", { ascending: false });

  if (query) {
    q = q.ilike("title", `%${query}%`);
  }

  if (favOnly) {
    q = q.eq("is_favorite", true);
  }

  const { data, error } = await q;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ items: data });
}

// POST - 시나리오 저장
export async function POST(request: Request) {
  const body = await request.json();
  const { title, referenceUrl, referenceTitle, thumbnailUrl, summary, selectedElements, settings, scenarios } = body;

  if (!title || !scenarios) {
    return NextResponse.json({ error: "제목과 시나리오가 필요합니다" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("scenarios")
    .insert({
      title,
      reference_url: referenceUrl,
      reference_title: referenceTitle,
      thumbnail_url: thumbnailUrl,
      summary,
      selected_elements: selectedElements,
      settings,
      scenarios,
    })
    .select("id")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ id: data.id });
}
