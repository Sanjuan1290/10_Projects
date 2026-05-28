import { db } from '../db/connect.js'

export const getAllBlogs = async (req, res) => {
    try{
        const [rows] = await db.query('SELECT * FROM blogs')
        console.log(`RETREIVING ALL BLOG POST...`)
        console.log(rows)

        res.status(200).json(rows)
    } catch(err) {
        console.log(err)

        res.status(500).json({
            message: "Server Error while getting all blogs"
        })
    }
}

export const getSingleBlog = async(req, res) => {
    try{
        const { id } = req.params

        const [blogs] = await db.query("SELECT * FROM blogs WHERE id = ?", [id])

        if(blogs.length === 0) return res.status(404).json({ message: 'No Blogs Found!'})

        console.log(`RETREIVING BLOG ${id}`);
        
        const [categories] = await db.query("SELECT * FROM categories WHERE blogId = ?", [id])
        const [comments] = await db.query("SELECT * FROM comments WHERE blogId = ?", [id])
        

        res.status(200).json({ 
            message: `Successfully Get a blog ID: ${id}`,
            blog: blogs[0],
            categories,
            comments
        })
    }catch(err){
        res.status(500).json({ message: `Server Error happen while retrieving blog ${id}`})
    }
}

export const addBlog = async (req, res) => {
    try{
        const { userId, title, image, author, categories, description } = req.body

        if(!title || !image || categories?.length === 0 || !description) return res.status(400).json({ message: 'All Input fields are requred!'})

        console.log('ADDING BLOG...');
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
    }catch(err){
        res.status(500).json({ message: 'Server Error happen while adding blog'})
    }

}

export const deleteBlog = async (req, res) => {
    try{
        const { id } = req.params

        const [result] = await db.query(`DELETE FROM blogs WHERE id = ?`, [id])

        console.log(`DELETING BLOG ...`);

        res.status(200).json({ message: `Successfully delete blog ${id}`})
    }catch(err){
        res.status(500).json({ message: 'Server Error happen while deleting blog'})
    }
}

export const updateBlog = async (req, res) => {
    try{
        const { id } = req.params

        const {
            title,
            description,
            categories,
            image
        } = req.body

        await db.query(`
            UPDATE blogs
            SET title = ?, description = ?, image = ?
            WHERE id = ?
        `, [title, description, image, id])

        await db.query(`
            DELETE FROM categories
            WHERE blogId = ?
        `, [id])

        for(const category of categories){
            await db.query(`
                INSERT INTO categories (blogId, category)
                VALUES (?, ?)
            `, [id, category])
        }

        res.status(200).json({
            message: "Blog updated successfully"
        })

    } catch(err){
        console.log(err)

        res.status(500).json({
            message: "Server error while updating blog"
        })
    }
}

export const getUserBlogs = async (req, res) => {
    const { id: userId } = req.params
    try{
        const [rows] = await db.query('SELECT * FROM blogs WHERE userId = ?', [userId])
        console.log(`RETREIVING ALL BLOG POST FROM A SPECIFIC USER...`)
        console.log(rows)

        res.status(200).json(rows)
    } catch(err) {
        console.log(err)

        res.status(500).json({
            message: "Server Error while getting all blogs"
        })
    }
}