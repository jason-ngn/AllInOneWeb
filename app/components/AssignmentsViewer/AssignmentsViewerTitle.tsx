export default function AssignmentsViewerTitle({
	title,
	numOfAssignments,
	numOfCourses,
}: {
	title: string;
	numOfAssignments: number;
	numOfCourses: number;
}) {
	return (
		<div>
			<div className="font-bold text-xl">{title}</div>
			<div className="text-subtext">
				{numOfAssignments} items across {numOfCourses} courses
			</div>
		</div>
	);
}
