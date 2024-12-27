import { HelloWave } from "@/components/HelloWave";
import { View, Text, Pressable, ScrollView, ActivityIndicator, FlatList } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { useCourse } from "@/hooks/course/useCourse";
import CourseItem from "@/components/CourseItem";

type Category = {
	name: string;
	icon: string;
};

const categories: Category[] = [
	{ name: "Business", icon: "briefcase" },
	{ name: "Tech", icon: "hardware-chip" },
	{ name: "Design", icon: "color-palette" },
	{ name: "Marketing", icon: "megaphone" },
	{ name: "Health", icon: "fitness" },
	{ name: "Music", icon: "musical-notes" },
	{ name: "Lifestyle", icon: "heart" },
];

export default function HomeScreen() {
	const [selectedCategory, setSelectedCategory] = useState("Business");
	const { courses, isLoading: isLoadingCourse, error } = useCourse(selectedCategory);

	return (
		<View className="flex-1 bg-white">
			{/* Greetings */}
			<View className="pt-16 pb-6 px-6 bg-[#2563eb]">
				<Animated.View className="flex-row justify-between items-center">
					<View>
						<View className="flex-row items-center gap-2">
							<Text className="text-lg text-white">Good Morning</Text>

							<View>
								<HelloWave />
							</View>
						</View>

						<Text className="text-white text-2xl" style={{ fontFamily: "BarlowBold" }}>
							Marrison Kalao
						</Text>
					</View>

					<View>
						<MaterialCommunityIcons name="bell" size={24} color="white" />
					</View>
				</Animated.View>

				{/* Search Area */}
				<Pressable onPress={() => router.push("/explore")}>
					<View className="flex-row items-center bg-white/20 rounded-2xl p-4 mt-4">
						<MaterialCommunityIcons name="magnify" size={20} color="white" />

						<Text className="text-white ml-2" style={{ fontFamily: "BarlowMedium" }}>
							What do you want to learn?
						</Text>
					</View>
				</Pressable>
			</View>

			<ScrollView className="flex-1 bg-white gap-4">
				{/* Categories */}
				<Animated.View className="gap-6" entering={FadeInDown.duration(500).delay(200).springify()}>
					<View className="flex-row justify-between items-center px-6 pt-4">
						<Text className="text-xl" style={{ fontFamily: "BarlowBold" }}>
							Explore Topics
						</Text>

						<Text className="text-blue-700" style={{ fontFamily: "BarlowSemiBold" }}>
							See More
						</Text>
					</View>

					{/* Categories List */}
					<ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-6">
						{categories.map((category) => (
							<Pressable
								key={category.name}
								onPress={() => setSelectedCategory(category.name)}
								className="mr-5 items-center"
							>
								<View
									className={`p-4 border-2 rounded-full mb-3 ${
										selectedCategory === category.name ? "border-blue-700" : "border-blue-200"
									}`}
								>
									<Ionicons
										name={category.icon as any}
										size={20}
										color={selectedCategory === category.name ? "#1d4ed8" : "gray"}
									/>
								</View>

								<Text style={{ fontFamily: selectedCategory === category.name ? "BarlowBold" : "BarlowMedium" }}>
									{category.name}
								</Text>
							</Pressable>
						))}
					</ScrollView>

					{/* Courses */}
					{isLoadingCourse ? (
						<View>
							<ActivityIndicator size="large" color="#1d4ed8" />
						</View>
					) : error ? (
						<Text>Error: {error.message}</Text>
					) : courses?.results ? (
						<FlatList
							horizontal={true}
							data={courses.results}
							keyExtractor={(item) => item.id.toString()}
							showsHorizontalScrollIndicator={false}
							renderItem={({ item }) => CourseItem({ course: item, customStyle: "ml-6", index: item.id })}
						/>
					) : (
						<View className="flex-1 justify-center items-center">
							<Text>No courses found. Try searching for a different Course.</Text>
						</View>
					)}
				</Animated.View>
			</ScrollView>
		</View>
	);
}
