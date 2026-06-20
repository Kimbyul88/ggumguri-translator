"use client";

import type { ScenarioSettings as Settings, Protagonist } from "@/types";

interface ScenarioSettingsProps {
  settings: Settings;
  onChange: (settings: Settings) => void;
}

const protagonistOptions: { value: Protagonist; label: string }[] = [
  { value: "main-solo", label: "메인 껌구리 단독" },
  { value: "main-sub", label: "메인 + 서브 (대비 구조)" },
  { value: "sub-solo", label: "서브 도시 너구리 단독" },
];

export default function ScenarioSettings({
  settings,
  onChange,
}: ScenarioSettingsProps) {
  const climateRatio = 100 - settings.messageRatio;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6">시나리오 설정</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {/* Protagonist */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-sm font-semibold">주인공</span>
          </div>
          <div className="space-y-2">
            {protagonistOptions.map((opt) => (
              <label
                key={opt.value}
                className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 cursor-pointer transition-all ${
                  settings.protagonist === opt.value
                    ? "border-blue-500 bg-blue-50/50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="protagonist"
                  value={opt.value}
                  checked={settings.protagonist === opt.value}
                  onChange={() => onChange({ ...settings, protagonist: opt.value })}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    settings.protagonist === opt.value
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  {settings.protagonist === opt.value && (
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  )}
                </div>
                <span className="text-sm">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Message ratio */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-sm font-semibold">메시지 비율</span>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-semibold text-blue-500">
                일상 {settings.messageRatio}%
              </span>
              <span className="font-semibold text-emerald-500">
                기후 {climateRatio}%
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={settings.messageRatio}
              onChange={(e) =>
                onChange({
                  ...settings,
                  messageRatio: Number(e.target.value),
                })
              }
              style={
                {
                  "--range-progress": `${settings.messageRatio}%`,
                } as React.CSSProperties
              }
              className="w-full"
            />
            <p className="text-xs text-gray-400 mt-2">
              균형잡힌 기후 메시지가 자연스럽게 녹아듭니다.
            </p>
          </div>
        </div>

        {/* Duration & count */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <span className="text-sm font-semibold">영상 길이</span>
            </div>
            <div className="flex gap-2">
              {([15, 30, 60] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => onChange({ ...settings, videoDuration: d })}
                  className={`flex-1 rounded-xl border-2 py-2.5 text-sm font-medium transition-all ${
                    settings.videoDuration === d
                      ? "border-blue-500 bg-blue-50/50 text-blue-600"
                      : "border-gray-200 text-gray-500 hover:border-gray-300"
                  }`}
                >
                  {d}초
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-sm font-semibold">생성 개수</span>
            </div>
            <div className="flex gap-2">
              {([2, 3] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => onChange({ ...settings, generateCount: c })}
                  className={`w-16 rounded-xl border-2 py-2.5 text-sm font-medium transition-all ${
                    settings.generateCount === c
                      ? "border-blue-500 bg-blue-50/50 text-blue-600"
                      : "border-gray-200 text-gray-500 hover:border-gray-300"
                  }`}
                >
                  {c}개
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
