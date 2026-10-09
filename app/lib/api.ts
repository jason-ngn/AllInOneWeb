import { CourseItem } from "@/lib/types";
import axios from "axios";

export const baseUrl =
	process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api";

interface CanvasCourseRaw {
	id: number;
	fullName: string;
	name: string;
}

interface CanvasAssignmentRaw {
	id: number;
	name: string;
	maxGrade: number;
	grade: number;
	dueDate: string | null;
	status: string;
	url: string;
}

interface GradescopeCourseRaw {
	id: number;
	fullName: string;
	name: string;
}

interface GradescopeAssignmentRaw {
	id: number;
	name: string;
	maxGrade: number;
	dueDate: string | null;
	status: string;
	url: string;
}

export async function fetchDashboardData() {
	// Canvas and Gradescope are independent, so fetch them concurrently
	const [{ canvasItems, canvasOk }, { gradescopeItems, gradescopeOk }] =
		await Promise.all([fetchCanvas(), fetchGradescope()]);

	return { canvasItems, gradescopeItems, canvasOk, gradescopeOk };
}

async function fetchCanvas() {
	const canvasItems: CourseItem[] = [];

	let canvasCourses;
	try {
		canvasCourses = await axios.get<CanvasCourseRaw[]>(
			`${baseUrl}/canvas/courses`,
		);
	} catch {
		canvasCourses = null;
	}

	const canvasOk = canvasCourses?.status === 200;

	if (canvasCourses && canvasOk) {
		for (const course of canvasCourses.data) {
			if (course.name === "Analytical_Writing_Placement_Exam") continue;
			canvasItems.push({
				id: course.id,
				name: course.fullName,
				courseCode: course.name,
				assignments: [],
				source: "canvas",
			});
		}

		await Promise.all(
			canvasItems.map(async (c) => {
				let assignments;
				try {
					assignments = await axios.get<CanvasAssignmentRaw[]>(
						`${baseUrl}/canvas/courses/${c.id}/assignments`,
					);
				} catch {
					assignments = null;
				}

				if (assignments?.status === 200) {
					for (const a of assignments.data) {
						if (a.status === "graded") continue;
						if (!a.dueDate) continue;
						const dueDate = new Date(a.dueDate ?? "");
						const today = new Date();

						if (a.status === "submitted" && (today > dueDate || !a.dueDate))
							continue;

						c.assignments.push({
							id: a.id,
							name: a.name,
							pointsPossible: a.maxGrade,
							dueAt: a.dueDate ? new Date(a.dueDate) : null,
							status: a.status,
							htmlUrl: a.url,
							graded: a.grade > 0 ? true : false,
							submitted: a.status === "submitted",
							source: "canvas",
						});
					}
				}
			}),
		);
	}

	return { canvasItems, canvasOk };
}

async function fetchGradescope() {
	const gradescopeItems: CourseItem[] = [];
	let gradescopeOk = true;

	// The server logs in on its own when it has no session
	let courses: GradescopeCourseRaw[];
	try {
		const res = await axios.post<GradescopeCourseRaw[]>(
			`${baseUrl}/gradescope/courses`,
		);
		courses = res.data;
	} catch {
		courses = [];
		gradescopeOk = false;
	}

	for (const c of courses) {
		gradescopeItems.push({
			id: c.id,
			name: c.fullName,
			courseCode: c.name,
			assignments: [],
			source: "gradescope",
		});
	}

	await Promise.all(
		gradescopeItems.map(async (c) => {
			let assignments: GradescopeAssignmentRaw[];
			try {
				const res = await axios.post<GradescopeAssignmentRaw[]>(
					`${baseUrl}/gradescope/assignments`,
					{ courseId: c.id },
				);
				assignments = res.data;
			} catch {
				assignments = [];
			}

			for (const a of assignments) {
				if (!a.url) continue;
				if (!a.dueDate) continue;
				if (a.status === "graded") continue;
				const dueDate = new Date(a.dueDate ?? "");
				const today = new Date();

				if (a.status === "submitted" && (today > dueDate || !a.dueDate))
					continue;

				c.assignments.push({
					id: a.id,
					name: a.name,
					pointsPossible: a.maxGrade,
					dueAt: a.dueDate ? new Date(a.dueDate) : null,
					status: a.status,
					htmlUrl: a.url,
					graded: a.status === "graded",
					submitted: a.status === "submitted",
					source: "gradescope",
				});
			}
		}),
	);

	// The data is already fetched, so a failed logout isn't a fetch failure
	await axios.post(`${baseUrl}/gradescope/logout`).catch((e) => {
		console.log(e);
	});

	return { gradescopeItems, gradescopeOk };
}
