import Image from "next/image";
import UrlInput from "./UrlInput";

interface Step1ReferenceProps {
  onSubmit: (url: string) => void;
}

export default function Step1Reference({ onSubmit }: Step1ReferenceProps) {
  return (
    <section className="relative z-10 max-w-[1200px] mx-auto px-8">
      <div className="flex items-start justify-between gap-8">
        {/* Left content */}
        <div className="flex-1 max-w-[600px] pt-4">
          <p className="text-xs font-semibold text-blue-500 tracking-wide mb-4">
            STEP 01 — 레퍼런스
          </p>
          <h1 className="text-4xl font-bold leading-tight mb-4">
            요즘 콘텐츠를
            <br />
            <span className="text-blue-500">너구리의 언어</span>로
            <br />
            번역해요
          </h1>
          <p className="text-gray-500 text-base mb-8 leading-relaxed">
            YouTube 쇼츠 URL을 붙여넣으면{" "}
            <span className="font-semibold text-gray-700">Chat GPT</span>가
            영상을 분석하고,
            <br />
            <span className="font-semibold text-gray-700">Claude</span>가 껌구리
            시나리오로 옮겨 써요.
          </p>
          <UrlInput onSubmit={onSubmit} />
        </div>

        {/* Right - Raccoon image */}
        <div className="hidden lg:block flex-shrink-0 w-[340px] h-[400px] relative">
          <Image
            src="/image/ggumguri_basic.png"
            alt="껌구리 캐릭터"
            width={340}
            height={400}
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
