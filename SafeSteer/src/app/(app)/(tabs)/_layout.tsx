import { Tabs } from "expo-router";
import { Image, Pressable,useWindowDimensions } from "react-native";
import useTheme,{ThemeProvider} from "@/theme/theme";
import {Ionicons} from '@expo/vector-icons'
import {BlurView} from 'expo-blur'


function RootStack() {

  const {inUseTheme,isDark,setManualDark}=useTheme();

  const {width,height}=useWindowDimensions();
  const isTablet=width>768 && height >=768;
  const isLandscape=width>height;

  function HeaderRight() {

    return(
      <Pressable onPress={()=>setManualDark(!isDark)}
        style={{
          marginHorizontal:20
        }}
      >
        <Image source={isDark? require('@/assets/images/dark-mode.png'):require('@/assets/images/light-mode.png')}
          style={{
            height:30,
            width:80,
            padding:15,
            borderColor:inUseTheme.border,
            borderWidth:1,
            borderRadius:15,
          }}
        />
      </Pressable>

    )
  }

  return (
      <Tabs screenOptions={
        ({route})=>({
        tabBarIcon:({focused,color,size})=>{
          const icon=route.name==='index'?
          focused ? 'home' : 'home-outline'
          : focused ? 'timer' : 'timer-outline'

          return <Ionicons name={icon} size={size} color={color}/>

        },

        tabBarActiveTintColor: inUseTheme.accent,
        tabBarInactiveTintColor: inUseTheme.subText,

        tabBarStyle:{
            backgroundColor: inUseTheme.card,
            height:isTablet? 80 :isLandscape? 70 : 80,
            paddingTop:5,
        },

        headerRight: ()=> <HeaderRight/>,
        headerTransparent: true,
        headerTintColor:inUseTheme.accent,
      })}
        >
        <Tabs.Screen name='index' options={{
          title:'Home',
          headerTitle:'SafeSteer',
          headerTitleStyle:{
            fontWeight:700,
            letterSpacing:2,
            paddingLeft:4
          }
          // animation: 'shift'
        }}/>
        <Tabs.Screen name='HistoryScreen' options={{
          title: 'History',
          headerTitleStyle:{
            fontWeight:700,
            letterSpacing:2,
            paddingLeft:4
          },
          animation:'shift'
        }}/>
      </Tabs>
  );
}

export default function RootLayout(){
  return(
      <RootStack/> 
  )

}


