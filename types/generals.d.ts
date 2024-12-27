type Instructor = {
	id: number;
	title: string;
};

type Course = {
	id: number;
	title: string;
	subtitle: string;
	image_480x270: string;
	isPaid: boolean;
	price: number;
	numReviews: number;
	visibleInstructor: Instructor;
};

type SearchResponse = {
	results: Course[];
};
