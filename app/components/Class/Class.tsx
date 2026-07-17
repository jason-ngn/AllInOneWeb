import Assignment from "@/components/Class/Assignment";

export default function Class() {
	const assignments: string[] = ["1", "2"];

	return (
		<div className="w-4/5">
			<div className="flex flex-row justify-between items-center py-2">
				<div className="flex flex-row justify-center items-center gap-2">
					<div className="font-semibold text-xl">CS 100</div>
					<div className="text-text-inactive">Software Construction</div>
				</div>
				<div className="text-text-inactive">3 to do</div>
			</div>

			<div className="py-2">
				{assignments.map((a, i) => {
					return (
						<div key={i} className="px-2 py-4">
							<Assignment name={a} />
						</div>
					);
				})}
			</div>
		</div>
	);
}
