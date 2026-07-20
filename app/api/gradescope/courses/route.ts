import { type NextRequest } from "next/server";

const BASE = process.env.GRADESCOPE_BASE_URL;

export async function GET(_req: NextRequest) {
	const res = await fetch(`${BASE}/courses`, {
		method: "POST",
	});

	if (!res.ok)
		return new Response("Cannot fetch Gradescope courses", {
			status: res.status,
		});

	const data = await res.json();
	return Response.json(data);
}
