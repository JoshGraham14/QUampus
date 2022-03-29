import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

const ChangePassword = () => {
	let { state } = useLocation()
	const { id } = state
	const [message, setMessage] = useState('')
	const [oldPassword, setOldPassword] = useState('')
	const [password1, setPassword1] = useState('')
	const [password2, setPassword2] = useState('')

	const handleChange = e => {
		if (e.target.name === 'password1') {
			setPassword1(e.target.value)
		} else if (e.target.name === 'old-password') {
			setOldPassword(e.target.value)
		} else {
			setPassword2(e.target.value)
		}
	}

	const handleSubmit = e => {
		e.preventDefault()
		if (oldPassword === '') {
			setMessage('Old Password is must be supplied.')
		} else if (password1 !== password2) {
			setMessage('Password confirmation does not match new password.')
		} else if (password1 === '' || password2 === '') {
			setMessage('No new password was supplied.')
		} else {
			const content = {
				id: id,
				oldPassword: oldPassword,
				newPassword: password1,
			}
			axios.put('http://127.0.0.1:8000/user', content).then(response => {
				console.log(response.data.status)
				setMessage(response.data.status)
				setOldPassword('')
				setPassword1('')
				setPassword2('')
				e.target.reset()
			})
		}
	}

	return (
		<div>
			<h2 className='title near-top'>Profile</h2>
			<p>{message}</p>
			<p>
				<strong>Change password</strong>
			</p>
			<form className='form-container' onSubmit={handleSubmit}>
				<input
					autoFocus
					type='password'
					name='old-password'
					className='form-input'
					onChange={handleChange}
					placeholder='Old Password'
					autoComplete='off'
				/>
				<input
					type='password'
					name='password1'
					className='form-input'
					onChange={handleChange}
					placeholder='New Password'
					autoComplete='off'
				/>
				<input
					type='password'
					name='password2'
					className='form-input'
					onChange={handleChange}
					placeholder='Confirm New Password'
				/>
				<div className='submit-buttons'>
					<input
						className='btn submit'
						type='submit'
						value='Update'
					/>
				</div>
			</form>
		</div>
	)
}

export default ChangePassword
