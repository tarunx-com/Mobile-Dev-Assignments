import { StyleSheet, Text, View,Image, useColorScheme, Switch, TextInput, Pressable, FlatList,ScrollView } from "react-native";
import { StatusBar } from 'expo-status-bar';
import {SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";

// #adc6ff #1c1b1b #0058bc #e2e2e2 #c7c7c7

const theme = {
	light: {
		backgroundColor: "#fcf9f8",
		card: "#f6f3f2",
		text: "#1c1b1b",
		subtext: "#4c4646",
		border: "#e2e2e2",
		accent: "#0058bc",
		accentBg: "#0058bc1a"
	},
	dark:{
		backgroundColor: "#121212",
		card: "#1c1b1b",
		text: "#FFFFFF",
		subtext: "#939292",
		border:"#292828",
		accent: "#adc6ff",
		accentBg: "#adc6ff1a",
	}
}

const NOTES = [
	{
		id: "1",
		title: "Project Lumina Roadmap",
		body: "Q4 deliverables include the core engine rewrite",
		tags: ["PROJECT", "ROADMAP"],
		type: "text",
		date: "Oct 24, 2023",
		column: 0,  // 0 = left, 1 = right
	},
	{
		id: "2",
		title: "Visual Inspiration",
		body: "Look at how the electric blue accents slice through the dark background.",
		tags: ["DESIGN", "MOOD"],
		type: "image",
		date: "Oct 22, 2023",
		column: 1,
	},
	{
		id: "3",
		title: "Weekly Sprint Goals",
		body: "Week goals",
		tags: ["SPRINT", "WORK"],
		type: "checklist",
		date: "Oct 20, 2023",
		column: 0,
	},
	{
		id: "4",
		title: "Design System",
		body: "Colors: #ffffff & #0058bc. Radius: 8px. Spacing: 8px grid.",
		tags: ["SYSTEM", "DOCUMENTATION"],
		type: "text",
		date: "Oct 18, 2023",
		column: 1,
	},
	{
		id: "5",
		title: "Interview Prep",
		body: "Revise system design basics — consistent hashing, CAP theorem. Practice two DP problems daily until Friday.",
		tags: ["CAREER", "STUDY"],
		type: "text",
		date: "Oct 15, 2023",
		column: 0,
	},
	{
		id: "6",
		title: "Travel — Manali Trip",
		body: "Book the Volvo bus for Dec 20th. Pack thermals and the portable charger.",
		tags: ["TRAVEL"],
		type: "image",
		date: "Oct 12, 2023",
		column: 1,
	},
	{
		id: "7",
		title: "Grocery Run",
		body: "Milk, sourdough, eggs, olive oil, cherry tomatoes, greek yogurt, and that oat granola.",
		tags: ["TODO"],
		type: "text",
		date: "Oct 10, 2023",
		column: 0,
	},
	{
		id: "8",
		title: "API Refactor",
		body: "Move auth logic out of the controller layer. Use middleware chain. Rate-limit /upload.",
		tags: ["DEV", "BACKEND"],
		type: "text",
		date: "Oct 8, 2023",
		column: 1,
	},
];


const index = () => {

	const colorScheme = useColorScheme();
	const [manualDark, setManualDark] = useState<boolean | null>(null);

	const isDark= manualDark === null ? colorScheme === "dark" : manualDark;

	const inUseTheme=isDark ? theme.dark : theme.light;


	return (
		<SafeAreaView style={[styles.container, { backgroundColor: inUseTheme.backgroundColor }]}>
			<StatusBar style={isDark ? "light" : "dark"} />
			<View style={[styles.header, { borderBottomColor: inUseTheme.card }]}>
				<View style={styles.forFlex}>
					<Pressable onPress={()=> alert("Menu will be here")}>
						<Image source={
							isDark ? require("@/assets/images/hamburger-dark.png") :require ("@/assets/images/hamburger-light.png")}
							style={styles.menu} />
					</Pressable>
					<Text style={[styles.title,{ 
						color: inUseTheme.accent,
						}]}>
						Notes
					</Text>
				</View>

				<View style={styles.forFlex}>
					<Pressable onPress={()=> setManualDark(!isDark)}>
						<Image source={
							isDark ? require("@/assets/images/dark-mode.png") :require ("@/assets/images/light-mode.png")}
							style={[styles.modeToggle,{ borderColor: inUseTheme.border }]} />
					</Pressable>
					<Pressable onPress={()=> alert("Profile will be here")}> 
						<Image source={
							isDark ? require("@/assets/images/profile-dark.png") :require ("@/assets/images/profile-light.png")}
							style={[styles.profile, { borderColor: inUseTheme.border }]} />
					</Pressable>		
					
				</View>

			</View>
			
				<View style={[styles.searchContainer,{backgroundColor: inUseTheme.card,borderColor: inUseTheme.border}]}>	
					<Image source={
						isDark ? require("@/assets/images/search-dark.png") :require ("@/assets/images/search-light.png")}
						style={styles.searchIcon} />
					<TextInput placeholder="Search your notes..." placeholderTextColor={inUseTheme.subtext} style={[
						styles.searchInput,{ color: inUseTheme.subtext}
					]}/>
				</View>

		
			<View style={styles.noteList}>
				<View style={styles.container}>
					<FlatList 
						data={NOTES}
						keyExtractor={(item)=> item.id}
						numColumns={2}
						columnWrapperStyle={{ gap: 10, paddingHorizontal: 12 }}
						renderItem={({item})=> 
							<Pressable onPress={()=>alert("Navigtion to edit page will be added here")} style={[
								styles.noteCard,{borderColor: inUseTheme.border,backgroundColor: inUseTheme.card,}
								]}>
								<Text numberOfLines={2} style={[styles.noteText,{
									color: inUseTheme.text,
								}]}>{item.title}</Text>
								<Text numberOfLines={4} style={[styles.noteSubText,{
									color: inUseTheme.subtext
								}]}>{item.body}</Text>
								<View style={styles.noteTag}>
									{item.tags.map((tag: string) => (
										<Text key={tag} style={[styles.tag,{
											color: inUseTheme.accent , backgroundColor: inUseTheme.accentBg
											}]}>
											{tag}
										</Text>
									))}
								</View>
								<Text style={[styles.date,{
									color:inUseTheme.subtext,
								}]}>
									~ {item.date}
								</Text>
							</Pressable>
						}
						showsVerticalScrollIndicator={false}
					/>
				</View>
			</View>
			<Pressable
				style={[styles.fab, { backgroundColor: inUseTheme.accent }]}
					onPress={() => alert("New note navition will be added here")}
				>
					<Text style={[styles.fabIcon,{color: inUseTheme.backgroundColor}]}>+</Text>
			</Pressable>
		</SafeAreaView>
	);
};

export default index;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingLeft: 16,
		paddingRight: 16,
		paddingBottom: 8,
		borderBottomWidth: 2,
	},
	forFlex:{
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	menu:{
		width:26,
		height: 50, 
		marginLeft: 6, 
		marginRight: 24
	},
	title:{
		fontSize: 30,
		fontWeight: "bold",
	},
	modeToggle:{
		width:60,
		height: 30, 
		marginLeft: 6,
		borderWidth: 1, 
		borderRadius: 15
	},
	profile:{
		width:40,
		height: 40, 
		marginLeft: 16, 
		borderRadius: 20
	},
	searchContainer:{
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		padding: 12,
		marginTop: 16,
		marginLeft: 18,
		marginRight: 18,
		borderRadius: 30,
		borderWidth: 1,
	},
	searchIcon:{
		width: 20,
		height: 20,
		marginRight: 12,
	},
	searchInput:{
		flex: 1,
		padding:0,
		margin:0,
	},
	noteList:{flex: 1, flexDirection: "row", paddingHorizontal: 14, paddingTop: 12, gap: 16 },
	noteCard:{
		flex:1,
		padding: 4,
		justifyContent: "space-between",
		marginVertical: 8,
		borderWidth: 1,
		borderRadius: 7,
	},
	noteText:{
		fontSize: 20,
		fontWeight: "bold",
		padding: 4
	},
	noteSubText:{
		fontSize: 14,
		padding: 4,
		marginBottom: 5
	},
	fab: {
		position: "absolute", bottom: 48, right: 30,
		width: 56, height: 56, borderRadius: 28,
		alignItems: "center", justifyContent: "center",
		elevation: 6,
		shadowColor: "#000",
		padding: 4,
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.25, shadowRadius: 5,
	},
	fabIcon: { 
		fontSize: 40, lineHeight: 32
	},
	noteTag:{
		display: "flex",
		flexDirection: "column"
	},
	tag:{
		fontSize:12,alignSelf: "flex-start",padding:2,paddingHorizontal:5,margin:3
	},
	date:{
		fontSize:12,
		margin:4,
		alignSelf: "flex-end"
	}
});
