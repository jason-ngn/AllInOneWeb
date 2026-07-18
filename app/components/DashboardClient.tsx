"use client";
import { useState } from "react";
import { CourseItem } from "@/lib/types";
import SidePanel from "@/components/SidePanel";
import AssignmentsViewer from "@/app/components/AssignmentsViewer/AssignmentsViewer";

type Filter = "all" | "today" | "upcoming" | "completed";

export default function DashboardClient({
	items,
	canvasOk,
	gradescopeOk,
}: {
	items: CourseItem[];
	canvasOk: boolean;
	gradescopeOk: boolean;
}) {
	const [filter, setFilter] = useState<Filter>("all");

	const titles: Record<string, string> = {
		all: "All Assignments",
		today: "Today",
		upcoming: "Upcoming",
		completed: "Completed",
	};

	return (
		<div className="flex flex-row h-screen bg-white text-black">
			<div className="w-1/5 overflow-hidden">
				<SidePanel
					items={items}
					canvasOk={canvasOk}
					gradescopeOk={gradescopeOk}
					activeFilter={filter}
					onFilterChange={(f: Filter | string) => setFilter(f as Filter)}
				/>
			</div>
			<div className="w-4/5 overflow-y-auto">
				<AssignmentsViewer
					title={titles[filter]}
					items={items}
					filter={filter}
				/>
			</div>
		</div>
	);
}
