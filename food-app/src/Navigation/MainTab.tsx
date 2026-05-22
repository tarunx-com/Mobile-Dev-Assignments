import React from 'react';
import { View, Text, Pressable, StyleSheet, useWindowDimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import ProfileScreen from '../Screens/ProfileScreen';
import HomeScreen from '../Screens/HomeScreen';
import MyCartScreen from '../Screens/MyCartScreen';
import SearchScreen from '../Screens/SearchScreen';
import DetailsScreen from '../Screens/DetailsScreen';
import useTheme from '../theme/theme';
import { useCart } from '../data/CartData';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const CustomHeader= ({navigation} :any) => {
    const { inUseTheme } = useTheme();
    const { height, width } = useWindowDimensions();
    

    const isTablet = width >= 768 && height >= 768;
    const isLandscape = width > height;

    return (
        <View style={[styles.headerContainer, {
            paddingHorizontal: isTablet || isLandscape ? 20 : 5, 
        }]}>
            
            {/* Hamburger Menu Button */}
            <View style={{flexDirection:'row', justifyContent: 'flex-start',alignItems:'center',flex:1}}>
                <Pressable 
                    onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                    style={styles.menuButton}
                >
                    <Ionicons 
                        name="menu" 
                        size={isTablet ? 32 : 28} 
                        color={inUseTheme.text} 
                    />
                </Pressable>

                <Pressable 
                    style={[styles.locationButton, {
                        backgroundColor: inUseTheme.card,
                        borderColor: inUseTheme.border,
                        maxWidth: isTablet ? 300 : isLandscape ? 250 : width*0.6,
                        paddingVertical: isTablet ? 10 : 8,
                    }]}
                    onPress={() => alert('Location option coming soon!')}
                >
                    <Ionicons 
                        name="location-outline" 
                        size={isTablet ? 22 : 18} 
                        color={inUseTheme.accent}
                    />
                    <Text 
                        style={[styles.locationText, { fontSize: isTablet ? 16 : 14, color: inUseTheme.text}]}
                        numberOfLines={1}
                    >
                        Location
                    </Text>
                </Pressable>
            </View>
            

            <Pressable 
                onPress={() => navigation.navigate('Search')}
                style={styles.searchButton}
            >
                <Ionicons 
                    name="search" 
                    size={isTablet ? 28 : 24} 
                    color={inUseTheme.text} 
                />
            </Pressable>
        </View>
    );
};


// --- 2. Home Stack Navigator ---
function HomeStack(){

    const {inUseTheme} =useTheme();

    return(
        <Stack.Navigator>
            <Stack.Screen 
                name='HomeMain' 
                component={HomeScreen}
                options={({ navigation }: any) => ({
                    headerTitle: () => <CustomHeader navigation={navigation} />,
                    headerTransparent: true,
                    headerTitleAlign: 'center',
                })}
            />
            <Stack.Screen 
                name='Details' 
                component={DetailsScreen}
                options={{
                    // headerTransparent:true,
                    headerStyle: {
                        backgroundColor:inUseTheme.backgroundColor
                    },
                    headerTintColor:inUseTheme.text,
                    headerTitleAlign: 'center',
                }}
            />
        </Stack.Navigator>        
    );
};


// --- 3. Main Bottom Tabs Navigator ---
function MainTabs(){
    const {isDark, inUseTheme} = useTheme();

    const { cartItems, handleIncrement, handleDecrement } = useCart();

    let totalItems=0;
    Object.values(cartItems).forEach(qty => {
        totalItems += qty; 
    });

    return (
        <Tab.Navigator screenOptions={
            ({route})=>({
                tabBarIcon:({focused,color,size})=>{
                    const icon=route.name ==="Home" ?
                    focused ? "home" : "home-outline" 
                    : route.name ==="Search" ?
                    focused ? "search" : "search-outline" 
                    : route.name ==="Profile" ?
                    focused ? "person" : "person-outline"
                    : focused ? "cart" : "cart-outline"
                
                return <Ionicons name={icon} size={size} color={color}/>
                },

                tabBarInactiveTintColor: inUseTheme.subtext,
                tabBarActiveTintColor:inUseTheme.accent,

                tabBarStyle: {
                    backgroundColor: inUseTheme.card,
                },

                headerStyle:{
                    backgroundColor:inUseTheme.card,
                },
                headerTintColor: inUseTheme.text,
                headerTitleAlign: 'center' as const,

            })
        }>
            <Tab.Screen 
                name="Home" 
                component={HomeStack} 
                options={{ headerShown:false }}
            />
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="Orders" component={MyCartScreen} 
                options={{
                    tabBarBadge: totalItems > 0 ? totalItems : undefined,
                    tabBarBadgeStyle: {
                        backgroundColor: inUseTheme.accent,
                        color: inUseTheme.text,
                        fontSize: 11,
                    },
                    tabBarStyle:{
                        display: 'none'
                    }
                }}
            />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

export default MainTabs;

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        width: '100%', 
    },
    menuButton: {
        padding:5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    locationButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderRadius: 25,
        flex: 1,          
        marginHorizontal: 10, 
        borderWidth: 1,
    },
    locationText: {
        marginLeft: 8, 
        flexShrink: 1,     
    },
    searchButton: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: 5,    
    }
});

