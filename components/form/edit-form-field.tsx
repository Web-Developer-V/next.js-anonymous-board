import WriteTabs from "../write/write-tabs";
import Input from "./input";
import { SimpleEditor } from "../tiptap-templates/simple/simple-editor";

import type { Post } from "@/types/posts";

type FieldType = "category" | "nickname" | "title" | "content";

interface Props {
  postPromise: Promise<Post | null>;
  type: FieldType;
}

export default async function EditFormField({ type, postPromise }: Props) {
  const post = await postPromise;

  if (!post) {
    return null;
  }

  if (type === "category") {
    return <WriteTabs post={post} />;
  }

  if (type === "nickname") {
    return <Input type="text" name="nickname" defaultValue={post.nickname} placeholder="닉네임을 입력해주세요." />;
  }

  if (type === "title") {
    return <Input type="text" name="title" defaultValue={post.title} placeholder="제목을 입력해주세요." />;
  }

  if (type === "content") {
    return <SimpleEditor name="content" placeholder="내용을 입력해주세요." defaultValue={post.content} />;
  }
}
