import { useState, useEffect } from 'react'
import axios from 'axios'

import '../css/post.css'

export const Post = props => {
	const [name, setName] = useState([])
	const { message, poster, reply } = props

	// the poster prop is the url to the person that made the post
	// the user object must be pulled from the api to get their name
	useEffect(() => {
		axios.get(poster).then(response => {
			setName(response.data)
		}) // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className={reply ? 'post reply' : 'post'}>
			<h5>
				{name.username} {reply ? 'replied: ' : 'asked: '}
			</h5>
			<p>{message}</p>
		</div>
	)
}
