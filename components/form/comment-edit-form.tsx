import { useActionState, useEffect, useRef } from "react";

import Input from "@/components/form/input";
import Textarea from "@/components/form/textarea";
import CommentButton from "@/components/button/comment-button";
import { DeleteState } from "../modal/post-delete-modal";
import { LoaderCircle } from "lucide-react";

import { updateCommentAction } from "@/app/actions/comments-action";

interface Props {
  hideCommentReplyEdit: (id: string | null) => void;
  onUpdated: (commentId: string, content: string) => void;
  comment: string;
  commentId: string;
}

const initialState: DeleteState = {
  ok: false,
};

export default function CommentEditForm({ hideCommentReplyEdit, onUpdated, comment, commentId }: Props) {
  const submittedContent = useRef(comment);

  const [result, formAction, isPending] = useActionState<DeleteState, FormData>(async (_previousState, formData) => {
    const content = formData.get("content") as string;

    submittedContent.current = content;

    return updateCommentAction(commentId, { content }, formData);
  }, initialState);

  useEffect(() => {
    if (result.ok) {
      onUpdated?.(commentId, submittedContent.current);
      hideCommentReplyEdit(null);
    }
  }, [result.ok, commentId, hideCommentReplyEdit, onUpdated]);

  return (
    <div className="flex gap-x-3 w-full z-1">
      <form action={formAction} className="flex gap-x-3 w-full">
        <div className="flex flex-col gap-y-2">
          <div>
            <Input placeholder="비밀번호" type="password" name="password" />
            {result.reason === "empty" && <p className="mt-1 text-[12px] text-red-600">비밀번호를 입력해주세요.</p>}
            {result.reason === "mismatch" && <p className="mt-1 text-[12px] text-red-600">비밀번호가 일치하지 않습니다.</p>}
          </div>
          <div className="flex justify-end gap-x-2">
            <CommentButton color="white" width="auto" type="button" onClick={() => hideCommentReplyEdit(null)}>
              취소
            </CommentButton>
            <CommentButton color="black" width="auto">
              {isPending ? <LoaderCircle className="animate-spin" /> : "수정"}
            </CommentButton>
          </div>
        </div>

        <div className="flex-1">
          <Textarea name="content" placeholder="내용을 입력해주세요." height="100px" defaultValue={comment} />
        </div>
      </form>
    </div>
  );
}
