import { Link } from 'react-router-dom'

import logo from '../img/logo350.png'

const LoginSignup = props => {
	const { message } = props

	return (
		<div className='home-container smaller-gap'>
			<img className='logo' src={logo} alt='QUampus logo' />

			<p className='message'>{message}</p>

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
