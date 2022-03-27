import { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'

import axios from 'axios'
import logo from '../img/logo350.png'

const SignUp = () => {
	const [formInfo, setAllFormInfo] = useState({})
	const [redirect, setRedirect] = useState(false)
	const handleChange = e => {
		const updatedValue = { [e.target.name]: e.target.value }
		setAllFormInfo(formInfo => ({
			...formInfo,
			...updatedValue,
		}))
	}

	// This function now successfully registers a user
	const handleSubmit = () => {
		axios
			.post('http://127.0.0.1:8000/register', formInfo)
			.then(response => {
				console.log(response.data)
			})

		setRedirect(true)
	}

	if (redirect) {
		return <Navigate to='/login' />
	}

	return (
		<div className='home-container smaller-gap'>
			<img className='logo' src={logo} alt='QUampus logo' />
			<form className='form-container signup' onSubmit={handleSubmit}>
				<input
					type='text'
					name='email'
					className='form-input small-font'
					onChange={handleChange}
					placeholder='email'
					autoComplete='off'
				/>
				<input
					type='text'
					name='username'
					className='form-input small-font'
					onChange={handleChange}
					placeholder='username'
					autoComplete='off'
				/>
				<input
					type='password'
					name='password'
					className='form-input small-font'
					onChange={handleChange}
					placeholder='password'
				/>
				<div className='submit-buttons'>
					<Link className='back-link' to='/loginsignup'>
						Back
					</Link>
					<input
						className='btn submit'
						type='submit'
						value='Sign Up'
					/>
				</div>
			</form>
		</div>
	)
}

export default SignUp
