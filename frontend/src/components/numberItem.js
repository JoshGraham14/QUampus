export const NumberItem = props => {
	const { name, number } = props

	return (
		<div className='number-item'>
			<h2>{name}</h2>
			<h2>{number}</h2>
		</div>
	)
}
