"use client";

import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface SuccessDialogProps {
  isVisible: boolean;
  title: string;
  message?: string;
  buttonLabel?: string;
  onClose: () => void;
}

export default function SuccessDialog({
  isVisible,
  title,
  message,
  buttonLabel = "확인",
  onClose,
}: SuccessDialogProps) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[110] flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative z-10 bg-white rounded-2xl shadow-xl max-w-sm w-full mx-4 p-6 text-center"
          >
            {/* Check icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1, type: "spring", stiffness: 300 }}
              className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4"
            >
              <svg className="w-7 h-7 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <h3 className="text-lg font-bold mb-1">{title}</h3>
            {message && (
              <p className="text-sm text-gray-500 mb-5">{message}</p>
            )}
            <button
              onClick={onClose}
              className="w-full rounded-xl bg-blue-500 py-2.5 text-sm font-semibold text-white hover:bg-blue-600 transition-colors"
            >
              {buttonLabel}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
