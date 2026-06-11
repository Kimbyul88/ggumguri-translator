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
    <nav className="flex items-center justify-center gap-0 py-6">
      {steps.map((step, i) => {
        const isActive = step.num === currentStep;
        const isPast = step.num < currentStep;

        return (
          <div key={step.num} className="flex items-center">
            {i > 0 && (
              <div
                className={`w-16 h-[2px] ${
                  isPast || isActive ? "bg-blue-500" : "bg-gray-200"
                }`}
              />
            )}
            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : isPast
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-400"
                }`}
              >
                {step.num}
              </div>
              <span
                className={`text-sm whitespace-nowrap ${
                  isActive
                    ? "text-blue-500 font-semibold"
                    : isPast
                      ? "text-gray-900 font-medium"
                      : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
          </div>
        );
      })}
    </nav>
  );
}
