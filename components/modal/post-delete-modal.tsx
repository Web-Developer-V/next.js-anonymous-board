"use client";

import { useActionState } from "react";
import { createPortal } from "react-dom";

import Input from "../form/input";
import BasicButton from "../button/basic-button";
import { LoaderCircle } from "lucide-react";

import type { Post } from "@/types/posts";

import { deletePost } from "@/app/actions/posts-action";

interface Props {
  pathName?: string;
  list: Post;
  isShow: (state: boolean) => void;
}

type DeleteState = {
  ok: boolean;
  reason?: "empty" | "mismatch";
};

export default function PostDeleteModal({ pathName, list, isShow }: Props) {
  const [result, formAction, isPending] = useActionState<DeleteState, FormData>(
    async (_previousState, formData) => {
      return deletePost(list.id, formData, pathName);
    },
    {
      ok: true,
    },
  );

  return createPortal(
    <div className="fixed w-full h-full">
      <div className="absolute w-full h-full top-0 left-0 bg-[rgba(0,0,0,0.3)]"></div>
      <div className="absolute top-1/2 left-1/2 max-w-100 w-full p-5 bg-white rounded-sm translate-[-50%]">
        <form action={formAction}>
          <div className="mb-2">
            <h4 className="mb-1 font-bold">비밀번호</h4>
            <Input type="password" name="password" />
            {result.reason === "empty" && <p className="mt-1 text-sm text-red-600">비밀번호를 입력해주세요.</p>}
            {result.reason === "mismatch" && <p className="mt-1 text-sm text-red-600">비밀번호가 일치하지 않습니다.</p>}
          </div>
          <p className="text-sm mb-5">게시글을 삭제하시려면 비밀번호를 입력해주세요.</p>
          <div className="flex justify-end gap-2">
            <BasicButton color="white" type="button" onClick={() => isShow(false)}>
              취소
            </BasicButton>
            <BasicButton color="black" type="submit" disabled={isPending}>
              {isPending ? <LoaderCircle className="animate-spin" /> : "확인"}
            </BasicButton>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
}
