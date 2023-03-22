//The SignupScreen.js component is a functional component that renders a form for users to sign up for a new account.
// The form takes in user details such as name, email, password, username, and date of birth, and on submission,
// the component dispatches an action to register the user via the registerUser action creator.
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FullScreenLoader from '../Components/FullScreenLoader.js'
import AlertBox from '../Components/AlertBox.js'
import Header from '../Components/Header.js'
import { registerUser, checkUserName } from '../Actions/userAction.js'
import { Link } from 'react-router-dom'

const SignupScreen = ({ history }) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [username, setUsername] = useState('')
	const [day, setDay] = useState('')
	const [month, setMonth] = useState('')
	const [year, setYear] = useState('')

	const dispatch = useDispatch()

	//Here we used the checkUserName action creator to check if a chosen username is already taken or not.
	// If the username is already taken, the component marks the input field as invalid.
	const userRegister = useSelector((state) => state.userRegister)
	const { register, loading, error } = userRegister

	// the useSelector hook is made to retrieve the state of userRegister and checkUsername from the Redux store,
	// which are used to determine if the user registration was successful and if the entered username is available or not.
	const checkUsername = useSelector((state) => state.checkUsername)
	const { username: un } = checkUsername

	//If the registration was successful, the user is redirected to the login page via the history.push method.
	//The component also uses the useEffect hook to listen to changes in the register state and
	// to redirect the user to the login page when registration is successful. 
	useEffect(() => {
		if (register) {
			history.push('/login')
		}
	}, [history, register])

	// submit handler
	const create = (e) => {
		e.preventDefault()
		const DOB = day + ' ' + month + ' ' + year

		dispatch(registerUser(name, email, password, username, DOB))
	}

	// We have a date format code that retrieves the current year and populates two select boxes for the month and year of the user's
	// date of birth.
	// date format code
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	]
	var currentYear = new Date().getFullYear(),
		years = []
	let startYear = 1970
	while (startYear <= currentYear) {
		years.push(startYear++)
	}

	const getUserName = (e) => {
		setUsername(e.target.value.toLowerCase())

		dispatch(checkUserName(e.target.value))
	}

	//return includes a Header component, a FullScreenLoader component, and an
	// AlertBox component that display loading messages and error messages when the form is submitted.
	return (
		<div className='parent'>
			<Header title='Signup' />
			{loading && <FullScreenLoader />}

			<div className='container  '>
				<div className='row'>
					<div
						className='  p-md-5 pt-md-3 col-12 offset-md-3 text-light  mt-md-4 col-md-6 '
						style={{ backgroundColor: '#000000', borderRadius: '15px' }}>
						<h1 className='text-center  mt-0'>
							<i className='fab fa-twitter'></i>
						</h1>
						{error && <AlertBox error={error} />}

						<h4 className='roboto mt-3'>Create your account</h4>
						<form onSubmit={create}>
							<div className='form-floating mb-3 text-light'>
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
							<div className='form-floating mb-3'>
								<input
									type='email'
									required
									autoComplete='none'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className='form-control  '
									id='floatingInput2'
									placeholder='email'
								/>
								<input type='text' hidden autoComplete='on' />
								<label htmlFor='floatingInput2'>Email</label>
							</div>
							<div className='form-floating mb-3'>
								<input
									type='password'
									required
									autoComplete='current-password'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className='form-control  '
									id='floatingInput3'
									placeholder='email'
								/>
								<label htmlFor='floatingInput3'>Password</label>
							</div>

							<div className='form-floating mb-3'>
								<input
									type='text'
									required
									autoComplete='current-password'
									value={username}
									onChange={getUserName}
									className={
										username.length > 5
											? un
												? 'form-control is-invalid'
												: 'form-control is-valid'
											: 'form-control  '
									}
									id='floatingInput3'
									placeholder='username'
								/>
								<label htmlFor='floatingInput3'>@username</label>
							</div>

							<h6 className='mb-0'>Date of birth</h6>
							<small className='text-muted mt-0'>
								{' '}
								This will not be shown publicly. Confirm your own age, even if
								this account is for a business, a pet, or something else.
							</small>

							<div className='d-flex text-light mt-3'>
								<div className=' col-5 col-md-6'>
									<div className='form-floating'>
										<select
											required
											value={month}
											onChange={(e) => setMonth(e.target.value)}
											className='form-select'
											id='floatingSelect1'
											aria-label='Floating label select example'>
											<option selected disabled></option>
											{months.map((m, i) => (
												<option key={i} value={m}>
													{m}
												</option>
											))}
										</select>
										<label htmlFor='floatingSelect1'>Month</label>
									</div>
								</div>
								<div className=' col-3 col-md-3'>
									<div className='form-floating'>
										<select
											className='form-select'
											required
											value={day}
											onChange={(e) => setDay(e.target.value)}
											id='floatingSelect2'
											aria-label='Floating label select example'>
											<option selected disabled></option>
											{[...Array(31)].map((x, i) => (
												<option key={i} value={i + 1}>
													{i + 1}
												</option>
											))}
										</select>
										<label htmlFor='floatingSelect2'>Day</label>
									</div>
								</div>
								<div className='col-4 col-md-3'>
									<div className='form-floating'>
										<select
											className='form-select'
											required
											id='floatingSelect3'
											value={year}
											onChange={(e) => setYear(e.target.value)}
											aria-label='Floating label select example'>
											<option selected disabled></option>
											{years.map((x, i) => (
												<option key={i} value={x}>
													{x}
												</option>
											))}
										</select>
										<label htmlFor='floatingSelect3'>Year</label>
									</div>
								</div>
							</div>

							<div className=' mt-md-3 mt-5  '>
								<button
									type='submit'
									className=' tweet-btn btn d-block roboto w-md-75 signup-btn  mx-auto mt-4 pt-1 pb-1'>
									<h6 className='mt-1 pb-0' style={{ fontSize: '1.1em' }}>
										Register
									</h6>
								</button>
								<p className='text-center mt-3'>
									{' '}
									<Link to={'/login'} className='text-decoration-none'>
										Allready have an account ?
									</Link>{' '}
								</p>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SignupScreen
