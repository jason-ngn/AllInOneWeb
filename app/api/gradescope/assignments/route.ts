import { type NextRequest } from "next/server";

const BASE = process.env.GRADESCOPE_BASE_URL;

export async function GET(_req: NextRequest) {
	const course_id = _req.nextUrl.searchParams.get("course_id");
	const res = await fetch(`${BASE}/assignments?course_id=${course_id}`, {
		method: "POST",
		headers: {
			accept: "application/json",
		},
	});

	if (!res.ok)
		return new Response("Gradescope error", {
			status: res.status,
		});

	const data = await res.json();
	return Response.json(data);
}
