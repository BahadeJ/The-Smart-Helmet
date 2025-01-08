import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import BottomTab from '../components/bottom-tab';
import { SafeAreaView } from 'react-native-safe-area-context';

const Settings = () => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const navigation = useNavigation();

    const handleHelp = () => {
        navigation.navigate('HelpScreen'); // Navigate to the Help screen
    };

    const handleViewDetectionHistory = () => {
        navigation.navigate('ViewDetectionHistory'); // Navigate to the DetectionHistory screen
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.header}>Settings</Text>

                {/* View Detection History */}
                <TouchableOpacity style={styles.settingItem} onPress={handleViewDetectionHistory}>
                    <Text style={styles.settingText}>View Detection History</Text>
                    <Ionicons name="document-text-outline" size={24} color="black" />
                </TouchableOpacity>

                {/* Help */}
                <TouchableOpacity style={styles.settingItem} onPress={handleHelp}>
                    <Text style={styles.settingText}>Help</Text>
                    <Ionicons name="help-circle-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <BottomTab activeTab="Settings"/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F6F6',
        justifyContent: 'space-between',  // Ensures the BottomTab is at the bottom
    },
    content: {
        flex: 1, // Allows the content to take up all available space
        padding: 20,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',  // Ensures text is on the left, icon on the right
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    settingText: {
        fontSize: 18,
        color: 'black',
        flex: 1, // Makes the text take up remaining space
    },
    logoutButton: {
        backgroundColor: '#FF4C4C',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoutText: {
        fontSize: 18,
        color: 'white',
        marginLeft: 10,
    },
});

export default Settings;
