import { useLocation, Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons'
import '../css/thread.css'
import Message from '../components/message'

const Thread = () => {
	const navigate = useNavigate()
	const { state } = useLocation()
	const { messages, thread, friend, user, id } = state
	console.log(messages)
	console.log(thread)
	console.log(friend)
	console.log(user)

	const handleBackButton = () => {
		navigate(-1)
	}

	return (
		<div>
			{/* <Link to='/forums'> */}
			<FontAwesomeIcon
				className='icon back-btn'
				icon={faCircleChevronLeft}
				onClick={handleBackButton}
			/>
			{/* </Link> */}
			<div className='thread-header'>
				<div className='img-wrapper'>
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
			<div className='message-container'>
				{messages.map(message => {
					console.log(
						`In thread.js message.user = ${message.user}\nid = http://127.0.0.1/users/${id}/`
					)
					if (message.user !== `http://127.0.0.1:8000/users/${id}/`) {
						console.log('reply is true')
					} else {
						console.log('reply is false')
					}

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
		</div>
	)
}

export default Thread
