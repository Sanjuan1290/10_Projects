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

export const getSingleBlog = async(req, res) => {
    const { id } = req.params

    const [blogs] = await db.query("SELECT * FROM blogs WHERE id = ?", [id])

    if(blogs.length === 0) return res.status(404).json({ message: 'No Blogs Found!'})
    
    const [categories] = await db.query("SELECT * FROM categories WHERE blogId = ?", [id])
    const [comments] = await db.query("SELECT * FROM comments WHERE blogId = ?", [id])
    

    res.status(200).json({ 
        message: `Successfully Get a blog ID: ${id}`,
        blog: blogs[0],
        categories,
        comments
    })
}

export const addBlog = async (req, res) => {
    const { userId, title, image, author, categories, description } = req.body

    if(!title || !image || categories?.length === 0 || !description) return res.status(400).json({ message: 'All Input fields are requred!'})

    const [result] = await db.query(
        `INSERT INTO blogs (userId, title, description, image, author, viewCount) 
        VALUES (?,?,?,?,?,?)`,
        [userId, title, description, image, author, 0 ]
    )

    for(const category of categories){
        await db.query(`
            INSERT INTO categories (blogId, category) 
            VALUES (?,?)`, 
            [result.insertId, category]
        )
    }

    res.status(200).json({ message: "Successfully Create a Blog"})

}