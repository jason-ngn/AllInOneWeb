import SearchBar from "@/components/AssignmentsViewer/SearchBar";
import CourseSelector from "@/components/AssignmentsViewer/CourseSelector";
import Sorter from "@/components/AssignmentsViewer/Sorter";
import { Dispatch, SetStateAction } from "react";

export default function AssignmentsViewerToolbar({
	onSearchChange,
}: {
	onSearchChange: Dispatch<SetStateAction<string>>;
}) {
	return (
		<div className="flex flex-row gap-4 justify-start items-start">
			<div className="w-1/3">
				<SearchBar onQueryChange={onSearchChange} />
			</div>
			<CourseSelector />
			<Sorter />
		</div>
	);
}
