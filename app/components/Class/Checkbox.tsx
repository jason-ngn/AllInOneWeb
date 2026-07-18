"use client";

import { useState } from "react";

export default function Checkbox() {
	const [clicked, setClicked] = useState<boolean>(false);

	return (
		<div className="pr-1">
			<input
				type="checkbox"
				onClick={() => setClicked(!clicked)}
				className={`cursor-pointer appearance-none p-3 border border-checkbox rounded-sm ${clicked ? "bg-ok" : ""}`}
			/>
		</div>
	);
}
