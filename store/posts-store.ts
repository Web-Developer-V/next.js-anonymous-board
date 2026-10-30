import { createPosts, selectPost, selectPosts } from "@/app/actions/posts-action";
import { CreatePost, Post } from "@/types/posts";
import { create } from "zustand";

interface ListStore {
  list: Post | null;
  lists: Post[];
  loadList: (id: string) => Promise<void>;
  loadLists: () => Promise<void>;
  addLists: (list: CreatePost) => Promise<void>;
}

export const usePostsStore = create<ListStore>((set) => ({
  list: null,
  lists: [],

  loadList: async (id) => {
    const post = await selectPost(id);
    set({ list: post });
  },

  loadLists: async () => {
    const posts = await selectPosts();
    set({ lists: posts });
  },

  addLists: async (list) => {
    const createdPost = await createPosts(list);
    set((state) => ({
      lists: [...state.lists, createdPost],
    }));
  },
}));
