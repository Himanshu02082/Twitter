//The component UserProfileScreen is responsible for rendering the user profile page of a particular user.
// it returns JSX that renders the user profile page, including the user's tweets, liked tweets, and retweeted tweets.
import React, { useEffect } from 'react'
import News from '../Components/News'
import Sidenav from '../Components/Sidenav'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import FullScreenLoader from '../Components/FullScreenLoader.js'
import Loader from '../Components/Loader.js'

import AlertBox from '../Components/AlertBox.js'
import TweetModal from '../Components/TweetModal'
import MobileNav from '../Components/MobileNav'
import {
	getUserById,
	followUser,
	unfollowUser,
	getLoginUserInfo,
} from '../Actions/userAction.js'
import {
	tweetsOfUser,
	getLikedTweets,
	getRetweetedTweets,
	unretweet,
	retweet,
	unlikeTweet,
	likeTweet,
	unbookmark,
	bookmark,
} from '../Actions/tweetAction.js'

//The UserProfileScreen functional component has two props, history and match  from React-Router used for navigation .
const UserProfileScreen = ({ history, match }) => {
	//useSelector and useDispatch allows to access and modify state within the Redux store.
	//The useSelector hook selects a portion of the state from the store and returns it 
	const userById = useSelector((state) => state.userById)
	const { userData, loading, error } = userById

	const userLoginInfo = useSelector((state) => state.userLoginInfo)
	const { userInfo } = userLoginInfo

	const userLogin = useSelector((state) => state.userLogin)
	const { userId, loading: homeLoading } = userLogin

	const userTweets = useSelector((state) => state.userTweets)
	const { tweets, loading: tweetsLoading, error: tweetsError } = userTweets

	const tweetLiked = useSelector((state) => state.tweetLiked)
	const { likedTweets, loading: loadingLiked, error: errorLiked } = tweetLiked

	const tweetRetweeted = useSelector((state) => state.tweetRetweeted)
	const { retweetedTweets } = tweetRetweeted

	const tweetLike = useSelector((state) => state.tweetLike)
	const { liked } = tweetLike
	const tweetUnlike = useSelector((state) => state.tweetUnlike)
	const { unliked } = tweetUnlike

	const tweetRetweet = useSelector((state) => state.tweetRetweet)
	const { retweet: ret } = tweetRetweet
	const tweetUnretweet = useSelector((state) => state.tweetUnretweet)
	const { unretweet: unret } = tweetUnretweet

	const bookmarkTweet = useSelector((state) => state.bookmarkTweet)
	const { bookmarkedTweet: bTweet } = bookmarkTweet

	const unbookmarkTweet = useSelector((state) => state.unbookmarkTweet)
	const { unbookmarkTweet: unbTweet } = unbookmarkTweet

	const userFollow = useSelector((state) => state.userFollow)
	const { follow } = userFollow

	const userUnfollow = useSelector((state) => state.userUnfollow)
	const { unfollow } = userUnfollow

	//the useDispatch hook returns a reference to the dispatch function.
	const dispatch = useDispatch()

	if (userId) {
		if (match.params.id === userId._id) {
			history.push('/profile')
		}
	}

	//useEffect hook is used to dispatch several actions to the Redux store in order to obtain the necessary data for rendering
	// the component. It istriggered when the component mounts and whenever any of the dependencies in the dependency array change.
	useEffect(() => {
		if (!userId) {
			history.push('/')
		}
		if (userId) {
			dispatch(getLoginUserInfo(userId._id))
			dispatch(tweetsOfUser(match.params.id))
			dispatch(getUserById(match.params.id))
			dispatch(getLikedTweets(match.params.id))
			dispatch(getRetweetedTweets(match.params.id))
		}
	}, [
		dispatch,
		history,
		match.params.id,
		follow,
		unfollow,
		userId,
		unliked,
		liked,
		ret,
		unret,
		bTweet,
		unbTweet,
	])

	//if retweetedTweets is true, then modifies the retweetedTweets object by adding a userdata property to each tweet object.
	if (retweetedTweets) {
		for (let i = 0; i < retweetedTweets.tweets.length; i++) {
			for (let j = 0; j < retweetedTweets.users.length; j++) {
				if (retweetedTweets.tweets[i].user === retweetedTweets.users[j]._id) {
					retweetedTweets.tweets[i].userdata = retweetedTweets.users[j]
				}
			}
		}
	}

	if (likedTweets) {
		for (let i = 0; i < likedTweets.tweets.length; i++) {
			for (let j = 0; j < likedTweets.users.length; j++) {
				if (likedTweets.tweets[i].user === likedTweets.users[j]._id) {
					likedTweets.tweets[i].userdata = likedTweets.users[j]
				}
			}
		}
	}

	return (
		<>	
			{/* checks for the homeLoading and loading state variables, and if either of them is true, it renders a FullScreenLoader component. */}
			{homeLoading && <FullScreenLoader />}
			<div className='container'>
				{/* TweetModal component that allows the user to create a new tweet. 	 */}
				{userData && <TweetModal userInfo={userData} updatetweet={tweets} />}

				{userData && (
					<div className='row'>
						{loading && <FullScreenLoader />}
						<div className='d-none d-md-block col-md-2 col-lg-3 p-md-2 navigation '>
							<Sidenav className='roboto' userInfo={userData} />
						</div>
						{/* ......................... */}
						<div
							className='col-12 col-md-10 col-lg-6 p-0 tweets-section '
							style={{ height: '100vh', overflowY: 'scroll' }}>
							{/*Profile */}
							{error && <AlertBox error={error} />}

							<div className=' pt-0 profile'>
								<div className='d-md-none'>
									{' '}
									<MobileNav userInfo={userInfo && userInfo} />
								</div>
								<div className='d-none d-md-block'>
									<h5 className='roboto ms-2 text-capitalize font-weight-bold text-light mb-0'>
										{userData.name}
									</h5>
									<small className='text-muted  ms-2 mt-0'>
										{tweets && tweets.tweets.length} Tweets
									</small>
								</div>

								<div
									className='cover pt-1 '
								>
									<img
										className='w-100  '
										src={userData.coverPhoto}
										alt='profile'
										style={{ height: 'fill' }}
									/>
								</div>
								<div className=' editprofile p-3 pb-0 pt-2'>
									<img
										className='img-fluid profilePhoto rounded-circle '
										src={userData.profilePhoto}
										alt='profile'
										onError={(e) => (e.target.src = '/uploads/default.png')}
									/>
								 {/* If the logged-in user is following the profile user, the "Unfollow" button is rendered, and if not, the "Follow" button is displayed. */}
									{userData.followers.find((id) => {
										return id === userId._id
									}) ? (
										<button
											className='float-end btn p-4 pt-1 pb-1 text-light  '
											onClick={() => dispatch(unfollowUser(userData._id))}
											style={{
												borderRadius: '20px',
												border: '2px solid grey',
												fontWeight: 'bold',
											}}>
											Unfollow
										</button>
									) : (
										<button
											className='float-end btn p-4 pt-1 pb-1   '
											onClick={() => dispatch(followUser(userData._id))}
											style={{
												borderRadius: '20px',
												border: '2px solid grey',
												background: 'white',
												color: 'black',
												fontWeight: 'bold',
											}}>
											Follow
										</button>
									)}
								</div>
								<div className='p-3 pt-1 '>
									<h5 className=' text-light mb-0 pb-0'>
										<span style={{ fontWeight: 'bold' }}> {userData.name}</span>

										<span
											className='text-muted d-block pt-0'
											style={{ fontSize: '13px' }}>
											{userData.atTheRate}
										</span>
									</h5>
									<p className='text-muted mt-2 mb-1'>
										<i className='fas fa-birthday-cake'></i> {userData.DOB}
										<i className='far fa-calendar-alt ms-2'></i>
										{' Joined '}
										{userData.createdAt.substring(0, 10)}
									</p>
									<span className='text-light'>
										<Link
											className=' text-muted text-decoration-none'
											to={`/following?id=${userData._id}`}>
											{userData.following.length}{' '}
											<span className='text-muted'> Following</span>
										</Link>{' '}
									</span>
									<span className='p-3 text-light'>
										<Link
											className=' text-muted text-decoration-none'
											to={`/followers?id=${userData._id}`}>
											{userData.followers.length}
											<span className='text-muted'> Followers</span>{' '}
										</Link>{' '}
									</span>
								</div>

								{/* nav */}
								{/* nav bar with three tabs: "Tweets", "Retweets", and "Likes". */}
								<ul
									className='nav   text-center text-light pb-0 nav-tabs d-flex '
									id='myTab'
									role='tablist'>
									<li className='nav-item  pt-2 pb-0 col-4' role='presentation'>
										<div
											className='active  pb-0'
											id='home-tab'
											data-bs-toggle='tab'
											data-bs-target='#home'
											role='tab'
											aria-controls='home'
											aria-selected='true'>
											<p
												style={{
													fontSize: '0.8em ',
													fontWeight: '900',
												}}
												className='pb-3 tabs mb-0'>
												Tweets
											</p>
										</div>
									</li>
									<li className='nav-item pt-2 pb-0 col-4' role='presentation'>
										<div
											id='profile-tab'
											data-bs-toggle='tab'
											data-bs-target='#profile'
											role='tab'
											aria-controls='profile'
											aria-selected='false'>
											<p
												style={{ fontSize: '0.8em ', fontWeight: '900' }}
												className='pb-3 tabs mb-0'>
												Retweets
											</p>
										</div>
									</li>
									<li className='nav-item pt-2 pb-0 col-4' role='presentation'>
										<div
											id='contact-tab'
											data-bs-toggle='tab'
											data-bs-target='#contact'
											role='tab'
											aria-controls='contact'
											aria-selected='false'>
											<p
												style={{ fontSize: '0.8em ', fontWeight: '900' }}
												className='pb-3 tabs mb-0'>
												Likes
											</p>
										</div>
									</li>
								</ul>
								<div className='tab-content  text-light' id='myTabContent'>
									<div
										className='tab-pane fade show active'
										id='home'
										role='tabpanel'
										aria-labelledby='home-tab'>
										{/* Tweets of User */}
										{/* checks whether the tweetsLoading state variable is true.
										 If it is, then a loading spinner is displayed on the screen.*/}
										{tweetsLoading && (
											<div className='d-flex justify-content-center mt-5'>
												<Loader />
											</div>
										)}
										{/* if there is any error while fetching tweets of the user then an AlertBox is rendered, which displays the error message. */}
										{tweetsError && <AlertBox error={tweetsError} />}
										{/* if there are any tweets to display then they are displayed using the map function.
										 For each tweet, a div is made with some child elements such as a profile photo, name, tweet text, and some icons
										for actions like comment, retweet, and like. */}
										{tweets &&
											// The tweets are divided into two types: 'main' tweets and 'reply' tweets.
											// The tweets.tweets array contains both main and reply tweets, so it is checked if the current tweet is a reply tweet.
											tweets.tweets.map((tweet) => (
												<div
													className='row ps-3 tweets pb-3 pt-2 pe-md-3 ps-md-3'
													key={tweet._id}>
													{tweet.type === 'reply' &&
														//  If it is a reply tweet, then the tweets.main array is searched for the main tweet to which the reply tweet is replying
														tweets.main.map((mainTweet, i) => (
															<>
																{mainTweet._id === tweet.refTweetId &&
																	//tweets.users array is searched for the user who tweeted the main tweet.
																	//if found, the name of the user is displayed along with a message "Replying to {user.name}".
																	tweets.users.map((user) => (
																		<>
																			{mainTweet.user === user._id && (
																				<>
																					<div
																						className='col-md-11 col-12 offset-2 ps-2 ps-md-4 offset-md-1 text-muted'
																						style={{ fontSize: '0.8em' }}>
																						<span>Replying to {user.name}</span>
																					</div>

																					<div className='col-md-1 mb-3 col-2 p-2 pe-0'>
																					{/* The Link component is used to navigate to the user's profile page or the tweet's detail page when the user clicks on the profile photo or comment icon */}
																						<Link
																							className='text-decoration-none text-light'
																							to={`/user/${user._id}`}>
																							{' '}
																							<img
																								className='dp d-block mx-auto '
																								src={user.profilePhoto}
																								alt='profile'
																								onError={(e) =>
																								(e.target.src =
																									'/uploads/default.png')
																								}
																							/>
																							<div
																								className='line w-100 mx-auto '
																								style={{
																									width: '100%',
																									height: '100%',
																								}}>
																								<p
																									className='text-center mx-auto bg-dark'
																									style={{
																										width: '2px',
																										height: '100%',
																									}}></p>
																							</div>
																						</Link>
																					</div>
																					<div className='col-10 mb-3 col-md-11 pt-2 text-light p-1 ps-2 ps-md-4'>
																						<Link
																							className='text-decoration-none text-light'
																							to={`/user/${user._id}`}>
																							<h6 className='mb-0 roboto d-inline-block pe-1'>
																								{user.name}
																							</h6>
																							<span
																								className='text-muted'
																								style={{
																									fontSize: '0.8em',
																								}}>
																								{userInfo.atTheRate}
																							</span>
																						</Link>
																						<p
																							style={{
																								overflowWrap: 'break-word',
																								whiteSpace: 'pre',
																							}}
																							className='mb-0'>
																							{mainTweet.text}
																						</p>
																						{mainTweet.image && (
																							<div className='img-output mb-2    w-100  '>
																								<img
																									id='output'
																									style={{
																										width: '90%',
																										height: '90%',
																									}}
																									src={mainTweet.image}
																									alt='img'
																									className='img-fluid  d-block  rounded'
																								/>
																							</div>
																						)}
																						{/* "mainTweet.likes.length", "mainTweet.retweets.length", and "mainTweet.bookmark.length" display the number of likes, retweets, and bookmarks for the main tweet. */}
																						<div className='d-flex mt-2 text-muted '>
																							<div className='col-3'>
																								<Link
																									to={`/tweet/${mainTweet._id}`}
																									className='text-decoration-none text-muted'>
																									<i className='far fa-comment  '></i>
																								</Link>
																							</div>
																							{/* The retweet and unretweet functions are called when the user clicks on the retweet icon. */}
																							<div className='col-3'>
																								{mainTweet.retweets.find(
																									(id) => {
																										return id === userId._id
																									}
																								) ? (
																									<i
																										className='fas fa-retweet  text-success'
																										onClick={(e) => {
																											dispatch(
																												unretweet(mainTweet._id)
																											)
																										}}></i>
																								) : (
																									<i
																										className='fas fa-retweet '
																										onClick={(e) => {
																											dispatch(
																												retweet(mainTweet._id)
																											)
																										}}></i>
																								)}{' '}
																								{mainTweet.retweets.length}
																							</div>
																							{/* likeTweet and unlikeTweet functions are called when the user clicks on the like icon. */}
																							<div className='col-3'>
																								{mainTweet.likes.find((id) => {
																									return id === userId._id
																								}) ? (
																									<i
																										className={`fas fa-heart  text-danger  like-btn `}
																										onClick={(e) => {
																											dispatch(
																												unlikeTweet(
																													mainTweet._id
																												)
																											)
																										}}></i>
																								) : (
																									<i
																										className={`far fa-heart     like-btn `}
																										onClick={(e) => {
																											dispatch(
																												likeTweet(mainTweet._id)
																											)
																										}}></i>
																								)}{' '}
																								{mainTweet.likes.length}
																							</div>
																							<div className='col-3'>
																								{mainTweet.bookmark.find(
																									(id) => {
																										return id === userId._id
																									}
																								) ? (
																									<i
																										className={`fas fa-bookmark `}
																										onClick={(e) => {
																											dispatch(
																												unbookmark(
																													mainTweet._id
																												)
																											)
																										}}></i>
																								) : (
																									<i
																										className={`far fa-bookmark `}
																										onClick={(e) => {
																											dispatch(
																												bookmark(mainTweet._id)
																											)
																										}}></i>
																								)}{' '}
																							</div>
																						</div>
																					</div>
																				</>
																			)}
																		</>
																	))}
															</>
														))}
													<div className='p-2 col-2 col-md-1'>
														<img
															className='dp d-block mx-auto '
															src={userData.profilePhoto}
															alt='profile'
															onError={(e) =>
																(e.target.src = '/uploads/default.png')
															}
														/>
													</div>
													<div className='col-10 col-md-11 pt-2 text-light p-1 ps-2 ps-md-4'>
														<h6 className='mb-0 roboto d-inline-block'>
															{userData.name}
															{/* <span className='text-muted'> - 19m</span> */}
														</h6>
														<span
															className='text-muted p-1'
															style={{ fontSize: '0.8em' }}>
															{userData.atTheRate}
														</span>
														<p>{tweet.text}</p>
														<div className='d-flex mt-2 text-muted '>
															<div className='col-3'>
																<Link
																	to={`/tweet/${tweet._id}`}
																	className='text-decoration-none text-muted'>
																	<i className='far fa-comment  '></i>
																</Link>
															</div>
															<div className='col-3'>
																{tweet.retweets.find((id) => {
																	return id === userInfo._id
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
																	return id === userInfo._id
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
									</div>
									<div
										className='tab-pane fade'
										id='profile'
										role='tabpanel'
										aria-labelledby='profile-tab'>
										{retweetedTweets &&
											retweetedTweets.tweets.map((tweet) => (
												<div
													className='row ps-3 tweets pb-3 pt-2 pe-md-3 ps-md-3'
													key={tweet._id}>
													<div className='p-2 col-2 col-md-1'>
														<Link to={`/user/${tweet.userdata._id}`}>
															<img
																className='dp d-block mx-auto '
																src={tweet.userdata.profilePhoto}
																alt='profile'
																onError={(e) =>
																	(e.target.src = '/uploads/default.png')
																}
															/>
														</Link>
													</div>
													<div className='col-10 col-md-11 pt-2 text-light p-1  ps-2 ps-md-4'>
														<Link
															to={`/user/${tweet.userdata._id}`}
															className='text-decoration-none text-light'>
															<h6 className='mb-0 roboto d-inline-block pe-1'>
																{tweet.userdata.name}
																{/* <span className='text-muted'> - 19m</span> */}
															</h6>
															<span
																className='text-muted'
																style={{ fontSize: '0.8em' }}>
																{tweet.userdata.atTheRate}
															</span>
														</Link>
														<Link
															to={`/tweet/${tweet._id}`}
															className='text-decoration-none text-light'>
															<p
																style={{ overflowWrap: 'break-word' }}
																className='mb-0'>
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
																	to={`/tweet/${tweet._id}`}
																	className='text-decoration-none text-muted'>
																	<i className='far fa-comment  '></i>
																</Link>
															</div>
															<div className='col-3'>
																{tweet.retweets.find((id) => {
																	return id === userInfo._id
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
																	return id === userInfo._id
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
									</div>
									<div
										className='tab-pane fade'
										id='contact'
										role='tabpanel'
										aria-labelledby='contact-tab'>
										{loadingLiked && (
											<div className='d-flex mt-4 justify-content-center'>
												<Loader style={{ marginLeft: '-10%' }} />
											</div>
										)}
										{errorLiked && <AlertBox error={errorLiked} />}
										{/* rendering a tweet component for each tweet in an array of tweets. */}
										{likedTweets &&
											likedTweets.tweets.map((tweet) => (
												<div
													className='row ps-3 tweets pb-3 pt-2 pe-md-3 ps-md-3'
													key={tweet._id}>
													<div className='p-2 col-2 col-md-1'>
														{/* the URL of the user's profile photo. */}
														<Link to={`/user/${tweet.userdata._id}`}>
															<img
																className='dp d-block mx-auto '
																src={tweet.userdata.profilePhoto}
																alt='profile'
																// onError function sets the image source to a default image.
																onError={(e) =>
																	(e.target.src = '/uploads/default.png')
																}
															/>
														</Link>
													</div>
													<div className='col-10 col-md-11 pt-2 text-light p-1 ps-2 ps-md-4'>
														<Link
															to={`/user/${tweet.userdata._id}`}
															className='text-decoration-none text-light'>
															<h6 className='mb-0 roboto d-inline-block pe-1'>
																{/* user's name  */}
																{tweet.userdata.name}
															</h6>
															<span
																className='text-muted'
																style={{ fontSize: '0.8em' }}>
																{/* user's handle or username, which is displayed next to the user's name. */}
																{tweet.userdata.atTheRate}
															</span>
														</Link>
														<Link
															to={`/tweet/${tweet._id}`}
															className='text-decoration-none text-light'>
															{/* tweet text */}
															<p
																style={{ overflowWrap: 'break-word' }}
																className='mb-0'>
																{tweet.text}
															</p>
															{/* tweet image */}
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
															{/* link to the page for the individual tweet. */}
															<div className='col-3'>
																<Link
																	to={`/tweet/${tweet._id}`}
																	className='text-decoration-none text-muted'>
																	<i className='far fa-comment  '></i>
																</Link>
															</div>
															{/* the number of retweets the tweet has received. 
															If the user has retweeted the tweet, the icon is green and clickable,
															 allowing the user to unretweet the tweet. */}
															<div className='col-3'>
																{tweet.retweets.find((id) => {
																	return id === userData._id
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
															{/* the number of likes the tweet has received.
															 If the user has liked the tweet, the icon is red and clickable,
															  allowing the user to unlike the tweet. */}
															<div className='col-3'>
																{tweet.likes.find((id) => {
																	return id === userData._id
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
															{/* the user can bookmark the tweet.
															 If the user has already bookmarked the tweet,
															  the icon is filled in and clickable, allowing the user to remove the tweet
															from their bookmarks. If not yet bookmarked, then icon is outlined and clickable,
															 allowing the user to bookmark the tweet. */}
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
									</div>
								</div>

								{/* /nav */}
							</div>
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

export default UserProfileScreen
