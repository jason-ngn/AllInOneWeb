import SidePanel from "@/components/SidePanel";
import AssignmentsViewer from "@/app/components/AssignmentsViewer/AssignmentsViewer";

export default function Dashboard() {
	return (
		<div className="flex flex-row h-screen bg-white text-black">
			<div className="w-1/5 overflow-hidden">
				<SidePanel />
			</div>
			<div className="w-4/5 overflow-y-auto">
				<AssignmentsViewer
					title="All Assignments"
					numOfAssignments={12}
					numOfCourses={4}
				/>
			</div>
		</div>
	);
}
