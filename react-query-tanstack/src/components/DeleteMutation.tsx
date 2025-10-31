import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Post } from "../types/types";
import { useState } from "react";
import { db } from "../api/localDB";

export const DeleteMutation = () => {
  const queryClient = useQueryClient();
  const [selectedId, setSelectedId] = useState("");

  const {
    data: postsData,
    isLoading,
    isError,
  } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: () => db.getPosts(),
    staleTime: 5 * 60 * 1000,
  });

  const allPosts = postsData || [];

  const deleteMutation = useMutation({
    mutationFn: (id: string) => db.deletePost(id),

    // 1. Mise à jour du cache lors du succès de la mutation
    onSuccess: (data, variables) => {
      const deletedPostId = variables;

      // Utilisation de allPosts pour maintenir la liste filtrée
      queryClient.setQueryData<Post[]>(["posts"], (oldPosts) => {
        return oldPosts
          ? oldPosts.filter((post) => post.id !== deletedPostId)
          : [];
      });
      queryClient.invalidateQueries({
        queryKey: ["post", selectedId],
      });
      // Réinitialiser la sélection
      setSelectedId("");
    },

    // 2. Gestion de l'erreur
    onError: (error, variables) => {
      console.error(`Échec de la suppression du post ${variables}:`, error);
      // Logic pour une notification à l'utilisateur ici
    },
  });

  // --- Affichage des états de la requête ---
  if (isLoading) return <div>⏳ Chargement de la liste des posts...</div>;
  if (isError) return <div>❌ Erreur lors du chargement des posts.</div>;

  // --- Rendu du composant ---
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-bold text-lg mb-3">🗑️ Supprimer un Post</h3>
      <div className="space-y-3">
        {/* Utilisation de 'allPosts.length' directement car 'allPosts' est garanti d'être un tableau (grâce à 'postsData || []') */}
        {allPosts.length === 0 ? (
          <p className="text-sm text-gray-500">La liste des posts est vide.</p>
        ) : (
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="w-full border rounded px-3 py-2 text-sm"
          >
            <option value="">Sélectionner un post...</option>
            {allPosts.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        )}

        <button
          onClick={() => selectedId && deleteMutation.mutate(selectedId)}
          // Désactiver si la mutation est en cours, pas de sélection, ou pas de posts
          disabled={
            deleteMutation.isPending || !selectedId || allPosts.length === 0
          }
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 disabled:opacity-50 text-sm"
        >
          {deleteMutation.isPending ? "⏳ Suppression..." : "🗑️ Supprimer"}
        </button>
      </div>
      {deleteMutation.isSuccess && (
        <div className="mt-3 p-2 bg-green-100 text-green-800 rounded text-sm">
          ✅ Post supprimé avec succès!
        </div>
      )}
      {deleteMutation.isError && (
        <div className="mt-3 p-2 bg-red-100 text-red-800 rounded text-sm">
          ❌ Échec de la suppression: {deleteMutation.error.message}
        </div>
      )}
    </div>
  );
};
