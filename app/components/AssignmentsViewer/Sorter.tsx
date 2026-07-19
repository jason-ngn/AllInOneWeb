"use client";

import { SortType } from "@/app/lib/types";
import { Dispatch, SetStateAction, useState } from "react";

const SORT_OPTIONS: Record<string, string> = {
	due_date: "Due date",
	name: "Name",
	course: "Course",
	status: "Status",
};

export default function Sorter({
	onSortTypeChange,
}: {
	onSortTypeChange: Dispatch<SetStateAction<`${SortType}`>>;
}) {
	const [open, setOpen] = useState<boolean>(false);
	const [selected, setSelected] = useState<string>(SORT_OPTIONS["due_date"]);

	return (
		<div className="relative">
			<div className="border-line-break border rounded-xl bg-search-bar-bg p-1 text-text-inactive">
				<button
					onClick={() => setOpen((o) => !o)}
					className="w-full text-left cursor-pointer p-2"
				>
					Sort by: {selected}
				</button>
			</div>

			{open && (
				<div className="absolute top-0 left-0 w-full border-line-break border rounded-xl bg-search-bar-bg p-1 text-text-inactive z-50">
					<button
						onClick={() => setOpen(false)}
						className="w-full text-left cursor-pointer p-2"
					>
						Sort by: {selected}
					</button>
					<ul>
						{Object.keys(SORT_OPTIONS).map((option) => (
							<li
								key={option}
								onClick={() => {
									setSelected(SORT_OPTIONS[option]);
									onSortTypeChange(option as SortType);
									setOpen(false);
								}}
								className="cursor-pointer px-2 py-1 rounded-xl hover:bg-white text-text-inactive hover:text-black hover:shadow-lg"
							>
								{SORT_OPTIONS[option]}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
