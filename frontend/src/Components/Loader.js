// Loader Component is used to render a spinner icon to indicate that the content is still being loaded.
// The component returns a div element with a spinner-border from Bootstrap .
// The role prop is set to 'status' to indicate that the spinner is used for status updates for screen readers.
// The Loader component is exported as a default export, so it can be imported and used in other parts.
import React from 'react'

const Loader = () => {
	return (
		<div className='spinner-border ' style={{ color: '#1DA1F2' }} role='status'>
			<span className='visually-hidden'>Loading...</span>
		</div>
	)
}

export default Loader
