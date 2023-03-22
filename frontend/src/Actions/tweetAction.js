// This component helps in  controlling various actions related to tweets.
import axios from 'axios'
import {
	TWEET_CREATE_FAIL,
	TWEET_CREATE_REQUEST,
	TWEET_CREATE_SUCCESS,
	USER_TWEETS_FAIL,
	USER_TWEETS_REQUEST,
	USER_TWEETS_SUCCESS,
	FOLLOWING_TWEETS_FAIL,
	FOLLOWING_TWEETS_REQUEST,
	FOLLOWING_TWEETS_SUCCESS,
	TWEET_LIKE_REQUEST,
	TWEET_LIKE_SUCCESS,
	TWEET_LIKE_FAIL,
	TWEET_UNLIKE_FAIL,
	TWEET_UNLIKE_REQUEST,
	TWEET_UNLIKE_SUCCESS,
	TWEET_RETWEET_REQUEST,
	TWEET_RETWEET_FAIL,
	TWEET_RETWEET_SUCCESS,
	TWEET_UNRETWEET_FAIL,
	TWEET_UNRETWEET_REQUEST,
	TWEET_UNRETWEET_SUCCESS,
	LIKED_TWEETS_FAIL,
	LIKED_TWEETS_REQUEST,
	LIKED_TWEETS_SUCCESS,
	RETWEETED_TWEETS_FAIL,
	RETWEETED_TWEETS_REQUEST,
	RETWEETED_TWEETS_SUCCESS,
	GET_TWEET_BY_ID_REQUEST,
	GET_TWEET_BY_ID_SUCCESS,
	GET_TWEET_BY_ID_FAIL,
	GET_REPLIED_FAIL,
	GET_REPLIED_REQUEST,
	GET_REPLIED_SUCCESS,
	TWEET_BOOKMARK_REQUEST,
	TWEET_BOOKMARK_SUCCESS,
	TWEET_BOOKMARK_FAIL,
	TWEET_UNBOOKMARK_REQUEST,
	TWEET_UNBOOKMARK_SUCCESS,
	TWEET_UNBOOKMARK_FAIL,
	GET_BOOKMARKED_REQUEST,
	GET_BOOKMARKED_SUCCESS,
	GET_BOOKMARKED_FAIL,
	TWEET_DELETE_FAIL,
	TWEET_DELETE_SUCCESS,
	TWEET_DELETE_REQUEST,
} from '../Constants/tweetConstants.js'

