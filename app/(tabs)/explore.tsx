import { View, Text, TextInput, Pressable, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { useCourse } from "@/hooks/course/useCourse";
import { FlatList } from "react-native";
import CourseItem from "@/components/CourseItem";

const Explore = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [searchQuery, setSearchQuery] = useState("");

	const { courses, isLoading, error } = useCourse(searchTerm);

	const handleSearch = () => {
		setSearchTerm(searchQuery);
	};

	return (
		<View className="flex-1 py-12 bg-white">
			<View className="p-4">
				<View className="flex-row w-full mb-4 border-2 border-neutral-400 rounded-2xl overflow-hidden bg-white">
					<TextInput
						className="p-2 w-3/4"
						placeholder="Search for Courses"
						placeholderTextColor="gray"
						value={searchQuery}
						onChangeText={setSearchQuery}
					/>
					<Pressable className="bg-blue-700 w-1/4 p-4 justify-center items-center" onPress={handleSearch}>
						<Text className="text-white" style={{ fontFamily: "BarlowBold" }}>
							Search
						</Text>
					</Pressable>
				</View>

				{isLoading ? (
					<View>
						<ActivityIndicator size="large" color="#1d4ed8" />
					</View>
				) : error ? (
					<Text>Error: {error.message}</Text>
				) : courses?.results ? (
					<FlatList
						data={courses.results}
						keyExtractor={(item) => item.id.toString()}
						showsHorizontalScrollIndicator={false}
						renderItem={({ item, index }) => <CourseItem course={item} index={index} />}
					/>
				) : (
					<View className="flex-1 justify-center items-center">
						<Text>No courses found. Try searching for a different Course.</Text>
					</View>
				)}
			</View>

			<Text>Explore</Text>
		</View>
	);
};

export default Explore;
