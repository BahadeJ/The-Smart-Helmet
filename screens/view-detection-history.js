import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

// Sample data structure for detection history
const sampleHistoryData = [
  { id: '1', status: 'drowsy', timestamp: '2025-01-08 08:00:00' },
  { id: '2', status: 'non-drowsy', timestamp: '2025-01-08 09:00:00' },
  { id: '3', status: 'drowsy', timestamp: '2025-01-08 10:00:00' },
  { id: '4', status: 'non-drowsy', timestamp: '2025-01-08 11:00:00' },
  { id: '5', status: 'drowsy', timestamp: '2025-01-08 12:00:00' },
];

const ViewDetectionHistory = () => {
    const [historyData, setHistoryData] = useState([]);
    const navigation = useNavigation();

    // Filter the data into drowsy and non-drowsy categories
    const drowsyData = historyData.filter(item => item.status === 'drowsy');
    const nonDrowsyData = historyData.filter(item => item.status === 'non-drowsy');

    useEffect(() => {
        // Simulating fetching data (replace this with real data from Firebase or your backend)
        setHistoryData(sampleHistoryData);
    }, []);

    const renderHistoryItem = ({ item }) => (
        <View style={styles.historyItem}>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
            <Text style={styles.status(item.status)}>{item.status.toUpperCase()}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Detection History</Text>

            {/* Drowsy Section */}
            <Text style={styles.sectionHeader}>Drowsy Detection</Text>
            {drowsyData.length === 0 ? (
                <Text style={styles.noDataText}>No drowsy detections recorded.</Text>
            ) : (
                <FlatList
                    data={drowsyData}
                    renderItem={renderHistoryItem}
                    keyExtractor={item => item.id}
                />
            )}

            {/* Non-Drowsy Section */}
            <Text style={styles.sectionHeader}>Non-Drowsy Detection</Text>
            {nonDrowsyData.length === 0 ? (
                <Text style={styles.noDataText}>No non-drowsy detections recorded.</Text>
            ) : (
                <FlatList
                    data={nonDrowsyData}
                    renderItem={renderHistoryItem}
                    keyExtractor={item => item.id}
                />
            )}

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
        padding: 20,
        backgroundColor: '#F6F6F6',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    sectionHeader: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        color: '#333',
    },
    historyItem: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    timestamp: {
        fontSize: 16,
        color: '#555',
    },
    status: (status) => ({
        fontSize: 18,
        fontWeight: 'bold',
        color: status === 'drowsy' ? 'red' : 'green',
    }),
    noDataText: {
        fontSize: 16,
        color: '#777',
        textAlign: 'center',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F6C344',
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
        justifyContent: 'center',
    },
    backButtonText: {
        fontSize: 18,
        color: 'white',
        marginLeft: 10,
    },
});

export default ViewDetectionHistory;
