import { Fragment } from "react/jsx-runtime";

import CommentEditForm from "../form/comment-edit-form";
import CommentReplyForm from "../form/comment-reply-form";
import CommentReplysList from "./comment-replys-list";
import CommentEditButton from "../button/comment-edit-button";

import { isToday, format } from "date-fns";

import CommentDeleteModal from "../modal/comment-delete-modal";

import type { Comments } from "@/types/comments";
import { User } from "@supabase/supabase-js";

interface Props {
  user: User | null;
  postId: string;
  commentLists: Comments[];
  commentReplyId: string | null;
  editCommentId: string | null;
  deleteCommentId: string | null;
  setCommentReplyId: (id: string | null) => void;
  setEditCommentId: (id: string | null) => void;
  setDeleteCommentId: (id: string | null) => void;
  onDeleted: (commentId: string) => void;
  onUpdated: (commentId: string, commentContent: string) => void;
}

export default function CommentsListItem({ user, postId, commentLists, commentReplyId, editCommentId, deleteCommentId, setCommentReplyId, setEditCommentId, setDeleteCommentId, onDeleted, onUpdated }: Props) {
  const filteredLists = commentLists.filter((comment) => comment.parent_id === null);

  return (
    <>
      {filteredLists.map((list) => {
        const date = new Date(list.created_at);
        const createdDate = isToday(date) ? format(date, "HH:mm") : format(date, "yyyy.MM.dd");
        const matchedUser = list.user_id === user?.id;
        const userId = list.user_id.slice(0, 6).toUpperCase();
        const reply = commentLists.find((comment) => list.id === comment.parent_id);

        return (
          <Fragment key={list.id}>
            {deleteCommentId === list.id && <CommentDeleteModal commentId={list.id} onDeleted={onDeleted} setShowModal={(isShow) => setDeleteCommentId(isShow ? list.id : null)} />}
            <li className={`py-5 px-3 border-b border-gray-200 last:border-0 ${matchedUser ? "bg-slate-50" : null}`}>
              {editCommentId === list.id ? (
                /* 답글 수정 폼 */
                <CommentEditForm hideCommentReplyEdit={setEditCommentId} commentId={list.id} onUpdated={onUpdated} comment={list.content} />
              ) : (
                <div className="flex flex-col gap-y-1">
                  <p className="flex gap-2">
                    <span className="font-bold text-sm text-black">
                      {list.nickname} <span className="text-[12px] text-slate-400">({userId})</span>
                    </span>
                    <span className="text-sm text-slate-400">{createdDate}</span>
                  </p>
                  <p className="text-[15px]">{list.content}</p>
                  <p className="flex gap-2">
                    <CommentEditButton onClick={() => setCommentReplyId(list.id)}>답글쓰기</CommentEditButton>

                    {matchedUser && (
                      <>
                        <CommentEditButton onClick={() => setEditCommentId(list.id)}>수정</CommentEditButton>
                        <CommentEditButton onClick={() => setDeleteCommentId(list.id)}>삭제</CommentEditButton>
                      </>
                    )}
                  </p>
                </div>
              )}

              {/* 답글 폼 */}
              {/* {children} */}
              {reply && (
                <CommentReplysList
                  user={user}
                  postId={postId}
                  commentLists={commentLists}
                  commentReplyId={commentReplyId}
                  editCommentId={editCommentId}
                  deleteCommentId={deleteCommentId}
                  list={list}
                  setCommentReplyId={setCommentReplyId}
                  setEditCommentId={setEditCommentId}
                  setDeleteCommentId={setDeleteCommentId}
                  onUpdated={onUpdated}
                  onDeleted={onDeleted}
                />
              )}

              {commentReplyId === list.id && <CommentReplyForm hideCommitReply={setCommentReplyId} postId={postId} commentId={list.id} />}
            </li>
          </Fragment>
        );
      })}
    </>
  );
}
