"use client";

import { useActionState } from "react";
import { createPortal } from "react-dom";

import DeleteModalArticle from "./delete-modal-article";

import { deleteCommentAction } from "@/app/actions/comments-action";

interface Props {
  commentId: string;
  setShowModal: (state: boolean) => void;
  onDeleted: (commentId: string) => void;
}

export type DeleteState = {
  ok: boolean;
  reason?: "empty" | "mismatch" | undefined;
};

const initialState: DeleteState = {
  ok: false,
};

export default function CommentDeleteModal({ commentId, setShowModal, onDeleted }: Props) {
  const [result, formAction, isPending] = useActionState<DeleteState, FormData>(async (_previousState, formData) => {
    return deleteCommentAction(commentId, formData);
  }, initialState);

  return createPortal(<DeleteModalArticle formAction={formAction} result={result} isPending={isPending} commentId={commentId} onDeleted={onDeleted} isShow={setShowModal} target="댓글" />, document.body);
}
