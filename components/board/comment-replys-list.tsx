import { useState } from "react";

import { CornerDownRight } from "lucide-react";

import CommentReplyEditForm from "../form/comment-reply-edit-form";
import CommentEditButton from "../button/comment-edit-button";

export default function CommentReplysList() {
  const [showCommentReplyEditForm, setShowCommentReplyEditForm] = useState(false);

  const showCommentReplyEditFormHandler = (state: boolean) => {
    setShowCommentReplyEditForm(state);
  };

  return (
    <ul className="flex flex-col gap-y-4 p-4 mt-5 bg-slate-50 rounded-md">
      <li className="flex gap-2">
        {showCommentReplyEditForm ? (
          /* 답글 수정 폼 */
          <CommentReplyEditForm hideCommentReplyEdit={() => showCommentReplyEditFormHandler(false)} />
        ) : (
          <div className="flex gap-x-2">
            <CornerDownRight size={14} className="shrink-0 mt-0.5 text-slate-300" />
            <div className=" flex flex-col gap-y-1">
              <p className="flex gap-2">
                <span className="font-bold text-sm text-black">익명</span>
                <span className="text-sm text-slate-400">2026.10.16 09:30</span>
              </p>
              <p className="text-[15px] text-slate-600">저도 비슷하게 생각했어요.</p>
              <p className="flex gap-2">
                <CommentEditButton onClick={() => showCommentReplyEditFormHandler(true)}>수정</CommentEditButton>
                <CommentEditButton>삭제</CommentEditButton>
              </p>
            </div>
          </div>
        )}
      </li>
    </ul>
  );
}
