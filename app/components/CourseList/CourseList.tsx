import CourseListItem from "@/components/CourseList/CourseListItem";

export default function CourseList() {
	const items: {
		name: string;
		numOfAssignments: number;
	}[] = [
		{
			name: "CS 100",
			numOfAssignments: 1,
		},
		{
			name: "CS 111",
			numOfAssignments: 2,
		},
		{
			name: "CS 120A",
			numOfAssignments: 4,
		},
		{
			name: "EDUC 010",
			numOfAssignments: 3,
		},
	];

	return (
		<div>
			<div className="pb-3 text-text-inactive font-bold">Courses</div>
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
		</div>
	);
}
