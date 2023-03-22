//The News component displays a section of news.
// It imports a Searchbox component, which allows users to search for other users.
// The News component contains a section element that displays the news.
// It contains a div element with the class roboto that displays the heading.
import React from 'react'
import Searchbox from '../Components/SearchBox.js'

const News = () => {
	return (
		<>
			<Searchbox />
			<section className=' text-light mt-3  '>
				<div className='p-3 pb-0 roboto'>
					<h5>What's happening</h5>
				</div>
				<hr className='bg-light mb-0' />
				<div className='d-flex'>
					<div className='col-9 p-2 '>
						<small className='text-muted'>Science</small>
						<h6>Happy World day</h6>
					</div>
					<div className='col-3 p-2'>
						<img
							className='img-fluid rounded'
							alt='img'
							src='https://imgs.search.brave.com/PI2_kWjJRFOE9hoV5FV1WhF6r61NiRDc3stNMxH2WNI/rs:fit:323:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5Q/QnFvS1RTWENrYm0t/RmpTZDdQRkRBQUFB/QSZwaWQ9QXBp'
						/>
					</div>
				</div>
				<hr className='bg-light mt-0 mb-0' />
			</section>
		</>
	)
}

export default News
