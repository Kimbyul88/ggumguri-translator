export type Step = 1 | 2 | 3;

export interface AnalysisElement {
  id: string;
  category: string;
  categoryColor: string;
  description: string;
  checked: boolean;
}

export interface VideoMeta {
  videoId: string;
  title: string;
  thumbnailUrl: string;
  authorName: string;
  viewCount: string;
  likeCount: string;
  publishedAt: string;
  duration: string;
}

export type Protagonist = "main-solo" | "main-sub" | "sub-solo";

export interface ScenarioSettings {
  protagonist: Protagonist;
  messageRatio: number; // 0~100, daily percentage (rest is climate)
  videoDuration: 15 | 30 | 60;
  generateCount: 2 | 3;
}

export interface ScenarioScene {
  timeRange: string;
  shotType: string;
  description: string;
  caption: string;
}

export interface Scenario {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  colorClass: string;
  scenes: ScenarioScene[];
}

export interface ArchiveItem {
  id: string;
  title: string;
  thumbnailUrl: string;
  date: string;
}
