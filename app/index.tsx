import { View, Text } from "react-native";
import React from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import Button from "@/components/Button";
import { router } from "expo-router";
import LottieView from "lottie-react-native";

const Welcome = () => {
	return (
		<View className="bg-white gap-4 p-4 flex-1 w-full justify-center items-center">
			<Animated.View className="w-full" entering={FadeInDown.duration(300).springify()}>
				<LottieView
					source={require("../assets/animation/learner.json")}
					autoPlay
					loop
					style={{
						width: "100%",
						height: 300,
					}}
				/>
			</Animated.View>

			<Animated.View className="w-full" entering={FadeInDown.duration(300).delay(200).springify()}>
				<Text className="text-5xl text-center leading-[3.5rem]" style={{ fontFamily: "BarlowExtraBold" }}>
					Discover and improve your skills.
				</Text>
			</Animated.View>

			<Animated.View className="w-full" entering={FadeInDown.duration(300).delay(400).springify()}>
				<Text className="text-xl text-center leading-[3.5rem]" style={{ fontFamily: "BarlowSemiBold" }}>
					Learn from the best courses & tutorials.🚀
				</Text>
			</Animated.View>

			{/* Button */}
			<Animated.View className="w-full items-center" entering={FadeInDown.duration(300).delay(600).springify()}>
				<Button title="Get Started" action={() => router.push("/(tabs)")} />
			</Animated.View>
		</View>
	);
};

export default Welcome;
