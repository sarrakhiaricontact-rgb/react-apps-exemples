import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { Post } from "../types/types";
import { db } from "../api/localDB";

export const MutationExample: React.FC = () => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const createMutation = useMutation({
    mutationFn: (newPost: Omit<Post, "id" | "createdAt">) =>
      db.createPost(newPost),
    onSuccess: async (newPostData) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["posts"] }),
        queryClient.invalidateQueries({
          queryKey: ["post", newPostData.id],
        }),
      ]);
      setTitle("");
      setBody("");
    },
  });

  const handleSubmit = () => {
    if (title && body) {
      createMutation.mutate({ userId: "1", title, body });
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-bold text-lg mb-3">3️⃣ useMutation - Créer un Post</h3>
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Titre du post"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-3 py-2 text-sm"
        />
        <textarea
          placeholder="Contenu du post"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full border rounded px-3 py-2 text-sm"
          rows={3}
        />
        <button
          onClick={handleSubmit}
          disabled={createMutation.isPending || !title || !body}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:opacity-50 text-sm"
        >
          {createMutation.isPending ? "⏳ Création..." : "➕ Créer le Post"}
        </button>
      </div>
      {createMutation.isSuccess && (
        <div className="mt-3 p-2 bg-green-100 text-green-800 rounded text-sm">
          ✅ Post créé! ID: {createMutation.data.id}
        </div>
      )}
      {createMutation.isError && (
        <div className="mt-3 p-2 bg-red-100 text-red-800 rounded text-sm">
          ❌ Erreur: {createMutation.error.message}
        </div>
      )}
    </div>
  );
};
