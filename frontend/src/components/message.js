import '../css/message.css'

const Message = props => {
	const { text, reply } = props
	console.log(reply)
	return (
		<div className={reply ? 'reply-message' : 'sent-message'}>
			<p>{text}</p>
		</div>
	)
}

export default Message
