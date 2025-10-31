import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { db } from "../api/localDB";
import type { Post } from "../types/types";

export const OptimisticUpdate = () => {
  const queryClient = useQueryClient();
  const [selectedId, setSelectedId] = useState("");

  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: () => db.getPosts(),
  });

  const updateMutation = useMutation({
    mutationFn: (post: Post) => db.updatePost(post),
    onMutate: async (newPost) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      const previousPosts = queryClient.getQueryData<Post[]>(["posts"]);

      queryClient.setQueryData<Post[]>(["posts"], (old) =>
        old?.map((post) => (post.id === newPost.id ? newPost : post))
      );

      return { previousPosts };
    },
    onError: (err, newPost, context) => {
      queryClient.setQueryData(["posts"], context?.previousPosts);
    },
    onSettled: async (data) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["posts"] }),
        queryClient.invalidateQueries({
          queryKey: ["post", data?.id],
        }),
      ]);
    },
  });

  const handleUpdate = () => {
    const post = posts?.find((p) => p.id === selectedId);
    if (post) {
      updateMutation.mutate({
        ...post,
        title: `✨ ${
          post.title
        } [Modifié à ${new Date().toLocaleTimeString()}]`,
      });
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-bold text-lg mb-3">6️⃣ Optimistic Updates</h3>
      <div className="space-y-3">
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="w-full border rounded px-3 py-2 text-sm"
        >
          <option value="">Sélectionner un post...</option>
          {posts?.map((post) => (
            <option key={post.id} value={post.id}>
              {post.title.substring(0, 40)}...
            </option>
          ))}
        </select>
        <button
          onClick={handleUpdate}
          disabled={updateMutation.isPending || !selectedId}
          className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 disabled:opacity-50 text-sm"
        >
          {updateMutation.isPending ? "⏳ Mise à jour..." : "✏️ Mettre à Jour"}
        </button>
        {updateMutation.isSuccess && (
          <p className="text-green-600 text-sm">
            ✅ Mise à jour instantanée (optimistic) puis confirmée!
          </p>
        )}
      </div>
    </div>
  );
};
