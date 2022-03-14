import axios from 'axios'
import { useState, useEffect } from 'react'

const Dining = () => {
	const [diningOptions, setAllDiningOptions] = useState([])

	useEffect(() => {
		axios.get('http://127.0.0.1:8000/dining/').then(response => {
			setAllDiningOptions(response.data)
		}) // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div>
			<h2>Dining Options</h2>
			{diningOptions.map(item => {
				return (
					<div>
						<h4 key={item.name}>{item.name}</h4>
						<p>Location: {item.location}</p>
						<p>Commonly known as: {item.alt_name}</p>
					</div>
				)
			})}
		</div>
	)
}

export default Dining
