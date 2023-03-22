//The FollowingScreen component renders the page that displays a list of the user's followers or the followers of another user
// if an id parameter is present in the URL.
import React, { useEffect } from 'react'
import Sidenav from '../Components/Sidenav'	//component for rendering the sidebar navigation menu.
import News from '../Components/News'	// component for rendering the news section.
import { Link, useLocation } from 'react-router-dom'	// for handling navigation.
import MobileNav from '../Components/MobileNav'	//component for rendering the mobile navigation menu.
import TweetModal from '../Components/TweetModal'	//component for rendering a modal for creating new tweets.
import Loader from '../Components/Loader.js'	// component for rendering a loading spinner.
import FullScreenLoader from '../Components/FullScreenLoader'	//component for rendering a full-screen loading spinner.
import Header from '../Components/Header'	//component for rendering the page header.
import { USER_LOGOUT } from '../Constants/userConstants.js'	//constant for handling user logout.
import { useSelector, useDispatch } from 'react-redux'	//hooks for accessing the global Redux state and dispatching actions.
import {
	getLoginUserInfo,
	getFollowingUsers,
	unfollowUser,
	followUser,
	getUserById,
} from '../Actions/userAction.js'

const FollowingScreen = ({ history }) => {
	const dispatch = useDispatch()

	//Here we have used variables and state variables using the useSelector hook to access the global Redux state,
	// including the userLogin state, which contains information about the logged-in user, the userLoginInfo state, 
	//which contains information about the logged-in user's profile, the followingUsers state, which contains a list of
	// the user's followers or the followers of another user, the userUnfollow state, which contains information about the
	// user that was unfollowed, and the userById state, which contains information about another user
	// if the id parameter is present in the URL.
	const userLogin = useSelector((state) => state.userLogin)
	const { userId } = userLogin

	const userLoginInfo = useSelector((state) => state.userLoginInfo)
	const { userInfo, loading: homeLoading } = userLoginInfo

	const followingUsers = useSelector((state) => state.followingUsers)
	const { followingUsers: following, loading: usersLoading } = followingUsers

	const userUnfollow = useSelector((state) => state.userUnfollow)
	const { unfollow } = userUnfollow

	const userById = useSelector((state) => state.userById)
	const { userData } = userById

	const search = useLocation().search
	const id = new URLSearchParams(search).get('id')

	//useEffect hook fetches the user's profile information, the list of followers, and the information about another user
	// if the id parameter is present in the URL.
	// The history object is used to navigate to the login page if the user is not logged in.
	useEffect(() => {
		if (!userId) {
			history.push('/login')
		} else {
			if (!userInfo) {
				dispatch(getLoginUserInfo(userId._id))
			}

			if (id) {
				dispatch(getUserById(id))
				dispatch(getFollowingUsers(id))
			} else {
				dispatch(getFollowingUsers(userId._id))
			}
		}
	}, [userId, history, dispatch, userInfo, unfollow, id])

	//The return JSX renders the page layout, including the header, sidebar navigation, news section,
	// and a list of the user's followers or the followers of another user.
	// The list of followers is rendered as a tab, with a tab for the user's followers and a tab for the followers of another user
	// if the id parameter is present in the URL.
	// The list of followers is displayed as a series of cards, with information about each follower, including their profile picture,
	// name, username, and bio. The user can click on the name or username of a follower to view their profile.
	// The user can also click on a button to follow or unfollow a follower. The user can also create new tweets using the modal.
	return (
		<>
			{' '}
			<Header title='Following' />
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
							className='col-12 col-md-10 col-lg-6 p-0 ps-1 pe-1 tweets-section '
							style={{ height: '100vh', overflowY: 'scroll' }}>
							{/* input tweet */}
							<div className='d-md-none'>
								{' '}
								<MobileNav userInfo={userInfo} />
							</div>
							<div className='d-none mt-2 d-md-block'>
								<h5 className='roboto ms-2 text-capitalize font-weight-bold text-light mb-0'>
									{id ? userData && userData.name : userInfo.name}
								</h5>
								<small className='text-muted  ms-2 mt-0'>
									{id ? userData && userData.atTheRate : userInfo.atTheRate}
								</small>
							</div>

							{usersLoading && (
								<div className='d-flex justify-content-center pt-5'>
									<Loader />
								</div>
							)}
							<ul
								className='nav   text-center text-light pb-0 nav-tabs d-flex '
								id='myTab'
								role='tablist'>
								<li className='nav-item  pt-2 pb-0 col-6' role='presentation'>
									<Link
										className='text-decoration-none text-light'
										to={'/following'}>
										<div
											className='active  pb-0'
											id='home-tab'
											data-bs-toggle='tab'
											data-bs-target='#following'
											role='tab'
											aria-controls='home'
											aria-selected='true'>
											<p
												style={{
													fontSize: '0.8em ',
													fontWeight: '900',
												}}
												className='pb-3 tabs mb-0'>
												Following
											</p>
										</div>
									</Link>
								</li>
								<li className='nav-item pt-2 pb-0 col-6' role='presentation'>
									<Link
										className='text-decoration-none text-light'
										to={`${id ? `/followers?id=${id}` : '/followers'}`}>
										<div
											id='profile-tab'
											data-bs-toggle='tab'
											data-bs-target='#followers'
											role='tab'
											aria-controls='profile'
											aria-selected='false'>
											<p
												style={{ fontSize: '0.8em ', fontWeight: '900' }}
												className='pb-3 tabs mb-0'>
												Followers
											</p>
										</div>
									</Link>
								</li>
							</ul>

							<div className='tab-content  text-light' id='myTabContent'>
								<div
									className='tab-pane fade show active'
									id='following'
									role='tabpanel'
									aria-labelledby='home-tab'>
									{following &&
										following.map((user) => (
											<div
												key={user._id}
												className='w-100  d-flex border-bottom p-3 pe-2'
												style={{ alignItems: 'center' }}>
												<div className='  col-2 '>
													<Link
														to={`/user/${user._id}`}
														className='text-decoration-none '>
														<img
															className='dp d-block mx-auto '
															src={user.profilePhoto}
															alt='profile'
															onError={(e) =>
																(e.target.src = '/uploads/default.png')
															}
														/>
													</Link>
												</div>
												<div className=' col-5 '>
													<Link
														to={`/user/${user._id}`}
														className='text-decoration-none '>
														<p
															style={{
																overflowWrap: 'break-word',
																whiteSpace: 'pre',
																fontWeight: 'bold',
															}}
															className='mb-0 ps-2 text-light'>
															{user.name}
														</p>
														<span
															className=' ps-2 text-muted'
															style={{
																fontSize: '0.8em',
															}}>
															{user.atTheRate}
														</span>
													</Link>
												</div>
												{user._id !== userInfo._id && (
													<div className=' col-5 '>
														{userInfo.following.find((id) => {
															return id === user._id
														}) ? (
															<button
																className='float-end mx-auto btn p-4 pt-1 pb-1 text-light  '
																onClick={() => dispatch(unfollowUser(user._id))}
																style={{
																	borderRadius: '20px',
																	border: '2px solid grey',
																	fontWeight: 'bold',
																}}>
																Unfollow
															</button>
														) : (
															<button
																className='float-end mx-auto btn p-4 pt-1 pb-1   '
																onClick={() => dispatch(followUser(user._id))}
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
												)}
											</div>
										))}
									{following && following.length === 0 && (
										<h6 className='text-light text-center roboto mt-5'>
											0 Following
										</h6>
									)}
								</div>
								<div
									className='tab-pane fade show '
									id='followers'
									role='tabpanel'
									aria-labelledby='home-tab'></div>
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

export default FollowingScreen
