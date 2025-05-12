import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import { loginUser, checkUser } from '../Providers/http';
import { useDispatch } from 'react-redux';


const VerificationScreen = ({ navigation, route}) => {
  const dispatch = useDispatch();
  const [verificationCode, setVerificationCode] = useState<string[]>(Array(6).fill('')); // Initialize with 6 empty strings 
  const verificationCodeRefs = useRef<TextInput[]>(Array(6).fill(null));

  const [confirmVerification, setConfirmVerification] = useState(null);
  const [isLoading, setisLoading] = useState<any>(false);

  const { confirmation, phoneNumber } = route.params;

  useEffect(() => {
    if (confirmation) {
      setConfirmVerification(confirmation);
    }
    console.log("phoneNumber =>", phoneNumber);
  }, [phoneNumber]);

  const handleVerificationCodeChange = (text: string, index: number) => {
    console.log("handleVerificationCodeChange =>", text, index);
    const newVerificationCode = [...verificationCode]; 
    newVerificationCode[index] = text; 
    setVerificationCode(newVerificationCode); 
    if (text !== '' && index < verificationCodeRefs.current.length - 1) { 
      verificationCodeRefs.current[index + 1]?.focus(); 
    } 
  };

    const resendCode = () => {
      console.log("Resend Code Pressed");
    }

  
  const onVerifyCodePress = async () => {
    try {
      console.log("verificationCode =>", verificationCode)
      const fullCode = verificationCode.join('');
      console.log("full Code =>", fullCode)
      setisLoading(true)
      let token:any;
      let checkForConfirmation:any = await confirmVerification?.confirm(fullCode);
      console.log('User Id =>', checkForConfirmation?.user?.uid);
      console.log('User Name =>', checkForConfirmation?.user?.displayName);
      console.log('User Data =>', checkForConfirmation?.additionalUserInfo?.isNewUser);
      checkUser(phoneNumber).then((result) => {
        console.log('Login resp =>', result);
        dispatch(loginUser(phoneNumber));
        setisLoading(false);
        navigation.navigate('Home')
        }).catch((error) => {
        setisLoading(false);
        console.error('handleSignup Error:', error);
        navigation.navigate('Signup', {uid:checkForConfirmation?.user?.uid, phoneNumber: phoneNumber});
        });
    } catch (error) {
      setisLoading(false)
      console.error('Phone Authentication Error', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Verification Code</Text>

      <View style={styles.codeContainer}>
        {verificationCode.map((code, index) => (
          <TextInput
            key={index}
            style={styles.codeBox}
            keyboardType="numeric"
            maxLength={1}
            value={code}
            onChangeText={(text) => handleVerificationCodeChange(text, index)}
            ref={(ref) => (verificationCodeRefs.current[index] = ref)}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.verifyButton} onPress={onVerifyCodePress}>
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.verifyButtonText}>Verify Code</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.sendNewCode} onPress={resendCode}>
        <Text style={styles.sendNewCodeText}>Didn't get the code? Send Another</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#061628',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '75%',
    marginBottom: 20,
  },
  codeBox: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    width: 40,
    height: 40,
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  verifyButton:{
    backgroundColor: '#007eff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    width: '65%',
  },
  sendNewCode:{
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  sendNewCodeText:{
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  }
});

export default VerificationScreen;