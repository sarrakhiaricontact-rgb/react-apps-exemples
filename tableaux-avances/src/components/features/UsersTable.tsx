import { useQuery } from "@tanstack/react-query";
import type { User } from "../../types/types";
import { Loader2 } from "lucide-react";
import { fetchUsers } from "../../api/api";
import { useAppSelector } from "../../store/hooks";
import { DataTable } from "./DataTable";
import { UserTableColumns } from "../../constants/tableColumn";

export const UsersTable = () => {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const { searchTerm, sortBy, sortOrder, currentPage, pageSize } =
    useAppSelector((state) => state.filters);

  // ⏳ Loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  // ❌ Error
  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        Erreur de chargement des données
      </div>
    );
  }

  return (
    <DataTable
      data={users || []}
      columns={UserTableColumns}
      searchTerm={searchTerm}
      sortBy={sortBy}
      sortOrder={sortOrder}
      currentPage={currentPage}
      pageSize={pageSize}
    />
  );
};
