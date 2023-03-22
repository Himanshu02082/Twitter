// here we exports a router instance from Express and defines a multer middleware to handle file uploads.
import express from 'express'
import multer from 'multer'
import path from 'path'

const router = express.Router()
// we create  a diskStorage object with a callback function that specifies the directory where files will be stored and
// a filename for the uploaded file that is unique and includes the original file extension.
const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, 'uploads/')
	},
	filename(req, file, cb) {
		cb(
			null,
			`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
		)
	},
})
// It then defines a checkFileType() function to verify that the file type is an image (jpg, jpeg, png, gif, jfif).
// The upload object is created with the previously defined diskStorage object and the fileFilter option, which ensures that only image files are uploaded.
function checkFileType(file, cb) {
	const filetypes = /jpg|jpeg|png|gif|jfif/
	const extname = filetypes.test(
		path.extname(file.originalname).toLocaleLowerCase()
	)
	const mimetype = filetypes.test(file.mimetype)

	if (extname && mimetype) {
		return cb(null, true)
	} else {
		cb('Images Only')
	}
}

const upload = multer({
	storage,
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb)
	},
})
//here we exports the router while defineing  a single POST route that accepts an image upload using the upload object,
//and returns the path where the file is stored on the server.
router.post('/', upload.single('image'), (req, res) => {
	res.send(`/${req.file.path}`)
})

export default router
