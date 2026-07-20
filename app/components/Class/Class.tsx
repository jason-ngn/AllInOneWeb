import { AssignmentType } from "@/app/lib/types";
import Assignment from "@/components/Class/Assignment";

export default function Class({
	courseCode,
	name,
	assignments,
	manuallyCompleted,
	onToggleComplete,
}: {
	courseCode: string;
	name: string;
	assignments: AssignmentType[];
	manuallyCompleted: Set<string>;
	onToggleComplete: (id: string) => void;
}) {
	return (
		<div>
			<div className="flex flex-row justify-between items-center py-2">
				<div className="flex flex-row justify-center items-center gap-2">
					<div className="font-semibold text-xl">{courseCode}</div>
					<div className="text-text-inactive">{name}</div>
				</div>
				<div className="text-text-inactive">
					{assignments.filter((a) => !(a.submitted || a.graded)).length} to do
				</div>
			</div>

			{assignments.length ? (
				assignments.map((a, i) => {
					return (
						<div key={i} className="px-2 py-6">
							<Assignment
								id={a.id}
								name={a.name}
								maxScore={a.pointsPossible}
								dueDate={a.dueAt}
								link={a.htmlUrl}
								submitted={a.submitted}
								graded={a.graded}
								source={a.source}
								manuallyCompleted={manuallyCompleted}
								onToggleComplete={onToggleComplete}
							/>
						</div>
					);
				})
			) : (
				<div className="py-2 text-text-inactive">No assignments</div>
			)}
		</div>
	);
}
