import { APIGetCourses, APIGetRecommendedCourses } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useCourse = (selectedCategory: string) => {
	const {
		data: courses,
		isLoading: isLoadingCourse,
		error: errorCourse,
	} = useQuery({
		queryKey: ["courses", selectedCategory],
		queryFn: () => APIGetCourses(selectedCategory),
	});

	const {
		data: recommendedCourses,
		isLoading: isLoadingRecommendedCourses,
		error: errorRecommendedCourses,
	} = useQuery({
		queryKey: ["recommendedCourses"],
		queryFn: () => APIGetRecommendedCourses(),
	});

	const isLoading = isLoadingCourse || isLoadingRecommendedCourses;

	return { courses, recommendedCourses, isLoading, error: errorCourse || errorRecommendedCourses };
};
