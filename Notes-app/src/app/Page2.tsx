import { StyleSheet, Text, View, useColorScheme, ImageBackground, Pressable, Image, useWindowDimensions, TextInput, ScrollView, KeyboardAvoidingView, Platform, FlatList } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

const theme = {
    light: {
        backgroundColor: "#fcf9f8",
        card: "#f6f3f2",
        text: "#1c1b1b",
        subtext: "#4c4646",
        border: "#e2e2e2",
        accent: "#0058bc",
        accentBg: "#0058bc40"
    },
    dark: {
        backgroundColor: "#121212",
        card: "#1c1b1b",
        text: "#FFFFFF",
        subtext: "#939292",
        border: "#292828",
        accent: "#adc6ff",
        accentBg: "#adc6ff1a",
    }
}

const tags = ["NEW", "TODO"]

const TOOLS = [
    { id: '1', title: 'Bold', icon: 'format-bold' },
    { id: '2', title: 'Italic', icon: 'format-italic' },
    { id: '3', title: 'Insert', icon: 'grid-plus' },
    { id: '4', title: 'Private', icon: 'lock-outline' },
    { id: '5', title: 'Activity', icon: 'source-branch' },
];

const index_2 = () => {
    const [manualDark, setManualDark] = useState<boolean | null>(null);
    const colorScheme = useColorScheme();
    const safe = useSafeAreaInsets();
    const { height, width } = useWindowDimensions();

    const isTablet = width >= 768;
    const isLandscape = width > height;
    const isDark = manualDark === null ? colorScheme === "dark" : manualDark;
    const inUseTheme = isDark ? theme.dark : theme.light;

    const bannerHeight = isLandscape ? height * 0.35 : height * 0.25;

    return (
        <View style={StyleSheet.flatten([
            styles.container,{backgroundColor: inUseTheme.backgroundColor,paddingBottom: safe.bottom
        }])}>
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <ScrollView 
                    style={styles.container}
                    contentContainerStyle={{ flexGrow: 1, backgroundColor: inUseTheme.backgroundColor }}
                    keyboardDismissMode='on-drag'
                >
                    <StatusBar style={isDark ? "light" : "dark"} />
                    
                    <ImageBackground
                        style={[styles.imageB, { height: bannerHeight }]}
                        source={isDark ? require("@/assets/images/banner-dark.png") : require("@/assets/images/banner-light.png")}
                        imageStyle={{ opacity: 0.8, height: bannerHeight }}
                    >
                        <View style={[styles.header, { paddingTop: safe.top + 10 }]}>
                            <View style={styles.forFlex}>
                                <Pressable onPress={() => alert("Navigation to page 1")}>
                                    <Image source={isDark ? require("@/assets/images/arrow-dark.png") : require("@/assets/images/arrow-light.png")}
                                        style={styles.menu} />
                                </Pressable>
                                <Text style={[styles.title, { color: inUseTheme.accent, fontSize: isTablet ? 32 : 22 }]}>
                                    Edit Notes
                                </Text>
                            </View>

                            <View style={styles.forFlex}>
                                <Pressable onPress={() => setManualDark(!isDark)}>
                                    <Image source={isDark ? require("@/assets/images/dark-mode.png") : require("@/assets/images/light-mode.png")}
                                        style={[styles.modeToggle, {
                                            borderColor: inUseTheme.border,
                                            width: isTablet ? 72 : 60,
                                            height: isTablet ? 36 : (isLandscape ? 26 : 30),
                                            borderRadius: isTablet ? 18 : 15,
                                        }]} />
                                </Pressable>
                                <Pressable onPress={() => alert("Saved")}>
                                    <Text style={[styles.save, { color: inUseTheme.accent, backgroundColor: inUseTheme.accentBg }]}>
                                        Save
                                    </Text>
                                </Pressable>
                            </View>
                        </View>

                        <View style={[styles.noteTag, { paddingHorizontal: isTablet ? 60 : 20 }]}>
                            {tags.map((tag) => (
                                <Pressable key={tag} onPress={() => alert("Remove tag")}>
                                    <Text style={[styles.tag, { color: inUseTheme.accent, backgroundColor: inUseTheme.accentBg }]}>
                                        {tag} <Text style={{ color: inUseTheme.subtext }}>{"   "}x</Text>
                                    </Text>
                                </Pressable>
                            ))}
                            <Pressable onPress={() => alert("Add tag")}>
                                <Text style={[StyleSheet.compose(styles.tag,styles.date)
                                ,{color:inUseTheme.accent,backgroundColor: inUseTheme.accentBg}]}>
                                    {" "}+{" "}
                                </Text>
                            </Pressable>
                        </View>
                    </ImageBackground>

                    <TextInput 
                        placeholder="Title..."
                        placeholderTextColor={inUseTheme.text}
                        numberOfLines={1}
                        style={[styles.titleInput, { 
                            color: inUseTheme.text,
                            fontSize: isTablet ? 40 : 28,
                            paddingHorizontal: isTablet ? 40 : 24 
                        }]}
                    />

                    <Text style={[StyleSheet.compose(styles.tag,styles.date)
                        ,{color:inUseTheme.accent,backgroundColor: inUseTheme.accentBg,
                        marginLeft: isTablet ? 40 : 24 
                    }]}>
                        12 May, 2026
                    </Text>

                    <TextInput
                        placeholder="Start writing your thoughts..."
                        placeholderTextColor={inUseTheme.subtext}
                        multiline={true}
                        textAlignVertical="top"
                        scrollEnabled={false}
                        style={[styles.bodyInput, { 
                            color: inUseTheme.subtext,
                            fontSize: isTablet ? 22 : 18,
                            paddingHorizontal: isTablet ? 40 : 24 
                        }]}
                    />
                </ScrollView>
                
                {/* <FlatList 
                        data={TOOLS}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <Pressable onPress={()=>alert(`${item.title} will be added here`)}>
                                <Image source={isDark ? require("@/assets/images/dark-mode.png") : require("@/assets/images/light-mode.png")}/>
                                <Text>
                                    item.title
                                </Text>
                            </Pressable>
                        )}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.listContent}
                /> */}
                <Pressable style={[styles.fab,{
                        backgroundColor: inUseTheme.accent,
                        bottom: isLandscape ? 24 : 48,
                        right: isTablet ? 40 : 30,
                        width: isTablet ? 64 : 56,
                        height: isTablet ? 64 : 56,
                        borderRadius: isTablet ? 32 : 28,
                    }]} onPress={()=>alert("edit too box will be added here")}>
                    <Image  style={{
                        padding:6,
                        width: isTablet ? 56 : 44,
                        height: isTablet ? 56 : 44,
                    }}
                    source={isDark ? require("@/assets/images/edit-light.png") : require("@/assets/images/edit-dark.png")}
                    />                    
                </Pressable>

            </KeyboardAvoidingView>
        </View>
    )
}

export default index_2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageB: { 
        width: '100%', 
        justifyContent: 'space-between' 
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },
    forFlex: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    menu: {
        width: 28,
        height: 28,
    },
    title: {
        fontWeight: "700",
        letterSpacing: -0.5,
    },
    modeToggle: {
        borderWidth: 1,
    },
    save: {
        fontSize: 14,
        fontWeight: "700",
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    titleInput: {
        fontWeight: "800",
        paddingTop: 24,
        paddingBottom: 10,
        letterSpacing: -0.8,
    },
    bodyInput: {
        flex: 1,
        lineHeight: 26,
        paddingTop: 8,
        fontWeight: "400",
    },
    noteTag: {
        flexDirection: "row",
        flexWrap: 'wrap',
        alignItems: "center",
        paddingBottom: 20,
        gap: 8
    },
    tag: {
        fontSize: 12,
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 8,
        overflow: 'hidden'
    },
    addIcon: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    date: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: "flex-start",
        overflow: 'hidden',
        fontSize: 12,
        fontWeight: '600'
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
});