interface Post {
  id: string;
  title: string;
  body: string;
  userId: string;
  createdAt: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
}

export type { Post, User };
