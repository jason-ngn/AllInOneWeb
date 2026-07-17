import Logo from "@/components/Logo";
import AssignmentsViewList from "@/app/components/AssignmentsListView/AssignmentsListViewList";
import CourseList from "@/components/CourseList/CourseList";
import LineBreak from "@/components/LineBreak";
import Status from "@/components/Status";

export default function SidePanel() {
	return (
		<div className="p-6 h-screen bg-side-panel flex flex-col gap-4">
			<Logo />
			<AssignmentsViewList />
			<CourseList />
			<div className="mt-auto flex flex-col gap-4">
				<LineBreak />
				<Status />
			</div>
		</div>
	);
}
