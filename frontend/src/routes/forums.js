import { useState, useEffect } from 'react'
import axios from 'axios'
import { Post } from '../components/post'

import '../css/forums.css'

const Forums = () => {
	const [posts, setAllPosts] = useState([])
	useEffect(() => {
		axios.get('http://127.0.0.1:8000/posts/').then(response => {
			setAllPosts(response.data)
		}) // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<div className='forum-body'>
			<h2 className='title near-top'>Forums</h2>
			<div className='posts-container'>
				{posts.map(item => {
					return (
						<div className='post-wrapper' key={item.url}>
							<Post
								key={item.id}
								message={item.message}
								poster={item.poster}
								reply={false}
							/>
							{item.forum_replies.map(reply => {
								return (
									<Post
										key={reply.url}
										message={reply.message}
										poster={reply.poster}
										reply={true}
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
