export default function CourseListItem({
	name,
	numOfAssignments,
}: {
	name: string;
	numOfAssignments: number;
}) {
	return (
		<div className="flex flex-row p-2 justify-between items-center w-full text-black">
			<div>{name}</div>
			<div className="text-text-inactive">{numOfAssignments}</div>
		</div>
	);
}
