import { Link, useLocation, useNavigate } from 'react-router-dom'

import logo from '../img/logo350.png'

const LoginSignup = () => {
	const navigate = useNavigate()
	let { state } = useLocation()
	if (state === null) {
		state = {
			message: 'You must log in to view or edit your profile.',
			from: '/profile',
		}
	}
	const { message } = state
	const { from } = state

	const handleLinkClick = (e, location) => {
		e.preventDefault()
		navigate(location, {
			state: {
				from,
			},
		})
	}

	return (
		<div className='home-container smaller-gap'>
			<img className='logo' src={logo} alt='QUampus logo' />

			<p className='message'>{message === undefined ? '' : message}</p>

			<div className='btn-container'>
				<a
					href='/login'
					className='btn'
					onClick={e => handleLinkClick(e, '/login')}
				>
					Login
				</a>
				<a
					href='/signup'
					className='btn'
					onClick={e => handleLinkClick(e, '/signup')}
				>
					Sign Up
				</a>
			</div>
		</div>
	)
}

export default LoginSignup
