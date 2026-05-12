import { StyleSheet, Text, View,Image, useColorScheme, Switch, TextInput, Pressable, FlatList,ScrollView,useWindowDimensions } from "react-native";
import { StatusBar } from 'expo-status-bar';
import {SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";

// import * as ScreenOrientation from "expo-screen-orientation"

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
	},
	{
		id: "2",
		title: "Visual Inspiration",
		body: "Look at how the electric blue accents slice through the dark background.",
		tags: ["DESIGN", "MOOD"],
		type: "image",
		date: "Oct 22, 2023",
	},
	{
		id: "3",
		title: "Weekly Sprint Goals",
		body: "Week goals",
		tags: ["SPRINT", "WORK"],
		type: "checklist",
		date: "Oct 20, 2023",
	},
	{
		id: "4",
		title: "Design System",
		body: "Colors: #ffffff & #0058bc. Radius: 8px. Spacing: 8px grid.",
		tags: ["SYSTEM", "DOCUMENTATION"],
		type: "text",
		date: "Oct 18, 2023",
	},
	{
		id: "5",
		title: "Interview Prep",
		body: "Revise system design basics — consistent hashing, CAP theorem. Practice two DP problems daily until Friday.",
		tags: ["CAREER", "STUDY"],
		type: "text",
		date: "Oct 15, 2023",
	},
	{
		id: "6",
		title: "Travel — Manali Trip",
		body: "Book the Volvo bus for Dec 20th. Pack thermals and the portable charger.",
		tags: ["TRAVEL"],
		type: "image",
		date: "Oct 12, 2023",
	},
	{
		id: "7",
		title: "Grocery Run",
		body: "Milk, sourdough, eggs, olive oil, cherry tomatoes, greek yogurt, and that oat granola.",
		tags: ["TODO"],
		type: "text",
		date: "Oct 10, 2023",
	},
	{
		id: "8",
		title: "API Refactor",
		body: "Move auth logic out of the controller layer. Use middleware chain. Rate-limit /upload.",
		tags: ["DEV", "BACKEND"],
		type: "text",
		date: "Oct 8, 2023",
	},
];

