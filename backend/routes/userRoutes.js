// Here all the routes related to the user are made 
// The routes are protected using the protect middleware function, which verifies that the user is logged in
//  and has a valid JSON Web Token.
import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import {
	createUser,
	loginUser,
	editUserProfile,
	searchUser,
	getUserById,
	followUser,
	getLoginUser,
	unfollowUser,
	checkUsername,
	getUserFollowing,
	getUserFollowers,
	getRandomUsers,
} from '../controlers/userControlers.js'
const router = express.Router()

router.route('/').post(searchUser)						//Search for a user
router.route('/following').post(getUserFollowing)	 	//Get a list of users the current user is following
router.route('/followers').post(getUserFollowers)		//Get a list of users following the current user
router.route('/:id').get(getUserById)					//Get a user's information by ID
router.route('/signup').post(createUser)	 			//Create a new user
router.route('/username').post(checkUsername)			//Check if a username is available
router.route('/login').post(loginUser)					//Authenticate and log in a user
router.route('/info').post(getLoginUser)				//Get information about the currently logged in user
router.route('/explore').post(protect, getRandomUsers)	//Get a list of random users
router.route('/edit').put(protect, editUserProfile)		//Edit the currently logged in user's profile
router.route('/follow').post(protect, followUser)		//Follow a user
router.route('/unfollow').post(protect, unfollowUser)	//Unfollow a user

export default router
