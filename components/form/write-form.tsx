"use client";

import { useRouter } from "next/navigation";

import BasicButton from "../button/basic-button";
import Input from "./input";
import { SimpleEditor } from "../tiptap-templates/simple/simple-editor";
import WriteTabs from "../write/write-tabs";

import { usePostsStore } from "@/store/posts-store";

import { LoaderCircle } from "lucide-react";
import { usePostForm } from "@/hooks/use-post-form";

export default function WriteForm({ pathName }: { pathName: string }) {
  const router = useRouter();

  const createPost = usePostsStore((state) => state.addLists);
  const { errors, isLoading, setIsLoading, validate } = usePostForm();

  const handlePostWriteSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const post = validate(formData);

    if (!post) {
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
      return;
    }

    try {
      await createPost(post);
      router.replace(`/${pathName}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handlePostWriteSubmit} className="flex flex-col gap-y-4 w-full">
      <div>
        <h3 className="mb-2 font-semibold">카테고리 선택</h3>
        <WriteTabs />
        {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
      </div>
      <div>
        <h4 className="mb-1 font-bold">닉네임</h4>
        <Input type="text" name="nickname" placeholder="닉네임을 입력해주세요." />
        {errors.nickname && <p className="mt-1 text-sm text-red-600">{errors.nickname}</p>}
      </div>
      <div>
        <h4 className="mb-1 font-bold">제목</h4>
        <Input type="text" name="title" placeholder="제목을 입력해주세요." />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
      </div>
      <div>
        <h4 className="mb-1 font-bold">내용</h4>
        <SimpleEditor name="content" placeholder="내용을 입력해주세요." />
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
        <BasicButton type="submit" color="black">
          {isLoading ? <LoaderCircle className="animate-spin" /> : "작성"}
        </BasicButton>
      </div>
    </form>
  );
}
