export default function AssignmentsViewItem({
	name,
	numOfAssignments,
	overdue = false,
	active = false,
	onSelect,
}: {
	name: string;
	numOfAssignments: number;
	overdue?: boolean;
	active?: boolean;
	onSelect?: () => void;
}) {
	return (
		<div
			onClick={onSelect}
			className={`flex flex-row px-3 py-2 rounded-xl justify-between items-center w-full cursor-pointer ${active ? "bg-white" : "text-text-inactive"}`}
		>
			<div>{name}</div>
			<div className={overdue == true ? "text-overdue" : ""}>
				{numOfAssignments}
			</div>
		</div>
	);
}
