import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { db } from './db/connect.js'

import validatingCookie from './utils/validatingCookie.js'

import blogsRouter from './routers/blogsRouter.js'
import userRouter from './routers/userRouter.js'


const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.get('/api/v1/validateCookies', validatingCookie)
app.use("/api/v1/blogs", blogsRouter)
app.use('/api/v1/user', userRouter)

const port = process.env.PORT || 3000

app.listen(port, async () => {
  console.log(`🚀 Server running on http://localhost:${port}`)

  try {
    const [rows] = await db.query('SELECT 1')
    console.log('🟢 Database connected successfully')
  } catch (err) {
    console.log('🔴 Database connection failed')
    console.log(err)
  }
})