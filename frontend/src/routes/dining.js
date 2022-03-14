import axios from 'axios'
import { useState, useEffect } from 'react'
import { DiningItem } from '../components/diningItem'

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
				return <DiningItem key={item.name} item={item} />
			})}
		</div>
	)
}

export default Dining
