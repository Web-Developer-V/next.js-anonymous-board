import { Suspense } from "react";
import BoardListSkeleton from "../skeleton/board-list-skeleton";
import PostsListRow from "./posts-list-row";

import type { Post } from "@/types/posts";

interface Props {
  posts: Post[];
  slug: string;
  currentPage: number;
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

export default function PostsList({ posts, slug, currentPage }: Props) {
  const tableTitleCss = "h-12";

  return (
    <>
      {posts.length === 0 ? (
        <div className="flex items-center justify-center min-h-60 border-t border-b border-gray-200">
          <p className="text-slate-400">게시글이 없습니다.</p>
        </div>
      ) : (
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
              <Suspense fallback={<BoardListSkeleton />}>
                <PostsListRow posts={posts} slug={slug} currentPage={currentPage} />
              </Suspense>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
