import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const HelpScreen = () => {
    const navigation = useNavigation();

    const handleContactSupport = () => {
        // Handle the logic for contacting support, e.g., email or chat
        console.log("Navigating to contact support");
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Help</Text>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Instructions Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>How to Use the Smart Helmet:</Text>
                    <Text style={styles.sectionContent}>
                        - Wear the helmet securely on your head{"\n"}
                        - Ensure the sensor is positioned correctly for accurate drowsiness detection{"\n"}
                        - The helmet will alert you if drowsiness is detected, allowing you to take action{"\n"}
                    </Text>
                </View>

                {/* FAQ Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Frequently Asked Questions (FAQs):</Text>
                    <Text style={styles.sectionContent}>
                        Q: How do I know if the helmet is detecting correctly?{"\n"}
                        A: You will receive an alert if drowsiness is detected. Check the settings for more options.{"\n\n"}

                        Q: Can I disable notifications?{"\n"}
                        A: Yes, you can enable or disable notifications from the Settings screen.{"\n"}
                    </Text>
                </View>

                {/* Contact Support Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Need Help?</Text>
                    <Text style={styles.sectionContent}>
                        If you need further assistance, please feel free to contact support.
                    </Text>
                    <TouchableOpacity style={styles.contactButton} onPress={handleContactSupport}>
                        <Ionicons name="mail-outline" size={24} color="white" />
                        <Text style={styles.contactButtonText}>Contact Support</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Back Button */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="arrow-back" size={24} color="white" />
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F6F6',
        paddingTop: 20,
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    scrollContainer: {
        paddingBottom: 80, // Give space for the back button and ensure content is scrollable
    },
    section: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 12,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#444',
    },
    sectionContent: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
    },
    contactButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F6C344',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        justifyContent: 'center',
        elevation: 3,
    },
    contactButtonText: {
        fontSize: 18,
        color: 'white',
        marginLeft: 10,
        fontWeight: '500',
    },
    backButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F6C344',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 6,
    },
    backButtonText: {
        fontSize: 18,
        color: 'white',
        marginLeft: 10,
    },
});

export default HelpScreen;
