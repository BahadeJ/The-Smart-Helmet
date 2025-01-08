import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Modal,
    TextInput,
    Button,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomTab from '../components/bottom-tab';
import { Ionicons } from '@expo/vector-icons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import * as ImagePicker from 'expo-image-picker';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [editData, setEditData] = useState({
        fullName: '',
        email: '',
        profilePicture: '',
    });

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const currentUser = auth().currentUser;
                if (currentUser) {
                    const userDoc = await firestore()
                        .collection('users')
                        .doc(currentUser.uid)
                        .get();

                    if (userDoc.exists) {
                        setUser({ ...userDoc.data(), email: currentUser.email });
                    }
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

    const handleEditProfile = () => {
        setEditData({
            fullName: user.fullName || '',
            email: user.email || '',
            profilePicture: user.profilePicture || '',
        });
        setModalVisible(true);
    };

    const handleImagePick = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted) {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaType: ImagePicker.MediaTypeOptions.Images,
                quality: 0.8,
            });

            if (!result.canceled && result.assets) {
                setEditData((prev) => ({
                    ...prev,
                    profilePicture: result.assets[0].uri,
                }));
            }
        } else {
            Alert.alert('Permission required', 'You need to grant permission to access your photo library.');
        }
    };

    const handleSaveProfile = async () => {
        try {
            const currentUser = auth().currentUser;
            if (currentUser) {
                // Update Firestore
                await firestore()
                    .collection('users')
                    .doc(currentUser.uid)
                    .update({
                        fullName: editData.fullName,
                        profilePicture: editData.profilePicture,
                    });

                // Update Firebase Auth (for email)
                await currentUser.updateEmail(editData.email);

                // Update local state
                setUser({
                    fullName: editData.fullName,
                    email: editData.email,
                    profilePicture: editData.profilePicture,
                });

                setModalVisible(false);
                Alert.alert('Profile updated successfully!');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            Alert.alert('Failed to update profile. Please try again.');
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={[styles.safeArea, styles.center]}>
                <ActivityIndicator size="large" color="#007bff" />
            </SafeAreaView>
        );
    }

    if (!user) {
        return (
            <SafeAreaView style={[styles.safeArea, styles.center]}>
                <Text style={styles.errorText}>Failed to load user data.</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                {/* Profile Section */}
                <View style={styles.profileSection}>
                    <Image
                        style={styles.profileImage}
                        source={user.profilePicture ? { uri: user.profilePicture } : require('../assets/profile.png')}
                    />
                    <Text style={styles.name}>{user.fullName || 'User'}</Text>
                    <Text style={styles.email}>{user.email || 'johndoe@example.com'}</Text>
                    <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
                        <Text style={styles.editButtonText}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>

                {/* Helmet Status Section */}
                <View style={styles.statusSection}>
                    <Text style={styles.sectionTitle}>Helmet Status</Text>
                    <View style={styles.statusRow}>
                        <Ionicons name="checkmark-circle" size={24} color="green" />
                        <Text style={styles.statusText}>Helmet Connected</Text>
                    </View>
                    <View style={styles.statusRow}>
                        <Ionicons name="alert-circle" size={24} color="red" />
                        <Text style={styles.statusText}>Drowsy: Detected</Text>
                    </View>
                </View>

                {/* App Features */}
                <View style={styles.featuresSection}>
                    <Text style={styles.sectionTitle}>App Features</Text>
                    <View style={styles.featureRow}>
                        <Ionicons name="heart-outline" size={24} color="gray" />
                        <Text style={styles.featureText}>Heart Rate Monitoring</Text>
                    </View>
                    <View style={styles.featureRow}>
                        <Ionicons name="speedometer-outline" size={24} color="gray" />
                        <Text style={styles.featureText}>Speed Tracking</Text>
                    </View>
                    <View style={styles.featureRow}>
                        <Ionicons name="warning-outline" size={24} color="gray" />
                        <Text style={styles.featureText}>Drowsiness Alerts</Text>
                    </View>
                </View>
            </ScrollView>

            <BottomTab activeTab="Profile" />

            {/* Edit Profile Modal */}
            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Edit Profile</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Full Name"
                            value={editData.fullName}
                            onChangeText={(text) => setEditData((prev) => ({ ...prev, fullName: text }))}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={editData.email}
                            onChangeText={(text) => setEditData((prev) => ({ ...prev, email: text }))}
                            keyboardType="email-address"
                        />
                        <TouchableOpacity style={styles.imagePicker} onPress={handleImagePick}>
                            <Text style={styles.imagePickerText}>Change Profile Picture</Text>
                        </TouchableOpacity>

                        {/* Change Indicator with Icon */}
                        {user.fullName !== editData.fullName ||
                        user.email !== editData.email ||
                        user.profilePicture !== editData.profilePicture ? (
                            <View style={styles.changedIndicatorContainer}>
                                <Ionicons name="checkmark-circle" size={24} color="green" />
                                <Text style={styles.changedIndicator}>Profile has been changed</Text>
                            </View>
                        ) : null}

                            <View style={styles.modalActions}>
                            <Button title="Cancel" onPress={() => setModalVisible(false)} />
                            <Button title="Save" onPress={handleSaveProfile} />
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
    container: {
        padding: 20,
        alignItems: 'center',
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: 30,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: '#F6C344',
        marginBottom: 15,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    email: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 10,
    },
    editButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
    },
    editButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    statusSection: {
        width: '100%',
        marginBottom: 30,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    statusText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#333',
    },
    featuresSection: {
        width: '100%',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    featureRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    featureText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#333',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
    },
    imagePicker: {
        marginTop: 10,
    },
    imagePickerText: {
        color: '#007bff',
        textDecorationLine: 'underline',
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    changedIndicatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        paddingHorizontal: 20,
    },
    changedIndicator: {
        fontSize: 16,
        color: 'green',
        marginLeft: 8,
    },    
});

export default Profile;
