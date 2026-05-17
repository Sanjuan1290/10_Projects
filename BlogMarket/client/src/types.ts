

export type Comment = {
    id: string,
    userName: string,
    message: string,
    createdAt: string
}

export type Blog = {
    id: string,
    title: string,
    description: string,
    author: string,
    categories: string[],
    comments: Comment[],
    viewCount: number,
    createdAt: string,
    updatedAt: string,
}