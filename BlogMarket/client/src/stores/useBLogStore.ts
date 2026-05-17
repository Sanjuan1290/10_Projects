
import { create } from "zustand";


type BlogStore = {
    searchInput: string,
    setSearchInput: (searchInput : string) => void
}

export const useBlogStore = create<BlogStore>((set) => ({
    searchInput: '',
    setSearchInput: (searchInput) => set(() => ({
        searchInput
    })),
}))