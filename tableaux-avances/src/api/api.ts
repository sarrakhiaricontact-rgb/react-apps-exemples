import type {
  FetchParams,
  PaginatedResponse,
  Post,
  User,
} from "../types/types";

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) throw new Error("Erreur de chargement des utilisateurs");
  return response.json();
};

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) throw new Error("Erreur de chargement des posts");
  return response.json();
};

export const fetchUsersService = async (
  params: FetchParams
): Promise<PaginatedResponse<User>> => {
  const {
    page,
    pageSize,
    sortBy = "id",
    sortOrder = "asc",
    search = "",
  } = params;

  // Construction de l'URL avec paramètres de pagination
  const url = new URL("https://jsonplaceholder.typicode.com/users");

  // JSONPlaceholder supporte _page et _limit pour la pagination
  url.searchParams.append("_page", page.toString());
  url.searchParams.append("_limit", pageSize.toString());

  // Tri (JSONPlaceholder supporte _sort et _order)
  if (sortBy) {
    url.searchParams.append("_sort", sortBy);
    url.searchParams.append("_order", sortOrder);
  }

  console.log("📡 API Call Users:", url.toString());

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error("Erreur de chargement des utilisateurs");
  }

  // Récupérer le total depuis les headers (x-total-count)
  const totalCount = response.headers.get("x-total-count");
  const total = totalCount ? parseInt(totalCount) : 0;

  let data: User[] = await response.json();

  // Filtrage côté client pour la recherche (car JSONPlaceholder ne supporte pas q= pour users)
  if (search) {
    const searchLower = search.toLowerCase();
    data = data.filter(
      (user) =>
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.company.name.toLowerCase().includes(searchLower) ||
        user.phone.toLowerCase().includes(searchLower)
    );
  }

  return {
    data,
    total: search ? data.length : total || data.length,
    page,
    pageSize,
    totalPages: Math.ceil(
      (search ? data.length : total || data.length) / pageSize
    ),
  };
};

export const fetchPostsService = async (
  params: FetchParams
): Promise<PaginatedResponse<Post>> => {
  const {
    page,
    pageSize,
    sortBy = "id",
    sortOrder = "asc",
    search = "",
  } = params;

  const url = new URL("https://jsonplaceholder.typicode.com/posts");

  // Pagination
  url.searchParams.append("_page", page.toString());
  url.searchParams.append("_limit", pageSize.toString());

  // Tri
  if (sortBy) {
    url.searchParams.append("_sort", sortBy);
    url.searchParams.append("_order", sortOrder);
  }

  // Recherche (JSONPlaceholder supporte q= pour la recherche full-text)
  if (search) {
    url.searchParams.append("q", search);
  }

  console.log("📡 API Call Posts:", url.toString());

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error("Erreur de chargement des posts");
  }

  const totalCount = response.headers.get("x-total-count");
  const total = totalCount ? parseInt(totalCount) : 0;

  const data: Post[] = await response.json();

  return {
    data,
    total: total || data.length,
    page,
    pageSize,
    totalPages: Math.ceil((total || data.length) / pageSize),
  };
};
