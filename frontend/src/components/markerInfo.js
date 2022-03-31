import '../css/markerInfo.css'

const MarkerInfo = props => {
	const { name, alt_name, faculty } = props.item
	const { onClick } = props

	return (
		<div className='marker-info' onClick={onClick}>
			<h3>{name}</h3>
			<h3>
				{alt_name === undefined
					? faculty
					: alt_name === 'none'
					? 'No other name'
					: '"' + alt_name + '"'}
			</h3>
		</div>
	)
}

export default MarkerInfo
