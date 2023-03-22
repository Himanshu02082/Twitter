//Here we have a collection of reducers that handle the actions related to user.
// Each reducer handles a specific action and returns the updated state.
//Each reducer uses a switch statement to handle the different cases for each action.
// The initial state for each reducer is also defined in the parameter list of the function,
// and the default case returns the current state.
import {
	USER_CREATE_FAIL,
	USER_CREATE_REQUEST,
	USER_CREATE_SUCCESS,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
	USER_UPDATE_FAIL,
	USER_UPDATE_REQUEST,
	USER_UPDATE_SUCCESS,
	SEARCH_USER_FAIL,
	SEARCH_USER_REQUEST,
	SEARCH_USER_SUCCESS,
	SEARCH_USER_RESET,
	USER_BY_ID_FAIL,
	USER_BY_ID_REQUEST,
	USER_BY_ID_SUCCESS,
	USER_FOLLOW_REQUEST,
	USER_FOLLOW_SUCCESS,
	USER_FOLLOW_FAIL,
	USER_INFO_FAIL,
	USER_INFO_REQUEST,
	USER_UNFOLLOW_FAIL,
	USER_UNFOLLOW_REQUEST,
	USER_UNFOLLOW_SUCCESS,
	USER_INFO_SUCCESS,
	USER_UPDATE_RESET,
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

//This reducer handles the state related to registering a new user, including loading, successful registration,
// and registration errors.
export const userRegisterReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_CREATE_REQUEST:
			return { loading: true }
		case USER_CREATE_SUCCESS:
			return { loading: false, register: true }
		case USER_CREATE_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

//This reducer manages the state related to user login, including loading, successful login, and login errors.
export const userLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return { loading: true }
		case USER_LOGIN_SUCCESS:
			return { loading: false, userId: action.payload }
		case USER_LOGIN_FAIL:
			return { loading: false, error: action.payload }
		case USER_LOGOUT:
			return {}
		default:
			return state
	}
}
 
//This reducer deals with the state related to user information, including loading, successful user information retrieval,
// and errors.
export const userLoginInfoReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_INFO_REQUEST:
			return { loading: true }
		case USER_INFO_SUCCESS:
			return { loading: false, userInfo: action.payload }
		case USER_INFO_FAIL:
			return { loading: false, error: action.payload }
		case USER_LOGOUT:
			return {}
		default:
			return state
	}
}

//This reducer  handles the state related to checking a username for availability, including loading, available usernames, and errors.
export const checkUsernameReducer = (state = {}, action) => {
	switch (action.type) {
		case CHECK_USERNAME_REQUEST:
			return { loading: true, username: null }
		case CHECK_USERNAME_SUCCESS:
			return { loading: false, username: action.payload }
		case CHECK_USERNAME_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

//This reducer manages the state related to updating a user's information, including loading, successful updates, and errors.
export const userUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_UPDATE_REQUEST:
			return { loading: true }
		case USER_UPDATE_SUCCESS:
			return { loading: false, updatedUser: action.payload }
		case USER_UPDATE_FAIL:
			return { loading: false, error: action.payload }
		case USER_UPDATE_RESET:
			return {}
		default:
			return state
	}
}

//This reducer deals with the state related to searching for other users, including loading, search results, and errors.
export const userSearchReducer = (state = {}, action) => {
	switch (action.type) {
		case SEARCH_USER_REQUEST:
			return { loading: true }
		case SEARCH_USER_SUCCESS:
			return { loading: false, searchResult: action.payload }
		case SEARCH_USER_FAIL:
			return { loading: false, error: action.payload }
		case SEARCH_USER_RESET:
			return {}
		default:
			return state
	}
}

//This reducer handles the state related to following another user, including loading, successful follow, and errors.
export const userFollowReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_FOLLOW_REQUEST:
			return { loading: true }
		case USER_FOLLOW_SUCCESS:
			return { loading: false, follow: true }
		case USER_FOLLOW_FAIL:
			return { loading: false, error: action.payload }

		default:
			return state
	}
}

//This reducer manages the state related to unfollowing another user, including loading, successful unfollow, and errors.
export const userUnfollowReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_UNFOLLOW_REQUEST:
			return { loading: true }
		case USER_UNFOLLOW_SUCCESS:
			return { loading: false, unfollow: true }
		case USER_UNFOLLOW_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

//This reducer deals with the state related to retrieving a specific user's information by ID, including loading,
// retrieved user data, and errors.
export const userByIdReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_BY_ID_REQUEST:
			return { loading: true }
		case USER_BY_ID_SUCCESS:
			return { loading: false, userData: action.payload }
		case USER_BY_ID_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

//This reducer handles the state related to retrieving a user's following list, including loading, the following list, and errors.
export const followingUsersReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_FOLLOWING_REQUEST:
			return { loading: true }
		case GET_FOLLOWING_SUCCESS:
			return { loading: false, followingUsers: action.payload }
		case GET_FOLLOWING_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

//This reducer manages the state related to retrieving a user's followers list, including loading, the followers list, and errors.
export const followersUsersReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_FOLLOWERS_REQUEST:
			return { loading: true }
		case GET_FOLLOWERS_SUCCESS:
			return { loading: false, followers: action.payload }
		case GET_FOLLOWERS_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

//This reducer deals with the state related to retrieving all users, including loading, retrieved user data, and errors.
export const getUsersReducer = (state = { getUsers: {} }, action) => {
	switch (action.type) {
		case GET_USERS_REQUEST:
			return { loading: true }
		case GET_USERS_SUCCESS:
			return {
				loading: false,
				users: action.payload,
			}
		case GET_USERS_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}
