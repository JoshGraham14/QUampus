const PostForm = props => {
	const { postType, handleSubmit, message } = props
	return (
		<form className='post-form' onSubmit={handleSubmit}>
			<textarea rows='3' cols='30' placeholder={message}></textarea>
			<input type='submit' value='Post' />
		</form>
	)
}

export default PostForm
