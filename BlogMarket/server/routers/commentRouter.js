
import express from 'express'

const router = express.Router()
import { addComment, deleteComment } from '../controllers/commentController.js'

router.post('/add', addComment)
router.delete('/delete', deleteComment)

export default router
