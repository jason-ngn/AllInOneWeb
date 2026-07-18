import { AssignmentType } from "@/app/lib/types";
import Assignment from "@/components/Class/Assignment";

export default function Class({
	courseCode,
	name,
	assignments,
}: {
	courseCode: string;
	name: string;
	assignments: AssignmentType[];
}) {
	return (
		<div>
			<div className="flex flex-row justify-between items-center py-2">
				<div className="flex flex-row justify-center items-center gap-2">
					<div className="font-semibold text-xl">{courseCode}</div>
					<div className="text-text-inactive">{name}</div>
				</div>
				<div className="text-text-inactive">{assignments.length} to do</div>
			</div>

			{assignments.length ? (
				assignments.map((a, i) => {
					return (
						<div key={i} className="px-2 py-6">
							<Assignment
								name={a.name}
								maxScore={a.pointsPossible}
								dueDate={a.dueAt}
								link={a.htmlUrl}
								submitted={a.submitted}
								graded={a.graded}
								source={a.source}
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
