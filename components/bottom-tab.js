import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';  // Import Firebase Auth

const BottomTab = ({ activeTab }) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const navigation = useNavigation();

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleLogout = async () => {
        try {
            // Unsubscribe from Firebase listeners if needed (example with auth state listener)
            // Add your Firebase listener cleanup code here if applicable

            // Sign out from Firebase Auth
            await auth().signOut();

            console.log('User logged out successfully');

            // Navigate to Login screen after logging out
            navigation.navigate('Login');
        } catch (error) {
            console.error('Error during logout:', error);
        }

        // Close the menu after logout
        setMenuVisible(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.tabItem}
                onPress={() => navigation.navigate('Settings')}
            >
                <Ionicons
                    name="settings-outline"
                    size={24}
                    color={activeTab === 'Settings' ? 'white' : 'black'}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.tabItem}
                onPress={() => navigation.navigate('Dashboard')}
            >
                <Ionicons
                    name="trending-up-outline"
                    size={24}
                    color={activeTab === 'Dashboard' ? 'white' : 'black'}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.tabItem}
                onPress={() => navigation.navigate('Profile')}
            >
                <Ionicons
                    name="person-outline"
                    size={24}
                    color={activeTab === 'Profile' ? 'white' : 'black'}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.tabItem}
                onPress={toggleMenu}
            >
                <Ionicons
                    name="menu-outline"
                    size={24}
                    color={menuVisible ? 'white' : 'black'}
                />
            </TouchableOpacity>

            {menuVisible && (
                <View style={styles.dropdownMenu}>
                    <TouchableOpacity onPress={handleLogout} style={styles.dropdownItem}>
                        <Text style={styles.dropdownText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#F6C344',
        paddingVertical: 5,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tabItem: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        bottom: 5,
        marginHorizontal: 15
    },
    dropdownMenu: {
        position: 'absolute',
        bottom: 60,
        right: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    dropdownItem: {
        padding: 10,
        alignItems: 'center',
    },
    dropdownText: {
        color: 'black',
    },
});

export default BottomTab;
