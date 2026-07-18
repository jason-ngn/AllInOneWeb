"use client";
import LineBreak from "@/components/LineBreak";
import AssignmentsViewerTitle from "@/components/AssignmentsViewer/AssignmentsViewerTitle";
import AssignmentsViewerToolbar from "@/components/AssignmentsViewer/AssignmentsViewerToolbar";
import Class from "@/components/Class/Class";
import { CourseItem } from "@/app/lib/types";
import { useState } from "react";

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
	items,
	filter,
}: {
	title: string;
	items: CourseItem[];
	filter: string;
}) {
	const [query, setQuery] = useState("");

	const now = new Date();
	const filtered = items.map((c) => ({
		...c,
		assignments: c.assignments
			.filter((a) => {
				if (filter === "today") return isToday(a.dueAt);
				if (filter === "upcoming") return a.dueAt > now && !isToday(a.dueAt);
				if (filter === "completed") return a.submitted || a.graded;
				return true;
			})
			.filter(
				(a) =>
					query === "" || a.name.toLowerCase().includes(query.toLowerCase()),
			),
	}));
	const numOfAssignments: number = filtered.reduce((prev, curr) => {
		return prev + curr.assignments.length;
	}, 0);

	return (
		<div className="flex flex-col gap-4 px-8 py-6 w-full">
			<AssignmentsViewerTitle
				title={title}
				numOfAssignments={numOfAssignments}
				numOfCourses={items.length}
			/>
			<LineBreak />
			<AssignmentsViewerToolbar onSearchChange={setQuery} />
			{filtered.map((c, i) => {
				return (
					<div key={i}>
						<Class
							courseCode={c.courseCode}
							name={c.name}
							assignments={c.assignments}
						/>
					</div>
				);
			})}
		</div>
	);
}
