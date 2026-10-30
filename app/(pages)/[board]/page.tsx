import { selectPosts } from "@/app/actions/posts-action";
import PostsListWrapper from "@/components/posts/posts-list-wrapper";
import { getBoardConfig } from "@/data/json/board-config";

interface Props {
  params: Promise<{ board: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function FreeBoardPage({ params, searchParams }: Props) {
  const { board } = await params;
  const { page } = await searchParams;

  const config = getBoardConfig(board);
  if (!config) return null;

  const posts = await selectPosts();
  const filteredPosts = posts.filter((post) => post.category === config.category);

  const currentPage = Math.max(1, Number(page) || 1);
  const pageSize = 10;
  const totalPage = Math.max(1, Math.ceil(filteredPosts.length / pageSize));
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;

  const pagePosts = filteredPosts.slice(start, end);

  return <PostsListWrapper posts={pagePosts} slug={board} currentPage={currentPage} totalPage={totalPage} />;
}
