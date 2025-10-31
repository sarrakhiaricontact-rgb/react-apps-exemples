import type { TableColumns } from "../types/types";

const PostTableColumns: TableColumns[] = [
  { key: "id", label: "ID" },
  { key: "userId", label: "User ID" },
  { key: "title", label: "Titre" },
  { key: "body", label: "Description" },
];

const UserTableColumns: TableColumns[] = [
  { key: "id", label: "ID" },
  { key: "name", label: "Nom" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Téléphone" },
  { key: "company.name", label: "Entreprise" },
];

export { PostTableColumns, UserTableColumns };
