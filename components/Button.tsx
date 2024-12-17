import { Text, Pressable, StyleSheet } from "react-native";
import React from "react";

type ButtonProps = {
	title: string;
	action?: () => void;
};

const Button = ({ title, action }: ButtonProps) => {
	return (
		<Pressable onPress={action} style={styles.button}>
			<Text style={styles.text}>{title}</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#1D4ED8",
		borderRadius: 24,
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 20,
		width: "75%",
	},
	text: {
		color: "#FFF",
		fontWeight: "bold",
		fontSize: 18,
	},
});

export default Button;
