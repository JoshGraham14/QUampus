import { Outlet, Link } from 'react-router-dom'

const Home = () => {
	return (
		<div>
			<h2>Home</h2>
			<Link to='/dining'>Dining</Link>
			<Link to='/lecturehalls'>Lecture Halls</Link>
			<Link to='/residences'>Residences</Link>
			<Outlet />
		</div>
	)
}

export default Home
