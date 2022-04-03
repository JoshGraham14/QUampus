import { useEffect, useState, useRef, useLayoutEffect } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons'
import '../css/thread.css'
import axios from 'axios'
import Message from '../components/message'

const Thread = props => {
	const navigate = useNavigate()
	const { state } = useLocation()
	const { thread, friend, user, id } = state
	const [messages, setMessages] = useState([])
	const [update, setUpdate] = useState(false)
	const divRef = useRef()

	useEffect(() => {
		axios
			.get('http://127.0.0.1:8000/threads', {
				headers: {
					'Content-Type': 'application/json',
				},
			})
			.then(response => {
				let data = response.data
					.filter(item => {
						if (
							item.user ===
								`http://127.0.0.1:8000/users/${id}/` ||
							item.receiver ===
								`http://127.0.0.1:8000/users/${id}/`
						) {
							return true
						} else {
							return false
						}
					})
					.filter(item => {
						return item.url === thread
					})
				if (data[0].messages !== undefined) {
					setMessages(data[0].messages)
				} else {
					setMessages([])
				}
				divRef.current.scrollTop = divRef.current.scrollHeight
			})
	}, [update, id, thread])

	const handleBackButton = () => {
		navigate(-1)
	}

	const handleMessageSubmit = e => {
		e.preventDefault()
		console.log(e.target[0].value)
		console.log('message submit')
		axios
			.post('http://127.0.0.1:8000/messages/', {
				content: e.target[0].value,
				thread: thread,
				user: `http://127.0.0.1:8000/users/${id}/`,
			})
			.then(response => {
				console.log(response.data)
				setUpdate(!update)
			})
		e.target[0].value = ''
	}

	return (
		<div className='thread-page'>
			<FontAwesomeIcon
				className='icon back-btn'
				icon={faCircleChevronLeft}
				onClick={handleBackButton}
			/>
			<div className='thread-header'>
				<div className='img-wrapper dm-image-wrapper'>
					<img
						className='post-profile-pic'
						src={friend.profile_pic}
						alt={`${friend.username} profile`}
					/>
				</div>
				<div>
					<h5>{friend.username}</h5>
				</div>
			</div>
			<div className='message-container' ref={divRef}>
				{messages.map(message => {
					return (
						<Message
							text={message.content}
							key={message.url}
							reply={
								message.user !==
								`http://127.0.0.1:8000/users/${id}/`
									? true
									: false
							}
						/>
					)
				})}
			</div>
			<form onSubmit={handleMessageSubmit}>
				<input
					type='text'
					className='message-box'
					placeholder={`Message ${friend.username}`}
				></input>
			</form>
		</div>
	)
}

export default Thread
