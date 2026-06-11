"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ArchiveCard from "./ArchiveCard";
import ScenarioDetailModal from "./ScenarioDetailModal";
import ConfirmDialog from "@/components/common/ConfirmDialog";

interface ArchiveRow {
  id: string;
  title: string;
  reference_title: string;
  thumbnail_url: string;
  is_favorite: boolean;
  created_at: string;
}

export default function ArchiveGrid() {
  const [items, setItems] = useState<ArchiveRow[]>([]);
  const [query, setQuery] = useState("");
  const [favOnly, setFavOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const fetchItems = useCallback(async (search?: string, favorites?: boolean) => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    if (favorites) params.set("favorites", "true");
    const qs = params.toString();
    const res = await fetch(`/api/scenarios${qs ? `?${qs}` : ""}`);
    const data = await res.json();
    setItems(data.items || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchItems("", favOnly);
  }, [fetchItems, favOnly]);

  const handleSearch = () => {
    fetchItems(query, favOnly);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const res = await fetch(`/api/scenarios/${deleteTarget}`, { method: "DELETE" });
    if (res.ok) {
      setItems((prev) => prev.filter((item) => item.id !== deleteTarget));
    }
    setDeleteTarget(null);
  };

  const handleToggleFavorite = async (id: string, current: boolean) => {
    const res = await fetch(`/api/scenarios/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_favorite: !current }),
    });
    if (res.ok) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, is_favorite: !current } : item
        ).filter((item) => !favOnly || item.is_favorite)
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-start justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2">시나리오 아카이브</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            총 {items.length}개의 시나리오{favOnly ? " (즐겨찾기)" : ""}
          </div>
        </div>
        <a
          href="/"
          className="rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-600 transition-colors flex items-center gap-1.5"
        >
          + 새 시나리오 생성
        </a>
      </motion.div>

      {/* Search + Filter */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex gap-3"
      >
        <div className="flex-1 relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="시나리오 제목 검색..."
            className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-3 text-sm placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
        </div>
        <button
          onClick={handleSearch}
          className="rounded-xl border border-gray-200 px-6 py-3 text-sm font-medium text-gray-600 hover:border-gray-300 transition-colors"
        >
          검색하기
        </button>
        <button
          onClick={() => setFavOnly((prev) => !prev)}
          className={`rounded-xl border px-4 py-3 text-sm font-medium transition-colors flex items-center gap-1.5 ${
            favOnly
              ? "border-yellow-400 bg-yellow-50 text-yellow-600"
              : "border-gray-200 text-gray-500 hover:border-gray-300"
          }`}
        >
          <svg
            className={`w-4 h-4 ${favOnly ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`}
            viewBox="0 0 24 24"
            fill={favOnly ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          즐겨찾기
        </button>
      </motion.div>

      {/* Grid */}
      {loading ? (
        <div className="text-center py-16 text-gray-400 text-sm">
          불러오는 중...
        </div>
      ) : items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center py-16 text-gray-400 text-sm"
        >
          {favOnly
            ? "즐겨찾기한 시나리오가 없습니다"
            : query
              ? "검색 결과가 없습니다"
              : "아직 저장된 시나리오가 없습니다"}
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
              >
                <ArchiveCard
                  id={item.id}
                  title={item.title}
                  thumbnailUrl={item.thumbnail_url}
                  isFavorite={item.is_favorite}
                  date={new Date(item.created_at).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                  onDetail={setDetailId}
                  onDelete={setDeleteTarget}
                  onToggleFavorite={handleToggleFavorite}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Detail Modal */}
      <AnimatePresence>
        {detailId && (
          <ScenarioDetailModal
            scenarioId={detailId}
            onClose={() => setDetailId(null)}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirm */}
      <ConfirmDialog
        isVisible={!!deleteTarget}
        title="시나리오를 삭제할까요?"
        message="삭제하면 되돌릴 수 없습니다."
        confirmLabel="삭제"
        cancelLabel="취소"
        variant="danger"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