const Index = () => {

    const { height, width } = useWindowDimensions();
    const colorScheme = useColorScheme();
    const [manualDark, setManualDark] = useState<boolean | null>(null);

    const isTablet = width >= 768;
    const isLandscape = width > height;

    const isDark = manualDark === null ? colorScheme === "dark" : manualDark;
    const inUseTheme = isDark ? theme.dark : theme.light;

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: inUseTheme.backgroundColor }]}>
            <StatusBar style={isDark ? "light" : "dark"} />

            <View style={[
                styles.header,
                {
                    borderBottomColor: inUseTheme.card,
                    paddingLeft: isTablet ? 24 : 16,
                    paddingRight: isTablet ? 24 : 16,
                    paddingBottom: isLandscape ? 4 : 8,
                }
            ]}>
                <View style={styles.forFlex}>
                    <Pressable onPress={() => alert("Menu will be here")}>
                        <Image
                            source={isDark ? require("@/assets/images/hamburger-dark.png") : require("@/assets/images/hamburger-light.png")}
                            style={[
                                styles.menu,
                                {
                                    width: isTablet ? 32 : 26,
                                    marginRight: isTablet ? 32 : 24,
                                }
                            ]}
                        />
                    </Pressable>
                    <Text style={[
                        styles.title,
                        {
                            color: inUseTheme.accent,
                            fontSize: isTablet ? 38 : isLandscape ? 22 : 30,
                        }
                    ]}>
                        Notes
                    </Text>
                </View>

                <View style={styles.forFlex}>
                    <Pressable onPress={() => setManualDark(!isDark)}>
                        <Image
                            source={isDark ? require("@/assets/images/dark-mode.png") : require("@/assets/images/light-mode.png")}
                            style={[
                                styles.modeToggle,
                                {
                                    borderColor: inUseTheme.border,
                                    width: isTablet ? 72 : 60,
                                    height: isTablet ? 36 : isLandscape ? 24 : 30,
                                    borderRadius: isTablet ? 18 : isLandscape ? 12 : 15,
                                }
                            ]}
                        />
                    </Pressable>
                    <Pressable onPress={() => alert("Profile will be here")}>
                        <Image
                            source={isDark ? require("@/assets/images/profile-dark.png") : require("@/assets/images/profile-light.png")}
                            style={[
                                styles.profile,
                                {
                                    borderColor: inUseTheme.border,
                                    width: isTablet ? 50 : isLandscape ? 34 : 40,
                                    height: isTablet ? 50 : isLandscape ? 34 : 40,
                                    marginLeft: isTablet ? 20 : 16,
                                    borderRadius: isTablet ? 25 : isLandscape ? 17 : 20,
                                }
                            ]}
                        />
                    </Pressable>
                </View>
            </View>

            <View style={[
                styles.searchContainer,
                {
                    backgroundColor: inUseTheme.card,
                    borderColor: inUseTheme.border,
                    padding: isTablet ? 14 : 12,
                    marginTop: isLandscape ? 6 : 10,
                    marginLeft: isTablet ? 28 : 18,
                    marginRight: isTablet ? 28 : 18,
                    marginBottom: isLandscape ? 6 : 10,
                }
            ]}>
                <Image
                    source={isDark ? require("@/assets/images/search-dark.png") : require("@/assets/images/search-light.png")}
                    style={[
                        styles.searchIcon,
                        {
                            width: isTablet ? 24 : 20,
                            height: isTablet ? 24 : 20,
                        }
                    ]}
                />
                <TextInput
                    placeholder="Search your notes..."
                    placeholderTextColor={inUseTheme.subtext}
                    style={[
                        styles.searchInput,
                        {
                            color: inUseTheme.subtext,
                            fontSize: isTablet ? 16 : 14,
                        }
                    ]}
                />
            </View>

            <FlatList
                data={NOTES}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={[
                    styles.flatListContent,
                    {
                        paddingHorizontal: isTablet ? 20 : 14,
                        paddingBottom: isLandscape ? 60 : 100,
                    }
                ]}
                columnWrapperStyle={[
                    styles.columnWrapper,
                    { gap: isTablet ? 16 : 12 }
                ]}
                renderItem={({ item }) => (
                    <Pressable style={[
                        styles.noteCard,
                        {
                            backgroundColor: inUseTheme.card,
                            borderColor: inUseTheme.border,
                            padding: isTablet ? 8 : 4,
                            marginVertical: isLandscape ? 5.5 : 6.5,
                        }
                    ]}>
                        <Text numberOfLines={2} style={[
                            styles.noteText,
                            {
                                color: inUseTheme.text,
                                fontSize: isTablet ? 22 : isLandscape ? 17 : 20,
                            }
                        ]}>
                            {item.title}
                        </Text>
                        <Text numberOfLines={4} style={[
                            styles.noteSubText,
                            {
                                color: inUseTheme.subtext,
                                fontSize: isTablet ? 15 : isLandscape ? 12 : 14,
                            }
                        ]}>
                            {item.body}
                        </Text>

                        <View style={styles.noteTag}>
                            {item.tags.map((tag) => (
                                <Text key={tag} style={[styles.tag, { color: inUseTheme.accent, backgroundColor: inUseTheme.accentBg }]}>
                                    {tag}
                                </Text>
                            ))}
                        </View>

                        <Text style={[styles.date, { color: inUseTheme.subtext }]}>
                            ~ {item.date}
                        </Text>
                    </Pressable>
                )}
                showsVerticalScrollIndicator={false}
            />

            <Pressable
                style={[
                    styles.fab,
                    {
                        backgroundColor: inUseTheme.accent,
                        bottom: isLandscape ? 24 : 48,
                        right: isTablet ? 40 : 30,
                        width: isTablet ? 64 : 56,
                        height: isTablet ? 64 : 56,
                        borderRadius: isTablet ? 32 : 28,
                    }
                ]}
                onPress={() => alert("New note navigation will be added here")}
            >
                <Text style={[
                    styles.fabIcon,
                    {
                        color: inUseTheme.backgroundColor,
                        fontSize: isTablet ? 46 : 40,
                        lineHeight: isLandscape ? 28 : 32,
                    }
                ]}>+</Text>
            </Pressable>
        </SafeAreaView>
    );
};

export default Index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 2,
    },
    forFlex: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    menu: {
        marginLeft: 6,
		height: 50,
    },
    title: {
        fontWeight: "bold",
    },
    modeToggle: {
        marginLeft: 6,
        marginRight: 4,
        borderWidth: 1,
    },
    profile: {
        borderWidth: 1,
    },
    searchContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 30,
        borderWidth: 1,
    },
    searchIcon: {
        marginRight: 12,
    },
    searchInput: {
        flex: 1,
        padding: 0,
        margin: 0,
    },
    noteCard: {
        flex: 1,
        justifyContent: "space-between",
        borderWidth: 1,
        borderRadius: 7,
    },
    flatListContent: {
        paddingTop: 4,
    },
    columnWrapper: {
        justifyContent: "space-between",
    },
    noteText: {
        fontWeight: "bold",
        padding: 4,
    },
    noteSubText: {
        padding: 4,
        marginBottom: 5,
    },
    fab: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        elevation: 6,
        shadowColor: "#000",
        padding: 4,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
    },
    fabIcon: {},
    noteTag: {
        display: "flex",
        flexDirection: "column",
    },
    tag: {
        fontSize: 12,
        alignSelf: "flex-start",
        padding: 2,
        paddingHorizontal: 5,
        margin: 3,
    },
    date: {
        fontSize: 12,
        margin: 4,
        alignSelf: "flex-end",
    },
});