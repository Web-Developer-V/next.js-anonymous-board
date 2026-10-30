import Link from "next/link";
import { Suspense } from "react";
import { selectPosts } from "@/app/actions/posts-action";
import MainBoardSkeleton from "../skeleton/main-board-skeleton";

interface Props {
  category: string;
  link: string;
}

export default async function MainBoardArticle({ category, link }: Props) {
  return (
    <article className="flex flex-col">
      <div className="flex items-center justify-between rounded-t-xl bg-black py-3 px-5">
        <p className="text-white font-bold">{category}게시판</p>
        <Link href={link} className="text-sm text-gray-300 transition-colors hover:text-white">
          더보기
        </Link>
      </div>
      <div className="flex-1 px-5 py-3 border border-slate-200 rounded-b-xl">
        <Suspense fallback={<MainBoardSkeleton />}>
          <MainBoardContent category={category} link={link} />
        </Suspense>
      </div>
    </article>
  );
}

async function MainBoardContent({ category, link }: Props) {
  const posts = await selectPosts();
  const matchedLists = posts.filter((post) => post.category === category);

  const filteredData = [...matchedLists].sort((a, b) => b.created_at.localeCompare(a.created_at)).slice(0, 5);

  return (
    <>
      {filteredData.length > 0 ? (
        <ul>
          {filteredData.map((list) => {
            const time = list.created_at.slice(0, 10);
            return (
              <li key={list.id} className="border-t border-slate-200 first:border-0">
                <Link href={`${link}/${list.id}`} className="flex items-center py-2 transition-colors hover:bg-[#f8f9fb]">
                  <time className="min-w-22 text-sm text-slate-400" dateTime={list.created_at}>
                    {time}
                  </time>
                  <h4>{list.title}</h4>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="flex items-center justify-center w-full h-full text-slate-400">게시글이 없습니다.</p>
      )}
    </>
  );
}
