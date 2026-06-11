import { YoutubeTranscript } from "youtube-transcript";

export function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]+)/,
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+)/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]+)/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export interface VideoMeta {
  title: string;
  thumbnailUrl: string;
  authorName: string;
  viewCount: string;
  likeCount: string;
  publishedAt: string;
  duration: string;
}

function formatCount(n: string): string {
  const num = parseInt(n, 10);
  if (isNaN(num)) return n;
  if (num >= 10000) return `${Math.floor(num / 10000)}만`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}천`;
  return n;
}

function formatDuration(iso: string): string {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "";
  const h = match[1] ? `${match[1]}:` : "";
  const m = match[2] || "0";
  const s = (match[3] || "0").padStart(2, "0");
  return `${h}${m}:${s}`;
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays < 1) return "오늘";
  if (diffDays < 7) return `${diffDays}일 전`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}주 전`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}개월 전`;
  return `${Math.floor(diffDays / 365)}년 전`;
}

export async function getVideoMeta(videoId: string): Promise<VideoMeta> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const empty: VideoMeta = {
    title: "", thumbnailUrl: "", authorName: "",
    viewCount: "", likeCount: "", publishedAt: "", duration: "",
  };

  if (!apiKey) return empty;

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoId}&key=${apiKey}`,
    );
    if (!res.ok) return empty;
    const data = await res.json();
    const item = data.items?.[0];
    if (!item) return empty;

    return {
      title: item.snippet.title || "",
      thumbnailUrl: item.snippet.thumbnails?.maxres?.url
        || item.snippet.thumbnails?.high?.url
        || item.snippet.thumbnails?.medium?.url
        || "",
      authorName: item.snippet.channelTitle || "",
      viewCount: formatCount(item.statistics.viewCount || "0"),
      likeCount: formatCount(item.statistics.likeCount || "0"),
      publishedAt: formatDate(item.snippet.publishedAt || ""),
      duration: formatDuration(item.contentDetails.duration || ""),
    };
  } catch {
    return empty;
  }
}

export async function getTranscript(videoId: string): Promise<string> {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId, {
      lang: "ko",
    });
    return transcript.map((t) => t.text).join(" ");
  } catch {
    // Korean subtitle not available, try without language preference
    try {
      const transcript = await YoutubeTranscript.fetchTranscript(videoId);
      return transcript.map((t) => t.text).join(" ");
    } catch {
      return "";
    }
  }
}
