import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Welcome = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>THE{'\n'}SMART{'\n'}HELMET</Text>
        <Text style={styles.subtitle}>MONITOR YOURSELF</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.imagePlaceholder}
          source={require('../assets/smart_helmet_logo.png')}
        />
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>START</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20, // Adjust the spacing between the title and the image
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    lineHeight: 40, // Adjust for spacing between lines
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 10, // Space below the title
  },
  imageContainer: {
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 340,
    height: 340,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    color: '#aaa',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 50,
    width: '90%',
    borderRadius: 30,
    marginBottom: 40, 
    bottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Welcome;
