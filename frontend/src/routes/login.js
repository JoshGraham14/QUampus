import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
// import axios from 'axios'
import logo from '../img/logo350.png'

const LogIn = () => {
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
		return <Navigate to='/profile' />
	}

	return (
		<div className='home-container smaller-gap'>
			<img className='logo' src={logo} alt='QUampus logo' />
			{message ? <h3>{message}</h3> : ''}
			<form onSubmit={handleSubmit} action='/login'>
				<input
					type='text'
					name='username'
					onChange={handleChange}
					placeholder='username'
					autoComplete='off'
				/>
				<input
					type='password'
					name='password'
					onChange={handleChange}
					placeholder='password'
				/>
				<input type='submit' value='Log In' />
				<Link to='/loginsignup'>Back</Link>
			</form>
		</div>
	)
}

export default LogIn
