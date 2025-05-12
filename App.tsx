// App.tsx
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import MapScreen from './screens/MapScreen';
import HistoryScreen from './screens/HistoryScreen';
import CityToCityScreen from './screens/CityToCityScreen';
import CourierScreen from './screens/CourierScreen';
import FreightScreen from './screens/FreightScreen';
import TermsScreen from './screens/TermsScreen';
import PrivacyScreen from './screens/PrivacyScreen';
import OffersScreen from './screens/OffersScreen';
import SettingsScreen from './screens/SettingsScreen';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SignupScreen from './screens/SignupScreen';
import VerificationScreen from './screens/VerificationScreen';
import WalletScreen from './screens/WalletScreen';
import RatingScreen from './screens/RatingScreen';
import FindRiderScreen from './screens/FindRiderScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { useSelector } from 'react-redux';
import { sidebarStyles } from './Providers/Styles';
import InformationScreen from './screens/InformationScreen';

// Create a custom drawer content component
const CustomDrawerContent = ({ navigation, state }) => {
  const isScreenSelected = (routeName:any) => state.routes[state.index].name === routeName;
  const userData = useSelector((state:any) => state.user.userData);

  useEffect(()=>{
    console.log("userData from App.tsx ==>", userData);
  },[userData])

  const moveToRiderApp = () => {
  //link to open Rider App from Playstore
  }

  const logout = async () => {
    try {
      Alert.alert('Are you sure you want to Logout ?', '', [
        {
          text: 'Logout',
          onPress: async () => {
            await AsyncStorage.setItem('userData', '');
            navigation.navigate('Login');
          },
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ]);
     
    } catch (error) {
      console.log("err while logout =>", error);
    }
  }

  return(
  <View style={sidebarStyles.container}>
    <View style={sidebarStyles.profileContainer}>
      <Image
        source={require('./src/assets/logoForSideBar.png')}
        style={sidebarStyles.profileImage}
      />
      <View>
        <Text style={sidebarStyles.username}>{userData ? userData.firstName: 'Welcome User'}</Text>
        <View style={sidebarStyles.ratingContainer}>
          <AntDesign name="star" size={15} color={'gold'} />
          <Text style={sidebarStyles.rating}>{userData ? userData.avgRating: '0'}</Text>
        </View>
      </View>
    </View>

    <View style={{paddingLeft:5}}>
    <TouchableOpacity
      style={sidebarStyles.optionContainer}
      onPress={() => navigation.navigate('Home')}>
      <AntDesign name="home" size={20} color={'white'} />
      <Text style={sidebarStyles.optionText}>Home</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={sidebarStyles.optionContainer}
      onPress={() => navigation.navigate('History')}>
      <AntDesign name="clockcircleo" size={20} color={'white'} />
      <Text style={sidebarStyles.optionText}>Request History</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={sidebarStyles.optionContainer}
      onPress={() => navigation.navigate('Wallet')}>
      <FontAwesome5 name="wallet" size={20} color={'white'} />
      <Text style={sidebarStyles.optionText}>My Wallet</Text>
      </TouchableOpacity>

    <TouchableOpacity
      style={sidebarStyles.optionContainer}
      onPress={() => navigation.navigate('CityToCity')}>
      <AntDesign name="car" size={20} color={'white'} />
      <Text style={sidebarStyles.optionText}>City to City</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={sidebarStyles.optionContainer}
      onPress={() => navigation.navigate('Courier')}>
      <AntDesign name="CodeSandbox" size={20} color={'white'} />
      <Text style={sidebarStyles.optionText}>Courier</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={sidebarStyles.optionContainer}
      onPress={() => navigation.navigate('Freight')}>
      <Feather name="truck" size={20} color={'white'} />
      <Text style={sidebarStyles.optionText}>Freight</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={sidebarStyles.optionContainer}
      onPress={() => navigation.navigate('Information',{screenType: 'Safety'})}>
      <AntDesign name="Safety" size={20} color={'white'} />
      <Text style={sidebarStyles.optionText}>Safety</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={sidebarStyles.optionContainer}
      onPress={() => navigation.navigate('Settings')}>
      <AntDesign name="setting" size={20} color={'white'} />
      <Text style={sidebarStyles.optionText}>Settings</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={sidebarStyles.optionContainer}
      onPress={() => navigation.navigate('Information',{screenType: 'FAQ'})}>
      <AntDesign name="questioncircleo" size={20} color={'white'} />
      <Text style={sidebarStyles.optionText}>FAQ</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={sidebarStyles.optionContainer}
      onPress={() => navigation.navigate('Information',{screenType: 'Support'})}>
      <AntDesign name="customerservice" size={20} color={'white'} />
      <Text style={sidebarStyles.optionText}>Support</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={sidebarStyles.optionContainer}
      onPress={() => logout()}>
      <AntDesign name="logout" size={20} color={'white'} />
      <Text style={sidebarStyles.optionText}>Logout</Text>
    </TouchableOpacity>

    </View>

      <View style={sidebarStyles.riderButton}>
      <TouchableOpacity onPress={moveToRiderApp}>
        <Text style={sidebarStyles.riderText}>Join us as Rider</Text>
      </TouchableOpacity>
      </View>

    {/* Center images */}
    <View style={sidebarStyles.socialMediaContainer}>
    <Image
      source={require('./src/assets/fb.png')}
      style={sidebarStyles.socialImage}
    />
    <Image
      source={require('./src/assets/insta.png')}
      style={{ width: 40, height: 40, marginHorizontal: 10 }}
    />
    <Image
      source={require('./src/assets/twitter.png')}
      style={{ width: 40, height: 40, marginHorizontal: 10 }}
    />
  </View>
  </View>
  )};


const Drawer = createDrawerNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator 
      initialRouteName="Splash" 
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Drawer.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Drawer.Screen name="Login" component={LoginScreen} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} />
        <Drawer.Screen name="Map" component={MapScreen} options={{ headerShown: false }}/>
        <Drawer.Screen name="History" component={HistoryScreen} options={{ headerShown: false }}/>
        <Drawer.Screen name="CityToCity" component={CityToCityScreen} options={{ headerShown: false }}/>
        <Drawer.Screen name="Courier" component={CourierScreen} options={{ headerShown: false }}/>
        <Drawer.Screen name="Freight" component={FreightScreen} options={{ headerShown: false }}/>
        <Drawer.Screen name="Terms" component={TermsScreen} options={{ headerShown: false, drawerItemStyle: { height: 0 } }}/>
        <Drawer.Screen name="Privacy" component={PrivacyScreen} options={{ headerShown: false, drawerItemStyle: { height: 0 } }} />
        <Drawer.Screen name="Offers" component={OffersScreen} options={{ headerShown: false }} />
        <Drawer.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
        <Drawer.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
        <Drawer.Screen name="Verify" component={VerificationScreen} options={{ headerShown: false }} />
        <Drawer.Screen name="Wallet" component={WalletScreen} options={{ headerShown: false }} />
        <Drawer.Screen name="Rating" component={RatingScreen} options={{ headerShown: false }} />
        <Drawer.Screen name="FindRider" component={FindRiderScreen} options={{ headerShown: false }} />
        <Drawer.Screen name="Information" component={InformationScreen} options={{ headerShown: false }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;