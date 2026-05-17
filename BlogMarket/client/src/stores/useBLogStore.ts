
import { create } from "zustand";

type Comment = {
    id: string,
    userName: string,
    message: string,
    createdAt: string
}

type Blog = {
    id: string,
    title: string,
    description: string,
    author: string,
    categories: string[],
    comments: Comment[]
    createdAt: string,
    updatedAt: string,
}

type BlogStore = {
    blogs: Blog[],
    searchInput: string,
    setSearchInput: (searchInput : string) => void
}

export const useBlogStore = create<BlogStore>((set) => ({
    blogs: [],
    searchInput: '',
    setSearchInput: (searchInput) => set(() => ({
        searchInput
    }))
}))