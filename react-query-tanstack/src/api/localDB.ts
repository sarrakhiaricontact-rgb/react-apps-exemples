import type { Post, User } from "../types/types";

class LocalDB {
  private static readonly STORAGE_KEY = "localDB";

  constructor() {
    // Initialisation unique : si aucun post n’existe, on met les posts initiaux
    const data = JSON.parse(localStorage.getItem(LocalDB.STORAGE_KEY) || "{}");
    if (!data.posts) {
      data.posts = this.getInitialPosts();
      localStorage.setItem(LocalDB.STORAGE_KEY, JSON.stringify(data));
    }
  }

  private getItem<T>(key: string): T {
    const data = JSON.parse(localStorage.getItem(LocalDB.STORAGE_KEY) || "{}");
    return key in data ? data[key] : ([] as unknown as T); // renvoie un tableau vide si inexistant
  }

  private setItem<T>(key: string, value: T): void {
    const data = JSON.parse(localStorage.getItem(LocalDB.STORAGE_KEY) || "{}");
    data[key] = value;
    localStorage.setItem(LocalDB.STORAGE_KEY, JSON.stringify(data));
  }

  async getPosts(): Promise<Post[]> {
    await this.delay(500);
    return this.getItem<Post[]>("posts");
  }

  async getPost(id: string): Promise<Post | undefined> {
    await this.delay(300);
    const posts = this.getItem<Post[]>("posts");
    return posts.find((p) => p.id === id);
  }

  async createPost(post: Omit<Post, "id" | "createdAt">): Promise<Post> {
    await this.delay(400);
    const posts = this.getItem<Post[]>("posts") || [];

    const lastId = posts.length > 0 ? Number(posts[posts.length - 1].id) : 0;

    const newPost: Post = {
      ...post,
      id: (lastId + 1).toString(),
      createdAt: Date.now(),
    };
    this.setItem("posts", [...posts, newPost]);
    return newPost;
  }

  async updatePost(post: Post): Promise<Post> {
    await this.delay(400);
    const posts = this.getItem<Post[]>("posts");
    const updated = posts.map((p) => (p.id === post.id ? post : p));
    this.setItem("posts", updated);
    return post;
  }

  async deletePost(id: string): Promise<void> {
    await this.delay(400);
    const posts = this.getItem<Post[]>("posts");
    const updated = posts.filter((p) => p.id !== id);
    this.setItem("posts", updated);
  }

  async getInfinitePosts(page: number, limit: number = 5): Promise<Post[]> {
    await this.delay(600);
    const posts = this.getItem<Post[]>("posts");
    const start = (page - 1) * limit;
    return posts.slice(start, start + limit);
  }

  async getUsers(): Promise<User[]> {
    await this.delay(400);
    return [
      {
        id: "1",
        name: "Alice Martin",
        email: "alice@example.com",
        username: "alice_m",
      },
      {
        id: "2",
        name: "Bob Dupont",
        email: "bob@example.com",
        username: "bob_d",
      },
      {
        id: "3",
        name: "Claire Bernard",
        email: "claire@example.com",
        username: "claire_b",
      },
    ];
  }

  resetData(): void {
    const data = JSON.parse(localStorage.getItem(LocalDB.STORAGE_KEY) || "{}");
    data.posts = this.getInitialPosts(); // réinitialise les posts
    localStorage.setItem(LocalDB.STORAGE_KEY, JSON.stringify(data));
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private getInitialPosts(): Post[] {
    return [
      {
        id: "1",
        title: "Introduction à React Query",
        body: "React Query simplifie la gestion des données asynchrones...",
        userId: "1",
        createdAt: Date.now() - 3600000,
      },
      {
        id: "2",
        title: "TypeScript pour les débutants",
        body: "TypeScript ajoute le typage statique à JavaScript...",
        userId: "2",
        createdAt: Date.now() - 7200000,
      },
      {
        id: "3",
        title: "Les hooks React expliqués",
        body: "Les hooks permettent d'utiliser l'état dans les composants fonctionnels...",
        userId: "1",
        createdAt: Date.now() - 10800000,
      },
      {
        id: "4",
        title: "Optimisation des performances",
        body: "Découvrez comment optimiser vos applications React...",
        userId: "3",
        createdAt: Date.now() - 14400000,
      },
      {
        id: "5",
        title: "GraphQL vs REST",
        body: "Comparaison entre GraphQL et les API REST traditionnelles...",
        userId: "2",
        createdAt: Date.now() - 18000000,
      },
    ];
  }
}

export const db = new LocalDB();
