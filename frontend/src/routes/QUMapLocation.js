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

	const defaultMapOptions = {
		fullscreenControl: false,
	}

	return (
		<div className='map-body'>
			<Link to={page === 'dining' ? '/dining' : '/' + page + 's'}>
				<FontAwesomeIcon
					className='icon back-btn blue'
					icon={faCircleChevronLeft}
				/>
			</Link>
			<h2 className='title smaller blue campus-map-header'>Campus Map</h2>
			<div style={{ height: '80vh', width: '100%' }}>
				<GoogleMapReact
					bootstrapURLKeys={{
						key: process.env.REACT_APP_GOOGLE_API_KEY,
					}}
					defaultCenter={defaultLocation.center}
					defaultZoom={defaultLocation.zoom}
					defaultOptions={defaultMapOptions}
				>
					<MapMarker lat={item.lat} lng={item.long} item={item} />
				</GoogleMapReact>
			</div>
		</div>
	)
}

export default QUMapLocation
