import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {registerUser} from '../Providers/http';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';


const SignupScreen: React.FC = ({navigation, route}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [lastName, setLastName] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    const {uid, phoneNumber} = route.params;
    const [imageUri, setImageUri] = useState('');


  
    const handleSignup = () => {
       setIsLoading(true);
      if(name && lastName){
        // navigation.navigate('Home')
        registerUser(name, lastName, email, phoneNumber, null, uid).then((result) => {
          console.log('RegisterUser resp =>', result);
            setIsLoading(false);
            navigation.navigate('Login')
          }).catch((error) => {
            setIsLoading(false);
          console.error('handleSignup Error:', error);
          });
      } else {
        setIsLoading(false);
      }
    };


    const handleImageUpload = async () => {
      const options:any = {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      };
  
      launchImageLibrary(options, async (response:any) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          const uri = response.assets[0].uri;
          setImageUri(uri);
  
          // Upload the image to Firebase Storage
          const uploadUri = uri;
          let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
  
          // Add timestamp to file name to ensure unique filenames
          const timestamp = new Date().getTime();
          const name = filename.split('.').slice(0, -1).join('.');
          const extension = filename.split('.').pop();
          filename = `${name}_${timestamp}.${extension}`;
  
          const storageRef = storage().ref(`images/${filename}`);
          const task = storageRef.putFile(uploadUri);
  
          task.on('state_changed', (taskSnapshot) => {
            console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
          });
  
          try {
            await task;
            const url = await storageRef.getDownloadURL();
            console.log('Image uploaded to Firebase Storage:', url);
            // You can save this URL in your database if needed
            handleSignup();
          } catch (e) {
            console.error(e);
          }
        }
      });
    };


  return (
      <View style={styles.container}>
       
            <View style={styles.registerationContainer}>
            <TouchableOpacity style={styles.menuIcon} onPress={() => {console.log('signup')}}>
            <AntDesign name="arrowleft" size={25} color={'transparent'} />
            </TouchableOpacity>
            <Text style={styles.title}>Welcome User</Text>

            <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="white"
            value={name}
            onChangeText={setName}/>

            <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor="white"
            value={lastName}
            onChangeText={setLastName}/>

            <TextInput
            style={styles.input}
            placeholder="Email (Optional)"
            placeholderTextColor="white"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}/>

            <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
              {
                isLoading ?
                <ActivityIndicator size="small" color="white" /> : <Text style={styles.signupButtonText}>Next</Text>
              }
            </TouchableOpacity>

          </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#061628',
  },
  registerationContainer:{
    padding:10,
    justifyContent: 'center',
    alignItems: 'center',
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
    paddingTop:20,
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
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  profileCard: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#030a13',
    borderRadius: 8,
    elevation: 5,
    width: '70%',
    height: '30%',
  },
  innerProfile:{
    flexDirection: 'row',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  leftContainer: {
    flex: 1,
    alignItems:'center'
  },
  modelName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 0,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    color: 'white',
    borderRadius: 8,
  },
  signupButton: {
    backgroundColor: '#007eff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    width: '75%',
    alignItems:'center',
    justifyContent: 'center',
  },
  signupButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    marginBottom: 20,
    alignItems:'center'
  },
  uploadButtonText: {
    paddingTop:10,
    color: 'white',
    textAlign: 'center',
  },
  dropdownButton: {
    backgroundColor: 'transparent',
    padding: 8,
    borderRadius: 8,
    marginBottom: 25,
    width: '100%',
    borderColor: 'white',
    borderWidth: 1,
    height: 40,
    paddingLeft: 10,
    color: 'white',
  },
  dropdownButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  dropdown: {
    backgroundColor: 'white',
    borderRadius: 8,
    color:'white'
  },
});

export default SignupScreen;