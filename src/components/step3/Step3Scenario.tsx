"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import type { Scenario } from "@/types";
import ScenarioCard from "./ScenarioCard";
import Toast from "@/components/common/Toast";

interface Step3ScenarioProps {
  scenarios: Scenario[];
  onBack: () => void;
  onSave: (selectedIds: string[]) => void;
  onRegenerate: () => void;
}

export default function Step3Scenario({
  scenarios,
  onBack,
  onSave,
  onRegenerate,
}: Step3ScenarioProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const showToastMsg = useCallback((msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
  }, []);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleCopyPrompt = (id: string) => {
    const scenario = scenarios.find((s) => s.id === id);
    if (!scenario) return;
    const text = scenario.scenes
      .map(
        (s) =>
          `[${s.timeRange}] ${s.shotType}\n${s.description}\n자막: ${s.caption}`,
      )
      .join("\n\n");
    navigator.clipboard.writeText(text);
    showToastMsg("프롬프트가 복사되었습니다");
  };

  return (
    <section className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-8 space-y-6 sm:space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row items-start justify-between gap-3"
      >
        <div>
          <p className="text-xs font-semibold text-blue-500 tracking-wide mb-2">
            STEP 03 — 결과
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 tracking-tight">
            너구리 시나리오 {scenarios.length}안
          </h1>
          <p className="text-gray-500 text-sm">
            마음에 드는 안을 채택하거나, 다시 생성해 보세요.
          </p>
        </div>
        <button
          onClick={onBack}
          className="rounded-xl border-2 border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 hover:border-gray-300 transition-colors shrink-0"
        >
          ← 설정 수정
        </button>
      </motion.div>

      {/* Scenario cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {scenarios.map((scenario, i) => (
          <motion.div
            key={scenario.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.15 + i * 0.12,
              ease: "easeOut",
            }}
          >
            <ScenarioCard
              scenario={scenario}
              onCopyPrompt={handleCopyPrompt}
              onSelect={toggleSelect}
              isSelected={selectedIds.has(scenario.id)}
            />
          </motion.div>
        ))}
      </div>

      {/* Bottom actions */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          delay: 0.15 + scenarios.length * 0.12 + 0.1,
        }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 pb-4"
      >
        <p className="text-sm text-gray-500">
          {selectedIds.size > 0 ? (
            <>
              <span className="text-blue-500 font-bold">
                {selectedIds.size}개
              </span>{" "}
              채택됨
            </>
          ) : (
            "채택된 시나리오가 없습니다"
          )}
        </p>
        <div className="flex gap-3 sm:gap-4 w-full sm:w-auto">
          <button
            onClick={onRegenerate}
            className="flex-1 sm:flex-none rounded-xl border-2 border-gray-200 px-6 sm:px-8 py-3 text-sm font-semibold text-gray-600 hover:border-gray-300 transition-colors sm:min-w-[160px]"
          >
            다시하기
          </button>
          <button
            onClick={() => onSave(Array.from(selectedIds))}
            disabled={selectedIds.size === 0}
            className="flex-1 sm:flex-none rounded-xl bg-blue-500 px-6 sm:px-8 py-3 text-sm font-semibold text-white hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors sm:min-w-[160px]"
          >
            저장하기
          </button>
        </div>
      </motion.div>
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </section>
  );
}
