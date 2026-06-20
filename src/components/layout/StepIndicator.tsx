"use client";

import { motion } from "framer-motion";
import type { Step } from "@/types";

interface StepIndicatorProps {
  currentStep: Step;
}

const steps = [
  { num: 1, label: "레퍼런스 입력" },
  { num: 2, label: "분석 & 요소 선택" },
  { num: 3, label: "너구리 시나리오" },
] as const;

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <nav className="flex items-center justify-center gap-0 py-4 sm:py-6 px-4">
      {steps.map((step, i) => {
        const isActive = step.num === currentStep;
        const isPast = step.num < currentStep;
        const isFilled = isPast || isActive;

        return (
          <div key={step.num} className="flex items-center">
            {/* Connecting line */}
            {i > 0 && (
              <div className="w-8 sm:w-16 h-[2px] bg-gray-200 relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-blue-500"
                  initial={{ width: "0%" }}
                  animate={{ width: isFilled ? "100%" : "0%" }}
                  transition={{ duration: 0.4, delay: isFilled ? 0.2 : 0, ease: "easeOut" }}
                />
              </div>
            )}

            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Circle */}
              <motion.div
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold"
                initial={false}
                animate={{
                  backgroundColor: isFilled ? "#3b82f6" : "#e5e7eb",
                  color: isFilled ? "#ffffff" : "#9ca3af",
                  scale: isActive ? [1, 1.2, 1] : 1,
                }}
                transition={{
                  duration: 0.3,
                  scale: { duration: 0.4, ease: "easeOut" },
                }}
              >
                {step.num}
              </motion.div>

              {/* Label */}
              <motion.span
                className="text-xs sm:text-sm whitespace-nowrap hidden sm:inline"
                initial={false}
                animate={{
                  color: isActive ? "#3b82f6" : isPast ? "#111827" : "#9ca3af",
                  fontWeight: isActive ? 600 : isPast ? 500 : 400,
                }}
                transition={{ duration: 0.3 }}
              >
                {step.label}
              </motion.span>
            </div>
          </div>
        );
      })}
    </nav>
  );
}
