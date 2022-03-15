import { Map, GoogleApiWrapper } from 'google-maps-react'

const mapStyles = {
	width: '100%',
	height: '80%',
	margin: 0,
}

export const QUMap = props => {
	return (
		<div>
			<Map
				zoom={16}
				google={props.google}
				style={mapStyles}
				initialCenter={{ lat: 44.2253, lng: -76.4951 }}
			/>
		</div>
	)
}

export default GoogleApiWrapper({
	apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
})(QUMap)
