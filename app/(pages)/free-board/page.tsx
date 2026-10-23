"use client";

import BoardListWrapper from "@/components/board/board-list-wrapper";
import { useListStore } from "@/store/list-store";
import { useEffect } from "react";

export default function FreeBoardPage() {
  const loadPosts = useListStore((state) => state.loadLists);
  const posts = useListStore((state) => state.lists);
  const matchedLists = posts.filter((post) => post.category === "자유게시판");

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return <BoardListWrapper posts={matchedLists} />;
}
