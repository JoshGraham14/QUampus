import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import './css/app.css'

const App = () => {
	return (
		<div className='App'>
			<nav>
				<Link to='/'>Home</Link>
				<Link to='/profile'>Profile</Link>
				<Link to='/map'>Map</Link>
				<Link to='/numbers'>Numbers</Link>
				<Link to='/forums'>Forums</Link>
			</nav>
			<Outlet />
		</div>
	)
}

export default App
