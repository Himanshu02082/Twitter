// We defined the routing of the React application using the React Router library.
// The App component renders different components based on the route defined in the Route component.
// The Route components define the mapping between the route paths and the corresponding components to be rendered.
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomeScreen from './Screens/HomeScreen'
import ProfileScreen from './Screens/ProfileScreen'
import UserProfileScreen from './Screens/UserProfileScreen'
import EditProfileScreen from './Screens/EditProfileScreen'
import SignupScreen from './Screens/SignupScreen'
import LoginScreen from './Screens/LoginScreen'
import SearchScreen from './Screens/SearchScreen'
import TweetScreen from './Screens/TweetScreen'
import BookmarkScreen from './Screens/BookmarkScreen'
import FollowingScreen from './Screens/FollowingScreen'
import FollowersScreen from './Screens/FollowersScreen'
import ExploreScreen from './Screens/ExploreScreen'
function App() {
	return (
		// The router component is used to define the browser router for the application.
		<Router>
			<Route path='/' exact component={HomeScreen} />	 			{/*the landing page of the application.*/}
			<Route path='/profile' component={ProfileScreen} />			{/*the user's own profile page.*/}
			<Route path='/user/:id' component={UserProfileScreen} />	{/*the profile page of another user, specified by their user id.*/}
			<Route path='/tweet/:id' component={TweetScreen} />			{/*a single tweet page, specified by the tweet id.*/}
			<Route path='/explore' component={ExploreScreen} />			{/*the page displaying tweets from users that the user does not follow.*/}
			<Route path='/following' component={FollowingScreen} />		{/*the page displaying a list of users that the user follows.*/}
			<Route path='/followers' component={FollowersScreen} />		{/*the page displaying a list of users that follow the user.*/}
			<Route path='/editprofile' component={EditProfileScreen} />	{/*the page for editing the user's profile.*/}
			<Route path='/signup' exact component={SignupScreen} />	 	{/*the page for signing up to the application.*/}
			<Route path='/login' exact component={LoginScreen} />		{/*the page for logging into the application.*/}
			<Route path='/search' exact component={SearchScreen} />		{/*the page for searching tweets and users.*/}
			<Route path='/bookmarks' exact component={BookmarkScreen} />{/*the page displaying the user's bookmarked tweets.*/}
		</Router>
	)
}

export default App
