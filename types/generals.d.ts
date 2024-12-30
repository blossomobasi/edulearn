type Instructor = {
	id: number;
	title: string;
	display_name: string;
};

type Course = {
	id: number;
	title: string;
	subtitle: string;
	published_title: string;
	tracking_id: string;
	locale: {
		title: string;
		english_title: string;
		simple_english_title: string;
	};
	image_480x270: string;
	image_125_H: string;
	image_240x135: string;
	is_paid: boolean;
	price: number;
	num_reviews: number;
	visible_instructors: Instructor[];
	is_practise_test_course: boolean;
};

type CurriculumItem = {
	_class: string;
	id: number;
	title: string;
	description?: string;
	content_summary?: string;
	is_free?: boolean;
	sort_order?: number;
};

type User = {
	_class: string;
	id: number;
	name: string;
	display_name: string;
};

type Review = {
	_class: string;
	id: number;
	content: string;
	rating: number;
	created: string;
	modified?: string;
	user?: User;
	userModified?: string;
};

type SearchResponse = {
	results: Course[];
};
type ReviewsResponse = {
	results: Review[];
	count: number;
};
type CurriculumResponse = {
	results: CurriculumItem[];
	count: number;
	next: string | null;
	previous: string | null;
};
