const EMAIL = process.env.GRADESCOPE_EMAIL;
const PASSWORD = process.env.GRADESCOPE_PASSWORD;
const BASE = process.env.GRADESCOPE_BASE_URL;

export async function GET() {
	const res = await fetch(`${BASE}/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email: EMAIL,
			password: PASSWORD,
		}),
	});
	if (!res.ok) return Response.json({ status: res.status });
	const data = await res.json();
	return Response.json(data);
}
