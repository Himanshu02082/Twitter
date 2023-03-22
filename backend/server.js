// This is the server that creates an express app, connects it to a database using a custom connectDB function,
//  and defines API routes for users, tweets, and file uploads.
// It also sets up a static folder for serving uploaded files and handles errors using custom middleware functions.
//  the code checks if the environment is set to production and serves a built frontend app if it is.
//  also  it starts the server on the specified port and logs a message indicating that the server is running.
import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import connectDB from './config/connectDB.js'
import userRoutes from './routes/userRoutes.js'
import tweetRoutes from './routes/tweetRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()
connectDB()
const app = express()
app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/tweet', tweetRoutes)
app.use('/api/upload', uploadRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.ENVIRONMENT === 'production') {
	app.use(express.static(path.join(__dirname, '/frontend/build')))

	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
	)
}

// custom error Handeling
app.use(notFound)
app.use(errorHandler)

app.listen(
	process.env.PORT,
	console.log(`server Running on PORT ${process.env.PORT}`)
)
