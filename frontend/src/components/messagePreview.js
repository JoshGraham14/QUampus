import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Thread from '../routes/thread'

const MessagePreview = props => {
	const navigate = useNavigate()
	const { messages, id, user, receiver, thread } = props
	const [friend, setFriend] = useState({})
	const [text, setText] = useState('')
	const messagesLength = messages.length

	useEffect(() => {
		if (messages[0] !== undefined) {
			setText(messages[messagesLength - 1].content)
			if (user === `http://127.0.0.1:8000/users/${id}/`) {
				axios.get(receiver).then(response => {
					setFriend(response.data)
				})
			} else {
				axios.get(user).then(response => {
					setFriend(response.data)
				})
			}
		}
	}, [])

	if (messagesLength === 0) {
		return ''
	}

	const handleMessageClick = () => {
		navigate('/thread', {
			state: {
				messages: messages,
				thread: thread,
				friend: friend,
				user: user,
				id: id,
			},
		})
	}

	return (
		<div onClick={handleMessageClick} className='message-preview-wrapper'>
			<div className='post-header'>
				<div className='img-wrapper'>
					<img
						className='post-profile-pic'
						src={friend.profile_pic}
						alt={`${friend.username} profile`}
					/>
				</div>
				<div>
					<h5>{friend.username}</h5>
					<p>
						{text.length > 30
							? text.substring(0, 30) + ' ...'
							: text}
					</p>
				</div>
			</div>
		</div>
	)
}

export default MessagePreview
