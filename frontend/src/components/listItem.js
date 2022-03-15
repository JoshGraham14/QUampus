export const ListItem = props => {
	const { page, item } = props

	const buildRender = page => {
		if (page === 'dining') {
			return (
				<div>
					<h4>{item.name}</h4>
					<p>Location: {item.location}</p>
					<p>Commonly known as: {item.alt_name}</p>
				</div>
			)
		} else if (page === 'lecturehalls') {
			return (
				<div>
					<h4>{item.name}</h4>
					<p>Address: {item.address}</p>
					<p>Faculty: {item.faculty}</p>
				</div>
			)
		} else {
			return (
				<div>
					<h4>{item.name}</h4>
					<p>Address: {item.address}</p>
					<p>Commonly Known As: {item.alt_name}</p>
				</div>
			)
		}
	}

	return <>{buildRender(page)}</>
}
