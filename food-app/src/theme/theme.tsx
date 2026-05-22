import { StyleSheet, Text, View,useColorScheme } from 'react-native'
import React, {useState} from 'react'

const themeDict = {
	light: {
		backgroundColor: "#fcf9f8",
		card: "#f6f3f2",
		text: "#1c1b1b",
		subtext: "#4c4646",
		border: "#e2e2e2",
		accent: "#F2643E",
		accentBg: "#F2643E33"
	},
	dark:{
		backgroundColor: "#121212",
		card: "#1c1b1b",
		text: "#FFFFFF",
		subtext: "#939292",
		border:"#292828",
		accent: "#FF7F5C",
		accentBg: "#FF7F5C33"
	}
}

const useTheme = () => {

    const colorScheme=useColorScheme();

    const [manualDark,setManualDark]= useState<boolean | null>(null);
    const isDark = manualDark === null ? colorScheme==='dark' : manualDark;

    const inUseTheme= isDark ? themeDict.dark : themeDict.light;


    return{
        isDark,inUseTheme,manualDark,setManualDark
    }

}

export default useTheme;
