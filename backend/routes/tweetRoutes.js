// these are the routes related to tweets.
// It imports "authMiddleware.js" file for authentication.
import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()
import {
	createTweet,
	getUserTweets,
	getFollowingUsersTweets,
	likeTweet,
	unlikeTweet,
	retweet,
	unretweet,
	likedTweets,
	retweetedTweets,
	getTweetById,
	repliedTweets,
	bookmarkTweet,
	unbookmarkTweet,
	bookmarkedTweets,
	deleteTweet,
} from '../controlers/tweetControlers.js'

router
	.route('/')
	.post(protect, createTweet)								//create a tweet
	.get(protect, getFollowingUsersTweets)					// all the tweets of the users who the current user is following.

router.route('/usertweets/:id').get(getUserTweets)			// all the tweets of a specific user.
router.route('/replied/:id').get(repliedTweets)				// all the tweets that have been replied to a specific tweet.
router.route('/tweet/:id').get(protect, getTweetById)		//get a specific tweet by id.
router.route('/like').post(protect, likeTweet)				//like a tweet
router.route('/delete/:id').delete(protect, deleteTweet)	//delete user's tweet.
router.route('/unlike').post(protect, unlikeTweet)			//unlike a tweet.
router.route('/retweet').post(protect, retweet)				//retweet a tweet
router.route('/bookmark').post(protect, bookmarkTweet)	 	//bookmark a tweet
router.route('/unbookmark').post(protect, unbookmarkTweet)	//remove the bookmark from the tweet
router.route('/unretweet').post(protect, unretweet)			//unretweet a tweet.
router.route('/liked').post(protect, likedTweets)	 		//all the tweets that have been liked by the current user
router.route('/retweeted').post(protect, retweetedTweets)	//all the tweets that have been retweeted by the current user.
router.route('/bookmarked').get(protect, bookmarkedTweets)	//all the tweets that have been bookmarked by the current user.
export default router
