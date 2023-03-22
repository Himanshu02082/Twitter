//This Header component uses the Helmet component from the react-helmet library to dynamically update the document head.
// The Header component takes in prop title which is the value that will be used as the document title.
// The Helmet component allows us to add metadata to the document head, such as title, description, and keywords.
// This component is helpful for improving SEO and accessibility by dynamically setting the document title based on the current page.
import React from 'react'
import { Helmet } from 'react-helmet'

const Header = ({ title }) => {
	return (
		<Helmet>
			<meta charSet='utf-8' />
			<title>{title}</title>
		</Helmet>
	)
}

export default Header
