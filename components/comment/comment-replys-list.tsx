"use client";

import { Fragment } from "react/jsx-runtime";

import { CornerDownRight } from "lucide-react";

import CommentEditButton from "../button/comment-edit-button";
import CommentReplyForm from "../form/comment-reply-form";
import CommentEditForm from "../form/comment-edit-form";
import CommentDeleteModal from "../modal/comment-delete-modal";

import { isToday, format } from "date-fns";

import type { Comments } from "@/types/comments";
import { User } from "@supabase/supabase-js";

interface Props {
  user: User | null;
  commentLists: Comments[];
  list: Comments;
  postId: string;
  commentReplyId: string | null;
  editCommentId: string | null;
  deleteCommentId: string | null;
  setCommentReplyId: (id: string | null) => void;
  setEditCommentId: (id: string | null) => void;
  setDeleteCommentId: (id: string | null) => void;
  onDeleted: (commentId: string) => void;
  onUpdated: (commentId: string, commentContent: string) => void;
}

export default function CommentReplysList({ user, postId, commentLists, commentReplyId, editCommentId, deleteCommentId, list, setCommentReplyId, setEditCommentId, setDeleteCommentId, onUpdated, onDeleted }: Props) {
  // const [showCommentReplyEditForm, setShowCommentReplyEditForm] = useState(false);

  // const showCommentReplyEditFormHandler = (state: boolean) => {
  //   setShowCommentReplyEditForm(state);
  // };

  const matchedLists = commentLists.filter((comment) => list.id === comment.parent_id);

  return (
    <ul className="flex flex-col gap-y-4 p-4 mt-5 bg-slate-50 rounded-md">
      {matchedLists.map((comment) => {
        const date = new Date(comment.created_at);
        const createdDate = isToday(date) ? format(date, "HH:mm") : format(date, "yyyy.MM.dd");
        const matchedUser = comment.user_id === user?.id;
        const userId = comment.user_id.slice(0, 6).toUpperCase();

        return (
          <Fragment key={comment.id}>
            {deleteCommentId === comment.id && <CommentDeleteModal commentId={list.id} onDeleted={onDeleted} setShowModal={(isShow) => setDeleteCommentId(isShow ? list.id : null)} />}
            <li>
              {editCommentId === comment.id ? (
                <CommentEditForm hideCommentReplyEdit={setEditCommentId} commentId={list.id} onUpdated={onUpdated} comment={list.content} />
              ) : (
                <div className="flex gap-x-2">
                  <CornerDownRight size={14} className="shrink-0 mt-0.5 text-slate-300" />
                  <div className=" flex flex-col gap-y-1">
                    <p className="flex gap-2">
                      <span className="font-bold text-sm text-black">
                        {comment.nickname} <span className="text-[12px] text-slate-400">({userId})</span>
                      </span>
                      <span className="text-sm text-slate-400">{createdDate}</span>
                    </p>
                    <p className="text-[15px] text-slate-600">{comment.content}</p>
                    <p className="flex gap-2">
                      <CommentEditButton onClick={() => setCommentReplyId(comment.id)}>답글쓰기</CommentEditButton>
                      {matchedUser && (
                        <>
                          <CommentEditButton onClick={() => setEditCommentId(comment.id)}>수정</CommentEditButton>
                          <CommentEditButton onClick={() => setDeleteCommentId(comment.id)}>삭제</CommentEditButton>
                        </>
                      )}
                    </p>
                  </div>
                </div>
              )}

              {/* {commentReplyId === comment.id && <CommentReplyForm hideCommitReply={setCommentReplyId} postId={postId} commentId={list.id} />} */}
            </li>
          </Fragment>
        );
      })}
    </ul>
  );
}
