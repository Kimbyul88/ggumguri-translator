"use client";

import { useState, useCallback, useRef } from "react";
import type {
  Step,
  AnalysisElement,
  ScenarioSettings,
  Scenario,
  VideoMeta,
} from "@/types";

interface TranslatorFlowState {
  step: Step;
  isLoading: boolean;
  loadingMessage: string;
  error: string | null;
  url: string;
  videoMeta: VideoMeta | null;
  summary: string;
  elements: AnalysisElement[];
  settings: ScenarioSettings;
  scenarios: Scenario[];
}

const defaultSettings: ScenarioSettings = {
  protagonist: "main-sub",
  messageRatio: 70,
  videoDuration: 30,
  generateCount: 3,
};

export function useTranslatorFlow() {
  const [state, setState] = useState<TranslatorFlowState>({
    step: 1,
    isLoading: false,
    loadingMessage: "",
    error: null,
    url: "",
    videoMeta: null,
    summary: "",
    elements: [],
    settings: defaultSettings,
    scenarios: [],
  });

  const abortRef = useRef<AbortController | null>(null);

  const submitUrl = useCallback(async (url: string) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setState((prev) => ({
      ...prev,
      url,
      isLoading: true,
      loadingMessage: "Chat GPT가 영상을 보고 있어요",
      error: null,
    }));

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
        signal: controller.signal,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "분석 실패");
      }

      setState((prev) => ({
        ...prev,
        isLoading: false,
        loadingMessage: "",
        step: 2,
        videoMeta: {
          videoId: data.videoId,
          title: data.title,
          thumbnailUrl: data.thumbnailUrl,
          authorName: data.authorName,
          viewCount: data.viewCount,
          likeCount: data.likeCount,
          publishedAt: data.publishedAt,
          duration: data.duration,
        },
        summary: data.summary,
        elements: data.elements,
      }));
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;
      setState((prev) => ({
        ...prev,
        isLoading: false,
        loadingMessage: "",
        error: err instanceof Error ? err.message : "분석 중 오류 발생",
      }));
    }
  }, []);

  const toggleElement = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      elements: prev.elements.map((el) =>
        el.id === id ? { ...el, checked: !el.checked } : el,
      ),
    }));
  }, []);

  const updateSettings = useCallback((settings: ScenarioSettings) => {
    setState((prev) => ({ ...prev, settings }));
  }, []);

  const generateScenarios = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
      loadingMessage: "Claude가 시나리오를 쓰고 있어요",
      error: null,
    }));

    try {
      const currentState = state;
      const selectedElements = currentState.elements
        .filter((el) => el.checked)
        .map((el) => ({ category: el.category, description: el.description }));

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          summary: currentState.summary,
          selectedElements,
          protagonist: currentState.settings.protagonist,
          messageRatio: currentState.settings.messageRatio,
          videoDuration: currentState.settings.videoDuration,
          generateCount: currentState.settings.generateCount,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "생성 실패");
      }

      setState((prev) => ({
        ...prev,
        isLoading: false,
        loadingMessage: "",
        step: 3,
        scenarios: data.scenarios,
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        loadingMessage: "",
        error: err instanceof Error ? err.message : "생성 중 오류 발생",
      }));
    }
  }, [state]);

  const saveScenarios = useCallback(
    async (selectedIds?: string[]) => {
      const { url, videoMeta, summary, elements, settings, scenarios } = state;
      if (!scenarios.length) return;

      const selected = selectedIds
        ? scenarios.filter((s) => selectedIds.includes(s.id))
        : scenarios;

      try {
        const res = await fetch("/api/scenarios", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: videoMeta?.title || "새 시나리오",
            referenceUrl: url,
            referenceTitle: videoMeta?.title || "",
            thumbnailUrl: videoMeta?.thumbnailUrl || "",
            summary,
            selectedElements: elements.filter((el) => el.checked),
            settings,
            scenarios: selected,
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "저장 실패");

        return data.id as string;
      } catch (err) {
        setState((prev) => ({
          ...prev,
          error: err instanceof Error ? err.message : "저장 중 오류 발생",
        }));
        return null;
      }
    },
    [state],
  );

  const goToStep = useCallback((step: Step) => {
    setState((prev) => ({ ...prev, step, error: null }));
  }, []);

  const reset = useCallback(() => {
    setState({
      step: 1,
      isLoading: false,
      loadingMessage: "",
      error: null,
      url: "",
      videoMeta: null,
      summary: "",
      elements: [],
      settings: defaultSettings,
      scenarios: [],
    });
  }, []);

  return {
    ...state,
    submitUrl,
    toggleElement,
    updateSettings,
    generateScenarios,
    saveScenarios,
    goToStep,
    reset,
  };
}
