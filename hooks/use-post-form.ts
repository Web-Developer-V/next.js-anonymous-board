"use client";

import { useState } from "react";

export function usePostForm() {
  const [errors, setErrors] = useState({
    category: "",
    nickname: "",
    title: "",
    content: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const validate = (formData: FormData) => {
    const category = formData.get("board-category") as string;
    const nickname = formData.get("nickname")?.toString().trim() as string;
    const title = formData.get("title")?.toString().trim() as string;
    const content = formData.get("content")?.toString().trim() as string;
    const password = formData.get("password")?.toString().trim() as string;

    const validateErrors = {
      category: category ? "" : "카테고리를 선택해주세요.",
      nickname: nickname ? "" : "닉네임을 입력해주세요.",
      title: title ? "" : "제목을 입력해주세요.",
      content: content ? "" : "내용을 입력해주세요.",
      password: password ? "" : "패스워드를 입력해주세요.",
    };

    setErrors(validateErrors);

    if (Object.values(validateErrors).some(Boolean)) {
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
      return;
    }

    return {
      category,
      nickname,
      title,
      content,
      password_hash: password,
    };
  };

  return {
    errors,
    setErrors,
    isLoading,
    setIsLoading,
    validate,
  };
}
