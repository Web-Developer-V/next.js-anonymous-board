import Link from "next/link";
import { format, isToday } from "date-fns";
import type { Post } from "@/types/posts";

interface Props {
  posts: Post[];
  slug: string;
  currentPage: number;
}

export default async function PostsListRow({ posts, slug, currentPage }: Props) {
  const tableCotentCss = "text-sm text-slate-400 text-center border-t border-slate-200";

  return (
    <>
      {posts.map((list) => {
        const date = new Date(list.created_at);
        const createdDate = isToday(date) ? format(date, "HH:mm") : format(date, "yyyy.MM.dd");

        return (
          <tr key={list.id} className="transition-colors hover:bg-[#f8f9fb]">
            <td className={tableCotentCss}>{list.number}</td>
            <td className="border-t border-slate-200">
              <Link prefetch={false} href={`${slug}/${list.id}?page=${currentPage}`} className="flex items-center w-full h-12">
                {list.title}
              </Link>
            </td>
            <td className={tableCotentCss}>{list.nickname}</td>
            <td className={tableCotentCss}>{createdDate}</td>
            <td className={tableCotentCss}>{list.views}</td>
            <td className={tableCotentCss}>{list.likes}</td>
          </tr>
        );
      })}
    </>
  );
}
