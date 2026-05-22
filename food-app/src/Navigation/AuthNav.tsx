import React from 'react';
import { View, StyleSheet, useWindowDimensions, Image, ImageBackground, KeyboardAvoidingView,Platform} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import LogInScreen from '../Screens/LogInScreen';
import SignInScreen from '../Screens/SignInScreen';
import useTheme from '../theme/theme';


const Tab = createMaterialTopTabNavigator();

const AuthNav = () => {
    const { isDark,inUseTheme } = useTheme();
    const insets = useSafeAreaInsets();
    const { height, width } = useWindowDimensions();

    const isTablet = width >= 768 && height >= 768;
    const isLandscape = width > height;

    const StyleHelper = {
        image: {
            minHeight: height,
            width: width,
        },
        card: {
            backgroundColor: inUseTheme.card,
            borderColor: inUseTheme.border,
            width: isTablet ? 460 : width * 0.85,
            maxWidth: isTablet ? 460 : width * 0.85,
            height: isTablet ? 620 : isLandscape ? height*0.9 : height * 0.8,
            maxHeight: height * 0.9,
            paddingHorizontal: isTablet ? (isLandscape ? 30 : 25) : 15,
            paddingTop: isTablet ? 35 : 25,
            paddingBottom: isTablet ? 25 : 15,
            borderRadius: isTablet ? 36 : 28,
            marginTop: insets.top + (isLandscape ? 10 : 30),
        },

        logo: {
            height: isTablet ? 65 : 55,
            width: isTablet ? 65 :55,
        }
    };

    return (
        <ImageBackground 
            source={isDark 
                ? require('../../assets/onBoard-dark.png') 
                : require('../../assets/onBoard-light.png')
            } 
            style={[StyleHelper.image, styles.backdropContainer]}
            resizeMode="cover"
        >
            <StatusBar style={isDark ? "light" : "dark"} />

            <KeyboardAvoidingView 
                style={styles.keyboardContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
            
            <View style={[StyleHelper.card,styles.cardLayout]}>
                
                    <Image 
                        source={require("../../assets/logo-light.png")} 
                        style={StyleHelper.logo}
                        resizeMode="contain"
                    />

                <View style={styles.tabNavigatorWrapper}>
                    <Tab.Navigator
                        screenOptions={{
                            tabBarStyle: { 
                                backgroundColor: inUseTheme.backgroundColor,
                                borderRadius: 25,
                                marginHorizontal: 10,
                                marginTop: 22,
                                marginBottom: 15,
                                justifyContent: 'center',
                            },
                            tabBarIndicatorStyle: { 
                                backgroundColor: inUseTheme.accent,
                                height: '100%',
                                borderRadius: 25,
                            },
                            tabBarLabelStyle: { 
                                fontWeight: 'bold', 
                                fontSize: 15,
                            },
                            tabBarActiveTintColor: '#ffffff',
                            tabBarInactiveTintColor: inUseTheme.subtext,
                        }}
                    >
                        <Tab.Screen name="Log In" component={LogInScreen} />
                        <Tab.Screen name="Sign Up" component={SignInScreen} />
                    </Tab.Navigator>
                </View>
            </View>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
};

export default AuthNav;

const styles = StyleSheet.create({
    backdropContainer: {
        flex: 1,
    },
    keyboardContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    cardLayout: {
        borderWidth: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    logoBadge: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    tabNavigatorWrapper: {
        flex:1,
        width: '100%',
    }
});