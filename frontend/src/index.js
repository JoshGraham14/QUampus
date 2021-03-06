import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'

import Profile from './routes/profile'
// import MapPage from './routes/mapPage'
import Numbers from './routes/numbers'
import Forums from './routes/forums'
import Home from './routes/home'
import MapOptionsList from './routes/mapOptionsList'
import LoginSignup from './routes/loginSignup'
import LogIn from './routes/login'
import SignUp from './routes/signup'
import ChangePassword from './routes/changePassword'
import QUMapLocation from './routes/QUMapLocation'
import QUMap from './routes/QUMap'
import DirectMessages from './routes/directMessages'
import Thread from './routes/thread'

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<App />}>
					<Route index element={<Home />} />
					<Route
						path='/dining'
						element={<MapOptionsList page='dining' />}
					/>
					<Route
						path='/lecturehalls'
						element={<MapOptionsList page='lecturehall' />}
					/>
					<Route
						path='/residences'
						element={<MapOptionsList page='residence' />}
					/>
					<Route
						path='loginsignup'
						element={<LoginSignup message='' />}
					/>
					<Route path='/profile' element={<Profile />} />
					<Route path='/login' element={<LogIn />} />
					<Route path='/signup' element={<SignUp />} />
					<Route
						path='/maplocation'
						element={
							<QUMapLocation
							// defaultLocation={{
							// 	center: { lat: 44.2253, lng: -76.4951 },
							// 	zoom: 15,
							// }}
							/>
						}
					/>
					<Route
						path='/map'
						element={
							<QUMap
								defaultLocation={{
									center: { lat: 44.2253, lng: -76.4951 },
									zoom: 15,
								}}
							/>
						}
					/>
					<Route path='/numbers' element={<Numbers />} />
					<Route path='/forums' element={<Forums />} />
					<Route
						path='/changepassword'
						element={<ChangePassword />}
					/>
					<Route
						path='/directmessages'
						element={<DirectMessages />}
					/>
					<Route path='/thread' element={<Thread />} />
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
