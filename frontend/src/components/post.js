import { useState, useEffect } from 'react'
import axios from 'axios'

import '../css/post.css'

export const Post = props => {
	const [user, setUser] = useState([])
	const { message, poster, reply } = props

	// the poster prop is the url to the person that made the post
	// the user object must be pulled from the api to get their name
	useEffect(() => {
		axios.get(poster).then(response => {
			setUser(response.data)
		}) // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

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

			<p>{message}</p>
		</div>
	)
}
