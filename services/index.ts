import $http from "./axios.config";

export const APIGetCourses = async (query: string): Promise<SearchResponse | undefined> => {
	try {
		const response = await $http.get("/courses", {
			params: {
				search: query,
			},
		});

		return response.data;
	} catch (error) {
		console.error("API Error: ", error);
	}
};

export const APIGetCourseById = async (courseId: string): Promise<Course | undefined> => {
	try {
		const response = await $http.get(`/courses/${courseId}`);

		return response.data;
	} catch (error) {
		console.error("API Error: ", error);
	}
};

export const APIGetRecommendedCourses = async (): Promise<SearchResponse | undefined> => {
	try {
		const response = await $http.get("/courses");

		return response.data;
	} catch (error) {
		console.error("API Error: ", error);
	}
};

export const APIGetCourseCurriculum = async (
	courseId: string,
	page: number
): Promise<CurriculumResponse | undefined> => {
	try {
		const response = await $http.get(`/courses/${courseId}/public-curriculum-items/?page=${page}`);

		return response.data;
	} catch (error) {
		console.error("API Error: ", error);
	}
};

export const APIGetCourseReviews = async (courseId: string): Promise<ReviewsResponse | undefined> => {
	try {
		const response = await $http.get(`/courses/${courseId}/reviews`);

		return response.data;
	} catch (error) {
		console.error("API Error: ", error);
	}
};
