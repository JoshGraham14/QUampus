import '../css/postForm.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const PostForm = props => {
	const {
		postType,
		handleSubmit,
		message,
		handleReplyButton,
		originalPoster,
		originalPost,
	} = props

	const handleReplySubmit = e => {
		const replyMessage = e.target[0].value
		console.log(replyMessage)
		axios
			.post('http://127.0.0.1:8000/replies/', {
				message: replyMessage,
				poster: originalPoster,
				original_post: originalPost,
			})
			.catch(response => {
				console.log('something went wrong')
			})
		console.log('reply submitted')
	}

	return (
		<form
			className={postType === 'post' ? 'post-form' : 'reply-form'}
			onSubmit={postType === 'post' ? handleSubmit : handleReplySubmit}
		>
			{postType === 'reply' ? (
				<div className='reply-separator'></div>
			) : (
				''
			)}
			{postType === 'reply' ? (
				<FontAwesomeIcon
					onClick={handleReplyButton}
					className='cancel-reply-icon'
					icon={faXmark}
				/>
			) : (
				''
			)}
			<textarea rows='3' autoFocus placeholder={message}></textarea>
			<input
				className={
					postType === 'post'
						? 'btn submit post-btn'
						: ' btn submit reply-btn'
				}
				type='submit'
				value={postType === 'post' ? 'Post' : 'Reply'}
			/>
		</form>
	)
}

export default PostForm
