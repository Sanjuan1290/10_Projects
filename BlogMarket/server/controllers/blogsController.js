import { db } from '../db/connect.js'

export const getAllBlogs = async (req, res) => {
    try{
        const [rows] = await db.query('SELECT * FROM blogs')
        console.log(`Retrieving All Blog post`)
        console.log(rows)

        res.status(200).json(rows)
    } catch(err) {
        console.log(err)

        res.status(500).json({
            message: "Server Error"
        })
    }
}