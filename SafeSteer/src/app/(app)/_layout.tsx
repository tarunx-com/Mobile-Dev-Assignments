import useTheme, { ThemeProvider } from "@/theme/theme";
import { Stack } from "expo-router";
import { Pressable,Image } from "react-native";
import { initDB } from "@/db/db";
import { useEffect } from "react";

function RootLayout(){

    const {setManualDark,inUseTheme,isDark}=useTheme();

    useEffect(()=>{
        initDB();
    },[])

    function HeaderRight() {

		return (
			<Pressable
				onPress={() => setManualDark(!isDark)}
				style={{
					marginHorizontal: 10,
				}}>
				<Image
					source={
						isDark
							? require("@/assets/images/dark-mode.png")
							: require("@/assets/images/light-mode.png")
					}
					style={{
						height: 30,
						width: 80,
						padding: 15,
						borderColor: inUseTheme.border,
						borderWidth: 1,
						borderRadius: 15,
					}}
				/>
			</Pressable>
		);
	}

	return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen
                name="DriveScreen"
                options={{
                    animation: "slide_from_bottom",
                    gestureEnabled: false,
                    presentation: "modal",
                    headerShown: true,
                    headerTransparent: true,
                    headerTitle:"",
                    headerTintColor:inUseTheme.accent,
                    headerRight:()=> <HeaderRight/>
                }}
            />
        </Stack>
	);

}

export default function layout() {

    return(
        <ThemeProvider>
            <RootLayout/>
        </ThemeProvider>
    )
	
}
