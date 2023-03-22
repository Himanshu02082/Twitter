import jwt from 'jsonwebtoken'

// jwt.sign method takes three arguments:
// The first argument is an object that contains the data to be encoded into the token.
// The second argument is the secret key used to encode the token, which is stored in the JWT_SECRET environment variable.
// The third argument is an object that defines various options for the JWT, such as the expiration time (expiresIn), which is set to 30 days.
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

export default generateToken
