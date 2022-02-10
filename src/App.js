import React from 'react'
import './css/app.css'
import QUMap from './components/QUMap'

function App() {
	return (
		<div className='App'>
			<h1>QUampus</h1>
			<div className='map-container'>
				<QUMap />
			</div>
		</div>
	)
}

export default App
