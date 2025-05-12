import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Linking } from 'react-native';
import MapView,  { Marker, Polyline, Animated, MarkerAnimated } from 'react-native-maps';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CancelRideModal from '../Providers/CancelModal';
import { calculateDistance } from '../Providers/common';
import { checkForCityReq, checkForCourierReq, checkForFreightReq, checkForRideReq } from '../Providers/http';


const MapScreen: React.FC = ({ navigation, route }) => {
  const { riderInfo, screenParam } = route.params;
  //cordinates of the rider
  const [modalVisible, setModalVisible] = useState(false);
  let [estTime, setEstTime] = useState<any>(null);
  let [status, setStatus] = useState<any>(null);
  
  //riderInfo contains all data
   //initial coordinates from Rider to User
   const [coordinates, setCoordinates] = useState<any>([
    { latitude: 9.0765, longitude: 7.3986 },
    { latitude: 9.0895, longitude: 7.3956 },
  ]);

  const [markerCoordinates, setMarkerCoordinates] = useState<any>({latitude: coordinates[1].latitude,longitude: coordinates[1].longitude});

  
  useEffect(() => {
    console.log("riderInfo ==>", parseFloat(riderInfo.userPickUpLatitude));
    let pickupLat:any = parseFloat(riderInfo.userPickUpLatitude);
    let pickupLong:any = parseFloat(riderInfo.userPickUpLongitude);
    let riderLat:any = parseFloat(riderInfo.riderLatitude);
    let riderLong:any = parseFloat(riderInfo.riderLongitude);
    setStatus(riderInfo.rideStatus);
    setCoordinates([
      { latitude: pickupLat, longitude: pickupLong }, //pickup position
      { latitude: riderLat, longitude: riderLong }, // rider position
    ]);
    setMarkerCoordinates({latitude: riderLat, longitude: riderLong});

    calculateDistance(riderInfo.userPickUpLatitude, riderInfo.userPickUpLongitude, riderInfo.riderLatitude, riderInfo.riderLongitude).then((resp:any) => {
      console.log("calculate Distance Resp MapScreen =>", resp.distance);
      let dist:any = resp.distance/1000;
      let time:any = dist / riderInfo.riderSpeed;
      let est:any = time * 60;
      console.log("Est =>", Math.round(est));
      setEstTime(Math.round(est));
    }).catch((err:any) => {
      console.log("error while Calculate Cost =>", err);
    });

    if(screenParam){
      setTimeout(() => {
        checkForParamAPI()
      }, 3000);
    }
    
  },[riderInfo])


  const checkForParamAPI = () => {
    console.log("checkForParamApi called =>")
    if(screenParam && screenParam === 'city'){
      checkCityStatus();
    } else if(screenParam && screenParam === 'courier'){
      checkCourierStatus();
    } else if(screenParam && screenParam === 'freight'){
      checkFreightStatus();
    } else if(screenParam && screenParam === 'ride'){
      checkRideStatus();
    }
  }


  const checkCityStatus = () => {
  try {
    checkForCityReq(riderInfo.cityId).then((resp:any) => {
      if(resp && resp.status === '1'){
        console.log("Ride End by Rider")
        navigation.navigate('Rating', {riderInfo})
      } else {
        console.log("Ride Not End")
        setTimeout(() => {
          checkCityStatus();
        }, 3000);
      }
      }).catch((error:any) => {
        console.log("checkForCityReq error =>", error);
      });
    } catch (error) {
      console.log("checkCityStatus error =>", error)
    }
  }


    const checkCourierStatus = () => {
      try {
        checkForCourierReq(riderInfo.cityId).then((resp:any) => {
          if(resp && resp.status === '1'){
            console.log("Ride End by Rider")
            navigation.navigate('Rating', {riderInfo})
          } else {
            console.log("Ride Not End")
            setTimeout(() => {
              checkCityStatus();
            }, 3000);
          }
          }).catch((error:any) => {
            console.log("checkForCityReq error =>", error);
          });
        } catch (error) {
          console.log("checkCityStatus error =>", error)
        }
    }

    const checkFreightStatus = () => {
      try {
        checkForFreightReq(riderInfo.cityId).then((resp:any) => {
          if(resp && resp.status === '1'){
            console.log("Ride End by Rider")
            navigation.navigate('Rating', {riderInfo})
          } else {
            console.log("Ride Not End")
            setTimeout(() => {
              checkCityStatus();
            }, 3000);
          }
          }).catch((error:any) => {
            console.log("checkForCityReq error =>", error);
          });
        } catch (error) {
          console.log("checkCityStatus error =>", error)
        }
    }

    const checkRideStatus = () => {
      try {
        checkForRideReq(riderInfo.cityId).then((resp:any) => {
          if(resp && resp.status === '1'){
            console.log("Ride End by Rider")
            navigation.navigate('Rating', {riderInfo})
          } else {
            console.log("Ride Not End")
            setTimeout(() => {
              checkCityStatus();
            }, 3000);
          }
          }).catch((error:any) => {
            console.log("checkForCityReq error =>", error);
          });
        } catch (error) {
          console.log("checkCityStatus error =>", error)
        }
    }



  const handleCancelRide = () => {
    setModalVisible(true);
  };

  const onCancel = () => {
    setModalVisible(false);
  };


  const onConfirm = (selectedReason: any) => {
    console.log(`Ride canceled due to: ${selectedReason.reason}`);
    setModalVisible(false);
    navigation.navigate(screenParam);
  };

  const phoneClicked = () => {
    console.log("phoneClicked =>");
    Linking.openURL(`tel:${riderInfo.riderPhoneNumber}`);
  }

  const handleWhatsAppCall = () => {
    Linking.openURL(`whatsapp://send?phone=${riderInfo.riderPhoneNumber}`);
  };
  
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: (coordinates[0].latitude + coordinates[1].latitude) / 2,
          longitude: (coordinates[0].longitude + coordinates[1].longitude) / 2,
          latitudeDelta: Math.abs(coordinates[0].latitude - coordinates[1].latitude) * 2,
          longitudeDelta: Math.abs(coordinates[0].longitude - coordinates[1].longitude) * 2,
        }}
        showsUserLocation={true}
        followsUserLocation={true}
        loadingEnabled={true}>
        {/* User Marker */}
        <Marker coordinate={{ latitude: coordinates[0].latitude, longitude: coordinates[0].longitude }}/>
        {/* Rider Marker add moving animation to below */}
        <Marker coordinate={markerCoordinates} image={require('../src/assets/pinMarker2.png')} />
      </MapView>

      <CancelRideModal modalVisible={modalVisible} onCancel={onCancel} onConfirm={onConfirm} />

      <View style={styles.bottomContainer}>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>{status && status === '3' ? 'Rider is Coming your way' : 'Ride has been started'}</Text>
        </View>
          <TouchableOpacity>
            <View style={styles.innerProfile}>
              <Image source={require('../src/assets/profilePic1.png')} style={styles.profileImage} />
              <View style={styles.profileInfo}>
                <View style={styles.leftContainer}>
                  <Text style={styles.name}>{riderInfo ? riderInfo.riderFirstName : 'NaiRide Rider'}</Text>
                  <View style={styles.ratingContainer}>
                    <AntDesign name="star" size={15} color={'gold'} />
                    <Text style={styles.rating}>{riderInfo ? riderInfo.avgRating : '4.9 (543)'}</Text>
                  </View>

                  <View style={styles.rowContainer}>
                    <TouchableOpacity onPress={() => {phoneClicked()}}>
                    <AntDesign name="phone" size={20} color={'gold'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {handleWhatsAppCall()}}>
                      <FontAwesome name="whatsapp" size={20} color={'green'}/>
                    </TouchableOpacity>
                  </View>

                </View>
                <View style={styles.rightContainer}>
                  <Text style={styles.offerPrice}>{riderInfo ? 'NGN ' + riderInfo.riderOffer: 'NGN 0'}</Text>
                  <Text style={styles.timeDistance}>Est Arrival: {estTime ? estTime + ' Hrs' : '00 mins'}</Text>
                  <Text style={styles.timeDistance}>Distance: {riderInfo ? riderInfo.riderDistance + ' km' : '0 km'}</Text>
                </View>
              </View>
            </View>
            </TouchableOpacity>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={[styles.button, styles.redButton]} onPress={() =>{handleCancelRide()}}>
                <Text style={styles.buttonText}>Cancel Ride</Text>
              </TouchableOpacity>
            </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#061628',
    padding: 20,
  },
  statusContainer:{
    alignItems: 'center',
    textAlign:'center',
    paddingBottom:20
  },
  statusText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  riderInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  riderName: {
    color: 'white',
    fontSize: 16,
  },
  riderRating: {
    color: 'white',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
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
  redButton: {
    backgroundColor: 'red',
    marginLeft: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default MapScreen;
