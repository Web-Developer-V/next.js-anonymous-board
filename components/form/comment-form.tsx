"use client";

import React from "react";

import CommentFormField from "./comment-form-field";

import { useCommentStore } from "@/store/comments-store";

import type { Post } from "@/types/posts";
import UseCommentForm from "@/hooks/use-comment-form";

export default function CommentForm({ list }: { list: Post }) {
  const createComment = useCommentStore((state) => state.createComment);
  const { comments, errors, handeValidate, reset, handleChange } = UseCommentForm();

  const handleAddCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = handeValidate();

    if (!isValid) return;

    await createComment(
      {
        nickname: comments.nickname,
        content: comments.content,
        password_hash: comments.password,
      },
      list.id,
    );

    reset();
  };

  return <CommentFormField nickname={comments.nickname} password={comments.password} content={comments.content} errors={errors} handleChange={handleChange} CommentSubmit={handleAddCommentSubmit} />;
}
