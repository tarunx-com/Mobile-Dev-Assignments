import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import useTheme from '../theme/theme'

const SettingsScreen = () => {
    const { isDark, inUseTheme } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: inUseTheme.backgroundColor }]}> 
            <StatusBar style= { isDark? 'light' : 'dark' }/>
            <Text style={{
                color: inUseTheme.text
            }}>
                Settings will be added here
            </Text>
        </View>
    )
}

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})