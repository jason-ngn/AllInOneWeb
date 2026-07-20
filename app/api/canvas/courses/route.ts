const BASE = process.env.CANVAS_BASE_URL;
const TOKEN = process.env.CANVAS_ACCESS_TOKEN;

export async function GET() {
	const res = await fetch(`${BASE}/courses?include[]=course_progress`, {
		headers: { Authorization: `Bearer ${TOKEN}` },
	});
	if (!res.ok) return new Response("Canvas error", { status: res.status });
	const data = await res.json();
	return Response.json(data);
}
