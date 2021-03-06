import { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Post } from '../components/post'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInbox } from '@fortawesome/free-solid-svg-icons'

import '../css/forums.css'
import PostForm from '../components/postForm'

const Forums = () => {
	const navigate = useNavigate()
	const [posts, setAllPosts] = useState([])
	const [redirect, setRedirect] = useState(false)
	const [auth, setAuth] = useState(false)
	const [userID, setUserID] = useState(0)
	const [username, setUsername] = useState('')

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
				setAuth(true)
				setUserID(content.id)
				setUsername(content.username)
			}
		})()
		return () => {
			cancel = true
		}
	})

	useEffect(() => {
		axios.get('http://127.0.0.1:8000/posts/').then(response => {
			setAllPosts(response.data)
		})
	}, [auth])

	if (redirect) {
		return (
			<Navigate
				to='/loginsignup'
				state={{
					message: 'You must log in to use the forums.',
					from: '/forums',
				}}
			/>
		)
	}

	const handleInboxButton = () => {
		navigate('/directmessages', {
			state: {
				id: userID,
			},
		})
	}

	const handleSubmit = e => {
		e.preventDefault()
		const message = e.target[0].value
		axios
			.post('http://127.0.0.1:8000/posts/', {
				message: message,
				// forum_replies: [],
				poster: `http://127.0.0.1:8000/users/${userID}/`,
			})
			.catch(response => {
				console.log('something went wrong')
			})
		e.target[0].value = ''
		// auth doesn't actually represent authentication anymore
		// this just rerenders the posts
		setAuth(!auth)
	}

	return (
		<div className='forum-body'>
			<FontAwesomeIcon
				className='dm-inbox-icon'
				icon={faInbox}
				onClick={handleInboxButton}
			/>
			<h2 className='title near-top'>Forum</h2>
			<PostForm
				postType='post'
				handleSubmit={handleSubmit}
				message='Post your query here'
			/>
			<div className='posts-container'>
				{posts.map(item => {
					return (
						<div className='post-wrapper' key={item.url}>
							<Post
								key={item.id}
								message={item.message}
								poster={item.poster}
								userID={userID}
								reply={false}
								auth={auth}
								setAuth={setAuth}
								originalPost={item.url}
							/>
							{item.forum_replies.map(reply => {
								return (
									<Post
										key={reply.url}
										message={reply.message}
										poster={reply.poster}
										reply={true}
										userID={userID}
									/>
								)
							})}
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Forums
