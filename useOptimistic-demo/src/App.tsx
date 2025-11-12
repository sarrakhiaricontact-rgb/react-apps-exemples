import React, {
  useState, // Pour gérer l'état local
  useCallback, // Pour mémoriser des fonctions et éviter les re-renders inutiles
  useOptimistic, // Hook React 19 pour gérer une UI optimiste (mise à jour immédiate)
  startTransition, // Rend certaines mises à jour non-bloquantes pour l'UI
  useMemo, // Mémorise des calculs pour éviter de les refaire à chaque render
} from "react";
import { Plus, Trash2, Check, Loader2 } from "lucide-react";
import { delay, generateIdNumber } from "./utils";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

type TodoAction =
  | { type: "add"; todo: Todo } // Ajouter une tâche
  | { type: "toggle"; id: number } // Marquer comme complétée ou non
  | { type: "delete"; id: number }; // Supprimer une tâche

// ====== Composant pour chaque tâche (mémorisé) ======
const TodoItem = React.memo(
  ({
    todo, // La tâche à afficher
    isPending, // Indique si une action est en cours sur cette tâche
    onToggle, // Fonction pour basculer l'état
    onDelete, // Fonction pour supprimer
  }: {
    todo: Todo;
    isPending: boolean;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
  }) => {
    return (
      <div
        className={`flex items-center gap-3 p-4 rounded-lg border transition-all duration-300 ease-out ${
          isPending
            ? "bg-blue-50 border-blue-200" // Style si action en cours
            : "bg-white border-gray-200 hover:border-green-300 hover:shadow-md"
        }`}
        style={{
          minHeight: "64px", // Hauteur fixe pour éviter les shifts
          willChange: isPending ? "opacity, transform" : "auto", // Optimisation animation
        }}
      >
        {/* Bouton toggle */}
        <button
          onClick={() => onToggle(todo.id)}
          className={`shrink-0 w-7 h-7 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
            todo.completed
              ? "bg-green-600 border-green-600"
              : "border-gray-300 hover:border-green-600 hover:scale-110"
          }`}
        >
          {todo.completed && <Check size={18} className="text-white" />}
        </button>

        {/* Texte de la tâche */}
        <span
          className={`flex-1 text-lg transition-all duration-200 ${
            todo.completed ? "line-through text-gray-400" : "text-gray-800"
          }`}
        >
          {todo.text}
        </span>

        {/* Indicateur de synchronisation */}
        {isPending && (
          <span className="text-xs text-blue-600 font-medium px-2 py-1 bg-blue-100 rounded flex items-center gap-1 animate-in fade-in duration-200">
            <Loader2 size={12} className="animate-spin" />
            Sync...
          </span>
        )}

        {/* Bouton supprimer */}
        <button
          onClick={() => onDelete(todo.id)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110"
        >
          <Trash2 size={20} />
        </button>
      </div>
    );
  }
);

TodoItem.displayName = "TodoItem";

export default function App() {
  const [serverTodos, setServerTodos] = useState<Todo[]>([
    { id: 1, text: "Apprendre useOptimistic", completed: false },
    { id: 2, text: "Créer une démo React 19", completed: true },
  ]); // Tâches côté serveur

  const [pendingOps, setPendingOps] = useState<Set<number>>(new Set());
  // IDs des tâches actuellement en cours d'opération

  const [optimisticTodos, updateOptimisticTodos] = useOptimistic<
    Todo[],
    TodoAction
  >(serverTodos, (state, action) => {
    // Fonction pour gérer l'UI optimiste
    switch (action.type) {
      case "add":
        return [...state, action.todo];
      case "toggle":
        return state.map((t) =>
          t.id === action.id ? { ...t, completed: !t.completed } : t
        );
      case "delete":
        return state.filter((t) => t.id !== action.id);
      default:
        return state;
    }
  });

  const [input, setInput] = useState(""); // Valeur de l'input
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "warning";
  } | null>(null); // Notifications temporaires

  const showNotification = useCallback(
    (message: string, type: "success" | "error" | "warning") => {
      setNotification({ message, type });
      setTimeout(() => setNotification(null), 3000); // Disparition automatique
    },
    []
  );

  // Ajouter une tâche
  const addTodo = useCallback(async () => {
    if (!input.trim()) {
      showNotification("Le champ est vide!", "warning");
      return;
    }

    const newTodo: Todo = {
      id: generateIdNumber(),
      text: input.trim(),
      completed: false,
    };

    setInput(""); // Réinitialise l'input
    setPendingOps((prev) => new Set(prev).add(newTodo.id)); // Marque comme en cours

    startTransition(() => {
      updateOptimisticTodos({ type: "add", todo: newTodo }); // UI optimiste
    });

    try {
      await delay(2000); // Simule la requête serveur
      setServerTodos((prev) => [...prev, newTodo]); // Mise à jour serveur
      showNotification("Tâche ajoutée !", "success");
    } catch (error) {
      console.error("Erreur d'ajout :", error);
      showNotification("❌ Échec - la tâche a été annulée", "error");
    } finally {
      setPendingOps((prev) => {
        const next = new Set(prev);
        next.delete(newTodo.id); // Retire de la liste des actions en cours
        return next;
      });
    }
  }, [input, updateOptimisticTodos, showNotification]);

  // Basculer une tâche
  const toggleTodo = useCallback(
    async (id: number) => {
      setPendingOps((prev) => new Set(prev).add(id)); // Action en cours

      startTransition(() => {
        updateOptimisticTodos({ type: "toggle", id }); // UI optimiste
      });

      try {
        await delay(1500); // Simule serveur
        setServerTodos((prev) =>
          prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
        );
      } catch (error) {
        console.error("Erreur toggle :", error);
        showNotification("❌ Échec de la mise à jour", "error");
      } finally {
        setPendingOps((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }
    },
    [updateOptimisticTodos, showNotification]
  );

  // Supprimer une tâche
  const deleteTodo = useCallback(
    async (id: number) => {
      setPendingOps((prev) => new Set(prev).add(id));

      startTransition(() => {
        updateOptimisticTodos({ type: "delete", id }); // UI optimiste
      });

      try {
        await delay(2000); // Simule serveur
        setServerTodos((prev) => prev.filter((t) => t.id !== id));
        showNotification("Tâche supprimée", "success");
      } catch (error) {
        console.error("Erreur suppression :", error);
        showNotification("❌ Échec - la tâche a été restaurée", "error");
      } finally {
        setPendingOps((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }
    },
    [updateOptimisticTodos, showNotification]
  );

  // Gestion touche Entrée
  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") addTodo();
    },
    [addTodo]
  );

  // Statistiques mémoïsées pour éviter recalculs inutiles
  const stats = useMemo(
    () => ({
      total: optimisticTodos.length,
      completed: optimisticTodos.filter((t) => t.completed).length,
      pending: optimisticTodos.filter((t) => !t.completed).length,
      syncing: pendingOps.size,
    }),
    [optimisticTodos, pendingOps.size]
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-blue-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-800">Ma Todo List</h1>
            <p className="text-gray-500">Optimistic UI - React 19</p>
          </div>

          {notification && (
            <div
              className={`p-4 rounded-lg border-l-4 transition-all duration-300 ${
                notification.type === "success"
                  ? "bg-green-50 border-green-500 text-green-700"
                  : notification.type === "error"
                  ? "bg-red-50 border-red-500 text-red-700"
                  : "bg-yellow-50 border-yellow-500 text-yellow-700"
              }`}
            >
              {notification.message}
            </div>
          )}

          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ajouter une tâche..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            />
            <button
              onClick={addTodo}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 active:scale-95 transition-all flex items-center gap-2 font-medium shadow-md hover:shadow-lg"
            >
              <Plus size={20} /> Ajouter
            </button>
          </div>

          <div className="flex gap-4 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
            <span>Total: {stats.total}</span>
            <span>✅ Complétées: {stats.completed}</span>
            <span>⏳ En cours: {stats.pending}</span>
            {stats.syncing > 0 && (
              <span className="text-orange-600 flex items-center gap-1">
                <Loader2 size={14} className="animate-spin" />
                {stats.syncing} sync...
              </span>
            )}
          </div>

          <div className="space-y-2" style={{ minHeight: "200px" }}>
            {optimisticTodos.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <p className="text-lg">Aucune tâche pour le moment</p>
                <p className="text-sm">Ajoutez-en une pour commencer!</p>
              </div>
            ) : (
              optimisticTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  isPending={pendingOps.has(todo.id)}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                />
              ))
            )}
          </div>

          <div className="text-center text-xs text-gray-400 pt-4 border-t">
            💡 Interface ultra-fluide - zéro blocage pendant la synchronisation
          </div>
        </div>
      </div>
    </div>
  );
}
