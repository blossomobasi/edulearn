import $http from "./axios.config";

export const APIGetCourses = async (query: string) => {
	const response = await $http.get("/courses", {
		params: {
			search: query,
		},
	});

	return response.data;
};
