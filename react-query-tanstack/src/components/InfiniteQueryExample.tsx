import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { db } from "../api/localDB";

export const InfiniteQueryExample: React.FC = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["infinitePosts"],
      queryFn: ({ pageParam }) => db.getInfinitePosts(pageParam),
      getNextPageParam: (lastPage, pages) => {
        return lastPage.length === 5 ? pages.length + 1 : undefined;
      },
      initialPageParam: 1,
    });

  if (isLoading) return <div className="text-blue-600">⏳ Chargement...</div>;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-bold text-lg mb-3">
        4️⃣ useInfiniteQuery - Pagination
      </h3>
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {data?.pages.map((page, i) => (
          <React.Fragment key={i}>
            <div className="text-xs font-bold text-purple-600 mt-2">
              Page {i + 1}
            </div>
            {page.map((post) => (
              <div
                key={post.id}
                className="border-l-4 border-purple-500 pl-3 py-2 bg-purple-50"
              >
                <p className="font-semibold text-sm">{post.title}</p>
                <p className="text-xs text-gray-600 truncate">{post.body}</p>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="w-full mt-3 bg-purple-500 text-white py-2 rounded hover:bg-purple-600 disabled:opacity-50 text-sm"
        >
          {isFetchingNextPage ? "⏳ Chargement..." : "⬇️ Charger Plus"}
        </button>
      )}
      {!hasNextPage && (
        <p className="text-xs text-gray-500 mt-2 text-center">
          ✅ Tous les posts chargés
        </p>
      )}
    </div>
  );
};
