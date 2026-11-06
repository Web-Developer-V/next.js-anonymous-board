"use server";

import { createClient } from "@/lib/supabase/server";
import argon2 from "argon2";

import type { AddComments, updateComment } from "@/types/comments";
import type { passwordValidateResult } from "@/types/common";
import type { Post } from "@/types/posts";

export async function addCommentAction(comments: AddComments, postId: Post["id"]) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("익명 사용자 세션이 없습니다. 페이지를 새로고침해주세요.");
  }

  const password_hash = await argon2.hash(comments.password_hash, {
    type: argon2.argon2id,
  });

  const { data, error } = await supabase
    .from("comments")
    .insert({
      user_id: user.id,
      post_id: postId,
      nickname: comments.nickname,
      content: comments.content,
      password_hash,
      parent_id: null,
      likes: 0,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`${error.message} : ${error.code}`);
  }

  return data;
}

export async function updateCommentAction(commentId: string, comment: updateComment, formData: FormData): Promise<passwordValidateResult> {
  const password = formData.get("password") as string;

  if (!password) {
    return { ok: false, reason: "empty" };
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("삭제 권한이 없습니다.");
  }

  const { data: selectComment } = await supabase.from("comments").select("password_hash, user_id").eq("id", commentId).single();

  if (!selectComment) {
    throw new Error("댓글을 찾을 수 없습니다.");
  }

  const isValid = await argon2.verify(selectComment.password_hash, password);

  if (!isValid) {
    return { ok: false, reason: "mismatch" };
  }

  const { error } = await supabase
    .from("comments")
    .update({
      content: comment.content,
    })
    .eq("id", commentId)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(`${error.message} : ${error.code}`);
  }

  return { ok: true, reason: undefined };
}

export async function deleteCommentAction(commentId: string, formData: FormData): Promise<passwordValidateResult> {
  const password = formData.get("password") as string;

  if (!password) {
    return { ok: false, reason: "empty" };
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("삭제 권한이 없습니다.");
  }

  const { data: comment } = await supabase.from("comments").select("password_hash, user_id").eq("id", commentId).single();

  if (!comment) {
    throw new Error("댓글을 찾을 수 없습니다.");
  }

  const isValid = await argon2.verify(comment.password_hash, password);

  if (!isValid) {
    return { ok: false, reason: "mismatch" };
  }

  const { error } = await supabase.from("comments").delete().eq("id", commentId).eq("user_id", user.id);

  if (error) {
    throw new Error("댓글 삭제에 실패했습니다.");
  }

  return { ok: true, reason: undefined };
}

export async function selectCommentAction(postId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.from("comments").select("*").eq("post_id", postId).order("created_at", { ascending: true });

  if (error) {
    throw new Error(`${error.message} : ${error.code}`);
  }

  return data;
}

export async function createCommentReplyAction(comments: AddComments, commentId: string, postId: Post["id"]) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("익명 사용자 세션이 없습니다. 페이지를 새로고침해주세요.");
  }

  const password_hash = await argon2.hash(comments.password_hash, {
    type: argon2.argon2id,
  });

  const { data: reply, error } = await supabase
    .from("comments")
    .insert({
      user_id: user.id,
      post_id: postId,
      nickname: comments.nickname,
      content: comments.content,
      password_hash,
      parent_id: commentId,
      likes: 0,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`${error.message} : ${error.code}`);
  }

  return reply;
}
