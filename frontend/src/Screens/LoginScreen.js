//The LoginScreen component is a functional component that renders a login form for users to sign in to their account.
// It uses various other components such as Header, FullScreenLoader, and AlertBox to provide a user interface.
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../Actions/userAction.js'
import FullScreenLoader from '../Components/FullScreenLoader.js'
import AlertBox from '../Components/AlertBox.js'
import Header from '../Components/Header.js'

//Here the useSelector hook is used to access the userLogin state from the Redux store which contains information about the user's
// login status, such as the userId, loading, and error.
// If the userId is not null, it means the user is already logged in and they will be redirected to the
// home page using the history object in the useEffect hook.
const LoginScreen = ({ history }) => {
	// useState and useEffect hooks are used to manage component state and lifecycle.
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	//useSelector and useDispatch hooks are used to connect the component to the Redux store and dispatch actions.
	const userLogin = useSelector((state) => state.userLogin)
	const { userId, loading, error } = userLogin
	const dispatch = useDispatch()

	//The Login Screen uses history prop which is used to redirect users to the home page after successful login.
	useEffect(() => {
		if (userId) {
			history.push('/')
		}
	}, [history, userId])

	// Login function is called when the user submits the login form.
	// It dispatches the loginUser action with the email and password provided by the user as arguments.
	const login = (e) => {
		e.preventDefault()
		dispatch(loginUser(email, password))
	}

	// The Header component with a title of "Login".
	// If loading is true, the FullScreenLoader component is displayed .
	// If userId is null, the login form is displayed which includes two input fields for email and password.
	// If error is not null, the AlertBox component is displayed with an error message.
	// A button labeled "Next" is displayed to submit the login form.
	return (
		<>
			<Header title='Login' />
			{loading && <FullScreenLoader />}
			{!userId && (
				<div className=''>
					<div className='container  '>
						<div className='row'>
							<div
								className='  p-md-5 pt-md-3 col-12 offset-lg-4 text-light  mt-md-4 col-lg-4 '
								style={{ backgroundColor: '#000000', borderRadius: '15px' }}>
								<h1 className='text-center  mt-0'>
									<i className='fab fa-twitter'></i>
								</h1>
								<h2 className='roboto mt-3'>Log in to Twitter</h2>
								{error && <AlertBox error={error} />}
								<form onSubmit={login}>
									{' '}
									<div className='form-floating mb-3 mt-4 text-light'>
										<input
											type='email'
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											className='form-control text-light'
											id='floatingInput1'
											placeholder='name'
										/>
										<label htmlFor='floatingInput1'>Email</label>
									</div>
									<div className='form-floating mb-3'>
										<input
											type='password'
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											className='form-control text-light  '
											id='floatingInput2'
											placeholder='email'
										/>
										<label htmlFor='floatingInput2'>Password</label>
									</div>
									<div className=' mt-md-3 mt-5  '>
										<button
											type='submit'
											className='tweet-btn d-block w-md-75 signup-btn  mx-auto mt-4 pt-2 pb-2'>
											<h6 style={{ fontSize: '1.1em' }}>Next</h6>
										</button>
									</div>
								</form>

								<p className='text-center mt-3'>
									{' '}
									<Link to={'/signup'} className='text-decoration-none'>
										Sign up for Twitter
									</Link>{' '}
								</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default LoginScreen
