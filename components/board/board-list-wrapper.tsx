import BoardList from "./board-list";
import WriteButton from "@/components/button/write-button";
import BoardPagination from "./board-pagination";
import type { Post } from "@/types/posts";

interface Props {
  posts?: Post[];
}

export default function BoardListWrapper({ posts }: Props) {
  return (
    <section>
      <BoardList posts={posts} />
      <BoardPagination />
      <div className="flex justify-end mt-6">
        <WriteButton />
      </div>
    </section>
  );
}
