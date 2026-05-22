import { StyleSheet, Text, View, ImageBackground, FlatList, Pressable, useWindowDimensions } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import useTheme from '../theme/theme'
import { restaurants } from '../data/Restaurants' 
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'


const HomeScreen = () => {
    const { inUseTheme, isDark } = useTheme();
    const { height, width } = useWindowDimensions();

    const navigation= useNavigation<any>();
    
    const isTablet = width >= 768 && height >= 768;
    const isLandscape = width > height;

    const StyleHelper = {
        screenContainer: {
            backgroundColor: inUseTheme.backgroundColor,
        },
        bannerImage: {
            height: isLandscape ? height * 0.4 : height * 0.3,
            width: width,
        },
        separator: {
            backgroundColor: inUseTheme.accent,
        },
        headerText: {
            color: inUseTheme.text,
        },
        viewAllText: {
            color: inUseTheme.accent,
        },
        card: {
            backgroundColor: inUseTheme.card,
            borderColor: inUseTheme.border,
        },
        restaurantImage: {
            width: '100%' as const,
            height: isTablet ? 240 : 180,
        },
        titleText: {
            color: inUseTheme.text,
        },
        subtext: {
            color: inUseTheme.subtext,
        }
    };

    const renderHeader = () => (
        <View>
            <StatusBar style={isDark ? 'light' : 'dark'} />
            
            <ImageBackground 
                style={StyleHelper.bannerImage} 
                source={isDark ? require('../../assets/banner-dark.png') : require('../../assets/banner-light.png')}
                imageStyle={StyleHelper.bannerImage}
            />

            <View style={[styles.separator, StyleHelper.separator]} />

            <View style={styles.headerRow}>
                <Text style={[styles.headerTitle, StyleHelper.headerText]}>Featured Places</Text>
                <Pressable onPress={() => alert("View all will be added here")}>
                    <Text style={[styles.viewAllText, StyleHelper.viewAllText]}>View all →</Text>
                </Pressable>
            </View>
        </View>
    );

    const renderRestaurantItem = ({ item } : any) => {
        const isTrending = item.rating >= 4.5;
        const tagColorStyle = {
            backgroundColor: isTrending ? '#3687ffbd' : inUseTheme.accentBg,
        };
        const tagTextStyle = {
            color: isTrending ? '#ffffff' : inUseTheme.accent,
        };

        return (
            <Pressable 
                style={[styles.cardContainer, StyleHelper.card]} 
                onPress={() => navigation.navigate('Details',{restaurant : item})}
            >
                <ImageBackground 
                    source={{ uri: item.image }} 
                    style={StyleHelper.restaurantImage}
                    imageStyle={styles.cardImageRadius}
                >
                    <View style={[styles.badgeLeft, tagColorStyle]}>
                        <Text style={[styles.badgeLeftText, tagTextStyle]}>
                            {isTrending ? 'Trending' : 'Free delivery'}
                        </Text>
                    </View>
                    
                    <View style={styles.badgeRight}>
                        <Ionicons name="star" size={12} color='#fff' />
                        <Text style={styles.badgeRightText}>{item.rating.toFixed(1)}</Text>
                    </View>
                </ImageBackground>


                <View style={styles.infoContainer}>
                    <Text style={[styles.restaurantName, StyleHelper.titleText]}>
                        {item.name}
                    </Text>
                    
                    <Text style={[styles.restaurantTags, StyleHelper.subtext]}>
                        {item.items[0].description}
                    </Text>
                        
                    <View style={styles.detailsRow}>
                        <Ionicons name="time-outline" size={12} color={inUseTheme.subtext} />
                        <Text style={[styles.detailsText, StyleHelper.subtext]}> {item.time}</Text>
                        
                    </View>
                </View>
            </Pressable>
        );
    };

    return (
        <FlatList
            data={restaurants}
            keyExtractor={(item) => item.id}
            renderItem={renderRestaurantItem}
            ListHeaderComponent={renderHeader}
            contentContainerStyle={[styles.listPadding, StyleHelper.screenContainer]}
            showsVerticalScrollIndicator={false}
        />
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    separator: {
        height: 4,
        width: '100%',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 16,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '700',
    },
    viewAllText: {
        fontSize: 14,
        fontWeight: '600',
    },
    listPadding: {
        paddingBottom: 32,
    },
    cardContainer: {
        borderRadius: 24,
        borderWidth: 1,
        marginBottom: 20,
        marginHorizontal: 16,
        overflow: 'hidden',
    },
    cardImageRadius: {
        borderTopLeftRadius: 23,
        borderTopRightRadius: 23,
    },
    badgeLeft: {
        position: 'absolute',
        top: 14,
        left: 14,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    badgeLeftText: {
        fontSize: 12,
        fontWeight: '700',
    },
    badgeRight: {
        position: 'absolute',
        top: 14,
        right: 14,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 12,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    badgeRightText: {
        color: '#ffffff',
        paddingLeft:4,
        fontSize: 12,
        fontWeight: '700',
    },
    infoContainer: {
        padding: 16,
    },
    restaurantName: {
        fontSize: 19,
        fontWeight: '700',
        marginBottom: 4,
    },
    restaurantTags: {
        fontSize: 14,
        fontWeight: '400',
        marginBottom: 10,
    },
    detailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailsText: {
        fontSize: 13,
        fontWeight: '500',
    },
    distanceMargin: {
        marginLeft: 16,
    },
})