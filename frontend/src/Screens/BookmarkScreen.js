//This component renders a user's bookmarked tweets.
// It Imports required dependencies, components, actions, and selectors.
// Gets the necessary data from the Redux store using useSelector hook.
// Defines dispatch function using useDispatch hook.
// Defines a function to load the bookmarked tweets and user info when the component mounts.
// Calls the useEffect hook with the function defined above as the callback function.
// Defines variables that store the data received from the Redux store.
// Checks if there are bookmarked tweets and their corresponding user data in the bTweets variable, and
// if there are, assigns the user data to the userdata property of each tweet object.
// Returns a JSX that displays the bookmarked tweets and other components such as Header, Sidenav, TweetModal, MobileNav, Loader, and FullScreenLoader.
// The rendered UI will vary based on the state of the loading variable.
import React, { useEffect } from 'react'
import Sidenav from '../Components/Sidenav'
import News from '../Components/News'
import { Link } from 'react-router-dom'
import MobileNav from '../Components/MobileNav'
import TweetModal from '../Components/TweetModal'
import Loader from '../Components/Loader.js'
import FullScreenLoader from '../Components/FullScreenLoader'
import Header from '../Components/Header'
import { USER_LOGOUT } from '../Constants/userConstants.js'
import { useSelector, useDispatch } from 'react-redux'
import {
	likeTweet,
	unlikeTweet,
	retweet,
	unretweet,
	bookmark,
	unbookmark,
	getBookmarkedTweets,
} from '../Actions/tweetAction.js'
import { getLoginUserInfo } from '../Actions/userAction.js'

