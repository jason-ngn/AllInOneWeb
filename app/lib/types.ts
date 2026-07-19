export type AssignmentType = {
	id: string;
	name: string;
	pointsPossible: number;
	dueAt: Date;
	status: string;
	htmlUrl: string;
	graded: boolean;
	submitted: boolean;
	source: `${Source}`;
};

export type CourseItem = {
	id: number;
	name: string;
	courseCode: string;
	assignments: AssignmentType[];
	source: `${Source}`;
};

export enum Source {
	CANVAS = "canvas",
	GRADESCOPE = "gradescope",
}

export type SourceFilter = "all" | `${Source}`;

export enum SortType {
	DUE_DATE = "due_date",
	NAME = "name",
	COURSE = "course",
	STATUS = "status",
}
