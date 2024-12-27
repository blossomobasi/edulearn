import { APIGetCourses } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useCourse = (selectedCategory: string) => {
	const {
		data: courses,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["courses", selectedCategory],
		queryFn: () => APIGetCourses(selectedCategory),
	});

	return { courses, isLoading, error };
};
