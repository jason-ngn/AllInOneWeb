import Logo from "@/components/Logo";
import AssignmentsViewList from "@/app/components/AssignmentsListView/AssignmentsListViewList";
import CourseList from "@/components/CourseList/CourseList";
import LineBreak from "@/components/LineBreak";
import Status from "@/components/Status";
import { CourseItem } from "@/lib/types";

function isToday(date: Date) {
	const now = new Date();
	return (
		date.getFullYear() === now.getFullYear() &&
		date.getMonth() === now.getMonth() &&
		date.getDate() === now.getDate()
	);
}

export default function SidePanel({
	items,
	canvasOk = true,
	gradescopeOk = true,
	activeFilter,
	onFilterChange,
}: {
	items: CourseItem[];
	canvasOk: boolean;
	gradescopeOk: boolean;
	activeFilter: string;
	onFilterChange: (filter: string) => void;
}) {
	const all = items.flatMap((c) => c.assignments);
	const counts = {
		all: all.length,
		today: all.filter((a) => isToday(a.dueAt)).length,
		upcoming: all.filter((a) => a.dueAt > new Date() && !isToday(a.dueAt))
			.length,
		completed: all.filter((a) => a.submitted || a.graded).length,
	};

	const courseList: {
		name: string;
		numOfAssignments: number;
	}[] = items.map((item) => {
		return {
			name: item.name,
			numOfAssignments: item.assignments.length,
		};
	});

	return (
		<div className="p-6 h-screen bg-side-panel flex flex-col gap-4">
			<Logo />
			<AssignmentsViewList
				counts={counts}
				activeFilter={activeFilter}
				onFilterChange={onFilterChange}
			/>
			<CourseList items={courseList} />
			<div className="mt-auto flex flex-col gap-4">
				<LineBreak />
				<Status canvasOk={canvasOk} gradescopeOk={gradescopeOk} />
			</div>
		</div>
	);
}
