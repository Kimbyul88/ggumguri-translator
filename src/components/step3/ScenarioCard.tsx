"use client";

import { useState } from "react";
import type { Scenario } from "@/types";

interface ScenarioCardProps {
  scenario: Scenario;
  onCopyPrompt: (id: string) => void;
  onSelect: (id: string) => void;
  isSelected: boolean;
}

export default function ScenarioCard({
  scenario,
  onCopyPrompt,
  onSelect,
  isSelected,
}: ScenarioCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`flex flex-col rounded-2xl overflow-hidden shadow-sm transition-all ${
      isSelected
        ? "border-2 border-blue-500 ring-2 ring-blue-100"
        : "border border-gray-200"
    }`}>
      {/* Colored header - clickable on mobile to toggle */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className={`${scenario.colorClass} px-5 py-4 text-white relative text-left w-full md:cursor-default`}
      >
        {/* Checkbox */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold shrink-0">
            {scenario.label}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-base">{scenario.title}</h4>
            <p className="text-xs text-white/80">{scenario.subtitle}</p>
          </div>
          {/* Chevron - mobile only */}
          <svg
            className={`w-5 h-5 text-white/70 md:hidden transition-transform shrink-0 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          <span
            role="checkbox"
            aria-checked={isSelected}
            tabIndex={0}
            onClick={(e) => { e.stopPropagation(); onSelect(scenario.id); }}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.stopPropagation(); onSelect(scenario.id); } }}
            className="w-6 h-6 rounded border-2 flex items-center justify-center transition-colors bg-white/20 border-white/50 hover:bg-white/30 shrink-0"
          >
            {isSelected && (
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </span>
        </div>
      </button>

      {/* Scenes - collapsible on mobile, always visible on md+ */}
      <div className={`${isOpen ? "block" : "hidden"} md:block`}>
        <div className="flex-1 p-5 space-y-5">
          {scenario.scenes.map((scene, i) => (
            <div key={i}>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs text-gray-400 font-mono">
                  {scene.timeRange}
                </span>
                <span className="text-xs font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                  {scene.shotType}
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-1">{scene.description}</p>
              <p className="text-sm text-blue-500 font-medium">
                자막: {scene.caption}
              </p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="px-5 pb-5 flex gap-2">
          <button
            onClick={() => onCopyPrompt(scenario.id)}
            className="flex-1 rounded-xl border-2 border-gray-200 py-2.5 text-sm font-medium text-gray-600 hover:border-gray-300 transition-colors flex items-center justify-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            프롬프트 복사
          </button>
          <button
            onClick={() => onSelect(scenario.id)}
            className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 ${
              isSelected
                ? "bg-blue-500 text-white"
                : "bg-gray-800 text-white hover:bg-gray-900"
            }`}
          >
            {isSelected ? "✓ 채택됨" : "채택하기"}
          </button>
        </div>
      </div>
    </div>
  );
}
