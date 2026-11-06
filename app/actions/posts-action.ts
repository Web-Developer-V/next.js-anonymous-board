"use server";

import { createClient } from "@/lib/supabase/server";
import type { CreatePost, EditPost } from "@/types/posts";
import { redirect } from "next/navigation";
import argon2 from "argon2";

import type { passwordValidateResult } from "@/types/common";

export async function selectPost(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.from("posts").select("*").eq("id", id).maybeSingle();

  if (error) {
    throw new Error(`${error.message} : ${error.code}`);
  }

  return data;
}

export async function selectPosts() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("posts").select("*").order("created_at", { ascending: false });

  if (error) {
    throw new Error(`${error.message} : ${error.code}`);
  }

  return data;
}

export async function createPosts(post: CreatePost) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("익명 사용자 세션이 없습니다. 페이지를 새로고침해주세요.");
  }

  const passwordHash = await argon2.hash(post.password_hash, {
    type: argon2.argon2id,
  });

  const { data, error } = await supabase
    .from("posts")
    .insert({
      user_id: user.id,
      nickname: post.nickname,
      title: post.title,
      content: post.content,
      category: post.category,
      password_hash: passwordHash,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`${error.message} : ${error.code}`);
  }

  return data;
}

export async function editPost(id: string, post: EditPost, formData: FormData): Promise<passwordValidateResult> {
  const password = formData.get("password")?.toString().trim() ?? "";
  const supabase = await createClient();

  if (!password) {
    return { ok: false, reason: "empty" };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("수정 권한이 없습니다.");
  }

  const { data: selectPost, error: postError } = await supabase.from("posts").select("password_hash, user_id").eq("id", id).single();

  if (postError || !selectPost) {
    throw new Error("게시글을 찾을 수 없습니다.");
  }

  if (selectPost.user_id !== user.id) {
    throw new Error("수정 권한이 없습니다.");
  }

  const isValid = await argon2.verify(selectPost.password_hash, password);

  if (!isValid) {
    return { ok: false, reason: "mismatch" };
  }

  const { error } = await supabase
    .from("posts")
    .update({
      category: post.category,
      nickname: post.nickname,
      title: post.title,
      content: post.content,
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(`${error.message} : ${error.code}`);
  }

  return { ok: true, reason: undefined };
}

export async function deletePost(id: string, formData: FormData, pathName?: string | undefined): Promise<passwordValidateResult> {
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

  const { data: post } = await supabase.from("posts").select("password_hash, user_id").eq("id", id).single();

  if (!post) {
    throw new Error("게시글을 찾을 수 없습니다.");
  }

  const isValid = await argon2.verify(post.password_hash, password);

  if (!isValid) {
    return { ok: false, reason: "mismatch" };
  }

  const { error: deleteError } = await supabase.from("posts").delete().eq("id", id).eq("user_id", user.id);

  if (deleteError) {
    throw new Error("게시글 삭제에 실패했습니다.");
  }

  redirect(pathName ? `/${pathName}` : "/");
}

export async function increamentPostViews(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.rpc("increment_post_views", {
    post_id: id,
  });

  if (error) {
    throw new Error(`${error.message} : ${error.code}`);
  }
}

export async function postLikes(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("toggle_post_like", {
    post_id: id,
  });

  if (error) {
    throw new Error(`${error.message} : ${error.code}`);
  }

  return data;
}
