import axios from 'axios'
import { useState, useEffect } from 'react'
import { LectureHallItem } from '../components/lectureHallItem'

const LectureHall = () => {
	const [lectureHallOptions, setAllLectureHallOptions] = useState([])

	useEffect(() => {
		axios.get('http://127.0.0.1:8000/lecture-hall/').then(response => {
			setAllLectureHallOptions(response.data)
		})
	}, [])
	return (
		<div>
			<h2>Lecture Halls</h2>
			{lectureHallOptions.map(item => {
				return <LectureHallItem key={item.name} item={item} />
			})}
		</div>
	)
}

export default LectureHall
