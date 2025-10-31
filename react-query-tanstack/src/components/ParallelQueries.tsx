import { useQueries, useQueryClient } from "@tanstack/react-query";
import { db } from "../api/localDB";
import type { User } from "../types/types";

const ALL_USERS_KEY = ["users-list"]; // Clé pour la requête de la liste complète

export const ParallelQueries = () => {
  const userIds = ["1", "2", "3"];
  const queryClient = useQueryClient();

  // 1. Définir une fonction pour récupérer la liste complète (qui sera mise en cache)
  const fetchAllUsers = async () => {
    return await db.getUsers();
  };

  const results = useQueries({
    queries: userIds.map((id) => ({
      // A. Clé de requête pour l'utilisateur individuel
      queryKey: ["user", id],

      // B. Le queryFn tente d'abord de récupérer les données du cache
      //    de la liste complète.
      queryFn: async () => {
        // Tente de lire les données de la liste complète à partir du cache
        let users = queryClient.getQueryData<User[]>(ALL_USERS_KEY);

        if (!users) {
          // Si la liste n'est pas dans le cache, on la récupère.
          // TanStack Query dédupliquera automatiquement cet appel si un autre
          // queryFn le demande en même temps.
          users = await fetchAllUsers();

          // Mettre la liste complète dans le cache sous sa propre clé,
          // pour les autres requêtes qui pourraient encore se lancer.
          queryClient.setQueryData(ALL_USERS_KEY, users);
        }

        // 2. Retourner l'utilisateur spécifique à partir de la liste.
        return users.find((u) => u.id === id);
      },

      // C. Optionnel : On rend la requête 'stale' immédiatement (parce qu'elle est un sous-ensemble)
      // staleTime: Infinity,
      // cacheTime: Infinity,
    })),
  });

  const isLoading = results.some((result) => result.isLoading);
  const isError = results.some((result) => result.isError);

  if (isError) {
    return (
      <p className="text-red-600">
        ❌ Une erreur s'est produite lors du chargement des utilisateurs.
      </p>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-bold text-lg mb-3">
        5️⃣ useQueries - Requêtes Parallèles (Optimisées)
      </h3>
      {isLoading ? (
        <p className="text-blue-600 text-sm">
          ⏳ Chargement des utilisateurs...
        </p>
      ) : (
        <div className="space-y-2">
          {results.map((result, i) => (
            <div
              key={i} // Utiliser result.data?.id comme clé est préférable si disponible
              className="border border-orange-300 rounded p-2 bg-orange-50"
            >
              {result.data ? (
                <>
                  <p className="font-bold text-orange-800 text-sm">
                    {result.data.name}
                  </p>
                  <p className="text-xs text-gray-600">{result.data.email}</p>
                  <p className="text-xs text-gray-500">
                    @{result.data.username}
                  </p>
                </>
              ) : (
                <p className="text-red-500 text-xs">Utilisateur non trouvé.</p>
              )}
            </div>
          ))}
        </div>
      )}
      <p className="text-xs text-gray-500 mt-2">
        ✅ Optimisé : Un seul appel à `db.getUsers()` au lieu de{" "}
        {results.length} !
      </p>
    </div>
  );
};
