
import { getAllBlogs } from "../controllers/blogsController.js";
import express from "express";

const blogsRouter = express.Router()

blogsRouter.get('/getAllBlogs', getAllBlogs)

export default blogsRouter