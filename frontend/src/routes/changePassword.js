import { useLocation } from 'react-router-dom'

const ChangePassword = () => {
	let { state } = useLocation()
	const { id } = state
	return (
		<div>
			<h2>Change password</h2>
			<p>{id}</p>
		</div>
	)
}

export default ChangePassword
