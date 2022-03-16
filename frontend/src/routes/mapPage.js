import QUMap from '../components/QUMap'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons'

const MapPage = () => {
	const location = useLocation()
	const { item } = location.state || {}
	const { page } = location.state || {}
	// item contains a dining/lecturehall/residence object
	// item can be passed to QUMap as a prop for information
	// to create the marker on the map

	const renderHeader = () => {
		console.log(page)
		if (item !== undefined) {
			return (
				<>
					<Link to={page === 'dining' ? '/dining' : '/' + page + 's'}>
						<FontAwesomeIcon
							className='icon back-btn'
							icon={faCircleChevronLeft}
						/>
					</Link>
					<h2 className='title'>Campus Map</h2>
				</>
			)
		} else {
			return <h2>Filter</h2>
		}
	}

	return (
		<div>
			{renderHeader()}
			<div className='map-container'>{<QUMap location={item} />}</div>
		</div>
	)
}

export default MapPage
