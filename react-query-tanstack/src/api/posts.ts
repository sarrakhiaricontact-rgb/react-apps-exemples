import type { Post } from "../types/types";

export const fetchPosts = async (): Promise<Post[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) throw new Error("Erreur réseau");
  return res.json();
};

export const fetchPost = async (id: number): Promise<Post> => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) throw new Error("Erreur réseau");
  return res.json();
};

export const fetchInfinitePosts = async ({
  pageParam = 1,
}): Promise<Post[]> => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=10`
  );
  if (!res.ok) throw new Error("Erreur réseau");
  return res.json();
};

export const createPost = async (newPost: Omit<Post, "id">): Promise<Post> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  });
  if (!res.ok) throw new Error("Erreur réseau");
  return res.json();
};

export const updatePost = async (post: Post): Promise<Post> => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${post.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    }
  );
  if (!res.ok) throw new Error("Erreur réseau");
  return res.json();
};