// The tweetCreate function is an asynchronous action that creates a new tweet.
// It dispatches a TWEET_CREATE_REQUEST action, gets the user's authentication token from the application state using getState(),
// and sends a POST request to the server with the tweet information and authorization header.
export const tweetCreate = (tweetInfo) => async (dispatch, getState) => {
	try {
		dispatch({
			type: TWEET_CREATE_REQUEST,
		})
		const {
			userLogin: { userId },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userId.token}`,
			},
		}
		await axios.post('/api/tweet', tweetInfo, config)

		dispatch({
			type: TWEET_CREATE_SUCCESS,
		})
	} catch (error) {
		dispatch({
			type: TWEET_CREATE_FAIL,
			payload: error,
		})
	}
}

// Fetches tweets of a specific user using their id and dispatches an action with the data if the request was successful,
// otherwise dispatches an action with the error message.
export const tweetsOfUser = (_id) => async (dispatch) => {
	try {
		dispatch({
			type: USER_TWEETS_REQUEST,
		})

		const { data } = await axios.get(`/api/tweet/usertweets/${_id}`)
		data &&
			dispatch({
				type: USER_TWEETS_SUCCESS,
				payload: data,
			})
	} catch (error) {
		dispatch({
			type: USER_TWEETS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

// Fetches tweets of users that the authenticated user follows and dispatches an action with the data if the request was successful,
// otherwise dispatches an action with the error message.
export const followingTweets = (_id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: FOLLOWING_TWEETS_REQUEST,
		})
		const {
			userLogin: { userId },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userId.token}`,
			},
		}

		const { data } = await axios.get(`/api/tweet`, config)
		data &&
			dispatch({
				type: FOLLOWING_TWEETS_SUCCESS,
				payload: data,
			})
	} catch (error) {
		dispatch({
			type: FOLLOWING_TWEETS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

// Fetches tweets that are replies to a specific tweet by its id and dispatches an action with the data if the request was successful,
// otherwise dispatches an action with the error message. The request is authorized using the token of the authenticated user.
export const getRepliedTweets = (_id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: GET_REPLIED_REQUEST,
		})
		const {
			userLogin: { userId },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userId.token}`,
			},
		}

		const { data } = await axios.get(`/api/tweet/replied/${_id}`, config)
		data &&
			dispatch({
				type: GET_REPLIED_SUCCESS,
				payload: data,
			})
	} catch (error) {
		dispatch({
			type: GET_REPLIED_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

// Sends a POST request to the API endpoint to like a tweet with the specified ID.
// requiring authentication, so it retrieves the user ID from the application state and
// adds the user's token to the request headers. Dispatches actions to update the application state.
export const likeTweet = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: TWEET_LIKE_REQUEST,
		})
		const {
			userLogin: { userId },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userId.token}`,
			},
		}

		await axios.post('/api/tweet/like', { id: id }, config)

		dispatch({
			type: TWEET_LIKE_SUCCESS,
		})
	} catch (error) {
		dispatch({
			type: TWEET_LIKE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

// Sends a POST request to the API endpoint to unlike a tweet with the specified ID.
// requiring authentication, so it retrieves the user ID from the application state
// and adds the user's token to the request headers. Dispatches actions to update the application state .
export const unlikeTweet = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: TWEET_UNLIKE_REQUEST,
		})
		const {
			userLogin: { userId },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userId.token}`,
			},
		}

		await axios.post('/api/tweet/unlike', { id: id }, config)

		dispatch({
			type: TWEET_UNLIKE_SUCCESS,
		})
	} catch (error) {
		dispatch({
			type: TWEET_UNLIKE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

// Sends a POST request to the API endpoint to retweet a tweet with the specified ID.
// requiring authentication, so it retrieves the user ID from the application state
// and adds the user's token to the request headers. Dispatches actions to update the application state.
export const retweet = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: TWEET_RETWEET_REQUEST,
		})
		const {
			userLogin: { userId },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userId.token}`,
			},
		}

		await axios.post('/api/tweet/retweet', { id: id }, config)

		dispatch({
			type: TWEET_RETWEET_SUCCESS,
		})
	} catch (error) {
		dispatch({
			type: TWEET_RETWEET_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

//this untweet function takes an id parameter that represents the ID of the tweet to perform the action on.
// The functions are asynchronous and use the await keyword to wait for the server to respond before dispatching a success or
// fail action.It also  use the state function provided by Redux to access the current state which is user's ID and token,
// in order to authenticate the user with the server.
export const unretweet = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: TWEET_UNRETWEET_REQUEST,
		})
		const {
			userLogin: { userId },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userId.token}`,
			},
		}

		await axios.post('/api/tweet/unretweet', { id: id }, config)

		dispatch({
			type: TWEET_UNRETWEET_SUCCESS,
		})
	} catch (error) {
		dispatch({
			type: TWEET_UNRETWEET_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

//this bookmark function takes an id parameter that represents the ID of the tweet to perform the action on.
// The functions are asynchronous and use the await keyword to wait for the server to respond before dispatching a success or
// fail action.It also  use the state function provided by Redux to access the current state which is user's ID and token,
// in order to authenticate the user with the server.
export const bookmark = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: TWEET_BOOKMARK_REQUEST,
		})
		const {
			userLogin: { userId },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userId.token}`,
			},
		}

		await axios.post('/api/tweet/bookmark', { id }, config)

		dispatch({
			type: TWEET_BOOKMARK_SUCCESS,
		})
	} catch (error) {
		dispatch({
			type: TWEET_BOOKMARK_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

//this unbookmark function takes an id parameter that represents the ID of the tweet to perform the action on.
// The functions are asynchronous and use the await keyword to wait for the server to respond before dispatching a success or
// fail action.It also  use the state function provided by Redux to access the current state which is user's ID and token,
// in order to authenticate the user with the server.
export const unbookmark = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: TWEET_UNBOOKMARK_REQUEST,
		})
		const {
			userLogin: { userId },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userId.token}`,
			},
		}

		await axios.post('/api/tweet/unbookmark', { id }, config)

		dispatch({
			type: TWEET_UNBOOKMARK_SUCCESS,
		})
	} catch (error) {
		dispatch({
			type: TWEET_UNBOOKMARK_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

// This function sends a request to the server to get all the tweets that the user has liked.
// It takes in a user id as a parameter and dispatches an action to request the liked tweets.
// on succesul request, it dispatches another action to set the liked tweets in the store.
// on error, it dispatches an error message.
export const getLikedTweets = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: LIKED_TWEETS_REQUEST,
		})
		const {
			userLogin: { userId },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userId.token}`,
			},
		}

		const { data } = await axios.post('/api/tweet/liked', { id: id }, config)

		dispatch({
			type: LIKED_TWEETS_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: LIKED_TWEETS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

//This function sends a request to the server to get all the tweets that the user has retweeted.
// It takes in a user id as a parameter and dispatches an action to request the retweeted tweets.
// on succesful request, it dispatches another action to set the retweeted tweets in the store.
// on error, it dispatches an error message.
export const getRetweetedTweets = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: RETWEETED_TWEETS_REQUEST,
		})
		const {
			userLogin: { userId },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userId.token}`,
			},
		}

		const { data } = await axios.post(
			'/api/tweet/retweeted',
			{ id: id },
			config
		)

		dispatch({
			type: RETWEETED_TWEETS_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: RETWEETED_TWEETS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

//This function sends a request to the server to get all the tweets that the user has bookmarked.
// It does not take any parameters and dispatches an action to request the bookmarked tweets.
// If the request is successful, it dispatches another action to set the bookmarked tweets in the store.
// on error, it dispatches an  error message.
export const getBookmarkedTweets = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: GET_BOOKMARKED_REQUEST,
		})
		const {
			userLogin: { userId },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userId.token}`,
			},
		}

		const { data } = await axios.get('/api/tweet/bookmarked', config)

		dispatch({
			type: GET_BOOKMARKED_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: GET_BOOKMARKED_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

// this function takes an id argument and returns a function that accepts dispatch and getState arguments.
// it Dispatches a GET_TWEET_BY_ID_REQUEST action and retrieves userId from the state using getState.
// After Setting config with the userId token. It makes a GET request to /api/tweet/tweet/${id} with the config options.
// Dispatching a GET_TWEET_BY_ID_SUCCESS action with the returned data payload if successful.
// Dispatches a GET_TWEET_BY_ID_FAIL action with an error payload if there's an error.
export const getTweetById = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: GET_TWEET_BY_ID_REQUEST,
		})
		const {
			userLogin: { userId },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userId.token}`,
			},
		}

		const { data } = await axios.get(`/api/tweet/tweet/${id}`, config)

		dispatch({
			type: GET_TWEET_BY_ID_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: GET_TWEET_BY_ID_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

// This function takes an id argument and returns a function that accepts dispatch and getState arguments.
// It dispatches a TWEET_DELETE_REQUEST action and retrieves userId from the state using getState.
// After setting config with the userId token. It makes a DELETE request to /api/tweet/delete/${id} with the config options.
// Dispatcheing a TWEET_DELETE_SUCCESS action if successful.
// Dispatcheing a TWEET_DELETE_FAIL action with an error payload if there's an error.
export const tweetDelete = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: TWEET_DELETE_REQUEST,
		})
		const {
			userLogin: { userId },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userId.token}`,
			},
		}

		await axios.delete(`/api/tweet/delete/${id}`, config)

		dispatch({
			type: TWEET_DELETE_SUCCESS,
		})
	} catch (error) {
		dispatch({
			type: TWEET_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
