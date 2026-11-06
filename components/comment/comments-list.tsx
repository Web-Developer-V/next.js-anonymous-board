import { selectCommentAction } from "@/app/actions/comments-action";
import { getCurrentUser } from "@/app/actions/user-action";

import CommentsListClient from "./comments-list-client";

import type { Post } from "@/types/posts";

interface Props {
  list: Post;
}

export default async function CommentsList({ list }: Props) {
  const commentLists = await selectCommentAction(list.id);
  const user = await getCurrentUser();

  return <CommentsListClient user={user} postId={list.id} commentLists={commentLists} />;
}
