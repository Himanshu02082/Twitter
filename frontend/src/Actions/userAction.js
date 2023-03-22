// This component helps in  controlling various actions related to users.
import axios from 'axios'
import {
	USER_CREATE_FAIL,
	USER_CREATE_REQUEST,
	USER_CREATE_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_UPDATE_FAIL,
	USER_UPDATE_REQUEST,
	USER_UPDATE_SUCCESS,
	SEARCH_USER_FAIL,
	SEARCH_USER_REQUEST,
	SEARCH_USER_SUCCESS,
	USER_BY_ID_FAIL,
	USER_BY_ID_REQUEST,
	USER_BY_ID_SUCCESS,
	USER_FOLLOW_REQUEST,
	USER_FOLLOW_SUCCESS,
	USER_FOLLOW_FAIL,
	USER_INFO_FAIL,
	USER_INFO_REQUEST,
	USER_INFO_SUCCESS,
	USER_UNFOLLOW_FAIL,
	USER_UNFOLLOW_REQUEST,
	USER_UNFOLLOW_SUCCESS,
	CHECK_USERNAME_REQUEST,
	CHECK_USERNAME_SUCCESS,
	CHECK_USERNAME_FAIL,
	GET_FOLLOWING_REQUEST,
	GET_FOLLOWING_SUCCESS,
	GET_FOLLOWING_FAIL,
	GET_FOLLOWERS_REQUEST,
	GET_FOLLOWERS_SUCCESS,
	GET_FOLLOWERS_FAIL,
	GET_USERS_REQUEST,
	GET_USERS_SUCCESS,
	GET_USERS_FAIL,
} from '../Constants/userConstants.js'

// This function sends a POST request to the server to register a new user.
// It takes in the user's name, email, password, username, and DOB as parameters.
export const registerUser =
	(name, email, password, username, DOB) => async (dispatch) => {
		try {
			dispatch({
				type: USER_CREATE_REQUEST,
			})
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			}

			const { data } = await axios.post(
				'/api/users/signup',
				{ name, email, password, DOB, atTheRate: `@${username}` },
				config
			)
			data &&
				dispatch({
					type: USER_CREATE_SUCCESS,
					payload: data,
				})
		} catch (error) {
			dispatch({
				type: USER_CREATE_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		}
	}

//This function sends a POST request to the server to check whether a given username is available or not.
export const checkUserName = (username) => async (dispatch) => {
	try {
		dispatch({
			type: CHECK_USERNAME_REQUEST,
		})
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const { data } = await axios.post(
			'/api/users/username',
			{ atTheRate: `@${username}` },
			config
		)
		data &&
			dispatch({
				type: CHECK_USERNAME_SUCCESS,
				payload: data,
			})
	} catch (error) {
		dispatch({
			type: CHECK_USERNAME_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

//This function sends a POST request to the server to log in a user. It takes in the user's email and password as parameters.
export const loginUser = (email, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_LOGIN_REQUEST,
		})
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		const { data } = await axios.post(
			'/api/users/login',
			{ email, password },
			config
		)

		data &&
			dispatch({
				type: USER_LOGIN_SUCCESS,
				payload: data,
			})

		localStorage.setItem('userId', JSON.stringify(data))
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

//This function sends a POST request to the server to get information about a logged-in user. It takes in the user's ID as a parameter.
export const getLoginUserInfo = (id) => async (dispatch) => {
	try {
		dispatch({
			type: USER_INFO_REQUEST,
		})
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		const { data } = await axios.post('/api/users/info', { id }, config)

		data &&
			dispatch({
				type: USER_INFO_SUCCESS,
				payload: data,
			})
	} catch (error) {
		dispatch({
			type: USER_INFO_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

//This function logs out the current user by removing the user information from local storage.
export const logoutUser = () => async (dispatch) => {
	localStorage.removeItem('userInfo')
	dispatch({
		type: USER_LOGOUT,
	})
}

//This function sends a PUT request to the server to update a user's profile.
// It takes in the user's name, bio, website, cover photo, profile photo, and position as parameters.
export const updateUser =
	(name, bio, website, coverPhoto, profilePhoto, posi) =>
		async (dispatch, getState) => {
			try {
				dispatch({
					type: USER_UPDATE_REQUEST,
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
				const { data } = await axios.put(
					'/api/users/edit',
					{ name, bio, website, coverPhoto, profilePhoto, posi },
					config
				)

				data &&
					dispatch({
						type: USER_UPDATE_SUCCESS,
						payload: data,
					})
				dispatch({
					type: USER_LOGIN_SUCCESS,
					payload: data,
				})

				localStorage.setItem('userInfo', JSON.stringify(data))
			} catch (error) {
				dispatch({
					type: USER_UPDATE_FAIL,
					payload:
						error.response && error.response.data.message
							? error.response.data.message
							: error.message,
				})
			}
		}

// This function sends a GET request to the server to search for users based on a query.
export const searchUser = (query) => async (dispatch) => {
	try {
		dispatch({
			type: SEARCH_USER_REQUEST,
		})
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const { data } = await axios.post('/api/users/', { query }, config)

		dispatch({
			type: SEARCH_USER_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: SEARCH_USER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

//This function sends a GET request to the server to get information about a user based on their ID.
export const getUserById = (id) => async (dispatch) => {
	try {
		dispatch({
			type: USER_BY_ID_REQUEST,
		})

		const { data } = await axios.get(`/api/users/${id}`)

		dispatch({
			type: USER_BY_ID_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: USER_BY_ID_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

//This function sends a POST request to the server to follow a user. It takes in the user's ID as a parameter.
export const followUser = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_FOLLOW_REQUEST,
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

		await axios.post('/api/users/follow', { id }, config)

		dispatch({
			type: USER_FOLLOW_SUCCESS,
		})
		window.location.reload()

	} catch (error) {
		dispatch({
			type: USER_FOLLOW_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

//This function sends a POST request to the server to unfollow a user. It takes in the user's ID as a parameter.
export const unfollowUser = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_UNFOLLOW_REQUEST,
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

		await axios.post('/api/users/unfollow', { id }, config)

		dispatch({
			type: USER_UNFOLLOW_SUCCESS,
		})
		window.location.reload()

	} catch (error) {
		dispatch({
			type: USER_UNFOLLOW_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

//This function sends a GET request to the server to get a list of users that the current user is following.
export const getFollowingUsers = (id) => async (dispatch) => {
	try {
		dispatch({
			type: GET_FOLLOWING_REQUEST,
		})

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const { data } = await axios.post('/api/users/following', { id }, config)

		dispatch({
			type: GET_FOLLOWING_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: GET_FOLLOWING_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

// This function sends a GET request to the server to get a list of users that are following the current user.
export const getFollowersUsers = (id) => async (dispatch) => {
	try {
		dispatch({
			type: GET_FOLLOWERS_REQUEST,
		})

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const { data } = await axios.post('/api/users/followers', { id }, config)

		dispatch({
			type: GET_FOLLOWERS_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: GET_FOLLOWERS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

//This function sends a GET request to the server to get a list of all users.
export const getRandomUsers = (skip) => async (dispatch, getState) => {
	try {
		dispatch({
			type: GET_USERS_REQUEST,
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

		const { data } = await axios.post('/api/users/explore', { skip }, config)

		dispatch({
			type: GET_USERS_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: GET_USERS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
