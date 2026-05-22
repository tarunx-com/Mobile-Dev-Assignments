import { StyleSheet, Text, View,Pressable } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import useTheme from '../theme/theme'
import * as Linking from 'expo-linking';

const ProfileScreen = () => {
    const { isDark, inUseTheme } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: inUseTheme.backgroundColor }]}> 
            <StatusBar style= { isDark? 'light' : 'dark' }/>
            <Text style={{
                color: inUseTheme.text
            }}>
                Profile will be added here
            </Text>

            {/* <Pressable onPress={() => Linking.openURL('quickbite://details/bk1')}>
                <Text>Test Deep Link</Text>
            </Pressable> */}

        </View>
    )
}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})