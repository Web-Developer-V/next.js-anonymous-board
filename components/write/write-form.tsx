"use client"

import BasicButton from "../button/basic-button";
import Input from "../form/input";
import Textarea from "../form/textarea";

export default function WriteForm() {
  return (
    <form onSubmit="" className="flex flex-col gap-y-4 w-full">
      <div>
        <h4 className="mb-1 font-bold">제목</h4>
        <Input type="text" placeholder="제목을 입력해주세요." />
      </div>
      <div>
        <h4 className="mb-1 font-bold">내용</h4>
        <Textarea name="" id="" placeholder="내용을 입력해주세요." />
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
        <BasicButton type="link" link="/">
          취소
        </BasicButton>
        <BasicButton type="button">확인</BasicButton>
      </div>
    </form>
  );
}
