import '../css/message.css'

const Message = props => {
	const { text, reply } = props
	return (
		<div className={reply ? 'reply-message' : 'sent-message'}>
			<p>{text}</p>
			<div
				className={reply ? 'reply-message-stem' : 'sent-message-stem'}
			></div>
		</div>
	)
}

export default Message
