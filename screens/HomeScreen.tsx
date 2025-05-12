import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet, PermissionsAndroid, ActivityIndicator, ToastAndroid, Linking } from 'react-native';
import MapView, { Marker, Circle, Polyline } from 'react-native-maps';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getOneTimeLocation } from '../Providers/common';

//location modal
import LocationModal from '../Providers/LocationModal';
import { rideRequest } from '../Providers/http';
import { useSelector } from 'react-redux';
import FetchPickupLocationModal from '../Providers/FetchPickupLocationModal';
import { Picker } from '@react-native-picker/picker';

const HomeScreen: React.FC = ({navigation}) => {
  const [selectedOption, setSelectedOption] = useState('bike');
  const userData = useSelector((state:any) => state.user.userData); //All user Data
  const mapViewRef = useRef(null);
  const [input1, setInput1] = useState<any>('');
  const [input2, setInput2] = useState<any>('');
  const [input3, setInput3] = useState<any>('');
  const [input4, setInput4] = useState<any>('');
  const [borderColor, setBorderColor] = useState<any>('#4169e1');
  const [decreaseCount, setDecreaseCount] = useState(0);
  const [increaseCount, setIncreaseCount] = useState(0);
  const [latitude, setLatitude] = useState<any>();
  const [longtitude, setLongtitude] = useState<any>();
  const [locationPoints, setLocationPoints] = useState<any>('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [userLocation, setUserLocation] = useState<any>({latitude: null,longitude: null});
  const [searchRadius, setSearchRadius] = useState(1000);
  const [showMultiPointMap, setShowMultiPointMap] = useState<any>(false);
  const [destinationLat, setDestinationLat] = useState<any>();
  const [destinationLong, setDestinationLong] = useState<any>();
  //for polyline
  const [startCoordinate, setStartCoordinate] = useState<any>({latitude: null,longitude: null});
  const [endCoordinate, setEndCoordinate] = useState<any>({latitude: null,longitude: null});
  const [IsLoading, setIsLoading] = useState<any>(false);
  const [selectedService, setSelectedService] = useState<any>();

  const handleLocationSelect = (location:any) => {
    console.log("location from HomeScreen =>", location);
    let fare:any = location.cost + ' NGN'
    setInput2(location.description);
    setInput3(fare);
    setDestinationLat(location.latitude);
    setDestinationLong(location.longitude);

    setEndCoordinate({
      latitude: location.latitude,
      longitude: location.longitude,
    });

    setTimeout(() => {
      setShowMultiPointMap(true);
    }, 1000);
  };

  useEffect(() => {
    showToastWithGravityAndOffset();
    const requestLocationPermission = async () => {
      try {
        const check = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        if (check) {
          console.log( "You can use the ACCESS_FINE_LOCATION" );
          getOneTimeLocation().then((result:any) => {
            let data:any = {currentLat:result.lat, currentLong:result.long}
            console.log("result on HomeScreen =>", result);
            setLatitude(result.lat)
            setLongtitude(result.long)
            setInput1(result.pickUp);
            setLocationPoints(data);

            setStartCoordinate({
              latitude: result.lat,
              longitude: result.long,
            });

            setUserLocation({
              latitude: result.lat,
              longitude: result.long,
            });

            mapViewRef.current.animateToRegion({
              latitude: result.lat,
              longitude:result.long,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });

            }).catch((error) => {
            console.error('Error:', error);
            });
        } 
        else {
          console.log( "ACCESS_FINE_LOCATION permission denied" )
        }
      } catch (err) {
        console.warn(err)
      }
    };
    requestLocationPermission()
    setTimeout(() => {
      requestLocationPermission()
    }, 6000);
  }, []);

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
  };

  const handleSearch = () => {
    setIsLoading(true)
    rideRequest(input1, input2, userData.id, latitude, longtitude, destinationLat, destinationLong, input3).then((resp:any) => {
      console.log("rideRequest resp =>", resp.id);
      setInput2('')
      setInput3('')
      setInput4('')
      setShowMultiPointMap(false)
      setIsLoading(false)
      let screenParam:any = 'ride';
      let taskId:any = resp.id;
      navigation.navigate('Offers', {latitude, longitude:longtitude, taskId, screenParam});
    }).catch((error:any) => {
      console.log("courier REquest error =>", error);
      setIsLoading(false)
    });
  };


  const showToast = (text:any) => {
    ToastAndroid.showWithGravityAndOffset(
      text,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  }

  const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Loading Map, Please Wait....',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };


  const handleIncrease = () => {
    const newCount = increaseCount + 1;
    setIncreaseCount(newCount);
    let val:any = '100';
    let numberOnly:any = input3.replace(/\D/g, '');
    let v:any = +numberOnly + +val;
    console.log("handle incerase => ", v.toString());
    setInput3(v.toString()); //+ ' NGN'
    if (newCount >= 3) {
      setBorderColor('yellow')
      showToast('Fare is too high...');
    }
  };

  const handleDecrease = () => {
    const newCount = decreaseCount + 1;
    setDecreaseCount(newCount);
    let val:any = '100';
    let numberOnly:any = input3.replace(/\D/g, '');
    let v:any = +numberOnly - +val;
    setInput3(v.toString()); //+ ' NGN'
    if (newCount >= 3) {
      setBorderColor('red')
      showToast('Rider are unlikely to accept at this rate');
    }
  };


  const handleStartLocationSelect = (location:any) => {
    console.log("handleStartLocationSelect Home =>", location);
    // setAllData((prevData) => ({
    //   ...prevData,
    //   location1: location,
    // }));
    setInput1(location.description);
    // setModalVisible(false);
  };

    return (
      <View style={{flex: 1,backgroundColor: '#061628',}}>
  
       <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.openDrawer()}>
          <AntDesign name="menufold" size={25} color={'#061628'} />
        </TouchableOpacity>

        {
          userLocation.latitude != null?(
            showMultiPointMap ? (
              //show multi point map
              <MapView
                style={styles.map}
                region={{
                  latitude: (latitude + destinationLat) / 2,
                  longitude: (longtitude + destinationLong) / 2,
                  latitudeDelta: Math.abs(latitude - destinationLat) * 2,
                  longitudeDelta: Math.abs(longtitude - destinationLong) * 2,
                }}
                showsUserLocation={true}
                followsUserLocation={true}
                loadingEnabled={true}>
                <Polyline
                coordinates={[startCoordinate, endCoordinate]}
                strokeColor="#061628"
                strokeWidth={2}
                />
                {/* User Marker */}
                <Marker coordinate={{ latitude: latitude, longitude: longtitude }}/>
                {/* Rider Marker add moving animation to below */}
                <Marker coordinate={{ latitude:destinationLat, longitude:destinationLong}} image={require('../src/assets/pinMarker2.png')} />
              </MapView>
            ) : (
              <MapView
              ref={mapViewRef}
              style={styles.map}
              showsUserLocation={true}
              followsUserLocation={true}
              loadingEnabled={true}
              initialRegion={{
                latitude: latitude, //latitude
                longitude: longtitude,  //longtitude
                latitudeDelta: 0.04,
                longitudeDelta: 0.05,
                }}>
              <Marker coordinate={{ latitude: latitude, longitude: longtitude }}/>
              <Circle
              center={userLocation}
              radius={searchRadius}
              strokeColor="rgba(0, 122, 255, 0.5)"
              fillColor="rgba(0, 122, 255, 0.2)"
              />  
              </MapView>
            )
          )
          :
          (
          <View style={{flex: 1}}>
            <ActivityIndicator size="large" style={styles.mapLoader} color={'white'}/>
          </View>
          )
        }
  
        <View style={styles.optionsContainer}>
          {/* Option Boxes */}
          <View style={styles.optionBoxContainer}>
  
            <TouchableOpacity
              style={[styles.optionBox,styles.selectedOption]}
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
              style={[styles.optionBox]}
              onPress={() => handleOptionSelect('freight')}>
              <Image source={require('../src/assets/frieght.png')} style={styles.optionIcon} />
              <Text style={styles.optionText}>Freight</Text>
            </TouchableOpacity>
  
  
          </View>
  
         
  
          {/* Input Boxes and Search Button */}
          <View style={styles.inputContainer}>
            
          <FetchPickupLocationModal
            isVisible={modalVisible2}
            onClose={() => setModalVisible2(false)}
            onSelectLocation={handleStartLocationSelect}/>
            
           <TouchableOpacity onPress={()=>setModalVisible2(true)}>
            <TextInput
              style={styles.input}
              placeholder="Pickup"
              placeholderTextColor="white" 
              value={input1}
              onChangeText={setInput1}
              editable={false}
            />
            </TouchableOpacity>

            <LocationModal
            isVisible={modalVisible}
            currentLocation={locationPoints}
            onClose={() => setModalVisible(false)}
            onSelectLocation={handleLocationSelect}/>

            <TouchableOpacity onPress={()=>setModalVisible(true)}>
            <TextInput
              style={styles.input}
              placeholder="Destination"
              placeholderTextColor="white" 
              value={input2}
              onChangeText={setInput2}
              editable={false}
              />
            </TouchableOpacity>

            <Picker
              selectedValue={selectedService}
              onValueChange={(itemValue, itemIndex) => setSelectedService(itemValue)}
              style={styles.pickerStyle}
              dropdownIconColor={"white"}
              itemStyle={styles.input}>
              <Picker.Item label="Select Ride Type" value="" />
              <Picker.Item label="Bike" value="bike" />
              <Picker.Item label="Tricycle" value="tricycle" />
            </Picker>


            <View style={styles.iconContainer}>
            <View style={styles.rowContainer}>
                <TouchableOpacity onPress={handleIncrease}>
                  <AntDesign name="pluscircle" size={26} color="white" style={styles.arrowIconLeft} />
                </TouchableOpacity>
                <TextInput
                  style={[styles.textInput, { borderColor: borderColor }]}
                  placeholder="Enter Amount"
                  placeholderTextColor="white"
                  value={input3}
                  onChangeText={setInput3}
                  keyboardType="numeric"
                />
                <TouchableOpacity onPress={handleDecrease}>
                  <AntDesign name="minuscircle" size={26} color="white" style={styles.arrowIconRight} />
                </TouchableOpacity>
              </View>
            </View>

            <TextInput
              style={styles.commentInput}
              placeholderTextColor="white"
              placeholder="Write your comment here"
              multiline
              value={input4}
              onChangeText={setInput4}
            />
            {/* handleWhatsAppCall */}
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
              {IsLoading?
                <ActivityIndicator size="small" color="white" />
                :
                <Text style={styles.searchButtonText}>Find Driver</Text>
              }
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#061628',
    },
    imageContainer:{
      alignItems: 'center',
      marginTop:50
    },
    logo: {
      width: 500, // Adjust the width and height based on your logo size
      height: 300,
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
      backgroundColor:'#1a2939',
      color:'white'
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
    map: {
      flex: 1,
    },
    openModalButton: {
    backgroundColor: '#007eff',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  selectedLocationContainer: {
    marginTop: 20,
  },
  selectedLocationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'white'
  },
  mapLoader:{
    flex:1
  },
  commentInput: {
    borderWidth: 1,
    padding: 10,
    height: 100,
    color: 'white',
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius:8,
    backgroundColor:'#1a2939',
  },
  iconContainer:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowIconLeft: {
    marginBottom: 20,
    paddingRight:5
  },
  arrowIconRight:{
    marginBottom: 20,
    paddingLeft: 5
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput:{
    width: '60%',
    height: 40,
    borderWidth: 1,
    marginBottom: 18,
    paddingLeft: 10,
    borderRadius:8,
    backgroundColor:'#1a2939',
    color:'white',
  },
  pickerStyle: {
    height: 40,
      borderWidth: 1,
      marginBottom: 10,
      paddingLeft: 10,
      borderRadius:16,
      backgroundColor:'#1a2939',
      color:'white'
  },
  });

export default HomeScreen;