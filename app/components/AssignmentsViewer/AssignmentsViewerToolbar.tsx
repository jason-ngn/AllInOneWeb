import SearchBar from "@/components/AssignmentsViewer/SearchBar";
import CourseSelector from "@/components/AssignmentsViewer/CourseSelector";
import Sorter from "@/components/AssignmentsViewer/Sorter";
import { Dispatch, SetStateAction } from "react";
import { SortType, SourceFilter } from "@/app/lib/types";

export default function AssignmentsViewerToolbar({
	onSearchChange,
	onSourceFilterChange,
	onSortTypeChange,
}: {
	onSearchChange: Dispatch<SetStateAction<string>>;
	onSourceFilterChange: Dispatch<SetStateAction<SourceFilter>>;
	onSortTypeChange: Dispatch<SetStateAction<`${SortType}`>>;
}) {
	return (
		<div className="flex flex-row gap-4 justify-start items-start">
			<div className="w-1/3">
				<SearchBar onQueryChange={onSearchChange} />
			</div>
			<CourseSelector onSourceFilterChange={onSourceFilterChange} />
			<Sorter onSortTypeChange={onSortTypeChange} />
		</div>
	);
}
