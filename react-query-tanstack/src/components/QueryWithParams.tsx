import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { db } from "../api/localDB";

export const QueryWithParams: React.FC = () => {
  const [postId, setPostId] = useState("1");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => db.getPost(postId),
    enabled: parseInt(postId) > 0,
  });

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-bold text-lg mb-3">2️⃣ useQuery avec Paramètres</h3>
      <div className="flex gap-2 mb-3">
        <input
          type="number"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
          className="border rounded px-3 py-1 w-24"
          min="1"
          max="100"
        />
        <span className="text-sm text-gray-600 self-center">
          ID du post (1-100)
        </span>
      </div>
      {isLoading && <p className="text-blue-600">⏳ Chargement...</p>}
      {isError && <p className="text-red-600">❌ Erreur: {error.message}</p>}
      {data && !isError && !isLoading && (
        <div className="border border-green-300 rounded p-3 bg-green-50">
          <h4 className="font-bold text-green-800">{data.title}</h4>
          <p className="text-sm mt-2">{data.body}</p>
          <p className="text-xs text-gray-500 mt-2">User ID: {data.userId}</p>
        </div>
      )}
    </div>
  );
};
