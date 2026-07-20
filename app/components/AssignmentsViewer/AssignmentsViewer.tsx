"use client";
import LineBreak from "@/components/LineBreak";
import AssignmentsViewerTitle from "@/components/AssignmentsViewer/AssignmentsViewerTitle";
import AssignmentsViewerToolbar from "@/components/AssignmentsViewer/AssignmentsViewerToolbar";
import Class from "@/components/Class/Class";
import { CourseItem, SortType, SourceFilter } from "@/app/lib/types";
import { useEffect, useState } from "react";

function isToday(date: Date) {
	const now = new Date();
	return (
		date.getFullYear() === now.getFullYear() &&
		date.getMonth() === now.getMonth() &&
		date.getDate() === now.getDate()
	);
}

export default function AssignmentsViewer({
	title,
	canvasItems,
	gradescopeItems,
	filter,
	manuallyCompleted,
	onToggleComplete,
}: {
	title: string;
	canvasItems: CourseItem[];
	gradescopeItems: CourseItem[];
	filter: string;
	manuallyCompleted: Set<string>;
	onToggleComplete: (id: string) => void;
}) {
	const [query, setQuery] = useState("");
	const [sourceFilter, setSourceFilter] = useState<SourceFilter>("all");
	const [sortType, setSortType] = useState<`${SortType}`>("due_date");

	const now = new Date();
	const filtered = canvasItems.concat(gradescopeItems).map((c) => ({
		...c,
		assignments: c.assignments
			.filter((a) => {
				if (filter === "today") return isToday(a.dueAt);
				if (filter === "upcoming") return a.dueAt > now && !isToday(a.dueAt);
				if (filter === "completed")
					return a.submitted || a.graded || manuallyCompleted.has(a.id);
				if (filter === "overdue")
					return a.dueAt < now && !a.submitted && !a.graded;
				return true;
			})
			.filter((a) =>
				sourceFilter === "all" ? true : a.source === sourceFilter,
			)
			.filter(
				(a) =>
					query === "" || a.name.toLowerCase().includes(query.toLowerCase()),
			)
			.sort((a, b) => {
				if (sortType === "name") return a.name.localeCompare(b.name);
				if (sortType === "course") {
					const order: Record<string, number> = {
						canvas: 0,
						gradescope: 1,
					};
					return (order[a.source] ?? 2) - (order[b.source] ?? 2);
				}
				if (sortType === "status") {
					const priority = (x: {
						graded: boolean;
						submitted: boolean;
						dueAt: Date;
					}) => {
						if (x.graded) return 3;
						if (x.submitted) return 2;
						if (x.dueAt < now) return 0; // overdue, not yet submitted
						return 1; // unsubmitted, not yet due
					};
					return priority(a) - priority(b);
				}
				return b.dueAt.getTime() - a.dueAt.getTime();
			}),
	}));
	const numOfAssignments: number = filtered.reduce((prev, curr) => {
		return prev + curr.assignments.length;
	}, 0);

	return (
		<div className="flex flex-col gap-4 px-8 py-6 w-full">
			<AssignmentsViewerTitle
				title={title}
				numOfAssignments={numOfAssignments}
				numOfCourses={canvasItems.concat(gradescopeItems).length}
			/>
			<LineBreak />
			<AssignmentsViewerToolbar
				onSearchChange={setQuery}
				onSourceFilterChange={setSourceFilter}
				onSortTypeChange={setSortType}
			/>
			{filtered.length ? (
				filtered.map((c, i) => {
					return (
						<div key={i}>
							<Class
								courseCode={c.courseCode}
								name={c.name}
								assignments={c.assignments}
								manuallyCompleted={manuallyCompleted}
								onToggleComplete={onToggleComplete}
							/>
						</div>
					);
				})
			) : (
				<div className="text-text-inactive py-2">No courses available</div>
			)}
		</div>
	);
}
