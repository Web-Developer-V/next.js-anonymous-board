export interface CreatePost {
  nickname: string;
  title: string;
  content: string;
  category: string;
  password_hash: string;
}

export interface EditPost {
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
  liked_user_ids: [];
  password_hash: string;
}

export type Posts = Post;
