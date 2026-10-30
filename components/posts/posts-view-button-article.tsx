import { Post } from "@/types/posts";
import { getCurrentUser } from "@/app/actions/user-action";
import ListBackButton from "../button/list-back-button";
import PostActionsButtonBox from "./post-actions-button-box";

interface Props {
  id: string;
  list: Post;
  pathName?: string;
  page: number;
}

export default async function PostsViewButtonArticle({ id, list, pathName, page }: Props) {
  const user = await getCurrentUser();
  const isAuthor = Boolean(user && list.user_id && user.id === list.user_id);

  return (
    <div className="flex justify-between gap-4 p-7 mt-8 border-y border-gray-200">
      <ListBackButton pathName={pathName} page={page} />
      {isAuthor && <PostActionsButtonBox id={id} pathName={pathName} list={list} page={page} />}
    </div>
  );
}
