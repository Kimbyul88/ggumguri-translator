"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
}

export default function LoadingOverlay({ isVisible, message }: LoadingOverlayProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-blue-50/80 backdrop-blur-md" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative z-10 text-center"
          >
            {/* Raccoon */}
            <motion.div
              animate={{ rotate: [-3, 3, -3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="mb-6"
            >
              <Image
                src="/image/ggumguri_basic.png"
                alt="껌구리"
                width={120}
                height={120}
                className="mx-auto object-contain"
              />
            </motion.div>

            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              영상 분석 중
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              >
                ...
              </motion.span>
            </h2>
            <p className="text-sm text-gray-500">{message || "잠시만 기다려주세요"}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
