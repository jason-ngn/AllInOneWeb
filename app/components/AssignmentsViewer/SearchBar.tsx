"use client";

import { Dispatch, SetStateAction, useState } from "react";

export default function SearchBar({
	onQueryChange,
}: {
	onQueryChange: Dispatch<SetStateAction<string>>;
}) {
	const [query, setQuery] = useState<string>("");

	return (
		<div className="border-line-break border rounded-xl bg-search-bar-bg p-3 flex flex-row gap-2 items-center">
			<div className="text-text-inactive">⌕</div>
			<input
				type="text"
				value={query}
				onChange={(e) => {
					setQuery(e.target.value);
					onQueryChange(e.target.value);
				}}
				placeholder="Search assignments..."
				className="bg-transparent outline-none text-text-inactive w-full"
			/>
		</div>
	);
}
