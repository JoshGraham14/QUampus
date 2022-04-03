import { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
import MapMarker from '../components/mapMarker'

import '../css/QUMap.css'

import axios from 'axios'

const QUMapLocation = props => {
	const [locations, setLocations] = useState([])
	const [selected, setSelected] = useState([])
	const defaultLocation = props.defaultLocation

	useEffect(() => {
		if (selected === 'no filter') {
			setLocations([])
		} else {
			axios
				.get(`http://127.0.0.1:8000/${selected}/`)
				.then(response => {
					setLocations(response.data)
				})
				.catch(() => {})
		}
	}, [selected])

	const handleFilter = e => {
		setSelected(e.target.value)
	}

	return (
		<div className='map-body'>
			<div className='drop-down-menu'>
				<select onChange={handleFilter} defaultValue=''>
					<option value='no filter'>No Filter</option>
					<option value='dining'>Dining</option>
					<option value='lecturehall'>Lecture Halls</option>
					<option value='residence'>Residences</option>
				</select>
			</div>
			{/* Important! Always set the container height explicitly */}
			<div style={{ height: '81vh', width: '100%' }}>
				<GoogleMapReact
					bootstrapURLKeys={{
						key: process.env.REACT_APP_GOOGLE_API_KEY,
					}}
					defaultCenter={defaultLocation.center}
					defaultZoom={defaultLocation.zoom}
				>
					{locations.map(location => {
						return (
							<MapMarker
								key={location.lat + location.long}
								lat={location.lat}
								lng={location.long}
								item={location}
							/>
						)
					})}
				</GoogleMapReact>
			</div>
		</div>
	)
}

export default QUMapLocation
