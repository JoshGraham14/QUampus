import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

import MarkerInfo from './markerInfo'

import '../css/mapMarker.css'

const MapMarker = props => {
	const [toggle, setToggle] = useState(false)
	const { item } = props

	const handleToggle = () => {
		setToggle(!toggle)
	}

	return (
		<div>
			<FontAwesomeIcon
				onClick={handleToggle}
				className='marker'
				icon={faLocationDot}
			/>
			{toggle ? <MarkerInfo item={item} onClick={handleToggle} /> : ''}
		</div>
	)
}

export default MapMarker
