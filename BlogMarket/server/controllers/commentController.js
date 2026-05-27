import { db } from "../db/connect.js";


export const addComment = async (req, res) => {
    const { blogId, userId, commentMessage } = req.body

    if(!userId) return res.status(401).json({ message: "You're not authorize or logged in to be adding comment.🙈" })

    const [userName] = await db.query("SELECT username FROM users WHERE id = ?", [userId])

    const [rows] = await db.query(`
        INSERT INTO comments (blogId, userId, userName, message) 
        VALUES (?, ?, ?, ?)`, [blogId, userId, userName[0].username, commentMessage])

    res.status(201).json({ message: `Successfully added a comment in Blog ${blogId}`})
}

export const deleteComment = async(req, res) => {
    const { commentId } = req.body

    if(!commentId) return res.status(400).json({ message: "CommendId is Missing. Which should not happen? did you something? 🙊"})

    const [rows] = await db.query("DELETE FROM comments WHERE id = ?", [commentId])

    res.status(200).json({ message: "Successfully deleted a comment" })
}