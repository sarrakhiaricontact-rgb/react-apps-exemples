import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryWithParams } from "./components/QueryWithParams";
import { MutationExample } from "./components/MutationExample";
import { InfiniteQueryExample } from "./components/InfiniteQueryExample";
import { ParallelQueries } from "./components/ParallelQueries";
import { OptimisticUpdate } from "./components/OptimisticUpdate";
import { BasicQuery } from "./components/BasicQuery";
import { useQueryClient } from "@tanstack/react-query";
import { db } from "./api/localDB";
import { DeleteMutation } from "./components/DeleteMutation";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const queryClient = useQueryClient();

  const tabs = [
    { id: "all", label: "📋 Tout" },
    { id: "basic", label: "1️⃣ Query" },
    { id: "params", label: "2️⃣ Params" },
    { id: "create", label: "3️⃣ Create" },
    { id: "infinite", label: "4️⃣ Infinite" },
    { id: "parallel", label: "5️⃣ Parallel" },
    { id: "optimistic", label: "6️⃣ Optimistic" },
    { id: "delete", label: "🗑️ Delete" },
  ];

  const handleReset = () => {
    db.resetData();
    queryClient.invalidateQueries();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header avec design moderne */}
        <header className="mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-indigo-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  🚀 TanStack Query
                </h1>
                <p className="text-gray-600">
                  Guide complet avec TypeScript et Base de Données en Mémoire
                </p>
              </div>
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-linear-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
              >
                🔄 Réinitialiser
              </button>
            </div>
          </div>
        </header>

        {/* Tabs avec design amélioré */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-lg p-2 border border-gray-200">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2.5 rounded-lg whitespace-nowrap transition-all font-medium text-sm ${
                    activeTab === tab.id
                      ? "bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-md transform scale-105"
                      : "bg-gray-50 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid avec meilleur espacement */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {(activeTab === "all" || activeTab === "basic") && <BasicQuery />}
          {(activeTab === "all" || activeTab === "params") && (
            <QueryWithParams />
          )}
          {(activeTab === "all" || activeTab === "create") && (
            <MutationExample />
          )}

          {(activeTab === "all" || activeTab === "infinite") && (
            <InfiniteQueryExample />
          )}
          {(activeTab === "all" || activeTab === "parallel") && (
            <ParallelQueries />
          )}
          {(activeTab === "all" || activeTab === "optimistic") && (
            <OptimisticUpdate />
          )}
          {(activeTab === "all" || activeTab === "delete") && (
            <DeleteMutation />
          )}
        </div>

        {/* Footer avec design moderne */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-indigo-100">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">✨</span>
            <h3 className="font-bold text-lg text-gray-800">
              Fonctionnalités de cette démo
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <span className="text-xl">✅</span>
              <div>
                <strong className="text-green-900">
                  Modifications réelles
                </strong>
                <p className="text-sm text-green-700">
                  Les updates/create/delete fonctionnent vraiment!
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <span className="text-xl">💾</span>
              <div>
                <strong className="text-blue-900">Stockage en mémoire</strong>
                <p className="text-sm text-blue-700">
                  Les données persistent pendant la session
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
              <span className="text-xl">⚡</span>
              <div>
                <strong className="text-purple-900">Délais simulés</strong>
                <p className="text-sm text-purple-700">
                  Simule des appels API réalistes (300-600ms)
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-indigo-50 rounded-lg">
              <span className="text-xl">👁️</span>
              <div>
                <strong className="text-indigo-900">Cache visible</strong>
                <p className="text-sm text-indigo-700">
                  Observez le cache React Query en action
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
              <span className="text-xl">🔑</span>
              <div>
                <strong className="text-yellow-900">IDs uniques</strong>
                <p className="text-sm text-yellow-700">
                  Chaque création génère un ID unique réel
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-pink-50 rounded-lg">
              <span className="text-xl">⚡</span>
              <div>
                <strong className="text-pink-900">Optimistic updates</strong>
                <p className="text-sm text-pink-700">
                  UI mise à jour avant la confirmation serveur
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
};

export default function AppWithProvider() {
  return <App />;
}
