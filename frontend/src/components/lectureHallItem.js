export const LectureHallItem = props => {
	return (
		<div>
			<h4>{props.item.name}</h4>
			<p>Address: {props.item.address}</p>
			<p>Faculty: {props.item.faculty}</p>
		</div>
	)
}
