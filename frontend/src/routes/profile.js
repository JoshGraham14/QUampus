import { useEffect, useState } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'

import icon from '../img/update-profile-icon.png'
import '../css/profile.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faCheck } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios'

const Profile = () => {
	const navigate = useNavigate()
	const [username, setUserName] = useState('')
	const [profilePic, setProfilePic] = useState('')
	const [email, setEmail] = useState('')
	const [name, setName] = useState('')
	const [id, setID] = useState('')
	const [redirect, setRedirect] = useState(false)
	const [displayUsernameInput, setDisplayUserNameInput] = useState(false)
	const [displayEmailInput, setDisplayEmailInput] = useState(false)
	const [displayNameInput, setDisplayNameInput] = useState(false)
	const [newUsername, setNewUsername] = useState('')
	const [newEmail, setNewEmail] = useState('')
	const [newName, setNewName] = useState('')

	useEffect(() => {
		let cancel = false
		;(async () => {
			const response = await fetch('http://127.0.0.1:8000/user', {
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
			})

			const content = await response.json()
			if (content.username === undefined) {
				setRedirect(true)
			} else {
				if (cancel) return
				setID(content.id)
				setEmail(content.email)
				setUserName(content.username)
				setProfilePic(content.profile_pic)
				setName(content.first_name)
			}
		})()
		return () => {
			cancel = true
		}
	})

	if (redirect) {
		return (
			<Navigate
				to='/loginsignup'
				state={{
					message: 'You must log in to view or edit your profile.',
					from: '/profile',
				}}
			/>
		)
	}

	const fileHandler = async e => {
		let fd = new FormData()
		fd.append('file', e.target.files[0], e.target.files[0].name)
		fd.append('id', id)
		axios
			.put('http://127.0.0.1:8000/image-upload', fd, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			.then(response => {
				setProfilePic(response.data.profile_pic)
			})
	}

	const showInput = (e, field) => {
		if (field === 'username') {
			setDisplayUserNameInput(true)
		} else if (field === 'email') {
			setDisplayEmailInput(true)
		} else {
			setDisplayNameInput(true)
		}
	}

	const handleInputChange = (e, field) => {
		if (field === 'username') {
			setNewUsername(e.target.value)
		} else if (field === 'email') {
			setNewEmail(e.target.value)
		} else {
			setNewName(e.target.value)
		}
	}

	const submitNewData = e => {
		const content = {
			id: id,
			newEmail: newEmail,
			newUsername: newUsername,
			newName: newName,
			newPassword: '',
		}
		axios.put('http://127.0.0.1:8000/user', content)
	}

	const handleChangePassword = () => {
		navigate('/changepassword', {
			state: {
				id: id,
			},
		})
	}

	const handleLogout = async () => {
		await fetch('http://127.0.0.1:8000/logout', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
		})
	}

	return (
		<div>
			<h2 className='title near-top'>Profile</h2>
			<label className='icon-wrapper' htmlFor='file-upload'>
				<img
					className='plus-icon'
					src={icon}
					alt='upload profile pic'
				/>
			</label>
			<input type='file' id='file-upload' onChange={fileHandler} />

			<div className='profile-content'>
				<div className='profile-img-wrapper'>
					<img
						className='profile-pic'
						src={`${profilePic}`}
						alt='Profile'
					/>
				</div>
				<div className='profile-information'>
					<div className='display-field'>
						<span>
							<p>
								<strong>Username:</strong>
							</p>

							{!displayUsernameInput ? (
								<p>{username}</p>
							) : (
								<form onSubmit={submitNewData}>
									<input
										autoFocus
										type='text'
										className='username-input'
										defaultValue={username}
										onChange={e =>
											handleInputChange(e, 'username')
										}
									/>
								</form>
							)}
						</span>
						{!displayUsernameInput ? (
							<FontAwesomeIcon
								className='pencil-icon'
								icon={faPencil}
								onClick={e => showInput(e, 'username')}
							/>
						) : (
							<FontAwesomeIcon
								className='pencil-icon check'
								icon={faCheck}
								onClick={submitNewData}
							/>
						)}
					</div>
					<div className='display-field'>
						<span>
							<p>
								<strong>Email:</strong>
							</p>

							{!displayEmailInput ? (
								<p>{email}</p>
							) : (
								<form onSubmit={submitNewData}>
									<input
										autoFocus
										type='text'
										defaultValue={email}
										className='email-input'
										onChange={e =>
											handleInputChange(e, 'email')
										}
									/>
								</form>
							)}
						</span>
						{!displayEmailInput ? (
							<FontAwesomeIcon
								className='pencil-icon'
								icon={faPencil}
								onClick={e => showInput(e, 'email')}
							/>
						) : (
							<FontAwesomeIcon
								className='pencil-icon check'
								icon={faCheck}
								onClick={submitNewData}
							/>
						)}
					</div>
					<div className='display-field'>
						<span>
							<p>
								<strong>Display Name:</strong>
							</p>
							{!displayNameInput ? (
								<p>{name}</p>
							) : (
								<form onSubmit={submitNewData}>
									<input
										autoFocus
										type='text'
										defaultValue={name}
										className='name-input'
										onChange={e =>
											handleInputChange(e, 'name')
										}
									/>
								</form>
							)}
						</span>
						{!displayNameInput ? (
							<FontAwesomeIcon
								className='pencil-icon'
								icon={faPencil}
								onClick={e => showInput(e, 'name')}
							/>
						) : (
							<FontAwesomeIcon
								className='pencil-icon check'
								icon={faCheck}
								onClick={submitNewData}
							/>
						)}
					</div>
				</div>
				<button
					className='btn change-password'
					onClick={handleChangePassword}
				>
					Change Password
				</button>
				<Link
					className='btn btn-profile red-bg'
					to='/loginsignup'
					onClick={handleLogout}
				>
					Logout
				</Link>
			</div>
		</div>
	)
}

export default Profile
