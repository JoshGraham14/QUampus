import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import '../css/post.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReply } from '@fortawesome/free-solid-svg-icons'
import PostForm from './postForm'

export const Post = props => {
	const navigate = useNavigate()
	const [user, setUser] = useState([])
	const [replyToggle, setReplyToggle] = useState(false)
	const { message, poster, reply, originalPost, userID, auth, setAuth } =
		props

	// the poster prop is the url to the person that made the post
	// the user object must be pulled from the api to get their name
	useEffect(() => {
		axios.get(poster).then(response => {
			setUser(response.data)
		}) // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const submitReply = () => {
		setReplyToggle(false)
		setAuth(!auth)
	}

	const handleReplyButton = () => {
		setReplyToggle(!replyToggle)
	}

	const handleNameClick = () => {
		if (userID === user.id) {
			return
		}
		axios.get('http://127.0.0.1:8000/threads/').then(res => {
			const threads = res.data.filter(item => {
				return (
					(item.user === `http://127.0.0.1:8000/users/${userID}/` &&
						item.receiver ===
							`http://127.0.0.1:8000/users/${user.id}/`) ||
					(item.user === `http://127.0.0.1:8000/users/${user.id}/` &&
						item.receiver ===
							`http://127.0.0.1:8000/users/${userID}/`)
				)
			})
			if (threads.length > 0) {
				navigate('/thread', {
					state: {
						thread: threads[0].url,
						friend: user,
						user: `http://127.0.0.1:8000/users/${userID}/`,
						id: userID,
					},
				})
			} else {
				axios
					.post('http://127.0.0.1:8000/threads/', {
						user: `http://127.0.0.1:8000/users/${userID}/`,
						receiver: `http://127.0.0.1:8000/users/${user.id}/`,
					})
					.then(response => {
						const content = response.data
						navigate('/thread', {
							state: {
								thread: content.url,
								friend: user,
								user: `http://127.0.0.1:8000/users/${userID}/`,
								id: userID,
							},
						})
					})
			}
		})
	}

	return (
		<div className={reply ? 'post reply' : 'post'}>
			<div className='post-header'>
				<div className='img-wrapper' onClick={handleNameClick}>
					<img
						className='post-profile-pic'
						src={user.profile_pic}
						alt={`${user.username} profile`}
					/>
				</div>
				<h5 onClick={handleNameClick}>
					{user.username} {reply ? 'replied: ' : 'asked: '}
				</h5>
			</div>

			<p className='post-content'>{message}</p>

			{!replyToggle ? (
				<FontAwesomeIcon
					className='reply-icon'
					onClick={handleReplyButton}
					icon={faReply}
					user={user}
				/>
			) : (
				''
			)}
			{replyToggle ? (
				<>
					<PostForm
						postType='reply'
						message={`Reply to ${user.username}`}
						handleReplyButton={handleReplyButton}
						submitReply={submitReply}
						originalPoster={poster}
						originalPost={originalPost}
						userID={userID}
					/>
				</>
			) : (
				''
			)}
		</div>
	)
}
