type Course = {
	title: string;
	subtitle: string;
	image: string;
	isPaid: boolean;
	price: number;
	numReviews: number;
};

type SearchResponse = {
	results: Course[];
};
