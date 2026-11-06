"use client";

import { useActionState } from "react";
import { createPortal } from "react-dom";

import type { Post } from "@/types/posts";

import { deletePost } from "@/app/actions/posts-action";
import DeleteModalArticle from "./delete-modal-article";

interface Props {
  pathName?: string;
  list: Post;
  isShow: (state: boolean) => void;
}

export type DeleteState = {
  ok: boolean;
  reason?: "empty" | "mismatch" | undefined;
};

const initialState: DeleteState = {
  ok: false,
};

export default function PostDeleteModal({ pathName, list, isShow }: Props) {
  const [result, formAction, isPending] = useActionState<DeleteState, FormData>(async (_previousState, formData) => {
    return deletePost(list.id, formData, pathName);
  }, initialState);

  return createPortal(<DeleteModalArticle formAction={formAction} result={result} isPending={isPending} isShow={isShow} target="게시글" />, document.body);
}
