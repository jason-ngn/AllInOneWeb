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
	canvasItems,
	gradescopeItems,
	canvasOk = true,
	gradescopeOk = true,
	activeFilter,
	onFilterChange,
	manuallyCompleted,
}: {
	canvasItems: CourseItem[];
	gradescopeItems: CourseItem[];
	canvasOk: boolean;
	gradescopeOk: boolean;
	activeFilter: string;
	onFilterChange: (filter: string) => void;
	manuallyCompleted: Set<string>;
}) {
	const canvasAll = canvasItems.flatMap((c) => c.assignments);
	const gradescopeAll = gradescopeItems.flatMap((g) => g.assignments);
	const all = canvasAll.concat(gradescopeAll);
	const counts = {
		all: all.length,
		today: all.filter((a) => isToday(a.dueAt)).length,
		upcoming: all.filter((a) => a.dueAt > new Date() && !isToday(a.dueAt))
			.length,
		completed: all.filter(
			(a) => a.submitted || a.graded || manuallyCompleted.has(a.id),
		).length,
		overdue: all.filter(
			(a) => a.dueAt < new Date() && !a.submitted && !a.graded,
		).length,
	};

	const canvasCourseList: {
		name: string;
		numOfAssignments: number;
	}[] = canvasItems.map((item) => {
		return {
			name: item.name,
			numOfAssignments: item.assignments.length,
		};
	});

	const gradescopeCourseList: {
		name: string;
		numOfAssignments: number;
	}[] = gradescopeItems.map((item) => {
		return {
			name: item.name,
			numOfAssignments: item.assignments.length,
		};
	});

	const courseList = canvasCourseList.concat(gradescopeCourseList);

	return (
		<div className="p-6 min-h-full bg-side-panel flex flex-col gap-4">
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
