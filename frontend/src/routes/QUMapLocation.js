import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import GoogleMapReact from 'google-map-react'
import MapMarker from '../components/mapMarker'

import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons'

const QUMapLocation = props => {
	let { state } = useLocation()
	const { item, page } = state
	console.log(item, page)
	const defaultLocation = {
		center: { lat: Number(item.lat), lng: Number(item.long) },
		zoom: 15,
	}

	return (
		<>
			<Link to={page === 'dining' ? '/dining' : '/' + page + 's'}>
				<FontAwesomeIcon
					className='icon back-btn'
					icon={faCircleChevronLeft}
				/>
			</Link>
			<h2 className='title smaller campus-map-header'>Campus Map</h2>
			<div style={{ height: '85vh', width: '100%' }}>
				<GoogleMapReact
					bootstrapURLKeys={{
						key: process.env.REACT_APP_GOOGLE_API_KEY,
					}}
					defaultCenter={defaultLocation.center}
					defaultZoom={defaultLocation.zoom}
				>
					<MapMarker lat={item.lat} lng={item.long} item={item} />
				</GoogleMapReact>
			</div>
		</>
	)
}

export default QUMapLocation
