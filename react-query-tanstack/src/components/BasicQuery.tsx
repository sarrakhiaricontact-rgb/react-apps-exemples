import { useQuery } from "@tanstack/react-query";
import { db } from "../api/localDB";

export const BasicQuery = () => {
  const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: () => db.getPosts(),
  });

  if (isLoading) return <div className="text-blue-600">⏳ Chargement...</div>;
  if (isError)
    return <div className="text-red-600">❌ Erreur: {error.message}</div>;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-lg">1️⃣ useQuery - Liste des Posts</h3>
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 text-sm"
        >
          {isFetching ? "⏳" : "🔄"}
        </button>
      </div>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {data?.map((post) => (
          <div
            key={post.id}
            className="border-l-4 border-blue-500 pl-3 py-2 bg-blue-50"
          >
            <p className="font-semibold text-sm">{post.title}</p>
            <p className="text-xs text-gray-600 truncate">{post.body}</p>
            <p className="text-xs text-gray-400 mt-1">ID: {post.id}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-2">
        ✅ Total: {data?.length} posts (Données locales réelles)
      </p>
    </div>
  );
};
