import LineBreak from "@/components/LineBreak";
import AssignmentsViewerTitle from "@/components/AssignmentsViewer/AssignmentsViewerTitle";
import AssignmentsViewerToolbar from "@/components/AssignmentsViewer/AssignmentsViewerToolbar";

export default function AssignmentsViewer({
	title,
	numOfAssignments,
	numOfCourses,
}: {
	title: string;
	numOfAssignments: number;
	numOfCourses: number;
}) {
	return (
		<div className="flex flex-col gap-4 px-8 py-6 w-full">
			<AssignmentsViewerTitle
				title={title}
				numOfAssignments={numOfAssignments}
				numOfCourses={numOfCourses}
			/>
			<LineBreak />
			<AssignmentsViewerToolbar />
		</div>
	);
}
