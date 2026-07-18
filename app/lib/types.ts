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
