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
  return (
    <div className={`flex flex-col rounded-2xl overflow-hidden shadow-sm transition-all ${
      isSelected
        ? "border-2 border-blue-500 ring-2 ring-blue-100"
        : "border border-gray-200"
    }`}>
      {/* Colored header */}
      <div className={`${scenario.colorClass} px-5 py-4 text-white relative`}>
        {/* Checkbox */}
        <button
          onClick={() => onSelect(scenario.id)}
          className="absolute top-3 right-3 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors bg-white/20 border-white/50 hover:bg-white/30"
        >
          {isSelected && (
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
            {scenario.label}
          </div>
          <div>
            <h4 className="font-bold text-base">{scenario.title}</h4>
            <p className="text-xs text-white/80">{scenario.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Scenes */}
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
  );
}
