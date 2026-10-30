import { Heart } from "lucide-react";

interface Props {
  likes: number;
  isLiked: boolean;
  handleLikes: () => void;
}

export default function PostLikesButton({ likes, isLiked, handleLikes }: Props) {
  return (
    <button onClick={handleLikes} className={`flex items-center justify-center gap-1 w-25 h-10 mx-auto border border-gray-200 rounded-full cursor-pointer text-slate-400 transition-colors hover:bg-gray-100 ${isLiked ? "bg-gray-100" : undefined}`}>
      {isLiked ? <Heart size={16} fill="#000" stroke="#000" /> : <Heart size={16} />}
      <span>{likes}</span>
    </button>
  );
}
