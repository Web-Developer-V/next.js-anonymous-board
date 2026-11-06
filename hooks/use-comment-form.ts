import { useState } from "react";

export default function UseCommentForm() {
  const [comments, setComments] = useState({
    nickname: "",
    content: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    nickname: "",
    content: "",
    password: "",
  });

  const handeValidate = () => {
    const validateErrors = {
      nickname: comments.nickname.trim() ? "" : "닉네임을 입력해주세요.",
      content: comments.content.trim() ? "" : "내용을 입력해주세요.",
      password: comments.password.trim() ? "" : "패스워드를 입력해주세요.",
    };

    setErrors(validateErrors);

    return !Object.values(validateErrors).some(Boolean);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setComments((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const reset = () => {
    setComments({
      nickname: "",
      content: "",
      password: "",
    });
  };

  return {
    comments,
    errors,
    handeValidate,
    handleChange,
    reset,
  };
}
