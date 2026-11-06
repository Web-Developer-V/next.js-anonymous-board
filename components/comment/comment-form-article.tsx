import CommentReplyForm from "../form/comment-reply-form";

interface Props {
  postId: string;
  commentId: string;
  CommentId: string;
  commentReplyId: string | null;
  setCommentReplyId: (id: string | null) => void;
}

export default function CommentFormArticle({ postId, commentId, commentReplyId, CommentId, setCommentReplyId }: Props) {
  return <>{commentReplyId === commentId && <CommentReplyForm hideCommitReply={setCommentReplyId} postId={postId} commentId={CommentId} />}</>;
}
