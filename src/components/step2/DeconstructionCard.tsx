import type { AnalysisElement } from "@/types";

interface DeconstructionCardProps {
  element: AnalysisElement;
  onToggle: (id: string) => void;
}

export default function DeconstructionCard({
  element,
  onToggle,
}: DeconstructionCardProps) {
  return (
    <button
      type="button"
      onClick={() => onToggle(element.id)}
      className={`w-full text-left rounded-xl border-2 p-4 transition-all ${
        element.checked
          ? "border-blue-500 bg-blue-50/50 shadow-sm"
          : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`mt-0.5 w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border-2 transition-colors ${
            element.checked
              ? "bg-blue-500 border-blue-500"
              : "border-gray-300 bg-white"
          }`}
        >
          {element.checked && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <div>
          <p className={`text-sm font-extrabold mb-1 ${element.categoryColor}`}>
            {element.category}
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            {element.description}
          </p>
        </div>
      </div>
    </button>
  );
}
