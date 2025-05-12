import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet, ToastAndroid } from 'react-native';
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { baseCost, costPerKmBike, APIKey } from '../Providers/GlobalStateVariables';
import MapView, { Marker } from 'react-native-maps';
import { fetchAddressByLatLong } from './common';

const LocationModal = ({ isVisible, onClose, onSelectLocation, currentLocation }) => {
  const mapViewRef:any = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [markerPositionLat, setMarkerPositionLat] = useState<any>(null);
  const [markerPositionLong, setMarkerPositionLong] = useState<any>(null);

  useEffect(() => {
    if (currentLocation && currentLocation.currentLat && currentLocation.currentLong) {
      setMarkerPositionLat(currentLocation.currentLat);
      setMarkerPositionLong(currentLocation.currentLong);
    }
  }, [currentLocation]);

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

  const handleMarkerDragEnd = (e: any) => {
    setMarkerPositionLat(e.nativeEvent.coordinate.latitude);
    setMarkerPositionLong(e.nativeEvent.coordinate.longitude);
  };

  const calculateDistance = (lat1: any, lon1: any, lat2: any, lon2: any) => {
    return new Promise((resolve, reject) => {
      try {
        const R = 6371; // Earth radius in kilometers
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in kilometers
        const finalDist = Math.trunc(distance);
        costCalculatorForBike(finalDist)
          .then(result => {
            let data: any = { distance: finalDist, cost: result };
            resolve(data);
          })
          .catch(error => {
            console.error('calculateDistance Error:', error);
          });
      } catch (error) {
        console.log('Error caught while distance Calculation =>', error);
        reject(error);
      }
    });
  };

  const deg2rad = (deg: any) => {
    return deg * (Math.PI / 180);
  };

  const costCalculatorForBike = (distance: any) => {
    return new Promise((resolve, reject) => {
      try {
        let finalCost = baseCost + costPerKmBike * distance;
        resolve(finalCost);
      } catch (error) {
        console.log('Error caught while distance Calculation =>', error);
        reject(error);
      }
    });
  };

  const handleLocationSelect = (location: any) => {
    const placeDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${location.place_id}&key=${APIKey}`;
    fetch(placeDetailsUrl)
      .then(response => response.json())
      .then(data => {
        const selectedLocationData: any = {
          description: location.description,
          latitude: data.result.geometry.location.lat,
          longitude: data.result.geometry.location.lng,
        };
        setMarkerPositionLat(selectedLocationData.latitude);
        setMarkerPositionLong(selectedLocationData.longitude);
        calculateDistance(selectedLocationData.latitude, selectedLocationData.longitude, currentLocation.currentLat, currentLocation.currentLong)
          .then((result: any) => {
            let data: any = { description: selectedLocationData.description, latitude: selectedLocationData.latitude, longitude: selectedLocationData.longitude, cost: result.cost, distance: result.distance };
            setSelectedLocation(data);
            setLocations([]);
            onSelectLocation(data);
            mapViewRef.current.animateToRegion({
              latitude: selectedLocationData.latitude,
              longitude: selectedLocationData.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
          })
          .catch(error => {
            console.error('calculateDistance Error:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching place details:', error);
      });
  };

  const updateMarker = (data: any) => {
    setMarkerPositionLat(data.nativeEvent.coordinate.latitude);
    setMarkerPositionLong(data.nativeEvent.coordinate.longitude);
    fetchAddressByLatLong(markerPositionLat, markerPositionLong)
      .then((resp: any) => {
        setSearchTerm(resp);
      })
      .catch((err: any) => {
        console.log('error while fetching address =>', err);
      });
  };

  const showToastWithGravity = (address: any) => {
    ToastAndroid.showWithGravity(
      'Selected Location: ' + address,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  const closeAndFinal = () => {
    onClose();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.locationItem} onPress={() => handleLocationSelect(item)}>
      <Text style={styles.locationText}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
      <TouchableOpacity style={styles.menuIcon} onPress={() => onClose()}>
        <Text style={styles.cancel}>X</Text>
      </TouchableOpacity>

      <MapView
        ref={mapViewRef}
        style={styles.map}
        initialRegion={{
          latitude: markerPositionLat || 37.78825,
          longitude: markerPositionLong || -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={(e) => updateMarker(e)}>
        <Marker
          coordinate={{
            latitude: markerPositionLat || 37.78825,
            longitude: markerPositionLong || -122.4324,
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
            placeholderTextColor={'black'}
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>

        {locations.length > 0 && (
          <FlatList
            data={locations}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.flatListContainer}
          />
        )}
      </View>

      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.bottomButton} onPress={closeAndFinal}>
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
    minHeight: 300, // Ensures the map has a minimum height
  },
  menuIcon: {
    position: 'absolute',
    top: 15,
    left: 10,
    zIndex: 1,
    backgroundColor: 'transparent',
    borderRadius: 18,
    padding: 10,
  },
  cancel: {
    color: 'white',
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 8,
    fontWeight: 'bold',
  },
  modalContent: {
    backgroundColor: 'white',
    paddingLeft: 10,
    paddingTop: 10,
    paddingRight: 10,
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
    paddingLeft: 10,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10, // Adjusted padding to match design
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  locationItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  locationText: {
    fontSize: 16,
    color: 'black',
  },
  bottomButtonContainer: {
    paddingTop: 10,
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
    width: '100%',
  },
  bottomButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  flatListContainer: {
    paddingBottom: 60, // Added padding to prevent data from being hidden behind the button
  },
});

export default LocationModal;