import { useEffect, useState } from 'react'
import { Navigate, Link } from 'react-router-dom'

import icon from '../img/update-profile-icon.png'
import '../css/profile.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios'

const Profile = () => {
	const [username, setUserName] = useState('')
	const [profilePic, setProfilePic] = useState('')
	const [id, setID] = useState('')
	const [redirect, setRedirect] = useState(false)
	const [displayUsernameInput, setDisplayUserNameInput] = useState(false)
	const [newUsername, setNewUsername] = useState('')

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
				setUserName(content.username)
				setProfilePic(content.profile_pic)
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

	const showInput = e => {
		setDisplayUserNameInput(true)
	}

	const handleInputChange = e => {
		console.log(e.target.value)
		setNewUsername(e.target.value)
	}

	const submitNewData = () => {
		console.log(`Username is changed to: ${newUsername}`)
		axios
			.put('http://127.0.0.1:8000/user', {
				newUsername: newUsername,
				id: id,
			})
			.then(response => {
				setUserName(response.data.profile_pic)
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
						src={`http://127.0.0.1:8000${profilePic}`}
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
										onChange={handleInputChange}
									/>
								</form>
							)}
						</span>
						{!displayUsernameInput ? (
							<FontAwesomeIcon
								className='pencil-icon'
								icon={faPencil}
								onClick={showInput}
							/>
						) : (
							''
						)}
					</div>
				</div>

				<Link to='/loginsignup' onClick={handleLogout}>
					Logout
				</Link>
			</div>
		</div>
	)
}

export default Profile
