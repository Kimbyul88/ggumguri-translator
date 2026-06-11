"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type {
  AnalysisElement,
  ScenarioSettings as Settings,
  VideoMeta,
} from "@/types";
import DeconstructionCard from "./DeconstructionCard";
import ScenarioSettings from "./ScenarioSettings";

interface Step2AnalysisProps {
  url: string;
  videoMeta: VideoMeta | null;
  summary: string;
  elements: AnalysisElement[];
  settings: Settings;
  onToggleElement: (id: string) => void;
  onSettingsChange: (settings: Settings) => void;
  onBack: () => void;
  onGenerate: () => void;
}

export default function Step2Analysis({
  url,
  videoMeta,
  summary,
  elements,
  settings,
  onToggleElement,
  onSettingsChange,
  onBack,
  onGenerate,
}: Step2AnalysisProps) {
  const selectedCount = elements.filter((e) => e.checked).length;
  const isShorts = url.includes("/shorts/");

  return (
    <section className="relative z-10 max-w-[1200px] mx-auto px-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <p className="text-xs font-semibold text-blue-500 tracking-wide mb-2">
          STEP 02 — 분석 & 선택
        </p>
        <h1 className="text-3xl font-bold">영상 분석</h1>
      </motion.div>

      {/* Video info + Summary side by side */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Video thumbnail + meta */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full lg:w-[360px] flex-shrink-0"
        >
          {/* Thumbnail */}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative rounded-2xl overflow-hidden bg-gray-100 mb-4"
            style={{ aspectRatio: isShorts ? "9/12" : "16/9" }}
          >
            {videoMeta?.thumbnailUrl ? (
              <Image
                src={videoMeta.thumbnailUrl}
                alt={videoMeta.title || "영상 썸네일"}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="absolute inset-0 bg-gray-200" />
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-black/50 flex items-center justify-center backdrop-blur-sm">
                <svg
                  className="w-6 h-6 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </a>

          <h3 className="font-semibold text-base mb-3 leading-snug">
            {videoMeta?.title || "영상 제목"}
          </h3>

          <div className="space-y-2 text-sm border-t border-gray-100 pt-3">
            <div className="flex justify-between">
              <span className="text-gray-400">플랫폼</span>
              <span className="text-gray-700 font-medium">
                {isShorts ? "YouTube Shorts" : "YouTube"}
                {videoMeta?.duration ? ` · ${videoMeta.duration}` : ""}
              </span>
            </div>
            {videoMeta?.viewCount && (
              <div className="flex justify-between">
                <span className="text-gray-400">조회수</span>
                <span className="text-gray-700 font-medium">
                  {videoMeta.viewCount}
                </span>
              </div>
            )}
            {videoMeta?.likeCount && (
              <div className="flex justify-between">
                <span className="text-gray-400">좋아요</span>
                <span className="text-gray-700 font-medium">
                  {videoMeta.likeCount}
                </span>
              </div>
            )}
            {videoMeta?.publishedAt && (
              <div className="flex justify-between">
                <span className="text-gray-400">업로드</span>
                <span className="text-gray-700 font-medium">
                  {videoMeta.publishedAt}
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Right: Summary + 인기요인분석 */}
        <div className="flex-1 space-y-6">
          {/* 영상 요약 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl border border-gray-200 bg-white p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">영상 요약</h3>
              <span className="text-xs font-bold text-gray-800 bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1.5">
                <Image
                  src="/image/ChatGPT-Logo.svg.png"
                  alt="ChatGPT"
                  width={14}
                  height={16}
                />
                Chat GPT
              </span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{summary}</p>
          </motion.div>

          {/* 인기 요인 분석 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="rounded-2xl border border-gray-200 bg-white p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold">인기 요인 분석</h3>
              <span className="text-xs text-gray-400 font-medium">
                {elements.length}개 추출
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-5">
              우리 너구리 콘텐츠에{" "}
              <span className="text-blue-500 font-semibold">차용할 요소</span>를
              선택하세요.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {elements.map((el, i) => (
                <motion.div
                  key={el.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.45 + i * 0.05 }}
                >
                  <DeconstructionCard
                    element={el}
                    onToggle={onToggleElement}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scenario settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <ScenarioSettings settings={settings} onChange={onSettingsChange} />
      </motion.div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.75 }}
        className="flex items-center justify-between pt-2 pb-4"
      >
        <p className="text-sm text-gray-500">
          카피 요소{" "}
          <span className="text-blue-500 font-bold">{selectedCount}개</span>{" "}
          선택됨
        </p>
        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="rounded-xl border-2 border-gray-200 px-6 py-3 text-sm font-semibold text-gray-600 hover:border-gray-300 transition-colors"
          >
            ← 이전
          </button>
          <button
            onClick={onGenerate}
            disabled={selectedCount === 0}
            className="rounded-xl bg-blue-500 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            시나리오 생성하기 →
          </button>
        </div>
      </motion.div>
    </section>
  );
}
