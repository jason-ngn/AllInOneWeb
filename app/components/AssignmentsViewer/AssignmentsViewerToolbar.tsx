import SearchBar from "@/components/AssignmentsViewer/SearchBar";
import CourseSelector from "@/components/AssignmentsViewer/CourseSelector";
import Sorter from "@/components/AssignmentsViewer/Sorter";

export default function AssignmentsViewerToolbar() {
	return (
		<div className="flex flex-row gap-4 justify-start items-center">
			<div className="w-1/3">
				<SearchBar />
			</div>
			<CourseSelector />
			<Sorter />
		</div>
	);
}
