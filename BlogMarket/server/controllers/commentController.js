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