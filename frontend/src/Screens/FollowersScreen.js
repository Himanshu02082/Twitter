//This FollowersScreen component.
// It renders the screen that displays a list of followers.
// The list of followers can either be the user's followers or another user's followers if the user whose followers are being
// displayed is specified by passing their ID through the URL.
import React, { useEffect } from 'react'
import Sidenav from '../Components/Sidenav'
import News from '../Components/News'
import { Link, useLocation } from 'react-router-dom'
import MobileNav from '../Components/MobileNav'
import TweetModal from '../Components/TweetModal'
import Loader from '../Components/Loader.js'
import FullScreenLoader from '../Components/FullScreenLoader'
import Header from '../Components/Header'
import { USER_LOGOUT } from '../Constants/userConstants.js'
import { useSelector, useDispatch } from 'react-redux'
import {
	getLoginUserInfo,
	getFollowersUsers,
	unfollowUser,
	followUser,
	getUserById,
} from '../Actions/userAction.js'

const FollowersScreen = ({ history }) => {
	//useDispatch hook to access the dispatch function.
	const dispatch = useDispatch()
	//Making constants using the useSelector hook from redux library to access the state values.
	const userLogin = useSelector((state) => state.userLogin)
	const { userId } = userLogin

	const userLoginInfo = useSelector((state) => state.userLoginInfo)
	const { userInfo, loading: homeLoading } = userLoginInfo

	const followersUsers = useSelector((state) => state.followersUsers)
	const { followers, loading: usersLoading } = followersUsers

	const userUnfollow = useSelector((state) => state.userUnfollow)
	const { unfollow } = userUnfollow

	const userFollow = useSelector((state) => state.userFollow)
	const { follow } = userFollow

	const userById = useSelector((state) => state.userById)
	const { userData } = userById

	const search = useLocation().search
	const id = new URLSearchParams(search).get('id')

	// the useEffect hook load data when the component mounts or when some state values change.
	// The useEffect hook checks if the user is logged in and redirects them to the login page if they are not logged in.
	// If the user is logged in, it checks if the user's information is available and loads it if it is not available.
	// It also checks if an ID has been passed through the URL and loads the user's information and followers' information if an
	// ID is available.
	useEffect(() => {
		if (!userId) {
			history.push('/login')
		} else {
			if (!userInfo) {
				dispatch(getLoginUserInfo(userId._id))
			}
			if (id) {
				dispatch(getUserById(id))
				dispatch(getFollowersUsers(id))
			} else {
				dispatch(getFollowersUsers(userId._id))
			}
		}
	}, [userId, history, dispatch, unfollow, follow, userInfo, id])

	// Return renders several components, such as Header, FullScreenLoader, Sidenav, TweetModal, and MobileNav.
	// It also renders a list of followers using the followers state value.
	// The list of followers can either be the user's followers or another user's followers, depending on the ID passed through URL.
	// The component also renders two tabs labeled "Following" and "Followers" that allow the user to switch between
	// the list of users they are following and the list of their followers.
	// component updates the URL when the user switches between the tabs.
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
										to={`${id ? `/following?id=${id}` : '/following'}`}>
										<div
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
										to={'/followers'}>
										<div
											id='profile-tab'
											className='active  pb-0'
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
									className='tab-pane fade show '
									id='following'
									role='tabpanel'
									aria-labelledby='home-tab'></div>
								<div
									className='tab-pane fade active show '
									id='followers'
									role='tabpanel'
									aria-labelledby='home-tab'>
									{followers &&
										followers.map((user) => (
											<div
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
									{followers && followers.length === 0 && (
										<h6 className='text-light text-center roboto mt-5'>
											0 Followers
										</h6>
									)}
								</div>
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

export default FollowersScreen
