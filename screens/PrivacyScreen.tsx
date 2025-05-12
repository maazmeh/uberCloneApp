import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const PrivacyScreen: React.FC = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.navigate('Login')}>
        <AntDesign name="back" size={25} color={'white'} />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Privacy Policy</Text>

      <ScrollView style={styles.scrollView}>
        <Text style={styles.privacyPolicyText}>. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </Text>
        <Text style={styles.privacyPolicyText}>. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </Text>
        <Text style={styles.privacyPolicyText}>. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </Text>
        <Text style={styles.privacyPolicyText}>. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#061628',
  },
  menuIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  menuText: {
    color: 'white',
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
    marginBottom: 20,
  },
  privacyPolicyText: {
    fontSize: 16,
    lineHeight: 24,
    color: 'white',
    textAlign: 'left',
  },
  continueButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PrivacyScreen;