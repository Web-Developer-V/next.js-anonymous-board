"use server";

import { createClient } from "@/lib/supabase/server";

export async function getCurrentUser() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  const isMissingSession = error?.name === "AuthSessionMissingError" || error?.code === "AuthSessionMissingError" || error?.status === 401;

  if (error && !isMissingSession) {
    throw Error(`현재 사용자 확인 실패: ${error.message}`);
  }

  if (user) {
    return user;
  }

  const { data, error: signInError } = await supabase.auth.signInAnonymously();

  if (signInError) {
    throw new Error(`익명 로그인 실패: ${signInError.message}`);
  }

  if (!data.user) {
    throw new Error("익명 사용자 생성에 실패했습니다.");
  }

  return data.user;
}

export async function createUser() {
  const supabase = await createClient();

  let {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const { data, error } = await supabase.auth.signInAnonymously();

    if (error) {
      throw new Error(`${error.message} : ${error.code}`);
    }

    user = data.user;
  }

  if (!user) {
    throw new Error("익명 사용자 생성에 실패했습니다.");
  }
}
