export const DiningItem = props => {
	return (
		<div>
			<h4>{props.item.name}</h4>
			<p>Location: {props.item.location}</p>
			<p>Commonly known as: {props.item.alt_name}</p>
		</div>
	)
}
