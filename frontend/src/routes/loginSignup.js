import { Link, useLocation } from 'react-router-dom'

import logo from '../img/logo350.png'

const LoginSignup = () => {
	let { state } = useLocation()
	if (state === null) {
		state = { message: 'You must log in to view or edit your profile.' }
	}
	const { message } = state

	return (
		<div className='home-container smaller-gap'>
			<img className='logo' src={logo} alt='QUampus logo' />

			<p className='message'>{message === undefined ? '' : message}</p>

			<div className='btn-container'>
				<Link className='btn' to='/login'>
					Log In
				</Link>
				<Link className='btn' to='/signup'>
					Sign Up
				</Link>
			</div>
		</div>
	)
}

export default LoginSignup
