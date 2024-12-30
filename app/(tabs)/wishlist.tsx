import { View, Text } from "react-native";
import React from "react";
import { useWishlistStore } from "@/store/wishlistStore";
import { FlatList } from "react-native";
import WishlistItem from "@/components/WishlistItem";

const wishlist = () => {
	const { wishlist } = useWishlistStore();

	return (
		<View className="flex-1 pt-12 bg-white">
			<View className="p-4">
				<Text className="text-2xl font-bold mb-4" style={{ fontFamily: "BarlowBold" }}>
					My Wishlist
				</Text>

				{!wishlist.length ? (
					<Text className="text-lg text-center">No courses in your wishlist.</Text>
				) : (
					<FlatList
						data={wishlist}
						keyExtractor={(item) => item.id.toString()}
						renderItem={({ item }) => <WishlistItem course={item} />}
					/>
				)}
			</View>
		</View>
	);
};

export default wishlist;
