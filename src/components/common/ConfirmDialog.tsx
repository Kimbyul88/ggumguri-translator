"use client";

import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface ConfirmDialogProps {
  isVisible: boolean;
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: "default" | "danger";
}

export default function ConfirmDialog({
  isVisible,
  title,
  message,
  confirmLabel = "확인",
  cancelLabel = "취소",
  onConfirm,
  onCancel,
  variant = "default",
}: ConfirmDialogProps) {
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
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onCancel} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative z-10 bg-white rounded-2xl shadow-xl max-w-sm w-full mx-4 p-6 text-center"
          >
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            {message && (
              <p className="text-sm text-gray-500 mb-6">{message}</p>
            )}
            <div className="flex gap-3">
              <button
                onClick={onCancel}
                className="flex-1 rounded-xl border-2 border-gray-200 py-2.5 text-sm font-medium text-gray-600 hover:border-gray-300 transition-colors"
              >
                {cancelLabel}
              </button>
              <button
                onClick={onConfirm}
                className={`flex-1 rounded-xl py-2.5 text-sm font-semibold text-white transition-colors ${
                  variant === "danger"
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
