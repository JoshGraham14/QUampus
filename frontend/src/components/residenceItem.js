export const ResidenceItem = props => {
	return (
		<div>
			<h4>{props.item.name}</h4>
			<p>Address: {props.item.address}</p>
			<p>Commonly Known As: {props.item.alt_name}</p>
		</div>
	)
}
