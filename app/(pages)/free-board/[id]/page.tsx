"use client";

import { useParams } from "next/navigation";

import BoardView from "@/components/board/board-view";
import { useListStore } from "@/store/list-store";

export default function FreeBoardViewPage() {
  const { id } = useParams();
  const postLists = useListStore((state) => state.lists);
  const filteredList = postLists.find((list) => list.id === id);

  if (!filteredList) {
    return <p>게시글을 찾을 수 없습니다.</p>;
  }

  return <BoardView list={filteredList} />;
}
