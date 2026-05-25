

export type Comment = {
    id: string,
    blogId: number
    userName: string,
    message: string,
    createdAt: string
}

export type Category = {
    id: number,
    blogId: number,
    category: string
}

export type Blog = {
    id: number,
    title: string,
    description: string,
    image: string,
    author: string,
    viewCount: number,
    createdAt: string,
    updatedAt: string,
}

export type User = {
    id: number,
    username: string,
    email: string,
    createdAt: string
}
