import { Heart } from "lucide-react";

import { format, isToday } from "date-fns";

import BasicButton from "@/components/button/basic-button";
import CommentForm from "@/components/form/comment-form";
import CommentsList from "@/components/board/comments-list";
import CommentReplysList from "@/components/board/comment-replys-list";

import type { Post } from "@/types/posts";

interface Props {
  list: Post;
}

export default function BoardView({ list }: Props) {
  const date = new Date(list.created_at);
  const convertedDate = isToday(date) ? format(date, "HH:mm:ss") : format(date, "yyyy-MM-dd");

  return (
    <section className="border border-gray-200 rounded-xl">
      <ul className="flex flex-col gap-y-2 p-7 border-b border-gray-200">
        <li>
          <p className="text-sm text-slate-400">No. {list.number}</p>
        </li>
        <li>
          <h2 className="text-2xl font-bold">{list.title}</h2>
        </li>
        <li className="flex gap-4">
          <span className="text-sm text-slate-400">{list.nickname}</span>
          <span className="text-sm text-slate-400">{convertedDate}</span>
          <span className="text-sm text-slate-400">조회 {list.views}</span>
          <span className="text-sm text-slate-400">좋아요 {list.likes}</span>
        </li>
      </ul>
      <div className="p-7">
        <div className="mb-10">{list?.content}</div>
        <button className="flex items-center justify-center gap-1 w-25 h-10 mx-auto border border-gray-200 rounded-full cursor-pointer text-slate-400 transition-colors hover:bg-gray-100">
          <Heart size={16} />
          <span>{list?.likes}</span>
        </button>
        <div className="flex justify-between gap-4 py-7 mt-8 border-y border-gray-200">
          <BasicButton type="link" link="/free-board" color="white">
            목록으로
          </BasicButton>
          <div className="flex gap-2">
            <BasicButton type="button" color="black">
              삭제
            </BasicButton>
            <BasicButton type="button" color="black">
              수정
            </BasicButton>
          </div>
        </div>

        <div className="mt-5">
          <h4 className="font-bold">
            댓글 <span className="text-slate-400">2</span>
          </h4>
          {/* 댓글 리스트 */}
          <CommentsList data={list}>
            {/* 답글 리스트 */}
            <CommentReplysList />
          </CommentsList>
        </div>

        {/* 댓글 폼 */}
        <CommentForm />
      </div>
    </section>
  );
}
