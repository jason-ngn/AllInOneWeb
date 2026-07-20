import CourseListItem from "@/components/CourseList/CourseListItem";

export default function CourseList({
	items,
}: {
	items: {
		name: string;
		numOfAssignments: number;
	}[];
}) {
	return (
		<div>
			<div className="pb-3 text-text-inactive font-bold">Courses</div>
			{items.length ? (
				<div className="flex flex-col justify-center items-center">
					{items.map((item, i) => {
						return (
							<CourseListItem
								name={item.name}
								numOfAssignments={item.numOfAssignments}
								key={i}
							/>
						);
					})}
				</div>
			) : (
				<div className="text-text-inactive">No courses available</div>
			)}
		</div>
	);
}
