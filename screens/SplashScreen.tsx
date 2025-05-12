import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//Reducers
import { setUserData } from '../reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { LogBox } from 'react-native';
import { getOneTimeLocation } from '../Providers/common';


const SplashScreen: React.FC = ({navigation}) => {
  const dispatch = useDispatch();
  const userData = useSelector((state:any) => state.user.userData);

  useEffect(()=>{
    LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
    LogBox.ignoreAllLogs(); //Ignore all log notifications
  },[])

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
          console.log( "You can use the ACCESS_FINE_LOCATION" );
          getOneTimeLocation().then(async (result:any) => {
            console.log("result on Fetch Destination =>", result);
            let data:any = {latitude: result.lat, longitude: result.long};
            await AsyncStorage.setItem('userLocation', JSON.stringify(data));
            }).catch((error) => {
            console.error('Error:', error);
            });
      } catch (err) {
        console.warn(err)
      }
    };
    requestLocationPermission()
  }, []);

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('userData');
        console.log("splash data =>", storedData);
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          dispatch(setUserData(parsedData));
          navigation.navigate('Home');
          // navigation.navigate('Signup', {phoneNumber: '653265606'})
          // navigation.navigate('Verify', { confirmation:'123456', phoneNumber:'03452130046' });
        } else {
          setTimeout(() => {
            navigation.navigate('Login');
            // navigation.navigate('Signup', {phoneNumber: '653265606'})
            // navigation.navigate('Home');
          }, 4000); 
        }
      } catch (error) {
        console.error('Error retrieving data from AsyncStorage:', error);
      }
    };
    retrieveData();
  }, [dispatch]);


  return (
    <View style={styles.container}>
      {/* Your logo image */}
      <Image source={require('../src/assets/logo.png')} style={styles.logo} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200, // Adjust the width and height based on your logo size
    height: 200,
  },
});

export default SplashScreen;