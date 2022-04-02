import { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faMap } from '@fortawesome/free-solid-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faMessage } from '@fortawesome/free-solid-svg-icons'

import './css/app.css'

const App = () => {
	const [active, setActive] = useState('/')

	const handleClick = route => {
		setActive(route)
	}

	return (
		<div className='App'>
			<nav>
				<Link to='/'>
					<FontAwesomeIcon
						className={active === '/' ? 'icon active-nav' : 'icon'}
						icon={faHouse}
						onClick={() => handleClick('/')}
					/>
				</Link>
				<Link to='/profile'>
					<FontAwesomeIcon
						className={
							active === '/profile' ? 'icon active-nav' : 'icon'
						}
						icon={faUser}
						onClick={() => handleClick('/profile')}
					/>
				</Link>
				<Link to='/map'>
					<FontAwesomeIcon
						className={
							active === '/map' ? 'icon active-nav' : 'icon'
						}
						icon={faMap}
						onClick={() => handleClick('/map')}
					/>
				</Link>
				<Link to='/numbers'>
					<FontAwesomeIcon
						className={
							active === '/numbers' ? 'icon active-nav' : 'icon'
						}
						icon={faPhone}
						onClick={() => handleClick('/numbers')}
					/>
				</Link>
				<Link to='/forums'>
					<FontAwesomeIcon
						className={
							active === '/forums' ? 'icon active-nav' : 'icon'
						}
						icon={faMessage}
						onClick={() => handleClick('/forums')}
					/>
				</Link>
			</nav>
			<Outlet />
		</div>
	)
}

export default App
