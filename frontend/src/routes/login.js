import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
// import axios from 'axios'
import logo from '../img/logo350.png'
import '../css/login.css'

const LogIn = () => {
	const navigate = useNavigate()
	const { state } = useLocation()
	const { from } = state
	const [formInfo, setAllFormInfo] = useState({})
	const [redirect, setRedirect] = useState(false)
	const [message, setMessage] = useState('')
	const handleChange = e => {
		const updatedValue = { [e.target.name]: e.target.value }
		setAllFormInfo(formInfo => ({
			...formInfo,
			...updatedValue,
		}))
	}

	const handleSubmit = async e => {
		e.preventDefault()
		const response = await fetch('http://127.0.0.1:8000/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify(formInfo),
		})
		const content = await response.json()
		if (content.detail === undefined) {
			setRedirect(true)
		} else {
			setMessage('Incorrect username or password.')
		}
	}

	if (redirect) {
		return <Navigate to={from} />
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
			{message ? <h3>{message}</h3> : ''}
			<form
				className='form-container'
				onSubmit={handleSubmit}
				// action='/login'
			>
				<input
					type='text'
					name='username'
					className='form-input'
					onChange={handleChange}
					placeholder='username'
					autoComplete='off'
				/>
				<input
					type='password'
					name='password'
					className='form-input'
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
						value='Log In'
					/>
				</div>
			</form>
		</div>
	)
}

export default LogIn
