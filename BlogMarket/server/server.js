import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import { db } from './db/connect.js'

import blogsRouter from './routers/blogsRouter.js'


const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1", blogsRouter)
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