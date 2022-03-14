import axios from 'axios'
import { useState, useEffect } from 'react'
import { ResidenceItem } from '../components/residenceItem'

const Residences = () => {
	const [residenceOptions, setAllResidenceOptions] = useState([])

	useEffect(() => {
		axios.get('http://127.0.0.1:8000/dining/').then(response => {
			setAllResidenceOptions(response.data)
		}) // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div>
			<h2>Dining Options</h2>
			{residenceOptions.map(item => {
				return <ResidenceItem key={item.name} item={item} />
			})}
		</div>
	)
}

export default Residences
