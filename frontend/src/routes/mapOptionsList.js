import axios from 'axios'
import { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

import { ListItem } from '../components/listItem'

const MapOptionsList = props => {
	const { page } = props
	const [listOptions, setAllListOptions] = useState([])

	useEffect(() => {
		console.log(`trying http://127.0.0.1:8000/${page}/`)
		axios.get(`http://127.0.0.1:8000/${page}/`).then(response => {
			setAllListOptions(response.data)
		}) // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const getTitle = page => {
		if (page === 'dining') return <h2>Dining</h2>
		else if (page === 'residence') return <h2>Residences</h2>
		else return <h2>Lecture Halls</h2>
	}

	return (
		<div>
			<Link to='/'>Back</Link>
			{getTitle(page)}
			{listOptions.map(item => {
				return <ListItem key={item.name} item={item} page={page} />
			})}
		</div>
	)
}

export default MapOptionsList
