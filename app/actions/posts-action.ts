"use server";

import { createClient } from "@/lib/supabase/server";
import type { CreatePost } from "@/types/posts";

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

  let {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const { data, error } = await supabase.auth.signInAnonymously();

    if (error) {
      throw new Error(`${error.message}`);
    }

    user = data.user;
  }

  if (!user) {
    throw new Error("익명 사용자 생성에 실패했습니다.");
  }

  const { data, error } = await supabase
    .from("posts")
    .insert({
      user_id: user.id,
      nickname: post.nickname,
      title: post.title,
      content: post.content,
      category: post.category,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`${error.message} : ${error.code}`);
  }

  return data;
}
