"use client";
import AssignmentsViewItem from "@/components/AssignmentsListView/AssignmentsListViewItem";

type Counts = {
	all: number;
	today: number;
	upcoming: number;
	completed: number;
};

export default function AssignmentsViewList({
	counts,
	activeFilter,
	onFilterChange,
}: {
	counts: Counts;
	activeFilter: string;
	onFilterChange: (f: string) => void;
}) {
	const items = [
		{ name: "All Assignments", key: "all", numOfAssignments: counts.all },
		{ name: "Today", key: "today", numOfAssignments: counts.today },
		{ name: "Upcoming", key: "upcoming", numOfAssignments: counts.upcoming },
		{ name: "Completed", key: "completed", numOfAssignments: counts.completed },
	];

	return (
		<div className="flex flex-col gap-1 justify-center items-center">
			{items.map((item, i) => (
				<AssignmentsViewItem
					key={item.name}
					name={item.name}
					numOfAssignments={item.numOfAssignments}
					active={activeFilter === item.key}
					onSelect={() => onFilterChange(item.key)}
				/>
			))}
		</div>
	);
}
