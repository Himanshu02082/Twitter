import connectDB from './config/connectDB.js'
import User from './models/UserModel.js'

const userdata = {
	name: 'Himanshu',
	email: 'himanshu@test.com',
	atTheRate: '@himanshu',
	DOB: '26-09-2002',
	password: '12345678',
	isAdmin: true,
}

connectDB()

const importData = async () => {
	try {
		User.deleteMany()
		const createdUser = await User.create(userdata)
		console.log('Data Imported')
		process.exit()
	} catch (error) {
		console.log(error)
		process.exit(1)
	}
}

importData()
