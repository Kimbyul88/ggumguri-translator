"use client";

import Link from "next/link";
import Image from "next/image";

interface HeaderProps {
  showArchiveActive?: boolean;
}

export default function Header({ showArchiveActive = false }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md ">
      <div className="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-5 max-w-[1200px] mx-auto w-full">
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <Image
            src="/logo/ggumguri_logo.png"
            alt="껌구리 로고"
            width={40}
            height={40}
            className="rounded-full w-8 h-8 sm:w-10 sm:h-10"
          />
          <span
            className="text-lg sm:text-2xl tracking-tight"
            style={{ fontFamily: "YangGothic" }}
          >
            껌구리 번역기
          </span>
        </Link>
        <Link
          href="/archive"
          className={`text-lg sm:text-2xl font-medium transition-colors ${
            showArchiveActive
              ? "text-blue-500 underline underline-offset-4"
              : "text-gray-500 hover:text-gray-900"
          }`}
        >
          <span style={{ fontFamily: "YangGothic" }}>아카이브</span>
        </Link>
      </div>
    </header>
  );
}
