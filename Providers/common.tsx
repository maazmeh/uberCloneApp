//Common function provider
import Geolocation from '@react-native-community/geolocation';
import Geocoding from 'react-native-geocoding';

// Set your Google Maps API key here
Geocoding.init('AIzaSyB7aeI9X3sqWjCUvFNbL0jbX11tKEEJfOs');

export const getOneTimeLocation = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position:any) => {
        let currentLatitude = position.coords.latitude;
        let currentLongitude = position.coords.longitude;
  
        Geocoding.from({latitude : currentLatitude, longitude :currentLongitude})
        .then(json => {
          const address = json.results[0].formatted_address;
          console.log("address resp =>", address);
          let data:any = {lat:position.coords.latitude, long:position.coords.longitude, pickUp: address};
          resolve(data);
        })
        .catch(error => {
          console.log('Error getting address:', error)
          reject(error)
        });
      },
      (error:any) => {
        console.log("error =>", error);
        reject(error)
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000
      },
    );
  });
  };

  export const subscribeLocationLocation = () => {
    let watchID = Geolocation.watchPosition(
      (position:any) => {
        console.log("position =>",position);  
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
      },(error:any) => {
       console.log(error.message);
      },{
        enableHighAccuracy: false,
        maximumAge: 1000
      },
    );
  };


  //Distance Calculation
  export const calculateDistance = (lat1:any, lon1:any, lat2:any, lon2:any) => {
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
        const finalDist = Math.trunc(distance)
        costCalculatorForBike(finalDist).then((result) => {
          let data:any = {distance: finalDist, cost: result};
          resolve(data);
         }).catch((error) => {
          console.error('calculateDistance Error:', error);
         });
      } catch (error) {
        console.log("Error caught while distance Calculation =>", error);
        reject(error);
      }
    });
  }
  
  const deg2rad = (deg:any) => {
    return deg * (Math.PI / 180);
  }

  //function to calculate costing/ km
  const costCalculatorForBike = (distance:any) => {
    return new Promise((resolve, reject) => {
      try {
         let costPerKmBike = 90;
         let baseFare = 1000;
         let finalCost =  baseFare + costPerKmBike * distance;
         console.log("finalCost =>", finalCost);
         resolve(finalCost)
      } catch (error) {
        console.log("Error caught while distance Calculation =>", error);
        reject(error);
      }
    });
  }


  export const calculateCost = (pickUpLatitude:any, pickUpLogitude:any, dropOffLatitude:any, dropOffLogitude:any) => {
    return new Promise(async (resolve, reject) => {
        calculateDistance(pickUpLatitude, pickUpLogitude, dropOffLatitude, dropOffLogitude).then((resp:any) => {
          let fare:any = resp.cost;
          resolve(fare);
        }).catch((err:any) => {
          console.log("err while calculateDistance CityToCity =>", err);
          reject(err);
        })
    });
  }


  export const fetchAddressByLatLong = (latitude:any, longitude:any) => {
    return new Promise(async (resolve, reject) => {
      Geocoding.from({latitude : latitude, longitude :longitude})
        .then(json => {
          const address = json.results[0].formatted_address;
          console.log("address located from lat long resp =>", address);
          resolve(address);
        })
        .catch(error => {
          console.log('Error getting address:', error)
          reject(error)
        });
    })
  }

