import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, ToastAndroid } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MapView, { Marker, Circle } from 'react-native-maps';
import CancelRideModal from '../Providers/CancelModal';
import BackgroundTimer from 'react-native-background-timer';
import { acceptRideRequest, fetchRideReq } from '../Providers/http';
import { useSelector } from 'react-redux';
import ProfileCard from '../Providers/ProfileCard';

const OffersScreen: React.FC = ({ navigation, route }) => {
  const { latitude, longitude, taskId, screenParam } = route.params;
  const userData = useSelector((state:any) => state.user.userData); //All user Data
  const [modalVisible, setModalVisible] = useState(false);
  const [showCards, setShowCards] = useState<any>(true);
  const [userLocation, setUserLocation] = useState({latitude: latitude,longitude: longitude});
  const [searchRadius, setSearchRadius] = useState(800); // Initial search radius in meters
  const [apiInterval, setApiInterval] = useState<any>();
  const [mapInterval, setMapInterval] = useState<any>();
  const [riderData, setRiderData] = useState<any>([]);


  //Starts one time when page is called, it works with Radius changing like animation
  useEffect(() =>{
    const intervalId = startChangingRadius();
    setMapInterval(intervalId);
    fetchRiderDataProcess();
  },[screenParam])

  

  //When Lat Long chnages, update userLocation state
  useEffect(() => {
    setUserLocation({ latitude: latitude, longitude: longitude });
  }, [latitude, longitude]);

  const showToastWithGravityAndOffset = (text:any) => {
    ToastAndroid.showWithGravityAndOffset(
      text,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      12000,
      50,
    );
  };

  const startChangingRadius = () => {
    setTimeout(() => {
      showToastWithGravityAndOffset('Finding Rider, Please Wait');
    }, 1000);
    let radius = 800; // Initial radius
    const intervalId = setInterval(() => {
      setSearchRadius(radius);
      radius += 20;
      if (radius > 2200) {
        radius = 800;
      }
    }, 100);
    return intervalId;
  };

  const handleCancelRide = () => {
    setModalVisible(true);
  };

  const onCancel = () => {
    setModalVisible(false);
  };

  //Confirm Modal
  const onConfirm = (selectedReason: any) => {
    console.log(`Ride canceled due to: ${selectedReason.reason}`);
    setModalVisible(false);
    BackgroundTimer.clearInterval(apiInterval);
    BackgroundTimer.clearInterval(mapInterval);
    navigation.navigate('Home'); // Back to Home Screen
  };

  
  //fetch data via API call
  const fetchRiderData = () => {
    try {
      fetchRideReq(userData.id, taskId).then((resp:any) => {
     if(resp[0].Status === "failed"){
      console.log("resp failed");
    } else {
      BackgroundTimer.clearInterval(mapInterval)
      setShowCards(false);
      setRiderData(resp);
     }
     }).catch((err:any) => {
     console.log("fetchCourierReq err =>", err);
     })
    } catch (error) {
     console.log("err while fetchRiderData =>", error);
    }
  }

  const fetchRiderDataProcess = () => {
    const maxElapsedTime = 60 * 1000; // 1 minute
    let interval = 8000; // Interval between API calls
    const intervalId = BackgroundTimer.setInterval(() => {
    fetchRiderData(); 
    interval += 8000;  
    if (interval >= maxElapsedTime) {
      console.log("interval >= maxElapsedTime, Clearing Interval CourierDataProcess")
      BackgroundTimer.clearInterval(intervalId);
      showToastWithGravityAndOffset('Request Timed Out! No Rider is available at this moment. Try again later...');
      navigation.navigate('Home');
    } else {
      console.log("interval check =>", interval)
    }
    }, 8000);
    setApiInterval(intervalId);
  };



  const moveToMap = (allData:any) => {
    console.log("moveToMap = Rider ID =>", allData);
    let screenParam:any = 'ride';
    acceptRideRequest(allData.cityId, allData.riderOffer, allData.riderId, screenParam).then((resp:any) => {
      BackgroundTimer.clearInterval(apiInterval);
      setTimeout(() => {
        BackgroundTimer.clearInterval(apiInterval);
      }, 2000);
      let riderId:any = allData.riderId;
      navigation.navigate('Map', {riderId, screenParam})
    }).catch((err:any) => {
      console.log("err =>", err)
    })
    }

    const renderItem = ({ item }) => (
      <View style={{paddingLeft:10, paddingRight:10}}>
      <ProfileCard data={item} onAcceptPress={() => moveToMap(item)} />
      </View>
    );

  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuIcon}
        onPress={() => {
          handleCancelRide();
        }}>
        <Text style={styles.cancel}>Cancel the Ride</Text>
      </TouchableOpacity>

      {/* Cancel Ride Modal */}
      <CancelRideModal modalVisible={modalVisible} onCancel={onCancel} onConfirm={onConfirm} />

      {showCards ? (
        <MapView
          style={styles.map}
          region={{
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          loadingEnabled={true}>
          <Marker draggable coordinate={{ latitude: latitude, longitude: longitude }} image={require('../src/assets/pinMarker2.png')}/>
          <Circle
            center={userLocation}
            radius={searchRadius}
            strokeColor="rgba(66, 255, 135, 0.34)"
            fillColor="rgba(66, 255, 135, 0.34)"
          />
        </MapView>
      ) : (
          // Offer card view
          <View style={{marginTop:60}}>
          {
          riderData?
          <FlatList
          data={riderData}
          keyExtractor={(item, index) => item.id || index.toString()}
          renderItem={renderItem}
          />
          :
          <View></View>
          }
        </View>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#061628',
  },
  menuIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    backgroundColor:'white',
    borderRadius:18,
    padding:10
  },
  cancel: {
    color: 'red',
  },
  profileCardBg:{
    marginTop: 20, 
    padding:25, 
    paddingTop:40
  },
  profileCard: {
    marginTop: 10,
    padding: 30,
    backgroundColor: 'transparent',
    borderRadius: 8,
    elevation: 5,
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  innerProfile:{
    flexDirection: 'row'
  },
  profileImage: {
    width: 75,
    height: 75,
    borderRadius: 50,
    marginRight: 10,
  },
  profileInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftContainer: {
    flex: 1,
  },
  rightContainer: {
    marginLeft: 10,
    alignItems: 'flex-end',
  },
  modelName: {
    fontSize: 14,
    color: 'white',
    marginBottom: 0,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rating: {
    color: 'white',
    marginLeft: 5,
  },
  offerPrice: {
    color: 'white',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  timeDistance:{
    color: 'white',
    marginBottom: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  greenButton: {
    backgroundColor: 'green',
    marginRight: 5,
  },
  redButton: {
    backgroundColor: 'red',
    marginLeft: 5,
  },
  buttonText: {
    color: 'white',
  },
  map: {
    flex: 1,
    height:'100%'
  },
});

export default OffersScreen;