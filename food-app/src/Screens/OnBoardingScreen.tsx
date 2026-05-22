import { StyleSheet, Text, View, Button, Pressable, ImageBackground, useColorScheme, useWindowDimensions, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import useTheme from '../theme/theme';
import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

const OnBoardingScreen = () => {

    const { isDark, inUseTheme } = useTheme();
    const { height, width } = useWindowDimensions();

    const navigation = useNavigation<any>();

    const isTablet = width >= 768 && height >= 768;
    const isLandscape = width > height;

    const StyleHelper = {
        image: {
            height: height*0.95,
            width: width
        },
        card: {
            backgroundColor: inUseTheme.backgroundColor,
            maxWidth: isTablet ? (isLandscape ? 500 : 450) : (isLandscape ? 500 : width * 0.8),
            borderColor: inUseTheme.border,
            paddingHorizontal: isTablet ? isLandscape ? 35 : 25 : isLandscape ? 30 : 20,
            paddingVertical: isTablet ? (isLandscape ? 25 : 35) : isLandscape ? 15 : 25,
            borderRadius: isTablet ? 30 : isLandscape ? 24 : 20,
        },
        heading: {
            fontSize: isTablet ? 42 : 38,
            color: inUseTheme.text,
        },
        body: {
            color: inUseTheme.subtext,
            fontSize: isTablet ? 22 : 18,
        },
        primaryButton: {
            backgroundColor: inUseTheme.accent,
            paddingVertical: isTablet ? 16 : 14,
            marginTop: isTablet ? 20 : 16,
            shadowColor: inUseTheme.accent,
            paddingHorizontal: isTablet ? 30 : 25,
        },
        primaryButtonText: {
            fontSize: isTablet ? 17 : 15,
        },
    }

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            style={{ backgroundColor: inUseTheme.backgroundColor }}
        >
            <StatusBar style={isDark ? "light" : "dark"} />
            <ImageBackground style={[styles.backdrop, StyleHelper.image]}
                resizeMode='cover'
                source={isDark ?
                    require("../../assets/onBoard-dark.png") :
                    require("../../assets/onBoard-light.png")
                }
                imageStyle={StyleHelper.image}
            >
                <View style={[styles.card, StyleHelper.card]}>
                    <Text style={[styles.heading, StyleHelper.heading]}>
                        Delicious food at your <Text style={{ color: inUseTheme.accent }}>doorstep</Text>
                    </Text>
                    <Text style={[StyleHelper.body, styles.body]}>
                        Discover the best restaurants in your city and satisfy your late nigth cravings.
                    </Text>
                    <Pressable onPress={() => navigation.navigate('Auth')} style={[styles.primaryButton, StyleHelper.primaryButton]}>
                        <Text style={[styles.primaryButtonText, StyleHelper.primaryButtonText]}>
                            Get Started {" "}
                        </Text>
                        <Ionicons name="arrow-forward" size={isTablet ? 20 : 18} color="#fff" />
                    </Pressable>
                </View>
            </ImageBackground>

            <View style={[styles.separator, { backgroundColor: inUseTheme.border}]} />

            <View style={[styles.lowerContainer, { paddingHorizontal: isTablet ? 40 : 24 }]}>
                
                <View style={[styles.badgeContainer,{ backgroundColor: inUseTheme.accentBg, borderColor: inUseTheme.accent, borderWidth: 1 }]}>
                    <Text style={[styles.badgeText, { color: inUseTheme.accent }]}>FUTURE OF FOOD</Text>
                </View>

                <Text style={[styles.lowerHeading, { color: inUseTheme.text, fontSize: isTablet ? 40 : 34 }]}>
                    Bite into the <Text style={[styles.italicAccent,{color: inUseTheme.accent}]}>Illuminated</Text> Future.
                </Text>

                <Text style={[styles.lowerBody, { color: inUseTheme.subtext, fontSize: isTablet ? 18 : 16 }]}>
                    Precision-crafted culinary experiences delivered at digital speeds. Our laboratory of flavor awaits your command.
                </Text>

                <View style={styles.featureRow}>
                    <View style={[styles.iconContainer, { backgroundColor: inUseTheme.accentBg, borderColor: inUseTheme.accent }]}>
                        <Ionicons name="flash" size={isTablet ? 26 : 22} color={inUseTheme.accent} />
                    </View>
                    <View style={styles.featureTextContainer}>
                        <Text style={[styles.featureTitle, { color: inUseTheme.text, fontSize: isTablet ? 20 : 18 }]}>Hyper-Fast Delivery</Text>
                        <Text style={[styles.featureSubtitle, { color: inUseTheme.subtext, fontSize: isTablet ? 16 : 14 }]}>Under 15 minutes within city limits.</Text>
                    </View>
                </View>

                <View style={styles.featureRow}>
                    <View style={[styles.iconContainer, { backgroundColor: inUseTheme.accentBg, borderColor: inUseTheme.accent }]}>
                        <Ionicons name="restaurant" size={isTablet ? 26 : 22} color={inUseTheme.accent} />
                    </View>
                    <View style={styles.featureTextContainer}>
                        <Text style={[styles.featureTitle, { color: inUseTheme.text, fontSize: isTablet ? 20 : 18 }]}>Curated Excellence</Text>
                        <Text style={[styles.featureSubtitle, { color: inUseTheme.subtext, fontSize: isTablet ? 16 : 14 }]}>Only the top 1% of kitchens make the cut.</Text>
                    </View>
                </View>
                
            </View>
        </ScrollView>
    )
}

export default OnBoardingScreen;

const styles = StyleSheet.create({
    backdrop: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        borderWidth: 2,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    heading: {
        marginVertical: 0,
        fontWeight: '600',
        textAlign: 'center'
    },
    body: {
        paddingTop: 20,
        textAlign: 'center'
    },
    primaryButton: {
        borderRadius: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
        elevation: 6,
    },
    primaryButtonText: {
        color: '#fff',
        fontWeight: '700',
        letterSpacing: 0.3,
    },
    separator: {
        height: 2,
        width: '100%',
    },
    lowerContainer: {
        paddingTop: 40,
        paddingBottom:100,
        maxWidth: '90%',
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    badgeContainer: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        alignSelf: 'flex-start',
        marginBottom: 16,
    },
    badgeText: {
        fontWeight: '700',
        fontSize: 11,
        letterSpacing: 0.5,
    },
    lowerHeading: {
        fontWeight: '800',
        lineHeight: 42,
        letterSpacing: -0.5,
        marginBottom: 16,
    },
    italicAccent: {
        fontStyle: 'italic',
    },
    lowerBody: {
        lineHeight: 24,
        marginBottom: 32,
    },
    featureRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    iconContainer: {
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        marginRight: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    featureTextContainer: {
        flex: 1,
    },
    featureTitle: {
        fontWeight: '700',
        marginBottom: 2,
    },
    featureSubtitle: {
        lineHeight: 18,
    },
})