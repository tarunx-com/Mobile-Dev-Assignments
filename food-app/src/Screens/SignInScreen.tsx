import React, {useState} from 'react';
import { View, Text, Pressable, StyleSheet, useWindowDimensions, TextInput, ScrollView, KeyboardAvoidingView, Platform, } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import useTheme from '../theme/theme';
import { Ionicons } from '@expo/vector-icons';
import {useAuth} from '../data/AuthHelper'

const LogInScreen = () => {
    const navigation = useNavigation<any>();
    const { inUseTheme, isDark } = useTheme();

    const { height, width } = useWindowDimensions();

    const isTablet = width >= 768 && height >= 768;
    const isLandscape = width > height;

    const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");

    const {login} = useAuth();

    const styleHelper = {
        scrollContent: {
            backgroundColor: inUseTheme.card,
            paddingVertical: isTablet ? 28 : 16,
            paddingHorizontal: isTablet ? 24 : 16,
        },

        card: {
            maxWidth: isTablet ? 480 : 380,
        },

        heading: {
            color: inUseTheme.text,
            fontSize: isTablet ? 36 : 28,
            marginBottom: 6,
        },

        subheading: {
            color: inUseTheme.subtext,
            fontSize: isTablet ? 16 : 14,
            marginBottom: isTablet ? 24 : 18,
        },

        fieldGroup: {
            marginBottom: isTablet ? 18 : 12,
        },

        fieldLabel: {
            color: inUseTheme.text,
            fontSize: isTablet ? 14 : 13,
        },

        inputRow: {
            backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
            borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            paddingVertical: isTablet ? 8 : 4,
        },

        textInput: {
            color: inUseTheme.text,
            fontSize: isTablet ? 16 : 14,
        },

        TnC: {
            color: inUseTheme.accent,
            fontSize: isTablet ? 13 : 12,
            marginBottom: isTablet ? 24 : 14,
        },

        primaryButton: {
            backgroundColor: inUseTheme.accent,
            paddingVertical: isTablet ? 16 : 14,
            marginBottom: isTablet ? 20 : 16,
            shadowColor: inUseTheme.accent,
        },

        primaryButtonText: {
            fontSize: isTablet ? 17 : 15,
        },

        signUpRow: {
            marginBottom: isTablet ? 36 : 28,
        },

        signUpBaseText: {
            color: inUseTheme.subtext,
            fontSize: isTablet ? 14 : 13,
        },

        signUpLink: {
            color: inUseTheme.accent,
            fontSize: isTablet ? 14 : 13,
        },

        dividerContainer: {
            marginBottom: isTablet ? 28 : 22,
        },

        dividerLine: {
            backgroundColor: inUseTheme.subtext,
        },

        dividerText: {
            color: inUseTheme.subtext,
        },

        socialButton: {
            backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
            borderColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)',
            paddingVertical: isTablet ? 15 : 13,
        },

        socialButtonText: {
            color: inUseTheme.text,
            fontSize: isTablet ? 15 : 14,
        },
    };

    return (
        <ScrollView contentContainerStyle={[styles.scrollContent, styleHelper.scrollContent]}
            showsVerticalScrollIndicator={false}>
            <View style={[styles.card, styleHelper.card]}>

                <Text style={[styles.heading, styleHelper.heading]}>
                    Welcome
                </Text>
                <Text style={[styles.subheading, styleHelper.subheading]}>
                    Ready to Upgrade your kitchen?
                </Text>

                <View style={[styles.fieldGroup, styleHelper.fieldGroup]}>
                    <Text style={[styles.fieldLabel, styleHelper.fieldLabel]}>
                        Email Address
                    </Text>
                    <View style={[styles.inputRow, styleHelper.inputRow]}>
                        <Ionicons name="mail-outline" size={isTablet ? 22 : 20} color={inUseTheme.subtext} />
                        <TextInput
                            placeholder="Enter your email address"
                            placeholderTextColor={inUseTheme.subtext}
                            style={[styles.textInput, styleHelper.textInput]}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                </View>

                {/* ── Password field ── */}
                <View style={[styles.fieldGroup, styleHelper.fieldGroup]}>
                    <Text style={[styles.fieldLabel, styleHelper.fieldLabel]}>
                        Password
                    </Text>
                    <View style={[styles.inputRow, styleHelper.inputRow]}>
                        <Ionicons name="lock-closed-outline" size={isTablet ? 22 : 20} color={inUseTheme.subtext} />
                        <TextInput
                            placeholder="Enter your password"
                            placeholderTextColor={inUseTheme.subtext}
                            style={[styles.textInput, styleHelper.textInput]}
                            secureTextEntry
                            value={pass}
                            onChangeText={setPass}
                        />
                    </View>
                </View>

                <View style={[styles.fieldGroup, styleHelper.fieldGroup]}>
                    <Text style={[styles.fieldLabel, styleHelper.fieldLabel]}>
                        Confirm Password
                    </Text>
                    <View style={[styles.inputRow, styleHelper.inputRow]}>
                        <Ionicons name="lock-closed-outline" size={isTablet ? 22 : 20} color={inUseTheme.subtext} />
                        <TextInput
                            placeholder="Confirm your password"
                            placeholderTextColor={inUseTheme.subtext}
                            style={[styles.textInput, styleHelper.textInput]}
                            secureTextEntry
                            value={pass}
                            onChangeText={setPass}
                        />
                    </View>
                </View>
                <Pressable onPress={()=> alert('Terms and Conditions coming soon!')} style={{ alignSelf: 'flex-end' }}>
                    <Text style={[styles.TnC, styleHelper.TnC]}>
                        Terms and Condition*
                    </Text>
                </Pressable>

                {/* ── Primary CTA ── */}
                <Pressable onPress={()=>login({name: email.split('@')[0],Email: email })} 
                style={[styles.primaryButton, styleHelper.primaryButton]}>
                    <Text style={[styles.primaryButtonText, styleHelper.primaryButtonText]}>
                        Log In
                    </Text>
                </Pressable>


                {/* ── Sign Up nudge ── */}
                <Pressable
                    onPress={() => navigation.navigate('Log In')}
                    style={[styles.signUpRow, styleHelper.signUpRow]}
                >
                    <Text style={[styles.signUpBaseText, styleHelper.signUpBaseText]}>
                        Already have an account?{' '}
                    </Text>
                    <Text style={[styles.signUpLink, styleHelper.signUpLink]}>
                        Log In
                    </Text>
                </Pressable>

                {/* ── OR divider ── */}
                <View style={[styles.dividerContainer, styleHelper.dividerContainer]}>
                    <View style={[styles.dividerLine, styleHelper.dividerLine]} />
                    <Text style={[styles.dividerText, styleHelper.dividerText]}>
                        OR CONTINUE WITH
                    </Text>
                    <View style={[styles.dividerLine, styleHelper.dividerLine]} />
                </View>

                {/* ── Google social button ── */}
                <View style={styles.socialButtonWrapper}>
                    <Pressable onPress={()=>alert('Google Sign-In coming soon!')}
                    style={[styles.socialButton, styleHelper.socialButton]}>
                        <Ionicons name="logo-google" size={isTablet ? 22 : 20} color={inUseTheme.text} />
                        <Text style={[styles.socialButtonText, styleHelper.socialButtonText]}>
                            Continue with Google
                        </Text>
                    </Pressable>
                </View>

            </View>
        </ScrollView>
    );
};

