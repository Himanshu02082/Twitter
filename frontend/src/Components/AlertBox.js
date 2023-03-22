//This is AlertBox Component takes a prop error which is a string containing the error message to be displayed.
// The component returns a div with the class alert, to show an alert message.
// This component can be used to display error messages or other important information to the user in a visually appealing way.
import React from 'react'

const AlertBox = ({ error }) => {
	return (
		<div className='alert alert-primary text-dark' role='alert'>
			<strong>{error}</strong>
		</div>
	)
}

export default AlertBox
