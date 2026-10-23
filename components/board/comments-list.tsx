import { useState } from "react";

import CommentReplyForm from "../form/comment-reply-form";
import CommentEditButton from "../button/comment-edit-button";
import CommentReplyEditForm from "../form/comment-reply-edit-form";

import { Post } from "@/types/posts";

interface Props {
  children: React.ReactNode;
  data: Post;
}

export default function CommentsList({ children, data }: Props) {
  const [showCommentReplyForm, setShowCommentreplyForm] = useState(false);
  const [showCommentReplyEditForm, setShowCommentReplyEditForm] = useState(false);

  const showCommentReplyFormHandler = (state: boolean) => {
    setShowCommentreplyForm(state);
  };

  const showCommentReplyEditFormHandler = (state: boolean) => {
    setShowCommentReplyEditForm(state);
  };

  return (
    <ul className="mt-3 border-y border-black">
      <li className="py-5 border-b border-gray-200 last:border-0">
        {showCommentReplyEditForm ? (
          /* 답글 수정 폼 */
          <CommentReplyEditForm hideCommentReplyEdit={() => showCommentReplyEditFormHandler(false)} />
        ) : (
          <div className="flex flex-col gap-y-1">
            <p className="flex gap-2">
              <span className="font-bold text-sm text-black">익명</span>
              <span className="text-sm text-slate-400">2026.10.16 09:12</span>
            </p>
            <p className="text-[15px]">{data.comment}</p>
            <p className="flex gap-2">
              <CommentEditButton onClick={() => showCommentReplyFormHandler(true)}>답글쓰기</CommentEditButton>
              <CommentEditButton onClick={() => showCommentReplyEditFormHandler(true)}>수정</CommentEditButton>
              <CommentEditButton>삭제</CommentEditButton>
            </p>
          </div>
        )}

        {/* 답글 폼 */}
        {children}
        {showCommentReplyForm && <CommentReplyForm hideCommitReply={() => showCommentReplyFormHandler(false)} />}
      </li>
    </ul>
  );
}
