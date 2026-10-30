import PostsViewWrapper from "@/components/posts/posts-view-wrapper";

interface Props {
  params: Promise<{ id: string; board: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function BoardPostPage({ params, searchParams }: Props) {
  const { id, board } = await params;
  const { page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);

  return <PostsViewWrapper id={id} pathName={board} page={currentPage} />;
}
