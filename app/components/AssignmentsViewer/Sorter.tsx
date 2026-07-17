"use client";

import { useState } from "react";

const SORT_OPTIONS = ["Due date", "Name", "Course", "Status"];

export default function Sorter() {
	const [open, setOpen] = useState<boolean>(false);
	const [selected, setSelected] = useState<string>(SORT_OPTIONS[0]);

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
						{SORT_OPTIONS.map((option) => (
							<li
								key={option}
								onClick={() => {
									setSelected(option);
									setOpen(false);
								}}
								className="cursor-pointer px-2 py-1 rounded-xl hover:bg-white text-text-inactive hover:text-black hover:shadow-lg"
							>
								{option}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
