//This is a utility function for connecting to  MongoDB database using the Mongoose library, and it includes error handling to handle any issues that might arise during the connection process.
import mongoose from 'mongoose'

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(
			'mongodb://localhost:27017/crocodile',
			{
				useUnifiedTopology: true,
				useNewUrlParser: true,
				useCreateIndex: true,
			}
		)
		console.log(`Db Connected ${conn.connection.host}`)
	} catch (error) {
		console.error(`Error : ${error.message}`)
		process.exit(1)
	}
}

export default connectDB
