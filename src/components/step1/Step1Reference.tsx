"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-xs font-semibold text-blue-500 tracking-wide mb-4"
          >
            STEP 01 — 레퍼런스
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-bold leading-tight mb-4"
          >
            요즘 콘텐츠를
            <br />
            <span className="text-blue-500">너구리의 언어</span>로
            <br />
            번역해요
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-500 text-base mb-8 leading-relaxed"
          >
            YouTube 쇼츠 URL을 붙여넣으면{" "}
            <span className="font-semibold text-gray-700">Chat GPT</span>가
            영상을 분석하고,
            <br />
            <span className="font-semibold text-gray-700">Claude</span>가 껌구리
            시나리오로 옮겨 써요.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <UrlInput onSubmit={onSubmit} />
          </motion.div>
        </div>

        {/* Right - Raccoon image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="hidden lg:block flex-shrink-0 w-[340px] h-[400px] relative"
        >
          <Image
            src="/image/ggumguri_basic.png"
            alt="껌구리 캐릭터"
            width={340}
            height={400}
            className="object-contain"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
