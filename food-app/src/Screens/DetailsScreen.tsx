import { StyleSheet, Text, View, ImageBackground, Image, FlatList, Pressable, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import useTheme from '../theme/theme'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useCart } from '../data/CartData'
import { Background } from '@react-navigation/elements'

const DetailsScreen = ({ route }: any) => {
    const { inUseTheme, isDark } = useTheme();
    const { height, width } = useWindowDimensions();
    const navigation = useNavigation<any>();
    const { cartItems, handleIncrement, handleDecrement } = useCart();

    const { restaurant: itemRest } = route.params;

    const isTablet = width >= 768 && height >= 768;
    const isLandscape = width > height;

    const numColumns = (isTablet && isLandscape) ? 3 : ((isTablet || isLandscape) ? 2 : 1);


    const StyleHelper = {
        screenContainer: {
            backgroundColor: inUseTheme.backgroundColor || '#0F0F0F',
        },
        card: {
            backgroundColor: inUseTheme.card || '#1A1C1E',
            borderColor: inUseTheme.border || '#2C2D30',
        },
        titleText: {
            color: inUseTheme.text || '#FFFFFF',
        },
        subtext: {
            color: inUseTheme.subtext || '#9CA3AF',
        },
        priceText: {
            color: inUseTheme.accent || '#FFB8A1',
        },
        buttonBg: {
            backgroundColor: inUseTheme.accent || '#FFB8A1',
        },
        buttonText: {
            color: inUseTheme.backgroundColor, 
        },
        dynamicHeaderTitle: {
            fontSize: isTablet ? 48 : 36,
        },
        dynamicHeaderPadding: {
            paddingHorizontal: isTablet ? 40 : 20,
        },
        statBadge:{
            backgroundColor: inUseTheme.accentBg,
            borderColor:inUseTheme.accent
        }
    };

    const renderHeader = () => (

        <View style={styles.headerContainer}>
            <StatusBar style= {isDark ? "light" : "dark"} />
            
            <ImageBackground 
                style={[styles.bannerImage, { height: isLandscape ? height * 0.45 : height * 0.35 }]} 
                source={{ uri: itemRest.image }}
                imageStyle={styles.bannerImageStyle}
            >
                <View style={styles.overlay} />

                <View style={[styles.headerContent, StyleHelper.dynamicHeaderPadding]}>
                    <Text style={[styles.headerTitle, StyleHelper.dynamicHeaderTitle]}>{itemRest.name}</Text>
                    
                    <View style={styles.statsRow}>
                        <View style={[styles.statBadge,StyleHelper.statBadge]}>
                            <Ionicons name="star" size={14} color={inUseTheme.accent} />
                            <Text style={styles.statText}>{itemRest.rating.toFixed(1)}</Text>
                        </View>
                        <View style={[styles.statBadge,StyleHelper.statBadge]}>
                            <Ionicons name="time-outline" size={14} color={inUseTheme.text} />
                            <Text style={styles.statText}>{itemRest.time}</Text>
                        </View>
                    </View>
                    
                </View>
            </ImageBackground>
        </View>
    );

    const renderFoodItem = ({ item }: any) => {
        const quantity = cartItems[item.id] || 0;

        return (
            <View style={[styles.gridItemWrapper, { marginHorizontal: numColumns > 1 ? 8 : 16 }]}>
                <View style={[styles.cardContainer, StyleHelper.card]}>
                    <Image 
                        source={{ uri: item.image }} 
                        style={[styles.itemImage, { height: isTablet ? 220 : 160 }]} 
                    />

                    <View style={styles.infoContainer}>
                        <View style={styles.titleRow}>
                            <Text style={[styles.itemName, StyleHelper.titleText]} numberOfLines={2}>
                                {item.name}
                            </Text>
                            <Text style={[styles.itemPrice, StyleHelper.priceText]}>
                                ₹{item.price}
                            </Text>
                        </View>
                        
                        <Text style={[styles.itemDescription, StyleHelper.subtext]} numberOfLines={2}>
                            {item.description}
                        </Text>
                        
                        <View style={styles.spacer} />

                        <View style={styles.actionRow}>
                            {quantity > 0 && (
                                <View style={styles.quantityContainer}>
                                    <Pressable 
                                        style={[styles.circleButton, StyleHelper.buttonBg]} 
                                        onPress={() => handleDecrement(item.id)}
                                    >
                                        <Ionicons name="remove" size={18} color={StyleHelper.buttonText.color} />
                                    </Pressable>
                                    <Text style={[styles.quantityText, StyleHelper.titleText]}>
                                        {quantity}
                                    </Text>
                                </View>
                            )}

                            <Pressable 
                                style={[
                                    styles.addToCartBtn, 
                                    StyleHelper.buttonBg, 
                                    { flex: 1, }
                                ]} 
                                onPress={() => handleIncrement(item.id)}
                            >
                                <Ionicons name={quantity > 0 ? "add" : "cart-outline"} size={18} color={StyleHelper.buttonText.color} />
                                <Text style={[styles.addToCartText, StyleHelper.buttonText]}>
                                    {quantity > 0 ? "Add" : "Add to Cart"}
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <FlatList
            key={`list-${numColumns}`}
            data={itemRest.items}
            keyExtractor={(item) => item.id}
            numColumns={numColumns}
            renderItem={renderFoodItem}
            ListHeaderComponent={renderHeader}
            contentContainerStyle={[
                styles.listPadding, 
                StyleHelper.screenContainer,
                { paddingHorizontal: numColumns > 1 ? 8 : 0 } 
            ]}
            showsVerticalScrollIndicator={false}
        />
    );
}

export default DetailsScreen;

const styles = StyleSheet.create({
    headerContainer: {
        marginBottom: 24,
    },
    bannerImage: {
        width: '100%',
        justifyContent: 'space-between',
    },
    bannerImageStyle: {
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
    },
    openNowBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    pulseDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#4ADE80',
        marginRight: 6,
    },
    openNowText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    headerContent: {
        paddingBottom: 24,
    },
    headerTitle: {
        fontWeight: '800',
        color: '#FFFFFF',
        marginBottom: 12,
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    statBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        borderWidth:1,
        marginRight: 12,
    },
    feeBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    statText: {
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: '600',
        marginLeft: 4,
    },
    listPadding: {
        paddingBottom: 40,
    },
    gridItemWrapper: {
        flex: 1,
    },
    cardContainer: {
        flex: 1,
        borderRadius: 20,
        borderWidth: 1,
        marginBottom: 20,
        overflow: 'hidden',
    },
    itemImage: {
        width: '100%',
        resizeMode: 'cover',
    },
    infoContainer: {
        flex: 1,
        padding: 16,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    itemName: {
        fontSize: 18,
        fontWeight: '700',
        flex: 1,
        marginRight: 8,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: '700',
    },
    itemDescription: {
        fontSize: 13,
        lineHeight: 18,
        marginBottom: 16,
    },
    spacer: {
        flex: 1,
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 'auto',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    circleButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityText: {
        fontSize: 16,
        fontWeight: '700',
        marginHorizontal: 16,
    },
    addToCartBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 12,
    },
    addToCartText: {
        fontSize: 15,
        fontWeight: '700',
        marginLeft: 8,
    },
});