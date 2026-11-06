"use client";

import { useState } from "react";

import CommentsListItem from "./comments-list-item";

import { useCommentStore } from "@/store/comments-store";

import type { Comments } from "@/types/comments";
import { User } from "@supabase/supabase-js";

interface Props {
  user: User | null;
  postId: string;
  commentLists: Comments[];
}

export default function CommentsListClient({ user, commentLists: initialComments, postId }: Props) {
  const comments = useCommentStore((state) => state.comments);
  const createdComments = comments.filter((comment) => comment.post_id === postId);

  const [editCommentId, setEditCommentId] = useState<string | null>(null);
  const [commentReplyId, setCommentReplyId] = useState<string | null>(null);
  const [deleteCommentId, setDeleteCommentId] = useState<string | null>(null);
  const [deleteCommentIds, setDeleteCommentIds] = useState<string[]>([]);
  const [updateCommentContent, setUpdateCommentContent] = useState<Record<string, string>>({});

  const handleDeleted = (commentId: string) => {
    setDeleteCommentIds((prev) => [...prev, commentId]);
  };

  const handleUpdated = (commentId: string, commentContent: string) => {
    setUpdateCommentContent((prev) => ({
      ...prev,
      [commentId]: commentContent,
    }));
  };

  const commentLists = [
    ...initialComments
      .filter((comment) => !deleteCommentIds.includes(comment.id))
      .map((comment) => ({
        ...comment,
        content: updateCommentContent[comment.id] ?? comment.content,
      })),
    ...createdComments.filter((createdComment) => !initialComments.some((initialComment) => initialComment.id === createdComment.id)),
  ];
  return (
    <div>
      <h4 className="font-bold">
        댓글 <span className="text-slate-400">{commentLists.length}</span>
      </h4>
      <ul className="mt-3 border-y border-black">
        <CommentsListItem
          user={user}
          postId={postId}
          commentLists={commentLists}
          commentReplyId={commentReplyId}
          editCommentId={editCommentId}
          deleteCommentId={deleteCommentId}
          setCommentReplyId={setCommentReplyId}
          setEditCommentId={setEditCommentId}
          setDeleteCommentId={setDeleteCommentId}
          onDeleted={handleDeleted}
          onUpdated={handleUpdated}
        />
      </ul>
    </div>
  );
}
