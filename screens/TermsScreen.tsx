import React, { useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const TermsScreen: React.FC = ({navigation}) => {
  const [isChecked, setChecked] = useState(false);

  const handleCheckboxToggle = () => {
    setChecked(!isChecked);
  };

  return (
    <View style={styles.container}>
     <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.navigate('Login')}>
        <AntDesign name="back" size={25} color={'white'} />
      </TouchableOpacity>

    <Text style={styles.title}>Terms & Conditions</Text>
    <ScrollView style={styles.scrollView}>
      <Text style={styles.termsText}>
        1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Text>
      <Text style={styles.termsText}>
        2. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Text>
      <Text style={styles.termsText}>
        3. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Text>
      <Text style={styles.termsText}>
        4. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Text>

      {/* Checkbox */}
      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={handleCheckboxToggle} style={styles.checkbox}>
          {isChecked && <View style={styles.checkmark} />}
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>I agree to the terms and conditions</Text>
      </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    padding: 20,
    backgroundColor: '#061628',
  },
  termsText: {
    fontSize: 16,
    lineHeight: 24,
    color: 'white',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 5,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    width: 12,
    height: 12,
    backgroundColor: 'white',
    borderRadius: 3,
  },
  checkboxLabel: {
    color: 'white',
    fontSize: 16,
  },
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
    fontSize: 18,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    textAlign: 'center',
  },
});

export default TermsScreen;