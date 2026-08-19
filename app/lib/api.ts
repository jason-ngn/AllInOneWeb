import { CourseItem } from "@/lib/types";
import { gradescopeSemesterComparator } from "@/lib/gradescope";
import axios from "axios";

export const baseUrl =
	process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api";

export async function fetchDashboardData() {
	const canvasItems: CourseItem[] = [];
	const gradescopeItems: CourseItem[] = [];

	// Canvas
	const canvasCourses = await axios
		.get(`${baseUrl}/canvas/courses`)
		.catch(() => null);

	if (canvasCourses?.status === 200) {
		for (const course of canvasCourses.data) {
			canvasItems.push({
				id: parseInt(course.id),
				name: course.fullName,
				courseCode: course.name,
				assignments: [],
				source: "canvas",
			});
		}

		await Promise.all(
			canvasItems.map(async (c) => {
				const assignments = await axios
					.get(`${baseUrl}/canvas/courses/${c.id}/assignments`)
					.catch(() => null);

				if (assignments?.status === 200) {
					for (const a of assignments.data) {
						console.log(a);

						c.assignments.push({
							id: parseInt(a.id),
							name: a.name,
							pointsPossible: a.maxGrade,
							dueAt: a.dueDate ? new Date(a.dueDate) : null,
							status: a.status,
							htmlUrl: a.url,
							graded: a.grade > 0 ? true : false,
							submitted: 
						});
					}
				}
			}),
		);
	}

	//const canvasCourses = await fetch(`${baseUrl}/canvas/courses`)
	//	.then((r) => r.json())
	//	.catch((e) => console.log(e));

	//for (const c of canvasCourses) {
	//	if (!c.name) continue;
	//	if (c.end_at && new Date(c.end_at) < new Date()) continue;
	//	canvasItems.push({
	//		id: c.id,
	//		name: c.name,
	//		courseCode: c.courseCode,
	//		assignments: [],
	//		source: "canvas",
	//	});
	//}

	//await Promise.all(
	//	canvasItems.map(async (c) => {
	//		const assignments = await fetch(
	//			`${baseUrl}/canvas/courses/${c.id}/assignments`,
	//		)
	//			.then((r) => r.json())
	//			.catch(() => []);

	//		for (const a of assignments) {
	//			console.log(a);
	//		}
	//	}),
	//);

	//await Promise.all(
	//	canvasItems.map(async (c) => {
	//		const assignments = await fetch(`/api/canvas/courses/${c.id}/assignments`)
	//			.then((r) => r.json())
	//			.catch(() => []);
	//		for (const a of assignments) {
	//			c.assignments.push({
	//				id: a.id,
	//				name: a.name,
	//				pointsPossible: a.points_possible,
	//				dueAt: new Date(a.due_at),
	//				status: !a.availability_status
	//					? "none"
	//					: a.availability_status.status,
	//				htmlUrl: a.html_url,
	//				graded: a.submission?.workflow_state === "graded",
	//				submitted:
	//					a.submission?.workflow_state === "submitted" ||
	//					a.submission?.workflow_state === "graded" ||
	//					a.submission?.submitted_at,
	//				source: "canvas",
	//			});
	//		}
	//	}),
	//);

	//let gradescopeOk = false;
	//const loginRes = await fetch("/api/gradescope/login").catch(() => null);
	//if (loginRes?.ok) {
	//	gradescopeOk = true;
	//	const courses = await fetch("/api/gradescope/courses")
	//		.then((r) => r.json())
	//		.catch(() => ({ student: {} }));

	//	for (const cid of Object.keys(courses.student ?? {})) {
	//		const obj = courses.student[cid];
	//		if (!gradescopeSemesterComparator(obj.semester, obj.year)) continue;
	//		gradescopeItems.push({
	//			id: parseInt(cid),
	//			name: obj.full_name,
	//			courseCode: obj.name,
	//			assignments: [],
	//			source: "gradescope",
	//		});
	//	}

	//	await Promise.all(
	//		gradescopeItems.map(async (c) => {
	//			const assignments = await fetch(
	//				`/api/gradescope/assignments?course_id=${c.id}`,
	//			)
	//				.then((r) => r.json())
	//				.catch(() => []);

	//			for (const a of assignments) {
	//				if (a.grade !== null) continue;
	//				if (a.assignment_id === null) continue;
	//				c.assignments.push({
	//					id: a.assignment_id,
	//					name: a.name,
	//					pointsPossible: a.max_grade || 0,
	//					dueAt: new Date(a.due_date),
	//					status:
	//						a.submissions_status !== "No Submission"
	//							? "submitted"
	//							: "unsubmitted",
	//					htmlUrl: a.assignment_id
	//						? `https://www.gradescope.com/courses/${c.id}/assignments/${a.assignment_id}`
	//						: "",
	//					graded: a.grade !== null,
	//					submitted: a.submissions_status !== "No Submission",
	//					source: "gradescope",
	//				});
	//			}
	//		}),
	//	);

	//	await fetch("/api/gradescope/logout");
	//}

	return {
		canvasItems,
		gradescopeItems,
		canvasOk: canvasItems ? true : false,
		gradescopeOk: false,
	};
}
