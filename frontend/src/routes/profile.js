import { useEffect, useState } from 'react'
import { Navigate, Link } from 'react-router-dom'

const Profile = () => {
	const [username, setUserName] = useState('')
	const [profilePic, setProfilePic] = useState('')
	const [id, setID] = useState('')
	const [redirect, setRedirect] = useState(false)
	useEffect(() => {
		;(async () => {
			const response = await fetch('http://127.0.0.1:8000/user', {
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
			})

			const content = await response.json()
			if (content.username === undefined) {
				setRedirect(true)
			} else {
				setID(content.id)
				setUserName(content.username)
				setProfilePic(content.profile_pic)
			}
		})()
	})

	if (redirect) {
		return (
			<Navigate
				to='/loginsignup'
				message='You must log in to view or edit your profile.'
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
			<h2>Profile</h2>
			<h3>{username}</h3>
			<img src={`http://127.0.0.1:8000${profilePic}`} alt='Profile' />
			<p>{id}</p>
			<Link to='/loginsignup' onClick={handleLogout}>
				Logout
			</Link>
		</div>
	)
}

export default Profile
