import CommentForm from "@/components/form/comment-form";
import CommentsList from "@/components/comment/comments-list";

import type { Post } from "@/types/posts";
import PostsViewButtonArticle from "./posts-view-button-article";
import PostViewField from "./post-view-field";

interface Props {
  id: string;
  list: Post;
  pathName?: string;
  page: number;
  initialIsLiked: boolean;
}

export default function PostsView({ id, list, pathName, page, initialIsLiked }: Props) {
  return (
    <section className="border border-gray-200 rounded-xl">
      <PostViewField list={list} initialIsLiked={initialIsLiked} />
      <PostsViewButtonArticle id={id} list={list} pathName={pathName} page={page} />
      <CommentsArticle list={list} />
    </section>
  );
}

export async function CommentsArticle({ list }: { list: Post }) {
  return (
    <div className="p-7">
      {/* 댓글 리스트 */}
      <CommentsList list={list} />

      {/* 댓글 폼 */}
      <CommentForm list={list} />
    </div>
  );
}
