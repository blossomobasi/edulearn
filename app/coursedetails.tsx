import { View, Text, Image, Pressable, ListRenderItem, FlatList, ActivityIndicator } from "react-native";
import React, { useMemo } from "react";
import { useLocalSearchParams } from "expo-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { APIGetCourseById, APIGetCourseCurriculum, APIGetCourseReviews } from "@/services";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Ionicons } from "@expo/vector-icons";
import CurriculumList from "@/components/CurriculumList";

const SegmentedControl: React.FC<{
	selectedSegment: "curriculum" | "reviews";
	onSegmentChange: (segment: "curriculum" | "reviews") => void;
}> = ({ selectedSegment, onSegmentChange }) => {
	return (
		<View className="flex-row mb-4 bg-gray-200 rounded-lg p-1 mt-6">
			{/* Curriculum */}
			<Pressable
				onPress={() => onSegmentChange("curriculum")}
				className={`flex-1 py-3 rounded-md ${selectedSegment === "curriculum" ? "bg-blue-700" : "bg-transparent"}`}
			>
				<Text
					className={`text-center ${selectedSegment === "curriculum" ? "text-white" : "text-gray-700"}`}
					style={{ fontFamily: selectedSegment === "curriculum" ? "BarlowBold" : "BarlowMedium" }}
				>
					Curriculum
				</Text>
			</Pressable>

			{/* Reviews */}
			<Pressable
				onPress={() => onSegmentChange("reviews")}
				className={`flex-1 py-3 rounded-md ${selectedSegment === "reviews" ? "bg-blue-700" : "bg-transparent"}`}
			>
				<Text
					className={`text-center ${selectedSegment === "reviews" ? "text-white" : "text-gray-700"}`}
					style={{ fontFamily: selectedSegment === "reviews" ? "BarlowBold" : "BarlowMedium" }}
				>
					Reviews
				</Text>
			</Pressable>
		</View>
	);
};

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
	return (
		<View className="flex-row">
			{Array.from({ length: 5 }, (_, i) => (
				<Ionicons
					key={i}
					name={i <= rating ? "star" : "star-outline"}
					size={16}
					color={i <= rating ? "#a16207" : "#d3d3d3"}
				/>
			))}
		</View>
	);
};

const CourseDetail = () => {
	const { courseId } = useLocalSearchParams();
	const [selectedSegment, setSelectedSegment] = React.useState<"curriculum" | "reviews">("curriculum");
	const [curriculumPage, setCurriculumPage] = React.useState(1);
	const queryClient = useQueryClient();

	const {
		data: course,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["course", courseId],
		queryFn: () => APIGetCourseById(courseId as string),
	});
	const {
		data: curriculumData,
		isLoading: curriculumIsLoading,
		error: curriculumError,
	} = useQuery({
		queryKey: ["course", courseId, curriculumPage],
		queryFn: () => APIGetCourseCurriculum(courseId as string, curriculumPage),
	});
	const {
		data: reviews,
		isLoading: reviewsIsLoading,
		error: reviewsError,
	} = useQuery({
		queryKey: ["reviews", courseId],
		queryFn: () => APIGetCourseReviews(courseId as string),
	});

	const loadMoreCurriculum = () => {
		if (curriculumData?.next) {
			setCurriculumPage((prev) => prev + 1);
		}
	};

	const mergeCurriculumData = useMemo(() => {
		if (!curriculumData) return undefined;

		const prevData = queryClient.getQueryData<CurriculumResponse>(["courseCurriculum", courseId, curriculumPage - 1]);

		return {
			...curriculumData,
			results: [...(prevData?.results || []), ...curriculumData.results],
			count: curriculumData.count,
			next: curriculumData.next,
			previous: curriculumData.previous,
		};
	}, [curriculumData, curriculumPage, courseId, queryClient]);

	if (isLoading || (curriculumIsLoading && curriculumPage === 1)) {
		return (
			<View className="flex-1 justify-center items-center">
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);
	}

	if (error || curriculumError) {
		return (
			<View className="flex-1 justify-center items-center">
				<Text>Error: {(error as Error)?.message || (curriculumError as Error)?.message}</Text>
			</View>
		);
	}

	if (!course) {
		return (
			<View className="flex-1 justify-center items-center">
				<Text className="text-2xl" style={{ fontFamily: "BarlowBold" }}>
					No Data Available
				</Text>
			</View>
		);
	}

	const renderReviewsItems: ListRenderItem<Review> = ({ item }) => (
		<View key={item.id} className="mb-4 border-t border-neutral-300 rounded-lg">
			<View className="flex-row justify-between items-center mb-2">
				<Text className="text-lg font-bold">{item.user?.display_name}</Text>

				<StarRating rating={item.rating} />
			</View>
			<Text className="text-gray-500 text-sm" style={{ fontFamily: "BarlowMedium" }}>
				{new Date(item.created).toLocaleDateString()}
			</Text>

			{item.content ? (
				<Text className="text-gray-600 mt-2">{item.content}</Text>
			) : (
				<Text className="text-gray-600 mt-2">No Comment Provided</Text>
			)}
		</View>
	);

	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
			headerImage={<Image source={{ uri: course?.image_480x270 }} className="w-full h-72 rounded-lg" />}
		>
			<View>
				<View className="bg-blue-700 rounded-xl p-0.5 mb-4 w-32 justify-center items-center">
					<Text className="text-base text-white" style={{ fontFamily: "BarlowMedium" }}>
						{course?.locale.title}
					</Text>
				</View>

				<Text className="text-2xl" style={{ fontFamily: "BarlowBold" }}>
					{course?.title}
				</Text>

				<View>
					<Text className="text-base text-gray-700" style={{ fontFamily: "BarlowMedium" }}>
						{course?.visible_instructors[0]?.display_name}
					</Text>
				</View>

				<Text className="text-3xl" style={{ fontFamily: "BarlowBold" }}>
					{course?.is_paid ? course.price : "Free"}
				</Text>

				<SegmentedControl selectedSegment={selectedSegment} onSegmentChange={setSelectedSegment} />

				{selectedSegment === "reviews" ? (
					<View>
						<Text className="text-2xl pb-4" style={{ fontFamily: "BarlowBold" }}>
							Reviews {reviews?.count}
						</Text>

						<FlatList
							nestedScrollEnabled={true}
							scrollEnabled={false}
							data={reviews?.results}
							renderItem={renderReviewsItems}
							keyExtractor={(item) => item.id.toString()}
						/>
					</View>
				) : (
					<View>
						<CurriculumList
							curriculumData={mergeCurriculumData}
							isLoading={curriculumIsLoading}
							onLoadMore={loadMoreCurriculum}
						/>
					</View>
				)}
			</View>
		</ParallaxScrollView>
	);
};

export default CourseDetail;
