import { Map, GoogleApiWrapper } from 'google-maps-react'

const mapStyles = {
	width: '100vw',
	height: '85vh',
	margin: 0,
}

export const QUMap = props => {
	// if lat and long are given as props, they are used
	// otherwise, default values are used
	const { lat, long } = props.location || { lat: 44.2253, long: -76.4951 }

	return (
		<div>
			<Map
				zoom={16}
				google={props.google}
				style={mapStyles}
				initialCenter={{ lat: lat, lng: long }}
			/>
		</div>
	)
}

export default GoogleApiWrapper({
	apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
})(QUMap)
