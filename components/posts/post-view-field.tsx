"use client";

import { useState } from "react";
import { format, isToday } from "date-fns";
import DOMPurify from "isomorphic-dompurify";

import PostLikesButton from "../button/post-likes-button";

import { postLikes } from "@/app/actions/posts-action";

import type { Post } from "@/types/posts";

interface Props {
  list: Post;
  initialIsLiked: boolean;
}

export default function PostViewField({ list, initialIsLiked }: Props) {
  const [likes, setLikes] = useState(list.likes);
  const [isLiked, setIsLiked] = useState(initialIsLiked);

  const handleLikes = async () => {
    const nextIsLiked = await postLikes(list.id);
    setIsLiked(nextIsLiked);

    setLikes((current) => (nextIsLiked ? current + 1 : Math.max(0, current - 1)));
  };

  const date = new Date(list.created_at);
  const convertedDate = isToday(date) ? format(date, "HH:mm:ss") : format(date, "yyyy-MM-dd");
  const sanitizedContent = DOMPurify.sanitize(list.content);

  return (
    <>
      <ul className="flex flex-col gap-y-2 p-7 border-b border-gray-200">
        <li>
          <p className="text-sm text-slate-400">No. {list.number}</p>
        </li>
        <li>
          <h2 className="text-2xl font-bold">{list.title}</h2>
        </li>
        <li className="flex gap-4">
          <span className="text-sm text-slate-400">{list.nickname}</span>
          <span className="text-sm text-slate-400">{convertedDate}</span>
          <span className="text-sm text-slate-400">조회 {list.views}</span>
          <span className="text-sm text-slate-400">좋아요 {likes}</span>
        </li>
      </ul>
      <div className="p-7">
        <div className="tiptap-content mb-10" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
        <PostLikesButton handleLikes={handleLikes} likes={likes} isLiked={isLiked} />
      </div>
    </>
  );
}
