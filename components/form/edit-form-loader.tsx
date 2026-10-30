import { Suspense } from "react";
import EditForm from "./edit-form";
import EditFormField from "./edit-form-field";
import EditFormSkeleton from "../skeleton/edit-form-skeleton";
import { selectPost } from "@/app/actions/posts-action";

interface Props {
  pathName: string;
  id: string;
  page: number;
}

export default function EditFormLoader({ pathName, id, page }: Props) {
  const postPromise = selectPost(id);

  return (
    <EditForm
      id={id}
      pathName={pathName}
      page={page}
      category={
        <Suspense fallback={<EditFormSkeleton type="tab" />}>
          <EditFormField type="category" postPromise={postPromise} />
        </Suspense>
      }
      nickname={
        <Suspense fallback={<EditFormSkeleton type="input" />}>
          <EditFormField type="nickname" postPromise={postPromise} />
        </Suspense>
      }
      title={
        <Suspense fallback={<EditFormSkeleton type="input" />}>
          <EditFormField type="title" postPromise={postPromise} />
        </Suspense>
      }
      content={
        <Suspense fallback={<EditFormSkeleton type="editor" />}>
          <EditFormField type="content" postPromise={postPromise} />
        </Suspense>
      }
    />
  );
}
