export default function CourseSelector() {
	return (
		<div className="flex flex-row justify-center items-center text-text-inactive gap-2 p-1 bg-search-bar-bg rounded-xl border-line-break border">
			<div className="bg-white shadow-lg/20 rounded-xl p-2 cursor-pointer">
				All
			</div>
			<div className="p-2 cursor-pointer">Canvas</div>
			<div className="p-2 cursor-pointer">Gradescope</div>
		</div>
	);
}
