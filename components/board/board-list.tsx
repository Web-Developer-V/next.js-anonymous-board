"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { format, isToday } from "date-fns";
import type { Post } from "@/types/posts";

interface Props {
  posts?: Post[];
}

const listTableHead = [
  {
    id: 1,
    title: "번호",
  },
  {
    id: 2,
    title: "제목",
  },
  {
    id: 3,
    title: "작성자",
  },
  {
    id: 4,
    title: "작성일",
  },
  {
    id: 5,
    title: "조회",
  },
  {
    id: 6,
    title: "좋아요",
  },
];

export default function BoardList({ posts = [] }: Props) {
  const params = usePathname();

  const tableCotentCss = "text-sm text-slate-400 text-center border-t border-slate-200";
  const tableTitleCss = "h-12";

  return (
    <div className="border border-gray-200 rounded-xl">
      <table className="w-full">
        <colgroup>
          <col style={{ width: "80px" }} />
          <col style={{ width: "auto" }} />
          <col style={{ width: "100px" }} />
          <col style={{ width: "120px" }} />
          <col style={{ width: "80px" }} />
          <col style={{ width: "80px" }} />
        </colgroup>

        <thead>
          <tr>
            {listTableHead.map((list) => (
              <th key={list.id} className={tableTitleCss}>
                {list.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {posts.map((list) => {
            const date = new Date(list.created_at);
            const convertedDate = isToday(date) ? format(date, "HH:mm") : format(date, "yyyy.MM.dd");

            return (
              <tr key={list.id} className="transition-colors hover:bg-[#f8f9fb]">
                <td className={tableCotentCss}>{list.number}</td>
                <td className="border-t border-slate-200">
                  <Link href={`${params}/${list.id}`} className="flex items-center w-full h-12">
                    {list.title}
                  </Link>
                </td>
                <td className={tableCotentCss}>{list.nickname}</td>
                <td className={tableCotentCss}>{convertedDate}</td>
                <td className={tableCotentCss}>{list.views}</td>
                <td className={tableCotentCss}>{list.likes}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
