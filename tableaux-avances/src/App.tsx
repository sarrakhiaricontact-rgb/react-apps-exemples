import { setSelectedTab } from "./store/slices/filterSlice";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { SearchBar } from "./components/features/SearchBar";
import { UsersTable } from "./components/features/UsersTable";
import { PostsTable } from "./components/features/PostsTable";
import { Button } from "./components/ui/button";

export const App = () => {
  const dispatch = useAppDispatch();
  const selectedTab = useAppSelector((state) => state.filters.selectedTab);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Gestion de Données Avancée
          </h1>

          <div className="flex gap-4 mb-6">
            <Button
              variant={selectedTab === "users" ? "default" : "outline"}
              onClick={() => dispatch(setSelectedTab("users"))}
            >
              Utilisateurs
            </Button>
            <Button
              variant={selectedTab === "posts" ? "default" : "outline"}
              onClick={() => dispatch(setSelectedTab("posts"))}
            >
              Publications
            </Button>
          </div>

          <div className="mb-6">
            <SearchBar />
          </div>

          {selectedTab === "users" ? <UsersTable /> : <PostsTable />}
        </div>
      </div>
    </div>
  );
};
