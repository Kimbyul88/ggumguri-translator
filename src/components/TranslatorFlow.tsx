"use client";

import { useTranslatorFlow } from "@/hooks/useTranslatorFlow";
import StepIndicator from "@/components/layout/StepIndicator";
import Footer from "@/components/layout/Footer";
import DecoElements from "@/components/layout/DecoElements";
import LoadingOverlay from "@/components/common/LoadingOverlay";
import Step1Reference from "@/components/step1/Step1Reference";
import Step2Analysis from "@/components/step2/Step2Analysis";
import Step3Scenario from "@/components/step3/Step3Scenario";

export default function TranslatorFlow() {
  const {
    step,
    isLoading,
    loadingMessage,
    error,
    url,
    videoMeta,
    summary,
    elements,
    settings,
    scenarios,
    submitUrl,
    toggleElement,
    updateSettings,
    generateScenarios,
    saveScenarios,
    goToStep,
  } = useTranslatorFlow();

  return (
    <>
      <DecoElements />
      <LoadingOverlay isVisible={isLoading} message={loadingMessage} />

      <StepIndicator currentStep={step} />

      {error && (
        <div className="relative z-10 max-w-[1200px] mx-auto px-8 mb-4">
          <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        </div>
      )}

      <div className="flex-1 pb-8">
        {step === 1 && <Step1Reference onSubmit={submitUrl} />}

        {step === 2 && (
          <Step2Analysis
            url={url}
            videoMeta={videoMeta}
            summary={summary}
            elements={elements}
            settings={settings}
            onToggleElement={toggleElement}
            onSettingsChange={updateSettings}
            onBack={() => goToStep(1)}
            onGenerate={generateScenarios}
          />
        )}

        {step === 3 && (
          <Step3Scenario
            scenarios={scenarios}
            onBack={() => goToStep(2)}
            onSave={async (selectedIds) => {
              const id = await saveScenarios(selectedIds);
              if (id) {
                alert("저장되었습니다!");
              }
            }}
            onRegenerate={() => goToStep(2)}
          />
        )}
      </div>

      <Footer />
    </>
  );
}
