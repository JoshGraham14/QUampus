import { useState, useEffect } from 'react'
import axios from 'axios'
import { NumberItem } from '../components/numberItem'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'

import '../css/numbers.css'

const Numbers = () => {
	const [phoneNumbers, setAllPhoneNumbers] = useState([])

	useEffect(() => {
		axios.get('http://127.0.0.1:8000/numbers/').then(response => {
			setAllPhoneNumbers(response.data)
		}) // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div>
			<h2 className='title near-top'>Numbers</h2>
			<div className='numbers-container'>
				{phoneNumbers.map(item => {
					return (
						<div key={item.name} className='numbers-wrapper'>
							<FontAwesomeIcon className='icon' icon={faPhone} />
							<NumberItem
								key={item.name}
								name={item.name}
								number={item.number}
							/>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Numbers
