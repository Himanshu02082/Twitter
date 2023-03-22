// This have two middleware functions: notFound and errorHandler.
// notFound function is used as a middleware for handling requests for routes that are not defined. It creates a new Error object with a message that includes the original requested URL, sets the response status code to 404 and passes the error to the next middleware function in the chain.
// errorHandler function is used to handle errors that occur in the application. If the response status code is 200, it changes it to 500. It then sends a JSON response containing the error message and stack trace.
const notFound = (req, res, next) => {
	const error = new Error(`Not Found - ${req.originalUrl}`)
	res.status(404)
	next(error)
}

const errorHandler = (err, req, res, next) => {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode
	res.status(statusCode)
	res.json({
		message: err.message,
		stack: process.env.NODE_ENV == 'production' ? null : err.stack,
	})
}
export { notFound, errorHandler }
