import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons'

import '../css/listItem.css'

export const ListItem = props => {
	const { page, item } = props

	const buildRender = page => {
		if (page === 'dining') {
			return (
				<div className='info'>
					<h4>{item.name}</h4>
					<p>Location: {item.location}</p>
					<p className='red'>Commonly known as: {item.alt_name}</p>
				</div>
			)
		} else if (page === 'lecturehall') {
			return (
				<div className='info'>
					<h4>{item.name}</h4>
					<p>Address: {item.address}</p>
					<p className='red'>Faculty: {item.faculty}</p>
				</div>
			)
		} else {
			return (
				<div className='info'>
					<h4>{item.name}</h4>
					<p>Address: {item.address}</p>
					<p className='red'>Commonly Known As: {item.alt_name}</p>
				</div>
			)
		}
	}

	return (
		<div className='list-item'>
			{buildRender(page)}
			<Link to={'/maplocation'} state={{ item, page }}>
				<FontAwesomeIcon className='map-icon' icon={faMapLocationDot} />
			</Link>
		</div>
	)
}
