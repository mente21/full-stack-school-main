"use client";

import { ITEM_PER_PAGE } from "@/lib/settings";
import { useRouter } from "next/navigation";

const Pagination = ({ page, count }: { page: number; count: number }) => {
  const router = useRouter();

  const hasPrev = ITEM_PER_PAGE * (page - 1) > 0;
  const hasNext = ITEM_PER_PAGE * (page - 1) + ITEM_PER_PAGE < count;

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());
    router.push(`${window.location.pathname}?${params}`);
  };
  return (
    <div className="p-4 flex items-center justify-between text-gray-500">
      <button
        disabled={!hasPrev}
        className="py-2.5 px-5 rounded-xl bg-white/80 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white hover:shadow-md transition-all text-gray-600 border border-gray-200"
        onClick={() => {
          changePage(page - 1);
        }}
      >
        ← Prev
      </button>
      <div className="flex items-center gap-1 text-sm">
        {Array.from(
          { length: Math.ceil(count / ITEM_PER_PAGE) },
          (_, index) => {
            const pageIndex = index + 1;
            return (
              <button
                key={pageIndex}
                className={`w-9 h-9 rounded-xl transition-all font-medium ${page === pageIndex
                  ? "bg-gradient-to-br from-lamaSky to-lamaPurple text-white shadow-lg"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  }`}
                onClick={() => {
                  changePage(pageIndex);
                }}
              >
                {pageIndex}
              </button>
            );
          }
        )}
      </div>
      <button
        className="py-2.5 px-5 rounded-xl bg-white/80 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white hover:shadow-md transition-all text-gray-600 border border-gray-200"
        disabled={!hasNext}
        onClick={() => {
          changePage(page + 1);
        }}
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
