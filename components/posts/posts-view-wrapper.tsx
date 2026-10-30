import { increamentPostViews, selectPost } from "@/app/actions/posts-action";
import PostsView from "./posts-view";
import { getCurrentUser } from "@/app/actions/user-action";

interface Props {
  id: string;
  pathName: string;
  page: number;
}

export default async function PostsViewWrapper({ id, pathName, page }: Props) {
  await increamentPostViews(id);
  const post = await selectPost(id);

  if (!post) {
    return <p>게시글을 찾을 수 없습니다.</p>;
  }

  const user = await getCurrentUser();
  const initialIsLiked = Boolean(user && post.liked_user_ids?.includes(user.id));

  return <PostsView id={id} list={post} pathName={pathName} page={page} initialIsLiked={initialIsLiked} />;
}
