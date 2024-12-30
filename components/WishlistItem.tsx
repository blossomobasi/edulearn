import { View, Text, Pressable, Image } from "react-native";
import React, { useState } from "react";
// import Animated, { FadeInDown } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useWishlistStore } from "@/store/wishlistStore";
import { router } from "expo-router";

type CourseItemProps = {
	course: Course;
	customStyle?: string;
	index?: number;
};

function WishlistItem({ course, customStyle, index }: CourseItemProps) {
	const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();

	const isWishlisted = isInWishlist(course.id);

	function handleWishlist(course: Course) {
		if (isWishlisted) return removeFromWishlist(course.id);

		addToWishlist(course);
	}

	return (
		<Pressable
			className={`pt-4 ${customStyle}`}
			onPress={() =>
				router.push({
					pathname: "/coursedetails",
					params: { courseId: course.id },
				})
			}
		>
			<View
				className="gap-2 p-2 flex-row bg-white/90 items-center w-full border border-gray-300 overflow-hidden rounded-2xl"
				// entering={FadeInDown.duration(300)
				// 	.delay(200 * index)
				// 	.springify()}
			>
				<View className="w-1/4 h-20 rounded-full">
					<Image source={{ uri: course.image_480x270 }} className="w-full h-20 rounded-2xl" />
				</View>

				<View className="px-4 p-2 w-3/4">
					<Text style={{ fontFamily: "BarlowBold" }} className="text-base min-h-14">
						{course.title}
					</Text>
					<View className="flex-row items-center justify-between pt-2 pb-4">
						<Text className="font-bold text-base">{`${course.price}`}</Text>

						<Pressable onPress={() => handleWishlist(course)}>
							<Ionicons
								size={20}
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

export default WishlistItem;
