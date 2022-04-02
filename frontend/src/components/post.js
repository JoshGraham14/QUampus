import { useState, useEffect } from 'react'
import axios from 'axios'

import '../css/post.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReply } from '@fortawesome/free-solid-svg-icons'
import PostForm from './postForm'

export const Post = props => {
	const [user, setUser] = useState([])
	const [replyToggle, setReplyToggle] = useState(false)
	const { message, poster, reply, originalPost, userID } = props

	// the poster prop is the url to the person that made the post
	// the user object must be pulled from the api to get their name
	useEffect(() => {
		axios.get(poster).then(response => {
			setUser(response.data)
		}) // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleReplyButton = () => {
		setReplyToggle(!replyToggle)
	}

	return (
		<div className={reply ? 'post reply' : 'post'}>
			<div className='post-header'>
				<div className='img-wrapper'>
					<img
						className='post-profile-pic'
						src={user.profile_pic}
						alt={`${user.username} profile`}
					/>
				</div>
				<h5>
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
