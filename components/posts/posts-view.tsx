import CommentForm from "@/components/form/comment-form";
import CommentsList from "@/components/posts/comments-list";
import CommentReplysList from "@/components/posts/comment-replys-list";

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
      <div className="mt-5">
        <h4 className="font-bold">
          댓글 <span className="text-slate-400">2</span>
        </h4>
        {/* 댓글 리스트 */}
        <CommentsList data={list}>
          {/* 답글 리스트 */}
          <CommentReplysList />
        </CommentsList>
      </div>

      {/* 댓글 폼 */}
      <CommentForm />
    </div>
  );
}
