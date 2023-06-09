//This component Edit Profile Screen is the user detials  update screen.
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser, getLoginUserInfo } from '../Actions/userAction.js'
import AlertBox from '../Components/AlertBox'
import Sidenav from '../Components/Sidenav.js'
import Header from '../Components/Header.js'
import axios from 'axios'
import { Link } from 'react-router-dom'
import News from '../Components/News.js'
import { USER_UPDATE_RESET } from '../Constants/userConstants.js'
import FullScreenLoader from '../Components/FullScreenLoader'

const EditProfileScreen = ({ history }) => {
	// The component has constants defined using the useState hook.
	// Such as name, bio, website, profilePhoto, coverPhoto, posi, and imageLoading.
	const dispatch = useDispatch()
	const userLogin = useSelector((state) => state.userLogin)
	const { userId } = userLogin

	const userLoginInfo = useSelector((state) => state.userLoginInfo)
	const { userInfo } = userLoginInfo

	const userUpdate = useSelector((state) => state.userUpdate)
	const { error, updatedUser } = userUpdate

	const [name, setName] = useState(userInfo && userInfo.name)
	const [bio, setBio] = useState(userInfo && userInfo.bio)
	const [website, setWebsite] = useState(userInfo && userInfo.website)

	const [profilePhoto, setProfilePhoto] = useState(
		userInfo && userInfo.profilePhoto
	)
	const [coverPhoto, setCoverPhoto] = useState(userInfo && userInfo.coverPhoto)
	const [posi, setPosi] = useState(userInfo && userInfo.posi)

	const [imageLoading, setImageLoading] = useState(false)
	
	// update function dispatches an action to update the user with new name, bio, website, cover photo, profile photo, and posi values.
	// This function also dispatches an action to reset the USER_UPDATE state,
	// gets the updated user information and redirects the user to their profile page.
	const update = (e) => {
		e.preventDefault()
		dispatch(updateUser(name, bio, website, coverPhoto, profilePhoto, posi))
		dispatch({
			type: USER_UPDATE_RESET,
		})
		dispatch(getLoginUserInfo(userId._id))
		window.location = '/profile'
	}

	// useEffect hook that checks if the user is logged in and redirects to the login page if they are not.
	// It also dispatches an action to get the user information if it is not already available in the state,
	// and sets the state with the user's name, bio, website, profile photo, cover photo, and posi if it is available.
	useEffect(() => {
		if (!userId) {
			history.push('/login')
		}
		if (!userInfo) {
			dispatch(getLoginUserInfo(userId._id))
		}
		if (userInfo) {
			setName(userInfo.name)
			setBio(userInfo.bio)
			setWebsite(userInfo.website)
			setCoverPhoto(userInfo.coverPhoto)
			setProfilePhoto(userInfo.profilePhoto)
			setPosi(userInfo.posi)
		}
	}, [dispatch, history, userId, updatedUser, userInfo])

	// The component has two functions for uploading cover photo and profile photo,
	// both of which set the image loading state to true, create a form data object and append the image file to it.
	// They then make an axios post request to the backend API with the form data, set the profile or cover photo in the state
	// to the response data, and set the image loading state to false.
	const uploadCoverPhotoHandler = async (e) => {
		setImageLoading(true)
		const file = e.target.files[0]
		const formData = new FormData()
		formData.append('image', file)
		try {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}
			const { data } = await axios.post('/api/upload', formData, config)
			setCoverPhoto(data)
			setImageLoading(false)
		} catch (error) {
			console.error(error)
		}
	}

	const uploadProfilePhotoHandler = async (e) => {
		setImageLoading(true)
		const file = e.target.files[0]
		const formData = new FormData()
		formData.append('image', file)
		try {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}
			const { data } = await axios.post('/api/upload', formData, config)
			setProfilePhoto(data)
			setImageLoading(false)
		} catch (error) {
			console.error(error)
		}
	}

	// The returns JSX includes a Header, FullScreenLoader, and Sidenav component.
	// It renders a form that allows the user to input their name, bio, website, profile photo, and cover photo.
	// The form has buttons to upload new photos and an option to set the profile photo position.
	return (
		<>
			<Header title='Edit Profile' />
			{imageLoading && <FullScreenLoader />}
			{userInfo && (
				<div className='container '>
					<div className='row'>
						<div className='d-none d-md-block col-md-2 col-lg-3 p-md-2 navigation '>
							<Sidenav className='roboto' userInfo={userInfo} />
						</div>
						{/* ........ */}

						<div
							className='modal fade'
							id='modelId'
							style={{ backgroundColor: 'rgba(36,45,54,0.5)' }}
							tabIndex='-1'
							role='dialog'
							aria-labelledby='modelTitleId'
							aria-hidden='true'>
							<div
								className='modal-dialog '
								style={{ top: '17vh' }}
								role='document'>
								<div className='modal-content bg-dark'>
									<div className='modal-header pt-1 pb-0 border-bottom d-flex justify-content-end text-right  '>
										<i
											className='fas  
											     fa-times h4  text-light '
											data-bs-dismiss='modal'></i>
									</div>
									<div className='modal-body'>
										<button
											className={`${posi === 'top' ? 'btn-primary' : 'btn-outline-primary'
												} btn btn-block  w-100 m-1 h3 option`}
											onClick={() => {
												setPosi('top')
											}}>
											Top
										</button>
										<button
											className={`${posi === 'right' ? 'btn-primary' : 'btn-outline-primary'
												} btn btn-block  w-100 m-1 h3 option`}
											onClick={() => {
												setPosi('right')
											}}>
											Right
										</button>
										<button
											className={`${posi === 'center'
													? 'btn-primary'
													: 'btn-outline-primary'
												} btn btn-block  w-100 m-1 h3 option`}
											onClick={() => {
												setPosi('center')
											}}>
											Center
										</button>
										<button
											className={`${posi === 'bottom'
													? 'btn-primary'
													: 'btn-outline-primary'
												} btn btn-block  w-100 m-1 h3 option`}
											onClick={() => {
												setPosi('bottom')
											}}>
											Bottom
										</button>
										<button
											className={`${posi === 'left' ? 'btn-primary' : 'btn-outline-primary'
												} btn btn-block  w-100 m-1 h3 option`}
											onClick={() => {
												setPosi('left')
											}}>
											Left
										</button>
									</div>
								</div>
							</div>
						</div>
						{/* .............. */}
						<div
							className='col-12 col-md-10 col-lg-6 p-0 tweets-section'
							style={{ height: '100vh' }}>
							{error && <AlertBox error={error} />}

							<div className='d-md-none d-flex ps-3  '>
								<div className='pt-1'>
									<Link to={'/profile'}>
										<i
											className='fas fa-arrow-left text-light'
											style={{ fontSize: '1.8em' }}></i>
									</Link>
								</div>
								<div className='ms-4 text-light mt-1'>
									<h3 style={{ fontWeight: 'bold' }}>Edit profile</h3>
								</div>
							</div>

							<form onSubmit={update} className='p-1'>
								<div className=' p-2 home d-none d-md-block'>
									<h5
										className='roboto font-weight-bold text-light'
										style={{ fontSize: '20px' }}>
										Edit Profile
									</h5>
								</div>
								<div
									className='cover pt-1 edit-cover  text-light'
									style={{
										backgroundImage: `url(uploads/${coverPhoto && coverPhoto.split('uploads')[1]
											})`,
										backgroundRepeat: 'no-repeat',
										backgroundPosition: `${posi}`,
										backgroundSize: 'cover',
									}}>
									<div className='edit-option w-100 h-100 '>
										<div
											className='d-flex w-75  text-center '
											style={{
												position: 'relative',
												top: '50%',
												left: '50%',
												transform: 'translate(-50%,-50%)',
											}}>
											<label htmlFor='cover' className=' col-4 '>
												<i
													className='fas fa-camera h3'
													style={{ cursor: 'pointer' }}></i>
											</label>
											<input
												type='file'
												hidden
												accept=' image/jpeg, image/png'
												className='form-control-file '
												onChange={uploadCoverPhotoHandler}
												id='cover'
											/>
											<label htmlFor='' className=' col-4 '>
												<i className='fas fa-times h3'></i>
											</label>
											<label
												htmlFor='posi'
												data-bs-toggle='modal'
												data-bs-target='#modelId'
												className=' col-4 '>
												<i className='fas fa-arrows-alt h3'></i>
											</label>
										</div>
									</div>
								</div>

								<div
									className=' editprofile  p-3 pb-0 pt-2  '
									style={{ position: 'relative' }}>
									<img
										className='profilePhoto rounded-circle '
										src={profilePhoto}
										alt='profile'
										onError={(e) => (e.target.src = '/uploads/default.png')}
										onClick={() => {
											document.getElementById('profile-file').click()
										}}
										htmlFor='profile-file'
										style={{ zIndex: '3', border: '1px solid #211e1d' }}
									/>

									<input
										type='file'
										hidden
										accept=' image/jpeg, image/png'
										className='form-control-file '
										onChange={uploadProfilePhotoHandler}
										id='profile-file'
									/>
								</div>

								<div className='p-md-2 p-1'>
									<div className='form-floating mt-2 mb-3 text-light'>
										<input
											type='text'
											required
											autoComplete='none'
											value={name}
											onChange={(e) => setName(e.target.value)}
											className='form-control'
											id='floatingInput1'
											placeholder='name'
										/>
										<label htmlFor='floatingInput1'>Name</label>
									</div>

									<div className='form-floating mb-3 text-light'>
										<textarea
											autoComplete='none'
											value={bio}
											onChange={(e) => setBio(e.target.value)}
											className='form-control text-light border'
											id='floatingInput1'
											placeholder='name'
											style={{
												height: '100px',
												background: 'black',
											}}></textarea>
										<label htmlFor='floatingInput1'>Bio</label>
									</div>

									<div className='form-floating mt-4 mb-3 text-light'>
										<input
											type='url'
											autoComplete='none'
											value={website}
											onChange={(e) => setWebsite(e.target.value)}
											className='form-control'
											id='floatingInput1'
											placeholder='name'
										/>
										<label htmlFor='floatingInput1'>Website</label>
									</div>

									<button
										style={{
											width: '50%',
											backgroundColor: ' #1da1f2',
											borderRadius: '20px',
										}}
										type='submit'
										className=' border-0 mt-4 mx-auto d-block p-3 pt-2 pb-2 text-light  font-weight-bold  btn  text-center'>
										Save
									</button>
								</div>
							</form>
						</div>
						<div className='d-none d-lg-block col-lg-3  news'>
							<News className='news' />
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default EditProfileScreen
