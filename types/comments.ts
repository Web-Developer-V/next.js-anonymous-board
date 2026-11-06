export interface Comments {
  id: string;
  user_id: string;
  post_id: string;
  parent_id: string;
  nickname: string;
  content: string;
  created_at: string;
  password_hash: string;
}

export interface updateComment {
  content: string;
}

export interface AddComments {
  nickname: string;
  content: string;
  password_hash: string;
}
