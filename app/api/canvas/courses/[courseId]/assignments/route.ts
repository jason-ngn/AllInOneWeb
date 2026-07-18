import { type NextRequest } from "next/server";

const BASE = process.env.CANVAS_BASE_URL;
const TOKEN = process.env.CANVAS_ACCESS_TOKEN;

export async function GET(
	_req: NextRequest,
	{ params }: { params: Promise<{ courseId: string }> },
) {
	const { courseId } = await params;
	const res = await fetch(`${BASE}/courses/${courseId}/assignments`, {
		headers: {
			Authorization: `Bearer ${TOKEN}`,
		},
	});
	if (!res.ok)
		return new Response("Canvas error", {
			status: res.status,
		});
	const data = await res.json();
	return Response.json(data);
}
