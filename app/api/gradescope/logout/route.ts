import { type NextRequest } from "next/server";

const BASE = process.env.GRADESCOPE_BASE_URL;

export async function GET(_req: NextRequest) {
	const res = await fetch(`${BASE}/logout`, {
		method: "POST",
	});
	if (!res.ok) return Response.json({ status: res.status });
	return Response.json({ ok: true });
}