const BookmarkScreen = ({ history }) => {
	const dispatch = useDispatch()

	const userLogin = useSelector((state) => state.userLogin)
	const { userId } = userLogin

	const userLoginInfo = useSelector((state) => state.userLoginInfo)
	const { userInfo, loading: homeLoading } = userLoginInfo

	const bookmarkedTweets = useSelector((state) => state.bookmarkedTweets)
	const { loading, bookmarkedTweets: bTweets } = bookmarkedTweets

	const tweetLike = useSelector((state) => state.tweetLike)
	const { liked } = tweetLike
	const tweetUnlike = useSelector((state) => state.tweetUnlike)
	const { unliked } = tweetUnlike

	const tweetRetweet = useSelector((state) => state.tweetRetweet)
	const { retweet: ret } = tweetRetweet
	const tweetUnretweet = useSelector((state) => state.tweetUnretweet)
	const { unretweet: unret } = tweetUnretweet

	const unbookmarkTweet = useSelector((state) => state.unbookmarkTweet)
	const { unbookmarkedTweet: unbTweet } = unbookmarkTweet

	useEffect(() => {
		if (!userId) {
			history.push('/login')
		} else {
			if (!userInfo) {
				dispatch(getLoginUserInfo(userId._id))
			}
			dispatch(getBookmarkedTweets())
		}
	}, [
		userId,
		history,
		dispatch,
		userInfo,
		liked,
		unliked,
		ret,
		unret,
		unbTweet,
	])

	if (bTweets) {
		for (let i = 0; i < bTweets.tweets.length; i++) {
			for (let j = 0; j < bTweets.users.length; j++) {
				if (bTweets.tweets[i].user === bTweets.users[j]._id) {
					bTweets.tweets[i].userdata = bTweets.users[j]
				}
			}
		}
	}

	return (
		<>
			{' '}
			<Header title='Bookmarks' />
			{homeLoading && <FullScreenLoader />}
			<div className='container '>
				{/* modal  */}

				{userInfo && <TweetModal userInfo={userInfo} />}

				{/* modal ends */}
				{userInfo && (
					<div className='row '>
						<div className='d-none d-md-block col-md-2 col-lg-3 p-md-2 navigation '>
							<Sidenav className='roboto' userInfo={userInfo} />

							<div className='col-12'>
								<div className='collapse mt-3' id='collapseExample'>
									<button
										className='btn btn-danger d-md-none d-lg-block  w-50 d-block mx-auto'
										onClick={() => {
											localStorage.removeItem('userInfo')
											dispatch({
												type: USER_LOGOUT,
											})
										}}>
										Logout
									</button>
									<div className='text-center  d-md-block d-lg-none'>
										<i
											className='fas fa-power-off mx-auto h5 text-light'
											onClick={() => {
												localStorage.removeItem('userInfo')
												dispatch({
													type: USER_LOGOUT,
												})
											}}></i>
									</div>
								</div>
							</div>
						</div>

						<div
							className='col-12 col-md-10 col-lg-6 p-0 tweets-section '
							style={{ height: '100vh', overflowY: 'scroll' }}>
							{/* input tweet */}
							<div className='d-md-none'>
								{' '}
								<MobileNav userInfo={userInfo} />
							</div>

							<div className=' p-3 home d-none d-md-block'>
								<h5
									className='roboto font-weight-bold text-light'
									style={{ fontSize: '20px' }}>
									Bookmarks
								</h5>
							</div>

							{/* Tweets of people */}
							{loading && (
								<div className='d-flex mt-4 justify-content-center'>
									<Loader style={{ marginLeft: '-10%' }} />
								</div>
							)}
							{bTweets &&
								bTweets.tweets.map((tweet) => (
									<div
										className='d-flex mt-1 tweets pb-2 pe-md-3 ps-md-3'
										key={tweet._id}>
										<div className='p-2 col-2 col-md-1 '>
											<Link
												className='text-decoration-none text-light'
												to={`/user/${tweet.userdata._id}`}>
												{' '}
												<img
													className='dp  d-block mx-auto '
													src={tweet.userdata.profilePhoto}
													alt='profile'
													onError={(e) =>
														(e.target.src = '/uploads/default.png')
													}
												/>
											</Link>
										</div>
										<div className='col-10 col-md-11 pt-2 text-light p-1 ps-2 ps-md-4'>
											<Link
												className='text-decoration-none text-light'
												to={`/user/${tweet.userdata._id}`}>
												<h6 className='mb-0 roboto  d-inline-block pe-1'>
													{tweet.userdata.name}
												</h6>
												<span
													className='text-muted'
													style={{ fontSize: '0.8em' }}>
													{tweet.userdata.atTheRate}
												</span>
											</Link>

											<Link
												className='text-decoration-none text-light'
												to={`/tweet/${tweet._id}`}>
												<p
													style={{ overflowWrap: 'break-word' }}
													className='mb-0 mt-0  '>
													{tweet.text}
												</p>
												{tweet.image && (
													<div className='img-output mb-2    w-100  '>
														<img
															id='output'
															style={{ width: '90%', height: '90%' }}
															src={tweet.image}
															alt='img'
															className='img-fluid  d-block  rounded'
														/>
													</div>
												)}
											</Link>
											<div className='d-flex mt-2 text-muted '>
												<div className='col-3'>
													<Link
														className='text-decoration-none text-muted'
														to={`/tweet/${tweet._id}`}>
														<i className='far fa-comment  '></i>{' '}
													</Link>
												</div>
												<div className='col-3'>
													{tweet.retweets.find((id) => {
														return id === userId._id
													}) ? (
														<i
															className='fas fa-retweet  text-success'
															onClick={(e) => {
																dispatch(unretweet(tweet._id))
															}}></i>
													) : (
														<i
															className='fas fa-retweet '
															onClick={(e) => {
																dispatch(retweet(tweet._id))
															}}></i>
													)}{' '}
													{tweet.retweets.length}
												</div>
												<div className='col-3'>
													{tweet.likes.find((id) => {
														return id === userId._id
													}) ? (
														<i
															className={`fas fa-heart  text-danger  like-btn `}
															onClick={(e) => {
																dispatch(unlikeTweet(tweet._id))
															}}></i>
													) : (
														<i
															className={`far fa-heart     like-btn `}
															onClick={(e) => {
																dispatch(likeTweet(tweet._id))
															}}></i>
													)}{' '}
													{tweet.likes.length}
												</div>
												<div className='col-3'>
													{tweet.bookmark.find((id) => {
														return id === userId._id
													}) ? (
														<i
															className={`fas fa-bookmark `}
															onClick={(e) => {
																dispatch(unbookmark(tweet._id))
															}}></i>
													) : (
														<i
															className={`far fa-bookmark `}
															onClick={(e) => {
																dispatch(bookmark(tweet._id))
															}}></i>
													)}{' '}
												</div>
											</div>
										</div>
									</div>
								))}
							{bTweets && bTweets.tweets.length === 0 && (
								<h6 className='text-light text-center roboto mt-3'>
									No Bookmarks
								</h6>
							)}
						</div>

						<div className='d-none d-lg-block col-lg-3  news'>
							<News className='news' />
						</div>
					</div>
				)}
			</div>
		</>
	)
}

export default BookmarkScreen
