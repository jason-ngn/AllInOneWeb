"use client";
import { useEffect, useState } from "react";
import { CourseItem } from "@/lib/types";
import SidePanel from "@/components/SidePanel";
import AssignmentsViewer from "@/app/components/AssignmentsViewer/AssignmentsViewer";
import { fetchDashboardData } from "@/lib/api";

const CACHE_KEY = "dashboard_cache";

function hydrateDates(items: CourseItem[]) {
	return items.map((c) => ({
		...c,
		assignments: c.assignments.map((a) => ({ ...a, dueAt: new Date(a.dueAt) })),
	}));
}

type Filter = "all" | "today" | "upcoming" | "completed" | "overdue";

function DashboardSkeleton() {
	return (
		<div className="flex flex-row h-screen bg-white animate-pulse">
			<div className="w-1/5 border-r border-gray-100 p-4 flex flex-col gap-3">
				<div className="h-8 bg-gray-200 rounded w-3/4" />
				{[...Array(5)].map((_, i) => (
					<div key={i} className="h-6 bg-gray-100 rounded" />
				))}
			</div>
			<div className="w-4/5 p-8 flex flex-col gap-4">
				<div className="h-8 bg-gray-200 rounded w-1/3" />
				<div className="h-px bg-gray-100" />
				{[...Array(4)].map((_, i) => (
					<div key={i} className="h-12 bg-gray-100 rounded" />
				))}
			</div>
		</div>
	);
}

export default function DashboardClient() {
	const [filter, setFilter] = useState<Filter>("all");
	const [canvasItems, setCanvasItems] = useState<CourseItem[]>([]);
	const [gradescopeItems, setGradescopeItems] = useState<CourseItem[]>([]);
	const [canvasOk, setCanvasOk] = useState(false);
	const [gradescopeOk, setGradescopeOk] = useState(false);
	const [loading, setLoading] = useState(true);
	const [manuallyCompleted, setManuallyCompleted] = useState<Set<string>>(
		new Set(),
	);

	function toggleComplete(id: string) {
		setManuallyCompleted((prev) => {
			const next = new Set(prev);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			return next;
		});
	}

	const titles: Record<string, string> = {
		all: "All Assignments",
		today: "Today",
		upcoming: "Upcoming",
		completed: "Completed",
		overdue: "Overdue",
	};

	useEffect(() => {
		async function load() {
			try {
				const raw = localStorage.getItem(CACHE_KEY);
				if (raw) {
					const { canvasItems, gradescopeItems } = JSON.parse(raw);
					setCanvasItems(hydrateDates(canvasItems));
					setGradescopeItems(hydrateDates(gradescopeItems));
					setCanvasOk(true);
					setGradescopeOk(true);
					setLoading(false);
				}
			} catch {}

			const data = await fetchDashboardData();
			setCanvasItems(data.canvasItems);
			setGradescopeItems(data.gradescopeItems);
			setCanvasOk(data.canvasOk);
			setGradescopeOk(data.gradescopeOk);
			setLoading(false);

			localStorage.setItem(
				CACHE_KEY,
				JSON.stringify({
					canvasItems: data.canvasItems,
					gradescopeItems: data.gradescopeItems,
					ts: Date.now(),
				}),
			);
		}

		load();

		const id = setInterval(load, 5 * 60 * 1000);

		return () => clearInterval(id);
	}, []);

	if (loading) return <DashboardSkeleton />;

	return (
		<div className="flex flex-row h-screen bg-white text-black">
			<div className="w-1/5 overflow-y-auto">
				<SidePanel
					canvasItems={canvasItems}
					gradescopeItems={gradescopeItems}
					canvasOk={canvasOk}
					gradescopeOk={gradescopeOk}
					activeFilter={filter}
					onFilterChange={(f: Filter | string) => setFilter(f as Filter)}
					manuallyCompleted={manuallyCompleted}
				/>
			</div>
			<div className="w-4/5 overflow-y-auto">
				<AssignmentsViewer
					title={titles[filter]}
					canvasItems={canvasItems}
					gradescopeItems={gradescopeItems}
					filter={filter}
					manuallyCompleted={manuallyCompleted}
					onToggleComplete={toggleComplete}
				/>
			</div>
		</div>
	);
}
