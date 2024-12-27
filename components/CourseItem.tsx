import { View, Text, Pressable, Image } from "react-native";
import React, { useState } from "react";
// import Animated, { FadeInDown } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useWishlistStore } from "@/store/wishlistStore";

type CourseItemProps = {
	course: Course;
	customStyle?: string;
	index: number;
};

function CourseItem({ course, customStyle, index }: CourseItemProps) {
	const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();

	const isWishlisted = isInWishlist(course.id);

	function handleWishlist(course: Course) {
		if (isWishlisted) removeFromWishlist(course.id);

		addToWishlist(course);
	}

	return (
		<Pressable className={`pt-4 ${customStyle}`}>
			<View
				className="gap-2 w-full border border-gray-300 overflow-hidden rounded-2xl"
				// entering={FadeInDown.duration(300)
				// 	.delay(200 * index)
				// 	.springify()}
			>
				<Image source={{ uri: course.image_480x270 }} className="w-full h-40" />

				<View className="px-4 p-2">
					<Text style={{ fontFamily: "BarlowBold" }}>{course.title}</Text>
					<View className="flex-row items-center justify-between pt-2 pb-4">
						<Text className="font-bold text-2xl">{`${course.price}`}</Text>

						<Pressable onPress={() => handleWishlist(course)}>
							<Ionicons
								size={24}
								name={isWishlisted ? "heart" : "heart-outline"}
								color={isWishlisted ? "red" : "green"}
							/>
						</Pressable>
					</View>
				</View>
			</View>
		</Pressable>
	);
}

export default CourseItem;
