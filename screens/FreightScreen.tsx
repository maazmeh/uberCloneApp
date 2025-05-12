import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet, ActivityIndicator, PermissionsAndroid, Alert } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'; 
import { calculateDistance, getOneTimeLocation } from '../Providers/common';
import { calculateCost } from '../Providers/common';
import { sidebarStyles } from '../Providers/Styles';
import { useSelector } from 'react-redux';
import FetchPickupLocationModal from '../Providers/FetchPickupLocationModal';
import FetchDestinationModal from '../Providers/FetchDestinationModal';
import { freightRequest } from '../Providers/http';


const FreightScreen: React.FC = ({navigation}) => {
  const [selectedOption, setSelectedOption] = useState('freight');
  const userData = useSelector((state:any) => state.user.userData); //All user Data
  const [profileImage, setProfileImage] = useState(null);
  const [viewImage, setViewImage] = useState(false);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState<any>('');
  const [input4, setInput4] = useState('');
  const [input5, setInput5] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [allData, setAllData] =  useState({location1: null, location2: null});
  const [displayCompulsory, setDisplayCompulsory] = useState<boolean>(false);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    if(option === 'bike'){
      navigation.navigate('Home')
    } else if(option === 'cityToCity'){
      navigation.navigate('CityToCity')
    } else if(option === 'courier'){
      navigation.navigate('Courier')
    } else if(option === 'freight'){
      navigation.navigate('Freight')
    }
  }

  const handleImageUpload = async () => {
  try {
    console.log("Upload image pressed");
    const options:any = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    };
    launchImageLibrary(options, (response:any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        console.log("Response images =>", response);
        console.log("Response URI =>", response.uri);
        console.log("resp 0=>", response?.assets[0].uri);
        setProfileImage(response?.assets[0].uri);
      }
    });
  } catch (error) {
    console.log("Error while selecting image =>", error);
  }
};

  const handleStartLocationSelect = (location:any) => {
    console.log("handleStartLocationSelect FreightScreen =>", location);
    setAllData((prevData) => ({
      ...prevData,
      location1: location,
    }));
    setInput4(location.description);
    setModalVisible(false);
  };


  const handleDestinationLocation = (location:any) => {
    console.log("handleDestinationLocation FreightScreen =>", location);
    setAllData((prevData) => ({
      ...prevData,
      location2: location,
    }));
    setInput5(location.description);
    setModalVisible(false);
  };


  const handleSearch = () => {
    getOneTimeLocation();
    setIsLoading(true);
    let pickUp:any =  allData.location1;
    let drop:any = allData.location2;
    console.log("Pickup  =>", pickUp);
    console.log("Drop =>", drop);
    if(input1 && input2 && input4 && input5){
      let data:any = {
        title:input1, 
        description:input2, 
        pickUpLocation:input4, 
        destination:input5,
        pickUpLatitude: pickUp.latitude,
        pickUpLogitude: pickUp.longitude,
        dropOffLatitude: drop.latitude,
        dropOffLogitude: drop.longitude,
      };
      calculateCost(data.pickUpLatitude, data.pickUpLogitude, data.dropOffLatitude, data.dropOffLogitude).then((resp:any) => {
        console.log("Calculate Cost resp =>", resp)
          freightRequest(data.title, data.description, data.pickUpLocation, data.destination, userData.id, data.pickUpLatitude, data.pickUpLogitude, data.dropOffLatitude, data.dropOffLogitude, resp).then((freightResp:any) => {
          console.log("freightResp =>", freightResp.id);
          setInput1('');
          setInput2('');
          setProfileImage(null);
          setInput4('');
          setInput5('');
          setIsLoading(false)
          let screenParam:any = 'freight';
          let userLatitude:any = pickUp.latitude;
          let userLongtitude:any = pickUp.longitude;
          let taskId:any = freightResp.id;
          navigation.navigate('FindRider',{screenParam, userLatitude, userLongtitude, taskId})
        }).catch((error:any) => {
          console.log("freight request error =>", error);
          setIsLoading(false)
        });
      }).catch((err:any) => {
        console.log("error while Calculate Cost =>", err);
      })
    } else {
      setDisplayCompulsory(true);
      setTimeout(() => {
        setDisplayCompulsory(false);
      }, 5000);
      setIsLoading(false)
    }
  };

  return (
    <View style={{flex: 1,backgroundColor: '#061628',}}>

     <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.openDrawer()}>
        <AntDesign name="menufold" size={25} color={'white'} />
      </TouchableOpacity>
      <Text style={styles.title}>Freight</Text>

      <View style={styles.optionsContainer}>
        {/* Option Boxes */}
        <View style={styles.optionBoxContainer}>

          <TouchableOpacity
            style={[styles.optionBox]}
            onPress={() => handleOptionSelect('bike')}>
            <Image source={require('../src/assets/bike.png')} style={styles.optionIcon} />
            <Text style={styles.optionText}>Bike/Tricycle</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionBox]}
            onPress={() => handleOptionSelect('cityToCity')}>
            <Image source={require('../src/assets/cityIcon.png')} style={styles.optionIcon} />
            <Text style={styles.optionText}>City to City</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionBox]}
            onPress={() => handleOptionSelect('courier')}>
            <Image source={require('../src/assets/courier.png')} style={styles.optionIcon} />
            <Text style={styles.optionText}>Courier</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionBox, styles.selectedOption]}
            onPress={() => handleOptionSelect('freight')}>
            <Image source={require('../src/assets/frieght.png')} style={styles.optionIcon} />
            <Text style={styles.optionText}>Freight</Text>
          </TouchableOpacity>
        </View>


            {profileImage ? (
              <TouchableOpacity
                onPress={handleImageUpload}
                style={styles.imageContainer}>
                <Image
                  source={{uri: profileImage}}
                  style={styles.profileImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={handleImageUpload}
                style={styles.imageContainer}>
                <Image
                  source={require('../src/assets/upload.png')}
                  style={styles.logo}
                  resizeMode="contain"
                />
                <Text style={styles.uploadButtonText}>
                  Upload Picture
                </Text>
              </TouchableOpacity>
            )}

        <View style={styles.inputContainer}>

          <TextInput
            style={styles.input}
            placeholder="Title"
            placeholderTextColor="white" 
            value={input1}
            onChangeText={setInput1}
          />
           {
            displayCompulsory ?
            <Text style={sidebarStyles.compulsoryText}>This Feild is Compulsory</Text>
            :
            <View></View>
          }

          <TextInput
            style={styles.input}
            placeholder="Description"
            placeholderTextColor="white" 
            value={input2}
            onChangeText={setInput2}
          />
           {
            displayCompulsory ?
            <Text style={sidebarStyles.compulsoryText}>This Feild is Compulsory</Text>
            :
            <View></View>
          }

            <FetchPickupLocationModal
            isVisible={modalVisible}
            onClose={() => setModalVisible(false)}
            onSelectLocation={handleStartLocationSelect}/>

          <TouchableOpacity onPress={()=>setModalVisible(true)}>
          <TextInput
            style={styles.input}
            placeholder="Pick Up Location"
            placeholderTextColor="white" 
            value={input4}
            onChangeText={setInput4}
            editable={false}
          />
          </TouchableOpacity>
          {
            displayCompulsory ?
            <Text style={sidebarStyles.compulsoryText}>This Feild is Compulsory</Text>
            :
            <View></View>
          }

          <FetchDestinationModal
            isVisible={modalVisible2}
            onClose={() => setModalVisible2(false)}
            onSelectLocation={handleDestinationLocation}/>

          <TouchableOpacity onPress={()=>setModalVisible2(true)}>
            <TextInput
            style={styles.input}
            placeholder="Drop Off Location"
            placeholderTextColor="white" 
            value={input5}
            onChangeText={setInput5}
            editable={false}
          />
          </TouchableOpacity>
          {
            displayCompulsory ?
            <Text style={sidebarStyles.compulsoryText}>This Feild is Compulsory</Text>
            :
            <View></View>
          }
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            {isLoading?
            <ActivityIndicator size="small" color="white" />
            :
            <Text style={styles.searchButtonText}>Pick Up</Text>
            }
          </TouchableOpacity>

        </View>

        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  newcontainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  newbox:{
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#061628',
  },
  menuIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    color: 'white',
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'column',
    width: '100%',
  },
  optionBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'transparent',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    borderWidth: 2,
    borderColor: 'transparent',
    paddingLeft:5,
    paddingRight:5
  },

  optionBox: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 8, // Add border radius to all options
  },

  selectedOption: {
    borderColor: '#ADD8E6', // Light blue border color for selected option
    borderWidth: 2, // Border width for selected option
  },

  optionIcon: {
    width: 30,
    height: 30,
    marginBottom: 5,
  },
  optionText: {
    color: 'white',
  },
  inputContainer: {
    paddingTop:10,
    padding: 20,
    backgroundColor: 'transparent',
    elevation: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius:8,
    color:'white',
    backgroundColor:'#1a2939'
  },
  searchButton: {
    backgroundColor: '#007eff',
    padding: 10,
    borderRadius: 5,
  },
  searchButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  unitButton: {
    flex: 1,
    padding: 10,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderRadius: 12,
    borderColor:'black',
    marginRight: 10,
  },
  selectedUnit: {
    backgroundColor: '#007eff',
    borderWidth: 2,
    borderRadius: 12,
    borderColor:'white',
  },
  unitButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  imageContainer:{
    alignItems: 'center',
    paddingTop:10,
    paddingBottom:10
  },
  logo: {
    width: 150, // Adjust the width and height based on your logo size
    height: 150,
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
    alignItems: 'center',
  },
  uploadButtonText: {
    paddingTop: 10,
    color: 'white',
    textAlign: 'center',
  },
});

export default FreightScreen;



