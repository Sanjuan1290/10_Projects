
import { addBlog, getAllBlogs, getSingleBlog } from "../controllers/blogsController.js";
import express from "express";

const blogsRouter = express.Router()

blogsRouter.get('/', getAllBlogs)
blogsRouter.get('/:id', getSingleBlog)
blogsRouter.post('/add', addBlog)

export default blogsRouter