import UseCommentForm from "@/hooks/use-comment-form";
import CommentFormField from "./comment-form-field";
import { useCommentStore } from "@/store/comments-store";

interface Props {
  postId: string;
  commentId: string;
  hideCommitReply: (id: string | null) => void;
}

export default function CommentReplyForm({ postId, commentId, hideCommitReply }: Props) {
  const createCommentReply = useCommentStore((state) => state.createCommentReplys);
  const { comments, errors, handeValidate, reset, handleChange } = UseCommentForm();

  const handleAddCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = handeValidate();

    if (!isValid) return;

    await createCommentReply(
      {
        nickname: comments.nickname,
        content: comments.content,
        password_hash: comments.password,
      },
      commentId,
      postId,
    );

    reset();
  };

  return <CommentFormField nickname={comments.nickname} password={comments.password} content={comments.content} errors={errors} handleChange={handleChange} CommentSubmit={handleAddCommentSubmit} hideCommitReply={hideCommitReply} />;
}
