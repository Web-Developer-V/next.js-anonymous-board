import PostsList from "./posts-list";
import WriteButton from "@/components/button/write-button";
import PostsPagination from "./posts-pagination";

import type { Post } from "@/types/posts";

interface Props {
  posts: Post[];
  slug: string;
  currentPage: number;
  totalPage: number;
}

export default function PostsListWrapper({ posts, slug, currentPage, totalPage }: Props) {
  return (
    <section>
      <PostsList posts={posts} slug={slug} currentPage={currentPage} />

      <PostsPagination currentPage={currentPage} totalPage={totalPage} />
      <div className="flex justify-end mt-6">
        <WriteButton pathName={slug} />
      </div>
    </section>
  );
}
