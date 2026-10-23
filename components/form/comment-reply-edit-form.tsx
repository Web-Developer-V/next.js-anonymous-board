import Input from "@/components/form/input";
import Textarea from "@/components/form/textarea";
import CommentButton from "@/components/button/comment-button";

interface Props {
  hideCommentReplyEdit: () => void;
}

export default function CommentReplyEditForm({ hideCommentReplyEdit }: Props) {
  return (
    <div className="flex gap-x-3 w-full z-1">
      <div className="flex flex-col gap-y-3 max-w-30">
        <Input placeholder="비밀번호" type="password" />
        <div className="flex justify-end gap-x-2">
          <CommentButton color="white" width="auto" type="button" onClick={hideCommentReplyEdit}>
            취소
          </CommentButton>
          <CommentButton color="black" width="auto">
            수정
          </CommentButton>
        </div>
      </div>
      <div className="w-[calc(100%-132px)]">
        <Textarea placeholder="내용을 입력해주세요." height="100%" defaultValue="저도 비슷하게 생각했어요." />
      </div>
    </div>
  );
}
