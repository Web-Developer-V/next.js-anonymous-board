import { createPosts, selectPosts } from "@/app/actions/posts-action";
import { CreatePost, Post } from "@/types/posts";
import { create } from "zustand";

interface ListStore {
  lists: Post[];
  loadLists: () => Promise<void>;
  addLists: (list: CreatePost) => Promise<void>;
}

export const useListStore = create<ListStore>((set) => ({
  lists: [],
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
