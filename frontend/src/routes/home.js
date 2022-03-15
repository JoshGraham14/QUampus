import { Outlet, Link } from 'react-router-dom'

import logo from '../img/logo350.png'

import '../css/home.css'

const Home = () => {
	return (
		<div className='home-container'>
			<img className='logo' src={logo} alt='QUampus logo' />
			<div className='btn-container'>
				<Link className='btn' to='/dining'>
					Dining
				</Link>
				<Link className='btn' to='/lecturehalls'>
					Lecture Halls
				</Link>
				<Link className='btn' to='/residences'>
					Residences
				</Link>
				<Outlet />
			</div>
		</div>
	)
}

export default Home
