"use client";

import { editPost } from "@/app/actions/posts-action";
import { usePostForm } from "@/hooks/use-post-form";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";

import BasicButton from "../button/basic-button";
import Input from "./input";

interface Props {
  id: string;
  pathName: string;
  page: number;
  category: React.ReactNode;
  nickname: React.ReactNode;
  title: React.ReactNode;
  content: React.ReactNode;
}

export default function EditForm({ pathName, id, page, category, nickname, title, content }: Props) {
  const router = useRouter();
  const { errors, isLoading, setErrors, setIsLoading, validate } = usePostForm();

  const handlePostEditSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const post = validate(formData);

    if (!post) {
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
      return;
    }

    setIsLoading(true);

    try {
      const result = await editPost(id, post, formData);

      if (!result.ok) {
        setErrors((current) => ({
          ...current,
          password: result.reason === "mismatch" ? "비밀번호가 일치하지 않습니다." : "비밀번호를 입력해주세요.",
        }));
        return;
      }

      router.replace(`/${pathName}?page=${page}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handlePostEditSubmit} className="flex flex-col gap-y-4 w-full">
      <div>
        <h3 className="mb-2 font-semibold">카테고리 선택</h3>
        {category}
        {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
      </div>

      <div>
        <h4 className="mb-1 font-bold">닉네임</h4>
        {nickname}
        {errors.nickname && <p className="mt-1 text-sm text-red-600">{errors.nickname}</p>}
      </div>

      <div>
        <h4 className="mb-1 font-bold">제목</h4>
        {title}
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
      </div>

      <div>
        <h4 className="mb-1 font-bold">내용</h4>
        {content}
        {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
      </div>

      <div>
        <h4 className="mb-1 font-bold">비밀번호</h4>
        <Input type="password" name="password" />
        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <BasicButton type="link" link="/" color="white">
          취소
        </BasicButton>
        <BasicButton type="submit" color="black" disabled={isLoading}>
          {isLoading ? <LoaderCircle className="animate-spin" /> : "수정"}
        </BasicButton>
      </div>
    </form>
  );
}
