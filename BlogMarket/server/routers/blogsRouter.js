
import { addBlog, getAllBlogs, getSingleBlog, deleteBlog } from "../controllers/blogsController.js";
import express from "express";

const blogsRouter = express.Router()

blogsRouter.get('/', getAllBlogs)
blogsRouter.get('/:id', getSingleBlog)
blogsRouter.post('/add', addBlog)
blogsRouter.delete('/delete/:id', deleteBlog)

export default blogsRouter