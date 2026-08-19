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
