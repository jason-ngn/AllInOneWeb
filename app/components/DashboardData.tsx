import { CourseItem } from "@/lib/types";
import { baseUrl } from "@/lib/api";
import DashboardClient from "@/components/DashboardClient";

export default async function DashboardData() {
	const canvasItems: CourseItem[] = [];
	const gradescopeItems: CourseItem[] = [];

	const canvasCourses = await fetch(`${baseUrl}/api/canvas/courses`)
		.then((r) => r.json())
		.catch((e) => {
			console.log(e);
			return [];
		});

	for (const c of canvasCourses) {
		if (!c.name) continue;
		canvasItems.push({
			id: c.id,
			name: c.name,
			courseCode: c.course_code,
			assignments: [],
			source: "canvas",
		});
	}

	await Promise.all(
		canvasItems.map(async (c) => {
			const assignments = await fetch(
				`${baseUrl}/api/canvas/courses/${c.id}/assignments`,
			)
				.then((r) => r.json())
				.catch((e) => {
					console.log(e);
					return [];
				});

			for (const a of assignments) {
				//if (a.graded_submissions_exist) continue;
				c.assignments.push({
					id: a.id,
					pointsPossible: a.points_possible,
					dueAt: new Date(a.due_at),
					name: a.name,
					status: !a.availability_status
						? "none"
						: a.availability_status.status,
					htmlUrl: a.html_url,
					graded: a.graded_submissions_exist,
					submitted: a.has_submitted_submissions,
					source: "canvas",
				});
			}
		}),
	);

	return (
		<DashboardClient
			items={canvasItems}
			canvasOk={canvasItems.length > 0}
			gradescopeOk={gradescopeItems.length > 0}
		/>
	);
}

export function DashboardSkeleton() {
	return (
		<div className="flex flex-row h-screen bg-white animate-pulse">
			<div className="w-1/5 border-r border-gray-100 p-4 flex flex-col gap-3">
				<div className="h-8 bg-gray-200 rounded w-3/4" />
				{[...Array(5)].map((_, i) => (
					<div key={i} className="h-6 bg-gray-100 rounded" />
				))}
			</div>
			<div className="w-4/5 p-8 flex flex-col gap-4">
				<div className="h-8 bg-gray-200 rounded w-1/3" />
				<div className="h-px bg-gray-100" />
				{[...Array(4)].map((_, i) => (
					<div key={i} className="h-12 bg-gray-100 rounded" />
				))}
			</div>
		</div>
	);
}
