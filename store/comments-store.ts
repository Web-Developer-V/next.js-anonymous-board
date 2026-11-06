import { create } from "zustand";

import { addCommentAction, createCommentReplyAction } from "@/app/actions/comments-action";

import type { Comments, AddComments } from "@/types/comments";
import type { Post } from "@/types/posts";

interface Props {
  // comment: Comments | null;
  comments: Comments[];
  createComment: (comment: AddComments, postId: Post["id"]) => Promise<Comments>;
  createCommentReplys: (comment: AddComments, commentId: string, postId: Post["id"]) => Promise<Comments>;
  // removeComment: (commentId: string, formData: FormData) => Promise<passwordValidateResult>;
}

export const useCommentStore = create<Props>((set) => ({
  // comment: null,
  comments: [],
  createComment: async (comment, postId) => {
    const createdComment = await addCommentAction(comment, postId);
    set((state) => ({
      comments: [...state.comments, createdComment],
    }));

    return createdComment;
  },
  createCommentReplys: async (comment, commentId, postId) => {
    const createdCommentReply = await createCommentReplyAction(comment, commentId, postId);

    set((state) => ({
      comments: [...state.comments, createdCommentReply],
    }));

    return createdCommentReply;
  },
  // removeComment: async (commentId, formData) => {
  //   const result = await deleteCommentAction(commentId, formData);

  //   if (result.ok) {
  //     set((state) => ({
  //       comments: state.comments.filter((comment) => comment.id === commentId),
  //     }));
  //   }

  //   return result;
  // },
}));
