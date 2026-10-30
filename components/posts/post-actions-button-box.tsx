"use client";

import { useState } from "react";
import BasicButton from "../button/basic-button";
import PostDeleteModal from "../modal/post-delete-modal";

import type { Post } from "@/types/posts";

interface Props {
  id: string;
  list: Post;
  pathName?: string;
  page: number;
}

export default function PostActionsButtonBox({ id, list, pathName, page }: Props) {
  const [isShow, setIsShow] = useState(false);

  return (
    <>
      <div className="flex gap-2">
        <BasicButton type="button" color="black" onClick={() => setIsShow(true)}>
          삭제
        </BasicButton>

        <BasicButton type="link" color="black" link={`/${pathName}/${id}/edit?page=${page}`}>
          수정
        </BasicButton>
      </div>

      {isShow && <PostDeleteModal pathName={pathName} list={list} isShow={setIsShow} />}
    </>
  );
}
