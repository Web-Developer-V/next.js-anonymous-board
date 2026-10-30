"use server";

import { createClient } from "@/lib/supabase/server";

export async function getCurrentUser() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  const isMissingSession =
    error?.name === "AuthSessionMissingError" ||
    error?.code === "AuthSessionMissingError" ||
    error?.status === 401;

  if (error && !isMissingSession) {
    throw Error(`${error.message} : ${error.code}`);
  }

  return user ?? null;
}
