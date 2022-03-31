// import { useState } from 'react'
import GoogleMapReact from 'google-map-react'

const QUMapLocation = props => {
	const defaultLocation = props.defaultLocation

	return (
		<>
			<h2 className='title smaller'>Filter</h2>
			{/* Important! Always set the container height explicitly */}
			<div style={{ height: '85vh', width: '100%' }}>
				<GoogleMapReact
					bootstrapURLKeys={{
						key: process.env.REACT_APP_GOOGLE_API_KEY,
					}}
					defaultCenter={defaultLocation.center}
					defaultZoom={defaultLocation.zoom}
				></GoogleMapReact>
			</div>
		</>
	)
}

export default QUMapLocation