export default LogInScreen;


const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    card: {
        width: '100%',
        alignItems: 'center',
    },

    heading: {
        fontWeight: '800',
        letterSpacing: -0.5,
        textAlign: 'center',
    },

    subheading: {
        textAlign: 'center',
        lineHeight: 18,
    },

    fieldGroup: {
        width: '100%',
    },

    fieldLabel: {
        fontWeight: '600',
        marginBottom: 8,
        letterSpacing: 0.3,
    },

    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderRadius: 14,
        paddingHorizontal: 14,
        gap: 10,
    },

    textInput: {
        flex: 1,
    },

    TnC: {
        alignSelf: 'flex-end',
        fontWeight: '600',
        marginTop: -8,
    },

    primaryButton: {
        borderRadius: 14,
        width: '100%',
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

    signUpRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    signUpBaseText: {},

    signUpLink: {
        fontWeight: '700',
    },

    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },

    dividerLine: {
        flex: 1,
        height: 1,
        opacity: 0.25,
    },

    dividerText: {
        paddingHorizontal: 12,
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1.8,
    },

    socialButtonWrapper: {
        width: '100%',
    },

    socialButton: {
        flexDirection: 'row',
        borderWidth: 1.5,
        borderRadius: 14,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },

    socialButtonText: {
        fontWeight: '600',
    },
});