import LineBreak from "@/components/LineBreak";
import AssignmentsViewerTitle from "@/components/AssignmentsViewer/AssignmentsViewerTitle";
import AssignmentsViewerToolbar from "@/components/AssignmentsViewer/AssignmentsViewerToolbar";
import Class from "@/components/Class/Class";

export default function AssignmentsViewer({
	title,
	numOfAssignments,
	numOfCourses,
}: {
	title: string;
	numOfAssignments: number;
	numOfCourses: number;
}) {
	const classList: {
		name: string;
		assigments: string[];
	}[] = [
		{
			name: "CS 100",
			assigments: ["First", "Second", "Third"],
		},
		{
			name: "CS 111",
			assigments: ["First", "Second", "Third"],
		},
		{
			name: "CS 111",
			assigments: ["First", "Second", "Third"],
		},
		{
			name: "CS 111",
			assigments: ["First", "Second", "Third"],
		},
	];

	return (
		<div className="flex flex-col gap-4 px-8 py-6 w-full">
			<AssignmentsViewerTitle
				title={title}
				numOfAssignments={numOfAssignments}
				numOfCourses={numOfCourses}
			/>
			<LineBreak />
			<AssignmentsViewerToolbar />
			{classList.map((c, i) => {
				return <Class key={i} />;
			})}
		</div>
	);
}
