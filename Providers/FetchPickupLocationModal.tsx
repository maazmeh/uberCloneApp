import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { costPerKmBike, APIKey } from './GlobalStateVariables';
import MapView, { Marker } from 'react-native-maps';
import { fetchAddressByLatLong, getOneTimeLocation } from './common';


const FetchPickupLocationModal = ({ isVisible, onClose, onSelectLocation }) => {
  const mapViewRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  let [locations, setLocations] = useState([]);
  let [selectedLocation, setSelectedLocation] = useState(null);
  //Marker storage States
  let [markerPositionLat, setMarkerPositionLat] = useState<any>(9.0765);
  let [markerPositionLong, setMarkerPositionLong] = useState<any>(7.3986);
  let [showUserMap, setShowUserMap] = useState<any>(false);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
          console.log( "You can use the ACCESS_FINE_LOCATION" );
          getOneTimeLocation().then((result:any) => {
            console.log("result on Fetch Destination =>", result);
            setMarkerPositionLat(result.lat)
            setMarkerPositionLong(result.long)
            console.log("markerPositionLat =>", markerPositionLat);
            mapViewRef.current.animateToRegion({
              latitude: result.lat,
              longitude:result.long,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
            }).catch((error) => {
            console.error('Error:', error);
            });
      } catch (err) {
        console.warn(err)
      }
    };
    requestLocationPermission()
  }, [isVisible]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchTerm}&key=${APIKey}`;
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          if (data.predictions) {
            setLocations(data.predictions);
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [searchTerm]);


  const handleMarkerDragEnd = (e:any) => {
    console.log("handleMarkerDragEnd ==>", e.nativeEvent.coordinate);
    setMarkerPositionLat(e.nativeEvent.coordinate.latitude);
    setMarkerPositionLong(e.nativeEvent.coordinate.longitude);
  };


  const handleLocationSelect = (location:any) => {
     const placeDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${location.place_id}&key=${APIKey}`;
     fetch(placeDetailsUrl)
       .then(response => response.json())
       .then(data => {
         const selectedLocationData:any = {
           description: location.description,
           latitude: data.result.geometry.location.lat,
           longitude: data.result.geometry.location.lng,
         };
         setMarkerPositionLat(selectedLocationData.latitude)
         setMarkerPositionLong(selectedLocationData.longitude);
          let checkData:any = {description: selectedLocationData.description, latitude: selectedLocationData.latitude, longitude: selectedLocationData.longitude}
          setSelectedLocation(checkData);
          setLocations([]); // Clear the suggestions after selection
          onSelectLocation(checkData);
          mapViewRef.current.animateToRegion({
            latitude: selectedLocationData.latitude,
            longitude: selectedLocationData.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
       })
       .catch(error => {
         console.error('Error fetching place details:', error);
       });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.locationItem} onPress={() => handleLocationSelect(item)}>
      <Text style={styles.locationText}>{item.description}</Text>
    </TouchableOpacity>
  );


  const updateMarker = (data:any) => {
    console.log("Marker Updated =>", data.nativeEvent)
    setMarkerPositionLat(data.nativeEvent.coordinate.latitude);
    setMarkerPositionLong(data.nativeEvent.coordinate.longitude);
    fetchAddressByLatLong(markerPositionLat,markerPositionLong).then((resp:any) => {
      console.log("resp from fetching Address =>", resp);
      // showToastWithGravity(resp);
      setSearchTerm(resp);
     }).catch((err:any) => {
      console.log("error while fetching address =>", err);
     })
  }

  const closeAndFinal = () => {
    console.log("closeAndFinal");
    onClose()
  }

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>

      <TouchableOpacity
        style={styles.menuIcon}
        onPress={() => { onClose()}}>
        <Text style={styles.cancel}>X</Text>
      </TouchableOpacity>

  <MapView
      ref={mapViewRef}
      style={styles.map}
      initialRegion={{
        latitude: markerPositionLat,
        longitude: markerPositionLong, 
        latitudeDelta: 0.04,
        longitudeDelta: 0.05,
      }}
      showsUserLocation={true}
      followsUserLocation={true}
      loadingEnabled={true}
      onPress={(e) => {updateMarker(e)}}
      >
      <Marker
        coordinate={{
          latitude: markerPositionLat,
          longitude: markerPositionLong,
        }}
        draggable={true}
        onDragEnd={handleMarkerDragEnd}
      />
    </MapView>

    

      <View style={styles.modalContent}>
        <View style={styles.searchContainer}>
          <FontAwesome name="search" size={20} color="#333" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Destination"
            placeholderTextColor="black" 
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>

        {locations.length > 0 && (
          <FlatList
            data={locations}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        )}
      </View>

      <View style={styles.bottomButtonContainer}>
      <TouchableOpacity
        style={styles.bottomButton}
        onPress={() => closeAndFinal()}>
        <Text style={styles.bottomButtonText}>Select Location</Text>
      </TouchableOpacity>
    </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-start',
    backgroundColor: '#061628',
  },
  map: {
    flex: 1,
  },
  menuIcon: {
    position: 'absolute',
    top: 15,
    left: 10,
    zIndex: 1,
    backgroundColor:'transparent',
    borderRadius:18,
    padding:10
  },
  cancel: {
    color:'white',
    backgroundColor:'black',
    padding:10,
    borderRadius:8,
    fontWeight: 'bold',
  },
  modalContent: {
    backgroundColor: 'white',
    paddingLeft:10,
    paddingTop:10,
    paddingRight:10,
    paddingBottom: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingLeft:10,
    paddingTop:10,
    paddingRight:10,
    paddingBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color:'black'
  },
  locationItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    color:'black'
  },
  locationText: {
    fontSize: 16,
    color:'black'
  },
  bottomButtonContainer: {
    paddingTop:10,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  bottomButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 8,
    width:'100%'
  },
  bottomButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default FetchPickupLocationModal;