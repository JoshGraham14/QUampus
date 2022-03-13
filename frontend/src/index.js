import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route, Redirect } from 'react-router-dom'
import App from './App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'
import Profile from './routes/profile'
import MapPage from './routes/mapPage'
import Numbers from './routes/numbers'
import Forums from './routes/forums'
import Home from './routes/home'

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<App />}>
					<Route index element={<Home />} />
					<Route path='/home' element={<Home />} />
					<Route path='profile' element={<Profile />} />
					<Route path='map' element={<MapPage />} />
					<Route path='numbers' element={<Numbers />} />
					<Route path='forums' element={<Forums />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()

reportWebVitals()
