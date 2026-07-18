import DashboardData, { DashboardSkeleton } from "@/components/DashboardData";
import { Suspense } from "react";

export default function Dashboard() {
	return (
		<Suspense fallback={<DashboardSkeleton />}>
			<DashboardData />
		</Suspense>
	);
}
