"use client";

import { useState } from "react";

export default function CourseSelector() {
	const [activeIndex, setActiveIndex] = useState<number>(0);

	return (
		<div className="flex flex-row justify-center items-center text-text-inactive gap-2 p-1 bg-search-bar-bg rounded-xl border-line-break border">
			<div
				onClick={() => setActiveIndex(0)}
				className={`${activeIndex === 0 ? "bg-white shadow-lg text-black" : ""} rounded-xl py-2 px-3 cursor-pointer`}
			>
				All
			</div>
			<div
				onClick={() => setActiveIndex(1)}
				className={`${activeIndex === 1 ? "bg-white shadow-lg text-black" : ""} rounded-xl py-2 px-3 cursor-pointer`}
			>
				Canvas
			</div>
			<div
				onClick={() => setActiveIndex(2)}
				className={`${activeIndex === 2 ? "bg-white shadow-lg text-black" : ""} rounded-xl py-2 px-3 cursor-pointer`}
			>
				Gradescope
			</div>
		</div>
	);
}
