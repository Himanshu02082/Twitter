//This component SearchScreen renders a news feed component (News) with a mobile navigation component (MobileNav) on top of it.
// The news feed is only rendered if a user is logged in (userInfo is truthy), otherwise it is not displayed.
import React, { useEffect } from 'react'
import News from '../Components/News'
import MobileNav from '../Components/MobileNav'
import { getLoginUserInfo } from '../Actions/userAction'
import { useSelector, useDispatch } from 'react-redux'
const SearchScreen = () => {
	//The component uses useSelector select data from the application state stored in Redux.
	//It selects the userLogin and userLoginInfo slices of the state which contain the user ID (userId) and user information (userInfo) respectively.
	const userLogin = useSelector((state) => state.userLogin)
	const { userId } = userLogin
	const userLoginInfo = useSelector((state) => state.userLoginInfo)
	const { userInfo } = userLoginInfo

	const dispatch = useDispatch()
	//useEffect hook is used to dispatch the getLoginUserInfo action if userInfo is not available.
	// This action retrieves the user information from the server using the userId obtained from the userLogin slice of the state.
	useEffect(() => {
		if (!userInfo) {
			dispatch(getLoginUserInfo(userId._id))
		}
	}, [userId._id, dispatch, userInfo])
	//The return statement renders the mobile navigation and news feed components .
	// The mobile navigation component is passed the user information as a prop.
	return (
		<div className=' news '>
			{userInfo && (
				<>
					<MobileNav userInfo={userInfo} />
					<div className='p-2'>
						<News />
					</div>
				</>
			)}
		</div>
	)
}

export default SearchScreen
