import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import './css/app.css'

function App() {
	return (
		<div className='App'>
			<nav>
				<Link to='/home'>Home</Link>
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
