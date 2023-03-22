// This component is responsible for the searchinf the keyword provided which is the user
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchUser } from '../Actions/userAction.js'
import Loader from '../Components/Loader.js'
import { SEARCH_USER_RESET } from '../Constants/userConstants.js'

//This is the SearchBox component as a functional component.
// It uses a state variable query and a state setter function setQuery with dispatch function using the useDispatch hook.
// The component also uses the useSelector hook to access the userSearch object from the Redux store state,
// and extracts the loading and searchResult properties from it.
// it also includes an effect hook that triggers whenever the query state variable changes or the dispatch function changes.
// If query is not empty, it dispatches the searchUser action with the query as the argument,
// otherwise it dispatches the SEARCH_USER_RESET action.
const SearchBox = () => {
	const [query, setQuery] = useState('')
	const dispatch = useDispatch()

	const userSearch = useSelector((state) => state.userSearch)
	const { loading, searchResult } = userSearch
	useEffect(() => {
		if (query) {
			dispatch(searchUser(query))
		} else {
			dispatch({
				type: SEARCH_USER_RESET,
			})
		}
	}, [dispatch, query])

	return (
		<div className='searchbox '>
			<input
				type='text'
				value={query}
				onChange={(e) => {
					setQuery(e.target.value)
				}}
				className='search p-2 mt-3'
				placeholder='Search Twitter'
			/>
			{loading && (
				<div className='d-flex mt-4 justify-content-center'>
					<Loader style={{ marginLeft: '-10%' }} />
				</div>
			)}

			{searchResult && (
				<div className='results '>
					{searchResult.map((user) => (
						<Link to={`/user/${user._id}`} className='text-decoration-none'>
							<div className='d-flex tweets pb-3 pt-2'>
								<div className='p-2 col-2'>
									<img
										className='dp d-block mx-auto '
										src={user.profilePhoto}
										alt='profile'
										onError={(e) => (e.target.src = '/uploads/default.png')}
									/>
								</div>
								<div className='col-10 pt-2 text-light ps-3'>
									<h6 className='mb-0 roboto '>{user.name}</h6>
									<span
										className='text-muted  mt-0'
										style={{ fontSize: '0.9em' }}>
										{user.atTheRate}
									</span>
								</div>
							</div>
						</Link>
					))}
				</div>
			)}
		</div>
	)
}

export default SearchBox
