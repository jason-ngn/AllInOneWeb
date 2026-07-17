"use client";
import { useState } from "react";
import AssignmentsViewItem from "@/components/AssignmentsListView/AssignmentsListViewItem";

export default function AssignmentsViewList() {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	const items = [
		{ name: "All Assignments", numOfAssignments: 3 },
		{ name: "Today", numOfAssignments: 3 },
		{ name: "Upcoming", numOfAssignments: 3 },
		{ name: "Completed", numOfAssignments: 3 },
	];

	return (
		<div className="flex flex-col gap-1 justify-center items-center">
			{items.map((item, i) => (
				<AssignmentsViewItem
					key={item.name}
					name={item.name}
					numOfAssignments={item.numOfAssignments}
					active={activeIndex === i}
					onSelect={() => setActiveIndex(i)}
				/>
			))}
		</div>
	);
}
