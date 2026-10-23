export interface CreatePost {
  nickname: string;
  title: string;
  content: string;
  category: string;
}

export interface Post extends Omit<CreatePost, "category"> {
  id: string;
  user_id?: string;
  comment?: string;
  category?: string;
  created_at: string;
  number: number;
  views: number;
  likes: number;
}

export type Posts = Post;
