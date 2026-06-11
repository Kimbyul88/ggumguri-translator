interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
}

export default function LoadingOverlay({ isVisible, message }: LoadingOverlayProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-blue-50/80 backdrop-blur-md" />
      <div className="relative z-10 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          영상 분석 중...
        </h2>
        <p className="text-sm text-gray-500">{message || "잠시만 기다려주세요"}</p>
        <div className="mt-8 flex justify-center">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
        </div>
      </div>
    </div>
  );
}
