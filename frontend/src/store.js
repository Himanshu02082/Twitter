// Here we  imports createStore, combineReducers, and applyMiddleware from the redux library,
// as well as thunk from the redux-thunk middleware library and composeWithDevTools from the redux-devtools-extension library.
// importing all the  reducers from  files in the ./Reducers directory.
// These reducers will define how the state of the application changes in response to various actions.
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
	userRegisterReducer,
	userLoginReducer,
	userUpdateReducer,
	userSearchReducer,
	userByIdReducer,
	userFollowReducer,
	userLoginInfoReducer,
	userUnfollowReducer,
	checkUsernameReducer,
	followingUsersReducer,
	followersUsersReducer,
	getUsersReducer,
} from './Reducers/userReducer.js'
import {
	tweetCreateReducer,
	userTweetsReducer,
	tweetFollowingReducer,
	tweetLikeReducer,
	tweetUnlikeReducer,
	tweetRetweetReducer,
	tweetUnretweetReducer,
	tweetLikedReducer,
	tweetRetweetedReducer,
	tweetByIdReducer,
	repliedTweetsReducer,
	bookmarkTweetReducer,
	unbookmarkTweetReducer,
	bookmarkedTweetsReducer,
	deleteTweetReducer,
} from './Reducers/tweetReducer.js'
// The combineReducers function is used to combine all the reducers into a single reducer that can be passed to the createStore function.
// The resulting reducer is stored in the reducer constant.
const reducer = combineReducers({
	userLoginInfo: userLoginInfoReducer,
	userRegister: userRegisterReducer,
	userLogin: userLoginReducer,
	userTweets: userTweetsReducer,
	userUpdate: userUpdateReducer,
	userSearch: userSearchReducer,
	userById: userByIdReducer,
	getUsers: getUsersReducer,
	userFollow: userFollowReducer,
	followingUsers: followingUsersReducer,
	followersUsers: followersUsersReducer,
	checkUsername: checkUsernameReducer,
	userUnfollow: userUnfollowReducer,
	tweetCreate: tweetCreateReducer,
	tweetFollowing: tweetFollowingReducer,
	tweetLike: tweetLikeReducer,
	tweetUnlike: tweetUnlikeReducer,
	tweetRetweet: tweetRetweetReducer,
	tweetUnretweet: tweetUnretweetReducer,
	tweetLiked: tweetLikedReducer,
	tweetRetweeted: tweetRetweetedReducer,
	tweetById: tweetByIdReducer,
	repliedTweets: repliedTweetsReducer,
	bookmarkTweet: bookmarkTweetReducer,
	unbookmarkTweet: unbookmarkTweetReducer,
	bookmarkedTweets: bookmarkedTweetsReducer,
	deleteTweet: deleteTweetReducer,
})

const userInfoFromStorage = localStorage.getItem('userId')
	? JSON.parse(localStorage.getItem('userId'))
	: null
// The initialState constant defines an object with a userLogin property that initially contains an empty userId.
// This property will be used to store information about the currently logged in user.
const initialState = {
	userLogin: { userId: userInfoFromStorage },
}
// The middleware constant defines an array that contains the thunk middleware.
const middleware = [thunk]
// Finally, the createStore function is called with the reducer, initialState, and middleware arguments.
// The resulting store is stored in the store constant and is exported as the default export of the module.
const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)
export default store
