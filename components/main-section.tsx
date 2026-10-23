"use client";

import MainBoardArticle from "@/components/board/main-board-article";
import { useListStore } from "@/store/list-store";
import { useEffect } from "react";

export default function MainSection() {
  const loadPosts = useListStore((state) => state.loadLists);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return (
    <section className="w-full max-w-300 mx-auto pt-20 pb-30">
      <section className="grid grid-cols-2 gap-3">
        <MainBoardArticle title="자유게시판" link="/free-board" />
        <MainBoardArticle title="질문게시판" link="/qna-board" />
      </section>
    </section>
  );
}
