import { useColorScheme } from 'react-native'
import {createContext, useContext,useState} from 'react'


const themeDict = {
    light: {
        backgroundColor: "#fcf9f8",
        card: "#f6f3f2",
        text: "#1c1b1b",
        subtext: "#4c4646",
        border: "#e2e2e2",
        accent: "#4f7cff",
        accentBg: "#4f7cff12",
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

const ThemeContext=createContext<any>(null);

export function ThemeProvider({children}: {children: React.ReactNode}){

  const colorScheme=useColorScheme();

  const [manualDark,setManualDark]=useState<boolean | null>(null);
  const isDark=manualDark===null ? colorScheme==='dark' : manualDark; 

  const inUseTheme=isDark? themeDict.dark : themeDict.light;

  return (
    <ThemeContext.Provider value={{ isDark, inUseTheme, manualDark, setManualDark }}>
        {children}
    </ThemeContext.Provider>
  )
}

const useTheme = () => useContext(ThemeContext);

export default useTheme;

