import '../css/postForm.css'

const PostForm = props => {
	const { postType, handleSubmit, message } = props
	return (
		<form className='post-form' onSubmit={handleSubmit}>
			<textarea rows='3' placeholder={message}></textarea>
			<input className='btn submit post-btn' type='submit' value='Post' />
		</form>
	)
}

export default PostForm
