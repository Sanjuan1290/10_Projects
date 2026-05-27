import { db } from "../db/connect.js"
import generateToken from "../utils/generateToken.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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

        const token = generateToken(result.insertId)

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
    try{
        const { email, password } = req.body

        if(!email || !password) return res.status(400).json({ message: "All fields are required!" })

        const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email])

        if (rows.length === 0) {
        return res.status(400).json({
            message: "Email does not Exists."
        });
        }
        
        const user = rows[0]
        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if (!isPasswordMatch) {
        return res.status(400).json({
            message: "Wrong Password. Try again."
        });
        }

        const token = generateToken(user.id)

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // true in production with HTTPS
            sameSite: "lax",
            maxAge: 1 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        })
    }catch(err){
        console.log(err);

        res.status(500).json({ message: "Internal Server Error" })
    }
    
}

export const logout = async(req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    })

    res.status(200).json({ message: "Logged Out"})
}