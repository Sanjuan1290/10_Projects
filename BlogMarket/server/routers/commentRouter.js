
import express from 'express'

const router = express.Router()
import { addComment } from '../controllers/commentController.js'

router.post('/add', addComment)

export default router
