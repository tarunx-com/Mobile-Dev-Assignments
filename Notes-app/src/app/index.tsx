import { Pressable, StyleSheet, Text, View } from 'react-native'
import Page1 from "./Page1"
import Page2 from "./Page2"
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const index = () => {
	const [currentPage, setCurrentPage] = useState<'page1' | 'page2' | null>(null);

	if (currentPage === 'page1') {
		return <Page1 />;
	} else if (currentPage === 'page2') {
		return <Page2 />;
	} else {
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.buttonContainer}>
					<Pressable style={styles.button} onPress={() => setCurrentPage('page1')}>
						<Text style={styles.buttonText}>Show Page 1</Text>
					</Pressable>
					<Pressable style={styles.button} onPress={() => setCurrentPage('page2')}>
						<Text style={styles.buttonText}>Show Page 2</Text>
					</Pressable>
				</View>
			</SafeAreaView>
		);
	};
}

export default index

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems:"center",
		justifyContent: 'center',
	},
	buttonContainer: {
		flexDirection: 'column',
		padding: 20,
		backgroundColor: '#f0f0f0',
		gap:20
	},
	button: {
		backgroundColor: '#007AFF',
		padding: 15,
		borderRadius: 40,
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
		textAlign: 'center',
	},
})