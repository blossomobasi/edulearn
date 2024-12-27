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
