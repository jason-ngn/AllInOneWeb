import { SpeedInsights } from "@vercel/speed-insights/next";
import Dashboard from "./pages/Dashboard";

export default function Home() {
	return (
		<div>
			<SpeedInsights />
			<Dashboard />
		</div>
	);
}
