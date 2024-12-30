import { View, Text, FlatList, ActivityIndicator, Pressable } from "react-native";
import React from "react";

type CurriculumData = {
	count: number;
	next: string | null;
	previous: string | null;
	results: CurriculumItem;
};

type CurriculumListProps = {
	curriculumData: CurriculumResponse | undefined;
	isLoading: boolean;
	onLoadMore: () => void;
};

const CurriculumList = ({ curriculumData, isLoading, onLoadMore }: CurriculumListProps) => {
	if (!curriculumData) {
		return <Text>NO curriculum data available...</Text>;
	}

	if (isLoading) {
		<View>
			<ActivityIndicator size="small" color="#0000ff" />
		</View>;
	}

	const renderItem = ({ item }: { item: CurriculumItem }) => {
		return (
			<View className="border border-gray-[#eee] p-4">
				{item._class === "chapter" ? (
					<Text className="text-xl" style={{ fontFamily: "BarlowBold" }}>
						{item.title}
					</Text>
				) : (
					<View>
						<Text className="text-xl ml-4" style={{ fontFamily: "BarlowSemiBold" }}>
							{item.title}
						</Text>

						{item._class === "lecture" && (
							<Text className="pl-4 text-blue-700" style={{ fontFamily: "BarlowSemiBold" }}>
								{item.is_free ? "Free" : "Paid"}
							</Text>
						)}
						{item._class === "quiz" && (
							<Text className="pl-4" style={{ fontFamily: "BarlowSemiBold" }}>
								Quiz
							</Text>
						)}
					</View>
				)}
			</View>
		);
	};

	const renderFooter = () => {
		if (!isLoading) return null;

		return (
			<View>
				<ActivityIndicator size="small" color="#0000ff" />
			</View>
		);
	};

	return (
		<View>
			<Text className="text-2xl" style={{ fontFamily: "BarlowExtraBold" }}>
				Course Curriculum: {curriculumData.count}
			</Text>

			<FlatList
				nestedScrollEnabled={true}
				scrollEnabled={false}
				data={curriculumData.results}
				renderItem={renderItem}
				keyExtractor={(item) => item.id.toString()}
				ListFooterComponent={renderFooter}
			/>
			{curriculumData.next && !isLoading && (
				<Pressable onPress={onLoadMore} className="bg-blue-700 p-2 rounded-lg py-4 items-center mt-10">
					<Text className="text-white text-lg">Load More Curriculum</Text>
				</Pressable>
			)}
		</View>
	);
};

export default CurriculumList;
