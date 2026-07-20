"use client";

import { Dispatch, SetStateAction, useState } from "react";

export default function Checkbox({
	completed = false,
	onCheckboxClick,
	checkboxStatus,
}: {
	completed?: boolean;
	onCheckboxClick: Dispatch<SetStateAction<boolean>>;
	checkboxStatus: boolean;
}) {
	const [clicked, setClicked] = useState<boolean>(false);

	return (
		<div className="pr-1">
			<input
				type="checkbox"
				onClick={() => {
					setClicked(!clicked);
					onCheckboxClick(!checkboxStatus);
				}}
				className={`cursor-pointer appearance-none p-3 border border-checkbox rounded-sm ${completed ? "bg-ok" : clicked ? "bg-ok" : ""}`}
			/>
		</div>
	);
}
