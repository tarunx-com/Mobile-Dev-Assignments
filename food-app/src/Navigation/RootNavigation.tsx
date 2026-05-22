import React, {useState} from 'react';
import {View,Text, Pressable, useWindowDimensions,Image} from 'react-native';
import { NavigationContainer, LinkingOptions,NavigatorScreenParams,} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoardingScreen from '../Screens/OnBoardingScreen';
import MyDrawer from '../Navigation/DrawerNav';
import useTheme from '../theme/theme';
import AuthNav from './AuthNav';
import  AuthHelper, {useAuth} from '../data/AuthHelper'
import { CartProvider } from '../data/CartData';
import { ThemeProvider } from '../theme/theme';
import * as Linking from 'expo-linking';


type RootStackParamList = {
	onBoard: undefined;
	Auth: NavigatorScreenParams<AuthParamList>;
	HomeDrawer: NavigatorScreenParams<DrawerParamList>;
};

type AuthParamList = {
	Login: undefined;
	SignIn: undefined;
};

type DrawerParamList = {
	MainTabs: NavigatorScreenParams<TabParamList>;
	Help: undefined;
	Settings: undefined;
};

type TabParamList = {
	Home: NavigatorScreenParams<HomeStackParamList>;
	Search: undefined;
	Orders: undefined;
	Profile: undefined;
};

type HomeStackParamList = {
	HomeMain: undefined;
	Details: { itemId: string };
};

const prefix = Linking.createURL('/');

    const linking: LinkingOptions<RootStackParamList> = {
    prefixes: [prefix, 'quickbite://'],
    config: {
        screens: {
        onBoard: 'onboard',
        Auth: {
            screens: {
            Login: 'login',
            SignIn: 'signin',
            },
        },
        HomeDrawer: {
            screens: {
            MainTabs: {
                screens: {
                Home: {
                    screens: {
                    HomeMain: 'home',
                    Details: 'details/:itemId',
                    },
                },
                Search:  'search',
                Orders:  'cart',
                Profile: 'profile',
                },
            },
            Help:     'help',
            Settings: 'settings',
            },
        }},
    },
};


const Stack= createNativeStackNavigator();

function RootStack(){

    const {inUseTheme}=useTheme();

    const {height,width} = useWindowDimensions();
    
    const {isLoggedIn} = useAuth();

    const isTablet=width>=768 && height >=768;
    const isLandscape=width>height;

    

    const scale=isTablet ? 1.5 : isLandscape ? 1.3 : 1;

    const Styles={
        text:{
            color: inUseTheme.accent,
            paddingHorizontal: 15 * scale,
            paddingVertical: 10 * scale,
            backgroundColor: inUseTheme.accentBg,
            borderRadius: 20 * scale,
        }
    }

    return(
        <Stack.Navigator screenOptions={{
            headerTransparent:true,
        }}>
            { !isLoggedIn ? (
            <>
            <Stack.Screen name="onBoard" component={OnBoardingScreen} options={({navigation})=>({
                headerTitle: ()=> (
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image
                            source={require('../../assets/logo-light.png')}
                            style={{ width: 40, height: 40 }}
                            resizeMode="contain"
                        />   
                        <Text style={{fontSize:24,color:inUseTheme.accent,paddingLeft:10,fontWeight:500}}>
                            QuickBite
                        </Text>                     
                    </View>
                ),
                headerRight: ()=> (
                    <Pressable onPress={()=>navigation.navigate("Auth")}
                        > 
                        <Text style={[Styles.text,{borderColor:inUseTheme.accent,borderWidth:1}]}>
                            SKIP
                        </Text>
                    </Pressable>
                )
            })}/> 

            <Stack.Screen name="Auth" component={AuthNav} options={{
                headerTitle: "",
                headerTintColor: inUseTheme.accent,
            }}/>

            </>
            ) :

            <Stack.Screen name="HomeDrawer" component={MyDrawer} options={{
                headerShown : false}} 
            />
            }
        </Stack.Navigator>
    )
}

export default function RootNavigation() {
    return (
        <ThemeProvider>
            <CartProvider>
            <AuthHelper>
                <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
                <RootStack />
                </NavigationContainer>
            </AuthHelper>
            </CartProvider>            
        </ThemeProvider>

    );
}