
import { addBlog, getAllBlogs, getSingleBlog, deleteBlog, updateBlog, getUserBlogs } from "../controllers/blogsController.js";
import express from "express";

const blogsRouter = express.Router()

blogsRouter.get('/', getAllBlogs)
blogsRouter.get('/:id', getSingleBlog)
blogsRouter.post('/add', addBlog)
blogsRouter.delete('/delete/:id', deleteBlog)
blogsRouter.patch('/update/:id', updateBlog)
blogsRouter.get('/user/:id', getUserBlogs)

export default blogsRouter