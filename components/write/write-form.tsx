"use client";

import { useRouter } from "next/navigation";

import { useListStore } from "@/store/list-store";
import BasicButton from "../button/basic-button";
import Input from "../form/input";
import Textarea from "../form/textarea";
import WriteTabs from "./write-tabs";

export default function WriteForm() {
  const createPost = useListStore((state) => state.addLists);
  const router = useRouter();

  const postSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const nickname = formData.get("nickname") as string;
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const category = formData.get("board-category") as string;

    await createPost({
      nickname,
      title,
      content,
      category,
    });

    router.replace("/");
  };

  return (
    <form onSubmit={postSubmitHandler} className="flex flex-col gap-y-4 w-full">
      <div className="mb-8">
        <h3 className="mb-2 font-semibold">게시판 선택</h3>
        <WriteTabs />
      </div>
      <div>
        <h4 className="mb-1 font-bold">닉네임</h4>
        <Input type="text" name="nickname" placeholder="닉네임을 입력해주세요." />
      </div>
      <div>
        <h4 className="mb-1 font-bold">제목</h4>
        <Input type="text" name="title" placeholder="제목을 입력해주세요." />
      </div>
      <div>
        <h4 className="mb-1 font-bold">내용</h4>
        <Textarea name="content" placeholder="내용을 입력해주세요." height="200px" />
      </div>
      <div>
        <h4 className="mb-1 font-bold">이미지</h4>
        <div className="flex gap-x-3">
          <Input hidden multiple accept="image/*" type="file" name="addFile" id="addFile" />
          <Input type="text" readOnly placeholder="선택된 이미지가 없습니다." className="w-[calc(100%-92px)] h-8 px-2 outline-0 border border-slate-200 text-sm" />
          <label htmlFor="addFile" className="flex items-center justify-center w-20 h-8 text-[14px] text-white bg-black rounded-sm cursor-pointer">
            선택
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-15">
        <BasicButton type="link" link="/" color="white">
          취소
        </BasicButton>
        <BasicButton type="submit" color="black">
          확인
        </BasicButton>
      </div>
    </form>
  );
}
