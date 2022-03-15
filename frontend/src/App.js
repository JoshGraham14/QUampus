import React from 'react'
import { Outlet, Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faMap } from '@fortawesome/free-solid-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faMessage } from '@fortawesome/free-solid-svg-icons'

import './css/app.css'

const App = () => {
	return (
		<div className='App'>
			<nav>
				<Link to='/'>
					<FontAwesomeIcon className='icon' icon={faHouse} />
				</Link>
				<Link to='/profile'>
					<FontAwesomeIcon className='icon' icon={faUser} />
				</Link>
				<Link to='/map'>
					<FontAwesomeIcon className='icon' icon={faMap} />
				</Link>
				<Link to='/numbers'>
					<FontAwesomeIcon className='icon' icon={faPhone} />
				</Link>
				<Link to='/forums'>
					<FontAwesomeIcon className='icon' icon={faMessage} />
				</Link>
			</nav>
			<Outlet />
		</div>
	)
}

export default App
