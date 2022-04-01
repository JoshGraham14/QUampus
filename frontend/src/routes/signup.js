import { useState } from 'react'
import { Navigate, Link, useNavigate, useLocation } from 'react-router-dom'

import axios from 'axios'
import logo from '../img/logo350.png'

const SignUp = () => {
	const navigate = useNavigate()
	const { state } = useLocation()
	const { from } = state
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
		navigate('/login', {
			state: {
				from,
			},
		})
	}

	const handleBack = (e, location) => {
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
					<a
						href='/loginsignup'
						className='back-link'
						onClick={e => handleBack(e, '/loginsignup')}
					>
						Back
					</a>
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
