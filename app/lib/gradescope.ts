const BASE = process.env.GRADESCOPE_BASE_URL;

export async function loginGradescope() {
	const res = await fetch(`${BASE}/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email: process.env.GRADESCOPE_EMAIL,
			password: process.env.GRADESCOPE_PASSWORD,
		}),
	});
	if (!res.ok) throw new Error(`Gradescope login failed: ${res.status}`);
	return res.ok;
}

export async function logoutGradescope() {
	const res = await fetch(`${BASE}/logout`, {
		method: "POST",
	});
	if (!res.ok) throw new Error(`Gradescope logout failed: ${res.status}`);
	return res.ok;
}

export async function getGradescopeCourses() {
	const res = await fetch(`${BASE}/courses`, {
		method: "POST",
	});
	if (!res.ok) throw new Error(`Gradescope courses failed: ${res.status}`);
	return res.json();
}

export async function getGradescopeAssignments(courseId: string) {
	const res = await fetch(`${BASE}/assignments?course_id=${courseId}`, {
		method: "POST",
		headers: {
			accept: "application/json",
		},
	});
	if (!res.ok) throw new Error(`Gradescope assignments failed: ${res.status}`);
	return res.json();
}

export function gradescopeSemesterComparator(semester: string, year: string) {
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear().toString();
	const currentMonth = currentDate.getMonth() + 1;
	if (year !== currentYear) return false;

	if (semester === "Fall") {
		if (currentMonth >= 10 && currentMonth <= 12) return true;
		else return false;
	} else if (semester === "Winter") {
		if (currentMonth >= 1 && currentMonth <= 3) return true;
		else return false;
	} else if (semester === "Spring") {
		if (currentMonth >= 4 && currentMonth <= 6) return true;
		else return false;
	} else if (semester === "Fall") {
		if (currentMonth >= 7 && currentMonth <= 8) return true;
		else return false;
	} else return true;
}
