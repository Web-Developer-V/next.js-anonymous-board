import Input from "@/components/form/input";
import Textarea from "@/components/form/textarea";
import CommentButton from "@/components/button/comment-button";

interface Props {
  nickname: string;
  password: string;
  content: string;
  errors: {
    nickname: string;
    content: string;
    password: string;
  };
  CommentSubmit: React.FormEventHandler;
  handleChange: React.ChangeEventHandler;
  hideCommitReply?: (id: string | null) => void;
}

export default function CommentFormField({ nickname, password, content, errors, CommentSubmit, handleChange, hideCommitReply }: Props) {
  return (
    <form onSubmit={CommentSubmit} className="mt-5">
      <div className="flex gap-x-3">
        <div className="flex flex-col gap-y-3 max-w-35">
          <div>
            <Input placeholder="닉네임" name="nickname" type="text" value={nickname} onChange={handleChange} />
            {errors.nickname && <p className="mt-1 text-[12px] text-red-600">닉네임을 입력해주세요.</p>}
          </div>
          <div>
            <Input placeholder="비밀번호" name="password" type="password" value={password} onChange={handleChange} />
            {errors.password && <p className="mt-1 text-[12px] text-red-600">비밀번호를 입력해주세요.</p>}
          </div>
        </div>
        <div className="flex-1">
          <Textarea placeholder="내용을 입력해주세요." name="content" height="100px" value={content} onChange={handleChange} />
          {errors.content && <p className="mt-1 text-[12px] text-red-600">내용을 입력해주세요.</p>}
        </div>
      </div>
      <div className="flex justify-end gap-x-2 mt-3">
        {hideCommitReply && (
          <CommentButton color="white" type="button" onClick={() => hideCommitReply(null)}>
            취소
          </CommentButton>
        )}
        <CommentButton color="black">등록</CommentButton>
      </div>
    </form>
  );
}
