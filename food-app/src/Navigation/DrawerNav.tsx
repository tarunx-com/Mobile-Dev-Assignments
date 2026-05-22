import React from 'react';
import { View, Text, useWindowDimensions, StyleSheet, Pressable } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import useTheme from '../theme/theme';
import SettingsScreen from '../Screens/SettingsScreen'; 
import HelpScreen from '../Screens/HelpScreen';
import MainTabs from '../Navigation/MainTab';
import { useAuth } from '../data/AuthHelper'

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props : any) {

    const { isDark,inUseTheme, setManualDark } = useTheme();
    const insets = useSafeAreaInsets();
    const { height, width } = useWindowDimensions();

    const {user ,logout}= useAuth();

    const isTablet = width >= 768 && height >= 768;

    const StyleHelper = {
        container: {
            backgroundColor: inUseTheme.backgroundColor,
        },
        profileSection: {
            paddingHorizontal: isTablet ? 30 : 20,
            paddingVertical: isTablet ? 30 : 20,
            borderBottomColor: inUseTheme.border,
            backgroundColor: inUseTheme.card,
        },
        avatarPlaceholder: {
            width: isTablet ? 60 : 50,
            height: isTablet ? 60 : 50,
            borderRadius: isTablet ? 30 : 25,
            backgroundColor: inUseTheme.accentBg,
            borderColor: inUseTheme.accent,
        },
        avatarText: {
            color: inUseTheme.accent,
            fontSize: isTablet ? 24 : 18,
        },
        userName: {
            fontSize: isTablet ? 20 : 16,
            color: inUseTheme.text,
        },
        userEmail: {
            fontSize: isTablet ? 14 : 12,
            color: inUseTheme.subtext,
        },
        footerSection: {
            paddingBottom: insets.bottom > 0 ? insets.bottom + 10 : (isTablet ? 30 : 20),
            paddingTop: isTablet ? 20 : 10,
            borderTopColor: inUseTheme.border,
            backgroundColor: inUseTheme.card,
        },
        logoutLabel: {
            fontSize: isTablet ? 16 : 14,
        }
    };

    return (
        <View style={[styles.container, StyleHelper.container]}>
            <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: insets.top }}>
                
                <Pressable
                    style={[styles.profileSection, StyleHelper.profileSection]}
                    onPress={() => props.navigation.navigate('MainTab', {screen: 'Profile'})}
                >
                    <View style={[styles.avatarPlaceholder, StyleHelper.avatarPlaceholder]}>
                        <Text style={[styles.avatarText, StyleHelper.avatarText]}> {(user?.name || 'guest').charAt(0).toUpperCase()} </Text>
                    </View>
                    <View>
                        <Text style={[styles.userName, StyleHelper.userName]}>{user?.name || 'Guest'}</Text>
                        <Text style={[styles.userEmail, StyleHelper.userEmail]}>{user?.Email || 'No Email'}</Text>
                    </View>
                </Pressable>

                <DrawerItemList {...props} />

                <DrawerItem 
                    label="Orders" 
                    labelStyle={{ 
                        color: inUseTheme.subtext, 
                        fontSize: 14,
                    }}
                    activeTintColor={inUseTheme.accent}
                    onPress={() => props.navigation.navigate('MainTab', { screen: 'Orders' })}
                />
                <DrawerItem
                    label= {isDark ? "Toggle To Light" : "Toggle To Dark"}  
                    labelStyle={{ 
                        color: inUseTheme.subtext, 
                        fontSize: 14,
                    }}
                    onPress={() => setManualDark(!isDark)}
                />
            </DrawerContentScrollView>

            <View style={[styles.footerSection, StyleHelper.footerSection]}>
                <DrawerItem 
                    label="Logout"
                    labelStyle={[styles.logoutLabelText, StyleHelper.logoutLabel]} 
                    onPress={() => logout()} 
                    icon={() => (
                        <MaterialIcons 
                            name="logout" 
                            color={'#ff3b30'}
                            size={isTablet?  24 : 18}
                        />
                    )}
                />
            </View>
        </View>
    );
}

function MyDrawer() {
    const { inUseTheme } = useTheme();

    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                drawerActiveTintColor: inUseTheme.accent,
                drawerInactiveTintColor: inUseTheme.subtext,
                headerTintColor: inUseTheme.text,
            }}
        >
            <Drawer.Screen
                name="MainTab" 
                component={MainTabs} 
                options={{
                    title: "Home",
                    headerShown:false
                }}
            />
            
            <Drawer.Screen
                name="Settings" 
                component={SettingsScreen} 
                options={{ headerTitle: "Settings" ,
                    headerTransparent: false,
                    headerStyle: {
                        backgroundColor: inUseTheme.card,
                    },
                }}
            />

            <Drawer.Screen
                name="Help & Support" 
                component={HelpScreen} 
                options={{ headerTitle: "Help & Support",
                    headerTransparent: false,
                    headerStyle: {
                        backgroundColor: inUseTheme.card,
                    },
                }}
            />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    profileSection: {
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatarPlaceholder: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        borderWidth: 1,
    },
    avatarText: {
        fontWeight: 'bold',
    },
    userName: {
        fontWeight: 'bold',
    },
    userEmail: {
        marginTop: 2,
    },
    footerSection: {
        borderTopWidth: 1,
    },
    logoutLabelText: {
        color: '#ff3b30',
        fontWeight: 'bold',
    },    
});

export default MyDrawer;