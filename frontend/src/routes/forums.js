import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { Post } from '../components/post'

import '../css/forums.css'

const Forums = () => {
	const [posts, setAllPosts] = useState([])
	const [redirect, setRedirect] = useState(false)
	const [auth, setAuth] = useState(false)
	const [userID, setUserID] = useState(0)

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
