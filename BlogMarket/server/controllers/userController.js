import { db } from "../db/connect"
import generateToken from '../utils/generateToken'
import bcrypt from 'bcrypt'

export const register = async(req, res) => {
    try{
        const { username, email, password } = req.body

        if(!username || !email || !password) return res.status(400).json({ message: "All fields are required!" })

        const [rows] = await db.query(`SELECT * FROM users WHERE email = ?`, [email])

        if(rows.length > 0) return res.status(400).json({ message: "User with that email already Exist" })

        const hashedPassword = await bcrypt.hash(password, 10)
        
        const [result] = await db.query(`
            INSERT INTO users (username, email, password) 
            VALUES(?, ?, ?)`, [username, email, hashedPassword]
        )

        console.log(result);

        const token = generateToken(result.id)

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // true in production with HTTPS
            sameSite: "lax",
            maxAge: 1 * 24 * 60 * 60 * 1000
        });

        res.status(201).json({
            message: "Successfully created an account.",
            user: {
                id: result.insertId,
                username,
                email
            }
        });
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Internal server error" })
    }
}

export const login = async(req, res) => {
    
}
