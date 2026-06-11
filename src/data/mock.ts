import type { Scenario, ArchiveItem } from "@/types";

export const mockScenarios: Scenario[] = [
  {
    id: "a",
    label: "A",
    title: "한강공원 산책편",
    subtitle: "메인 + 서브 · 30초",
    colorClass: "bg-blue-500",
    scenes: [
      {
        timeRange: "0-5s",
        shotType: "WIDE",
        description: "한강공원 벤치, 두 너구리 뒷모습 착붙.",
        caption: "도시 적응 6개월차",
      },
      {
        timeRange: "5-15s",
        shotType: "MID",
        description: "서브가 슬금슬금 다가와 꼬리로 메인을 톡톡.",
        caption: "이 형이 또 시작이네",
      },
      {
        timeRange: "15-25s",
        shotType: "CLOSE",
        description: "메인의 해탈한 정면 클로즈업, 한 걸음 옆걸음.",
        caption: "산속에선 안 이랬는데...",
      },
      {
        timeRange: "25-30s",
        shotType: "FADE",
        description: "텅 빈 산 풍경 페이드인.",
        caption: "원래 살던 산은 골프장 됨",
      },
    ],
  },
  {
    id: "b",
    label: "B",
    title: "편의점 야식편",
    subtitle: "메인 + 서브 · 30초",
    colorClass: "bg-emerald-500",
    scenes: [
      {
        timeRange: "0-5s",
        shotType: "POV",
        description: "편의점 앞 평상, 메인 너구리 라면 들고 있음.",
        caption: "도시 입성 첫 야식",
      },
      {
        timeRange: "5-15s",
        shotType: "MID",
        description: "서브가 옆에서 라면을 자꾸 뺏어먹으려 함.",
        caption: "이 도시 너구리는 왜 또",
      },
      {
        timeRange: "15-25s",
        shotType: "CLOSE",
        description: "메인이 한 입 양보, 무표정으로 카메라 응시.",
        caption: "산에선 도토리도 안 나눠줬는데",
      },
      {
        timeRange: "25-30s",
        shotType: "FADE",
        description: "쓰레기통에 쌓인 일회용기 클로즈업.",
        caption: "그거 알아? 1년에 200kg래",
      },
    ],
  },
  {
    id: "c",
    label: "C",
    title: "분리수거장편",
    subtitle: "메인 + 서브 · 30초",
    colorClass: "bg-pink-500",
    scenes: [
      {
        timeRange: "0-5s",
        shotType: "WIDE",
        description: "아파트 분리수거장, 두 너구리 뒷모습 착붙.",
        caption: "도시 너구리의 출근길",
      },
      {
        timeRange: "5-15s",
        shotType: "MID",
        description: "서브가 멋쩡한 스텐리 텀블러를 뺏어가려 함.",
        caption: "자꾸 가져가지 마요",
      },
      {
        timeRange: "15-25s",
        shotType: "CLOSE",
        description: "메인의 해탈한 표정, 한 걸음 옆걸음.",
        caption: "이 형 또 텀블러 가져기네",
      },
      {
        timeRange: "25-30s",
        shotType: "FADE",
        description: "분리수거장 가득한 텀블러, 산 줌아웃.",
        caption: "인간들 왜 자꾸 새로 사",
      },
    ],
  },
];

export const mockArchiveItems: ArchiveItem[] = [
  {
    id: "1",
    title: "아들한테 강아지 산책 맡기면 벌어지는 일... 대반전 결과",
    thumbnailUrl: "",
    date: "2024.05.10",
  },
  {
    id: "2",
    title: "고양이 힙스터 챌린지 1일차",
    thumbnailUrl: "",
    date: "2024.05.10",
  },
  {
    id: "3",
    title: "지브리 스타일 애니메이션",
    thumbnailUrl: "",
    date: "2024.05.10",
  },
];
