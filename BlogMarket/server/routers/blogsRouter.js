
import { getAllBlogs, getSingleBlog } from "../controllers/blogsController.js";
import express from "express";

const blogsRouter = express.Router()

blogsRouter.get('/', getAllBlogs)
blogsRouter.get('/:id', getSingleBlog)

export default blogsRouter