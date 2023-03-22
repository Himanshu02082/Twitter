//The FullScreenLoader component returns a full-screen loading spinner UI.
// It is used to indicate that an asynchronous task or operation is in progress and the user should wait until it completes.
// It uses a div element with a class name fullscreen that covers the entire screen.
// This component provides a simple and effective way to display a full-screen loader while waiting for data to load.
import React from 'react'

const FullScreenLoader = () => {
	return (
		<div className='fullscreen'>
			<div className='posi'>
				<div
					className='spinner-border '
					style={{ color: '#1DA1F2' }}
					role='status'>
					<span className='visually-hidden'>Loading...</span>
				</div>
			</div>
		</div>
	)
}

export default FullScreenLoader
