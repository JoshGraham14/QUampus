import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons'

import '../css/directMessages.css'
import axios from 'axios'
import MessagePreview from '../components/messagePreview'

const DirectMessages = props => {
	const { state } = useLocation()
	const { id } = state
	const [threads, setThreads] = useState([])

	useEffect(() => {
		axios
			.get('http://127.0.0.1:8000/threads', {
				headers: {
					'Content-Type': 'application/json',
				},
			})
			.then(response => {
				let data = response.data.filter(item => {
					if (
						item.user === `http://127.0.0.1:8000/users/${id}/` ||
						item.receiver === `http://127.0.0.1:8000/users/${id}/`
					) {
						return true
					} else {
						return false
					}
				})
				setThreads(data)
			})
	}, [])

	return (
		<div>
			<Link to='/forums'>
				<FontAwesomeIcon
					className='icon back-btn'
					icon={faCircleChevronLeft}
				/>
			</Link>
			<h2 className='title near-top down dm-title'>Direct Messages</h2>
			<div className='messages-container'>
				{threads.map(thread => {
					return (
						<MessagePreview
							messages={thread.messages}
							id={id}
							key={thread.url}
							user={thread.user}
							receiver={thread.receiver}
							thread={thread.url}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default DirectMessages
