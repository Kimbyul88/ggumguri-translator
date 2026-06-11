"use client";

import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import Toast from "@/components/common/Toast";

interface ScenarioScene {
  timeRange: string;
  shotType: string;
  description: string;
  caption: string;
}

interface ScenarioItem {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  colorClass: string;
  scenes: ScenarioScene[];
}

interface ScenarioDetail {
  id: string;
  title: string;
  reference_url: string;
  summary: string;
  scenarios: ScenarioItem[];
  created_at: string;
}

interface ScenarioDetailModalProps {
  scenarioId: string;
  onClose: () => void;
}

const colorMap: Record<string, string> = {
  "bg-blue-500": "bg-blue-500",
  "bg-emerald-500": "bg-emerald-500",
  "bg-pink-500": "bg-pink-500",
};

function getColor(colorClass: string) {
  return colorMap[colorClass] || "bg-blue-500";
}

export default function ScenarioDetailModal({
  scenarioId,
  onClose,
}: ScenarioDetailModalProps) {
  const [detail, setDetail] = useState<ScenarioDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);

  const copyScenario = useCallback((scenario: ScenarioItem) => {
    const text = scenario.scenes
      .map((s) => `[${s.timeRange}] ${s.shotType}\n${s.description}\n자막: ${s.caption}`)
      .join("\n\n");
    navigator.clipboard.writeText(text);
    setShowToast(true);
  }, []);

  useEffect(() => {
    fetch(`/api/scenarios/${scenarioId}`)
      .then((res) => res.json())
      .then((data) => {
        setDetail(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [scenarioId]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 flex items-center justify-center min-h-full p-4 pointer-events-none">
        <div className="bg-white rounded-2xl shadow-xl max-w-[900px] w-full max-h-[85vh] overflow-hidden my-auto pointer-events-auto">
          <div className="max-h-[85vh] overflow-y-auto modal-scroll">
        {loading ? (
          <div className="p-12 text-center text-gray-400">불러오는 중...</div>
        ) : !detail ? (
          <div className="p-12 text-center text-gray-400">데이터를 찾을 수 없습니다</div>
        ) : (
          <>
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div>
                <h2 className="text-lg font-bold">{detail.title}</h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  {new Date(detail.created_at).toLocaleDateString("ko-KR")}
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Summary */}
            {detail.summary && (
              <div className="px-6 pt-5">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">영상 요약</h3>
                <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-xl p-4">
                  {detail.summary}
                </p>
              </div>
            )}

            {/* Scenarios */}
            <div className="p-6 space-y-5">
              <h3 className="text-sm font-semibold text-gray-500">시나리오</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {detail.scenarios.map((scenario, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-gray-200 overflow-hidden"
                  >
                    <div className={`${getColor(scenario.colorClass)} px-4 py-3 text-white`}>
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
                          {scenario.label}
                        </span>
                        <div>
                          <p className="font-bold text-sm">{scenario.title}</p>
                          <p className="text-[11px] text-white/70">{scenario.subtitle}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      {scenario.scenes.map((scene, i) => (
                        <div key={i}>
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-[11px] text-gray-400 font-mono">{scene.timeRange}</span>
                            <span className="text-[11px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                              {scene.shotType}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600">{scene.description}</p>
                          <p className="text-xs text-blue-500 font-medium">자막: {scene.caption}</p>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 pb-4">
                      <button
                        onClick={() => copyScenario(scenario)}
                        className="w-full rounded-lg border border-gray-200 py-2 text-xs font-medium text-gray-500 hover:border-gray-300 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        프롬프트 복사
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reference URL */}
            {detail.reference_url && (
              <div className="px-6 pb-6">
                <a
                  href={detail.reference_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-500 hover:underline"
                >
                  원본 영상 보기 →
                </a>
              </div>
            )}
          </>
        )}
          </div>
        </div>
      </div>

      <Toast message="프롬프트가 복사되었습니다" isVisible={showToast} onClose={() => setShowToast(false)} />
    </div>,
    document.body,
  );
}
