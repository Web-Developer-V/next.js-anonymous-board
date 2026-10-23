import Input from "@/components/form/input";
import Textarea from "@/components/form/textarea";
import CommentButton from "@/components/button/comment-button";

export default function CommentForm() {
  return (
    <form action="" className="mt-5">
      <div className="flex gap-x-3">
        <div className="flex flex-col gap-y-3 max-w-30">
          <Input placeholder="닉네임" type="text" />
          <Input placeholder="비밀번호" type="password" />
        </div>
        <div className="w-[calc(100%-132px)]">
          <Textarea placeholder="내용을 입력해주세요." height="100%" />
        </div>
      </div>
      <div className="flex justify-end mt-3">
        <CommentButton>등록</CommentButton>
      </div>
    </form>
  );
}
