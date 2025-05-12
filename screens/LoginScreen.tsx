import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ToastAndroid, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
//Google Login
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { firebaseConfig } from '../Providers/GlobalStateVariables';
import firebase from '@react-native-firebase/app';
import PhoneInput from "react-native-phone-number-input";


const LoginScreen: React.FC = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading , setLoading] = useState<any>(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmation, setConfirmation] = useState(null);
  const [isLoading, setisLoading] = useState<any>(false);

  const phoneInput = useRef<PhoneInput>(null);
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");

  useEffect(() => {
   // Initialize Google Sign
   GoogleSignin.configure({
    webClientId: '1062811601078-ucrsag9vjo9ufbgkdeontpv858fob944.apps.googleusercontent.com'
    });
  },[]);

  const takeMeToVerify = () => {
    console.log("value & formattedValue =>", value , formattedValue);
    let newVal:any = formattedValue.substring(1);
    console.log("newVal =>", newVal);
    navigation.navigate('Verify', { confirmation: '123456', phoneNumber: newVal });
  }


  const onSendVerificationCodePress = async () => {
    try {
      setisLoading(true);
      let newVal:any = formattedValue.substring(1);
       console.log("newVal =>", newVal);
      if(newVal > '11'){
        let confirmation:any = await auth().signInWithPhoneNumber(`+${newVal}`);
        setConfirmation(confirmation);
        console.log('Verification All data', confirmation);
        setisLoading(false)
        navigation.navigate('Verify', { confirmation, phoneNumber: newVal });
      } else {
        setisLoading(false)
        showToastWithGravityAndOffset('Please Enter the Complete Number');
      }
    } catch (error) {
      setisLoading(false)
      showToastWithGravityAndOffset('Something is wrong, Please try again later !');
      console.error('Send Verification Code Error', error);
    }
  };

  const showToastWithGravityAndOffset = (title:any) => {
    ToastAndroid.showWithGravityAndOffset(
      title,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  const openTerms = () => {
    navigation.navigate('Terms');
  };
  
  const openPrivacy = () => {
    navigation.navigate('Privacy');
  };
 
    const onGoogleButtonPress = async () => {
      console.log('Signin with Google pressed');
      try {
        const {idToken} = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        setLoading(true);
        let timezone = new Date();
      
      } catch (error: any) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          console.log('error', error, error.code);
        } else if (error.code === statusCodes.IN_PROGRESS) {
          console.log('error', error, error.code);
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          console.log('error', error, error.code);
        } else {
          console.log('error', error, error.code, 'else');
        }
      }
    }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join us via Phone Number</Text>
      <Text style={styles.subtitle}>We’ll text a code to verify your phone</Text>
      {/* <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        placeholderTextColor="white"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      /> */}

          <PhoneInput
           ref={phoneInput}
           defaultValue={value}
           defaultCode="NG"
           layout="first"
           onChangeText={(text) => {
             setValue(text);
           }}
           onChangeFormattedText={(text) => {
             setFormattedValue(text);
           }}
           countryPickerProps={{ withAlphaFilter: true }}
           containerStyle={styles.phoneInputContainer}
           textInputStyle={styles.phoneInput}
         />
      {/* takeMeToVerify */}
      <TouchableOpacity style={styles.loginButton} onPress={onSendVerificationCodePress}>
      {
        isLoading ?
        <ActivityIndicator size="small" color="white" />
        :
        <Text style={styles.loginButtonText}>Next</Text>
      }
      </TouchableOpacity>

      <Text style={styles.subtitle}>or login with</Text>

      <TouchableOpacity style={styles.googleButton} onPress={onGoogleButtonPress}>
        <View style={styles.iconContainer}>
          <Image source={require('../src/assets/googleIcon.png')} style={styles.googleIcon} />
          {/* Apple for iphone users only */}
          {/* <Image source={require('../src/assets/appleIcon.png')} style={styles.googleIcon} /> */}
        </View>
      </TouchableOpacity>

      <Text style={styles.subtitle}>joining our app means you agree with our</Text>
      <View style={styles.subtitle}>
      <TouchableOpacity onPress={openTerms}>
        <View style={styles.linkContainer}>
          <Text style={styles.linkText}>Terms of Use</Text>
        </View>
      </TouchableOpacity>
      <Text style={styles.andText}>&nbsp;and&nbsp;</Text>
      <TouchableOpacity onPress={openPrivacy}>
        <View style={styles.linkContainer}>
          <Text style={styles.linkText}>Privacy Policy</Text>
        </View>
      </TouchableOpacity>
    </View>

    </View>
  );
};

const styles = StyleSheet.create({
  endBox:{
    padding:10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#061628',
  },
  title: {
    fontSize: 24,
    marginBottom: 5,
    color: 'white',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    color: 'white',
    borderRadius: 8,
  },
  loginButton: {
    backgroundColor: '#007eff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    width: '75%',
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  googleButton: {
    width: 48, // Adjust the width as needed
    height: 48, // Adjust the height as needed
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Center vertically
    justifyContent: 'center', // Center horizontally
  },
  googleIcon: {
    width: 50, // Adjust the width as needed
    height: 50, // Adjust the height as needed
    resizeMode: 'contain',
    marginHorizontal: 10, // Adjust the margin as needed
  },
  
  underline: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    marginVertical: 10, // Adjust vertical margin as needed
    marginHorizontal: 5, // Adjust horizontal margin as needed
  },

  subtitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    color: 'white',
    textAlign: 'center',
  },
  
  linkContainer: {
    borderBottomWidth: 1, // Add an underline
    borderBottomColor: 'white',
    marginVertical: 10,
  },
  
  linkText: {
    fontWeight: 'bold',
    color: 'white',
  },
  andText: {
    color: 'white',
    marginVertical: 10,
    marginHorizontal: 5,
  },
  phoneInputContainer: {
    width: '80%',
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 8,
  },
  phoneInput: {
    paddingHorizontal: 10,
    paddingVertical: 0,
    borderRadius: 5,
    borderWidth: 1,
  },
});

export default LoginScreen;