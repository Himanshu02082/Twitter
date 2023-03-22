//This ExploreScreen component renders the Explore screen .
//we have imported many custom components used in the rendering of the Explore screen.
// and action creators from a custom userAction module.
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
	getLoginUserInfo,
	getRandomUsers,
	unfollowUser,
	followUser,
} from '../Actions/userAction.js'
let skip = 0

//This ExploreScreen component that takes a history prop.
// The useDispatch hook creates a dispatch function and useSelector hook select data from the store.
// the userLogin, userLoginInfo, and getUsers objects are selected from the store.
const ExploreScreen = ({ history }) => {
	const dispatch = useDispatch()

	const userLogin = useSelector((state) => state.userLogin)
	const { userId } = userLogin

	const userLoginInfo = useSelector((state) => state.userLoginInfo)
	const { userInfo, loading: homeLoading } = userLoginInfo

	const getUsers = useSelector((state) => state.getUsers)
	const { loading, users } = getUsers

	//The useEffect is used to perform side effects.
	// It runs when the component mounts, and every time the userId, history, dispatch, or userInfo values change.
	// If the userId value is false, the user is redirected to the login page.
	// If userInfo is false, the getLoginUserInfo action is dispatched with the userId value.
	// then getRandomUsers action is dispatched with a skip value of 0.
	useEffect(() => {
		if (!userId) {
			history.push('/login')
		} else {
			if (!userInfo) {
				dispatch(getLoginUserInfo(userId._id))
			}
			dispatch(getRandomUsers(0))
		}
	}, [userId, history, dispatch, userInfo])

	//loadMore function is used to dispatch the getRandomUsers action with a new skip value of skip + 4.
	// The skip variable is initialized at the beginning of the file and is used to track the number of users to skip when
	// fetching more users.
	const loadMore = () => {
		dispatch(getRandomUsers((skip += 4)))
		console.log(skip)
	}
	//This return JSX  displays a page for exploring and following other users.
	// This includes a Header component, a FullScreenLoader component (displayed while content is loading),
	// a TweetModal component for creating a new tweet, a Sidenav component for navigating the page, and a News component
	// displaying news. The main content of the page displays a list of users that the current user can follow or unfollow,
	// as well as a button to load more users. Moreover, functionality to logout the current user when clicked
	// on the logout button.
	return (
		<>
			{' '}
			<Header title='Explore' />
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
									Explore
								</h5>
							</div>

							{/* Tweets of people */}
							{loading && (
								<div className='d-flex mt-4 justify-content-center'>
									<Loader style={{ marginLeft: '-10%' }} />
								</div>
							)}

							{users &&
								users.map((user) => (
									<div
										className='w-100  d-flex border-bottom p-3 pe-2'
										style={{ alignItems: 'center' }}
										key={user._id}>
										<div className='  col-2 '>
											<Link
												to={`/user/${user._id}`}
												className='text-decoration-none'>
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
													className='mb-0 pb-0 ps-2 text-light'>
													{user.name}
												</p>
												<span
													className='  mt-0 ps-2 text-muted'
													style={{
														fontSize: '0.8em',
													}}>
													{user.atTheRate}
												</span>
											</Link>
										</div>
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
									</div>
								))}
							<button
								disabled={users && users.length === 0}
								className='btn btn-sm btn-primary mt-3 d-block mx-auto'
								onClick={loadMore}>
								load more
							</button>
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

export default ExploreScreen
