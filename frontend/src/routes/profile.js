import { useEffect, useState } from 'react'
import { Navigate, Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import '../css/profile.css'

const Profile = () => {
	const [username, setUserName] = useState('')
	const [profilePic, setProfilePic] = useState('')
	const [id, setID] = useState('')
	const [redirect, setRedirect] = useState(false)
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
			<div className='icon-wrapper'>
				<FontAwesomeIcon className='plus-icon' icon={faPlus} />
			</div>

			<div className='profile-content'>
				<div className='profile-img-wrapper'>
					<img
						className='profile-pic'
						src={`http://127.0.0.1:8000${profilePic}`}
						alt='Profile'
					/>
				</div>
				<p>
					<strong>Username:</strong> {username}
				</p>
				<Link to='/loginsignup' onClick={handleLogout}>
					Logout
				</Link>
			</div>
		</div>
	)
}

export default Profile
