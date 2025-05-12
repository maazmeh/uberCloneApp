import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ToastAndroid } from 'react-native';

//Reducers
import { setUserData } from '../reducers/userReducer';

const server = 'https://app.rssoftllc.com/naiRide/webServices/userApp'

// PHp SQL starts

const showToastWithGravity = (title:any) => {
  ToastAndroid.showWithGravityAndOffset(
    title,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    25,
    50,
  );
};


  export const acceptRideRequest = async (cityId:any, finalFare:any, riderId:any, screenParam:any) => {
    return new Promise(async (resolve,reject) => {
      try {
        const userLoginApi = server + '/acceptRideRequest.php?cityId=' + cityId + '&finalFare=' + finalFare + '&riderId=' + riderId + '&screenParam=' + screenParam;
          let eventData:any = '';
          const url = userLoginApi;
          const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Max-Age': '0',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': 'Authorization',
          };
          const APIData = await axios.post(
            url,
            {
              ...eventData,
            },
            {
              headers: headers,
            },
          );
          
          if(APIData.data.Status === 'failed'){
            reject('failed')
          } else {
            resolve(APIData.data)
          }
      } catch (error) {
        console.error('Error:', error);
      }
    });
  }

  export const rateRider = async (riderId:any, rating:any, comment:any) => {
    return new Promise(async (resolve,reject) => {
      try {
        const userLoginApi = server + '/rateRider.php?riderId=' + riderId + '&rate=' + rating + '&review=' + comment;
          let eventData:any = '';
          const url = userLoginApi;
          const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Max-Age': '0',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': 'Authorization',
          };
          const APIData = await axios.post(
            url,
            {
              ...eventData,
            },
            {
              headers: headers,
            },
          );
          
          if(APIData.data.Status === 'failed'){
            reject('failed')
          } else {
            showToastWithGravity('Thank You for the feedback...');
            resolve(APIData.data)
          }
      } catch (error) {
        console.error('Error:', error);
      }
    });
  }

export const checkForCityReq = async (id:any) => {
  return new Promise(async (resolve,reject) => {
    try {
      console.log("checkForCityStatus got hit =>");
      const userLoginApi = server + '/checkForCityStatus.php?id=' + id;
        let eventData:any = '';
        const url = userLoginApi;
        const headers = {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Max-Age': '0',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Headers': 'Authorization',
        };
        const APIData = await axios.post(
          url,
          {
            ...eventData,
          },
          {
            headers: headers,
          },
        );
        resolve(APIData.data)
    } catch (error) {
      console.error('Error:', error);
    }
  });
}

export const checkForCourierReq = async (id:any) => {
  return new Promise(async (resolve,reject) => {
    try {
      console.log("checkForCourierStatus got hit =>");
      const userLoginApi = server + '/checkForCourierStatus.php?id=' + id;
        let eventData:any = '';
        const url = userLoginApi;
        const headers = {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Max-Age': '0',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Headers': 'Authorization',
        };
        const APIData = await axios.post(
          url,
          {
            ...eventData,
          },
          {
            headers: headers,
          },
        );
        resolve(APIData.data)
    } catch (error) {
      console.error('Error:', error);
    }
  });
}

export const checkForFreightReq = async (id:any) => {
  return new Promise(async (resolve,reject) => {
    try {
      console.log("checkForFreightStatus got hit =>");
      const userLoginApi = server + '/checkForFreightStatus.php?id=' + id;
        let eventData:any = '';
        const url = userLoginApi;
        const headers = {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Max-Age': '0',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Headers': 'Authorization',
        };
        const APIData = await axios.post(
          url,
          {
            ...eventData,
          },
          {
            headers: headers,
          },
        );
        resolve(APIData.data)
    } catch (error) {
      console.error('Error:', error);
    }
  });
}

export const checkForRideReq = async (id:any) => {
  return new Promise(async (resolve,reject) => {
    try {
      console.log("checkForRideStatus got hit =>");
      const userLoginApi = server + '/checkForRideStatus.php?id=' + id;
        let eventData:any = '';
        const url = userLoginApi;
        const headers = {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Max-Age': '0',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Headers': 'Authorization',
        };
        const APIData = await axios.post(
          url,
          {
            ...eventData,
          },
          {
            headers: headers,
          },
        );
        resolve(APIData.data)
    } catch (error) {
      console.error('Error:', error);
    }
  });
}




export const registerUser = async (name:any, lastName:any, email:any, phoneNumber:any, isActive:any, uid:any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userRegisterAPI = server + '/userRegister.php?firstName=' + name + '&lastName=' + lastName + '&email=' + email + '&phoneNumber=' + phoneNumber + '&uid=' + uid;
        let eventData:any = '';
        const url = userRegisterAPI;
        const headers = {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Max-Age': '0',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Headers': 'Authorization',
        };
        const APIData = await axios.post(
          url,
          {
            ...eventData,
          },
          {
            headers: headers,
          },
        );
      console.log('API Response', APIData.data);
      if(APIData.data.Status === 'failed'){
        showToastWithGravity('User Registeration Failed, Please Try Again Later');
        reject('failed')
      } else if(APIData.data.Status === 'exist'){ 
        showToastWithGravity('User Already Registered !');
        reject('exist')
      } else {
        showToastWithGravity('Registeration Successfull !');
        resolve(APIData);
      }
    } catch (error) {
      console.error('Error:', error);
      reject(error)
    }
  });
  };


  export const loginUser = (phoneNumber:any) => async (dispatch:any) => {
      try {
        console.log("loginUser got hit =>");
        const userLoginApi = server + '/userLogin.php?phoneNumber=' + phoneNumber;
          let eventData:any = '';
          const url = userLoginApi;
          const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Max-Age': '0',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': 'Authorization',
          };
          const APIData = await axios.post(
            url,
            {
              ...eventData,
            },
            {
              headers: headers,
            },
          );
        console.log('API Response login', APIData.data);
        //returning user data to reducer
        if(APIData.data.Status === 'failed'){
          showToastWithGravity('Login Failed, Please Try Again Later');
        } else {
          await AsyncStorage.setItem('userData', JSON.stringify(APIData.data));
          dispatch(setUserData(APIData.data));
          showToastWithGravity('Login Successfull !');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };



    export const courierRequest = async (title:any, description:any, pickUpLocation:any, destination:any, userId:any, pickUpLatitude:any, pickUpLongtitude:any, dropOffLatitude:any, dropOffLogitude:any, cost:any) => {
      return new Promise(async (resolve, reject) => {
        try {
          console.log("CourierReq got it =>", 
            title,
            description,
            pickUpLocation,
            destination,
            userId,
            pickUpLatitude,
            pickUpLongtitude,
            dropOffLatitude,
            dropOffLogitude,
            cost);
          const courierReqAPI = server + '/courierRequest.php?userId=' + userId + '&title=' + title + '&description=' + description + '&pickUpLocation=' + pickUpLocation + '&pickUpLatitude=' + pickUpLatitude + '&pickUpLongtitude=' + pickUpLongtitude + '&dropOffLocation=' + destination + '&dropOffLatitude=' + dropOffLatitude + '&dropOffLongtitude=' + dropOffLogitude + '&offerFare=' + cost;
            let eventData:any = '';
            const url = courierReqAPI;
            const headers = {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'POST',
              'Access-Control-Max-Age': '0',
              'Access-Control-Allow-Credentials': 'true',
              'Access-Control-Allow-Headers': 'Authorization',
            };
            const APIData = await axios.post(
              url,
              {
                ...eventData,
              },
              {
                headers: headers,
              },
            );
          console.log('API Response', APIData.data);
          if(APIData.data.Status === 'failed'){
            showToastWithGravity('Courier Request Failed, Please Try Again Later');
            reject('failed')
          } else {
            showToastWithGravity('Courier Request Successfull !');
            resolve(APIData.data);
          }
        } catch (error) {
          console.error('Error:', error);
          reject(error)
        }
      });
    };


    export const fetchCourierReq = async (userId:any, courierId:any) => {
      return new Promise(async (resolve, reject) => {
      try {
        const userLoginApi = server + '/fetchCourierReq.php?userId=' + userId + '&courierId=' + courierId;
          let eventData:any = '';
          const url = userLoginApi;
          const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Max-Age': '0',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': 'Authorization',
          };
          const APIData = await axios.post(
            url,
            {
              ...eventData,
            },
            {
              headers: headers,
            },
          );
        console.log('API Response login', APIData.data);
        //returning user data to reducer
        if(APIData.data.Status === 'failed'){
          // showToastWithGravity('Courier Request, Please Try Again Later');
        } else {
          console.log("Data fetched");
          resolve(APIData.data)
        }
      } catch (error) {
        console.error('Error:', error);
        reject(error)
      }
    });
  }

  export const fetchCityReq = async (userId:any, taskId:any) => {
    return new Promise(async (resolve, reject) => {
    try {
      const userLoginApi = server + '/fetchCityRequest.php?userId=' + userId + '&cityId=' + taskId;
        let eventData:any = '';
        const url = userLoginApi;
        const headers = {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Max-Age': '0',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Headers': 'Authorization',
        };
        const APIData = await axios.post(
          url,
          {
            ...eventData,
          },
          {
            headers: headers,
          },
        );
      console.log('API Response login', APIData.data);
      if(APIData.data.Status === 'failed'){
      } else {
        console.log("Data fetched");
        resolve(APIData.data)
      }
    } catch (error) {
      console.error('Error:', error);
      reject(error)
    }
  });
}


  export const fetchRideReq = async (userId:any, rideId:any) => {
    return new Promise(async (resolve, reject) => {
      try {
        const userDataApi = server + '/fetchRideRequest.php?userId=' + userId + '&rideId=' + rideId;
          let eventData:any = '';
          const url = userDataApi;
          const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Max-Age': '0',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': 'Authorization',
          };
          const APIData = await axios.post(
            url,
            {
              ...eventData,
            },
            {
              headers: headers,
            },
          );
        console.log('API Response userRideData', APIData.data);
        //returning user data to reducer
        if(APIData.data.Status === 'failed'){
          // showToastWithGravity('Courier Request, Please Try Again Later');
        } else {
          console.log("Data fetched");
          resolve(APIData.data)
        }
      } catch (error) {
        console.error('Error:', error);
        reject(error)
      }
    });
  }


  export const rideRequest = async (pickUpLocation:any, destination:any, userId:any, pickUpLatitude:any, pickUpLongtitude:any, dropOffLatitude:any, dropOffLongitude:any, cost:any) => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log("CourierReq got it");
        const rideRequestAPI = server + '/rideRequest.php?userId=' + userId + '&pickUpLocation=' + pickUpLocation + '&pickUpLat=' + pickUpLatitude + '&pickUpLong=' + pickUpLongtitude + '&dropOffLocation=' + destination + '&dropOffLat=' + dropOffLatitude + '&dropOffLong=' + dropOffLongitude + '&offerFare=' + cost;
          let eventData:any = '';
          const url = rideRequestAPI;
          const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Max-Age': '0',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': 'Authorization',
          };
          const APIData = await axios.post(
            url,
            {
              ...eventData,
            },
            {
              headers: headers,
            },
          );
        if(APIData.data.Status === 'failed'){
          showToastWithGravity('Ride Request Failed, Please Try Again Later');
          reject('failed')
        } else {
          showToastWithGravity('Ride Request Successfull !');
          resolve(APIData.data);
        }
      } catch (error) {
        console.error('Error:', error);
        reject(error)
      }
    });
  };


    export const freightRequest = async (title:any, description:any, pickUpLocation:any, destination:any, userId:any, pickUpLatitude:any, pickUpLongtitude:any, dropOffLatitude:any, dropOffLongitude:any, cost:any) => {
      return new Promise(async (resolve, reject) => {
        try {
          const courierReqAPI = server + '/freightRequest.php?userId=' + userId + '&title=' + title + '&description=' + description + '&pickUpLocation=' + pickUpLocation + '&pickUpLatitude=' + pickUpLatitude + '&pickUpLongtitude=' + pickUpLongtitude + '&dropOffLocation=' + destination + '&dropOffLatitude=' + dropOffLatitude + '&dropOffLongtitude=' + dropOffLongitude + '&offerFare=' + cost;
            let eventData:any = '';
            const url = courierReqAPI;
            const headers = {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'POST',
              'Access-Control-Max-Age': '0',
              'Access-Control-Allow-Credentials': 'true',
              'Access-Control-Allow-Headers': 'Authorization',
            };
            const APIData = await axios.post(
              url,
              {
                ...eventData,
              },
              {
                headers: headers,
              },
            );
            if(APIData.data.Status === 'failed'){
              showToastWithGravity('Freight Request Failed, Please Try Again Later');
              reject('failed')
            } else {
              showToastWithGravity('Freight Request Successfull !');
              console.log('API Response', APIData.data);
              resolve(APIData.data);
          }
        } catch (error) {
          console.error('Error:', error);
          reject(error)
        }
      });
    };

    export const fetchFreightReq = async (userId:any, freightId:any) => {
      return new Promise(async (resolve, reject) => {
      try {
        const userLoginApi = server + '/fetchFreightReq.php?userId=' + userId + '&freightId=' + freightId;
          let eventData:any = '';
          const url = userLoginApi;
          const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Max-Age': '0',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': 'Authorization',
          };
          const APIData = await axios.post(
            url,
            {
              ...eventData,
            },
            {
              headers: headers,
            },
          );
        console.log('API Response login', APIData.data);
        //returning user data to reducer
        if(APIData.data.Status === 'failed'){
          // showToastWithGravity('Courier Request, Please Try Again Later');
        } else {
          console.log("Data fetched");
          resolve(APIData.data)
        }
      } catch (error) {
        console.error('Error:', error);
        reject(error)
      }
    });
  }


    export const cityRequest = async (pickUpLocation:any, destination:any, noOfPassengers:any, fare:any, comment:any,userId:any, pickUpLatitude:any, pickUpLongtitude:any, dropOffLatitude:any, dropOffLongitude:any) => {
      return new Promise(async (resolve, reject) => {
        try {
          const cityReqAPI = server + '/cityRequest.php?pickUpLocation=' + pickUpLocation + '&dropOffLocation=' + destination + '&noOfPassengers=' + noOfPassengers + '&offerFare=' + fare + '&comment=' + comment + '&userId=' + userId + '&pickUpLatitude=' + pickUpLatitude + '&pickUpLongtitude=' + pickUpLongtitude + '&dropOffLatitude=' + dropOffLatitude + '&dropOffLongtitude=' + dropOffLongitude;
            let eventData:any = '';
            const url = cityReqAPI;
            const headers = {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'POST',
              'Access-Control-Max-Age': '0',
              'Access-Control-Allow-Credentials': 'true',
              'Access-Control-Allow-Headers': 'Authorization',
            };
            const APIData = await axios.post(
              url,
              {
                ...eventData,
              },
              {
                headers: headers,
              },
            );
          console.log('API Response', APIData.data);
          if(APIData.data.Status === 'failed'){
            showToastWithGravity('Travel Request Failed, Please Try Again Later');
            reject('failed')
          } else {
            showToastWithGravity('Travel Request Successfull !');
            resolve(APIData.data);
          }
        } catch (error) {
          console.error('Error:', error);
          reject(error)
        }
      });
    };


    export const checkUser = async(phoneNumber:any) => {
      return new Promise(async (resolve, reject) => {
        try {
          console.log("checkUser phoneNumber ==>", phoneNumber);
          const userLoginApi = server + '/userLogin.php?phoneNumber=' + phoneNumber;
            let eventData:any = '';
            const url = userLoginApi;
            const headers = {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'POST',
              'Access-Control-Max-Age': '0',
              'Access-Control-Allow-Credentials': 'true',
              'Access-Control-Allow-Headers': 'Authorization',
            };
            const APIData = await axios.post(
              url,
              {
                ...eventData,
              },
              {
                headers: headers,
              },
            );
          if(APIData.data.Status === 'failed'){
            // showToastWithGravity('Login Failed, Please Try Again Later');
            reject('failed')
          } else {
            showToastWithGravity('Login Successfull !');
            resolve(APIData);
          }
        } catch (error) {
          console.error('Error:', error);
          reject(error)
        }
      });
      };
  

    ///////////////////////   All cancel Requests  //////////////////////////////////

    export const cancelCourierReq = async (userId:any, taskId:any) => {
      return new Promise(async (resolve, reject) => {
      try {
        const userLoginApi = server + '/cancelCourierReq.php?userId=' + userId + '&courierId=' + taskId;
          let eventData:any = '';
          const url = userLoginApi;
          const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Max-Age': '0',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': 'Authorization',
          };
          const APIData = await axios.post(
            url,
            {
              ...eventData,
            },
            {
              headers: headers,
            },
          );
        console.log('API Response login', APIData.data);
        if(APIData.data.Status === 'failed'){
        } else {
          console.log("Data fetched");
          resolve(APIData.data)
        }
      } catch (error) {
        console.error('Error:', error);
        reject(error)
      }
    }); 
    }

    export const cancelFreightReq = async (userId:any, taskId:any) => {
      return new Promise(async (resolve, reject) => {
      try {
        const userLoginApi = server + '/cancelFreightReq.php?userId=' + userId + '&freightId=' + taskId;
          let eventData:any = '';
          const url = userLoginApi;
          const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Max-Age': '0',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': 'Authorization',
          };
          const APIData = await axios.post(
            url,
            {
              ...eventData,
            },
            {
              headers: headers,
            },
          );
        console.log('API Response login', APIData.data);
        if(APIData.data.Status === 'failed'){
        } else {
          console.log("Data fetched");
          resolve(APIData.data)
        }
      } catch (error) {
        console.error('Error:', error);
        reject(error)
      }
    });
    }

    export const cancelRideReq = async (userId:any, taskId:any) => {
      return new Promise(async (resolve, reject) => {
      try {
        const userLoginApi = server + '/cancelRideReq.php?userId=' + userId + '&rideId=' + taskId;
          let eventData:any = '';
          const url = userLoginApi;
          const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Max-Age': '0',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': 'Authorization',
          };
          const APIData = await axios.post(
            url,
            {
              ...eventData,
            },
            {
              headers: headers,
            },
          );
        console.log('API Response login', APIData.data);
        if(APIData.data.Status === 'failed'){
        } else {
          console.log("Data fetched");
          resolve(APIData.data)
        }
      } catch (error) {
        console.error('Error:', error);
        reject(error)
      }
    });
    }

    export const cancelCityReq = async (userId:any, taskId:any) => {
      return new Promise(async (resolve, reject) => {
      try {
        const userLoginApi = server + '/cancelCityReq.php?userId=' + userId + '&cityId=' + taskId;
          let eventData:any = '';
          const url = userLoginApi;
          const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Max-Age': '0',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': 'Authorization',
          };
          const APIData = await axios.post(
            url,
            {
              ...eventData,
            },
            {
              headers: headers,
            },
          );
        console.log('API Response login', APIData.data);
        if(APIData.data.Status === 'failed'){
        } else {
          console.log("Data fetched");
          resolve(APIData.data)
        }
      } catch (error) {
        console.error('Error:', error);
        reject(error)
      }
    });
    }


    export const cancelAllRequest = async (type:any, taskId:any) => {
      return new Promise(async (resolve, reject) => {
      try {
        const userLoginApi = server + '/cancelAllRequets.php?type=' + type + '&taskId=' + taskId;
          let eventData:any = '';
          const url = userLoginApi;
          const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Max-Age': '0',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': 'Authorization',
          };
          const APIData = await axios.post(
            url,
            {
              ...eventData,
            },
            {
              headers: headers,
            },
          );
        console.log('API Response login', APIData.data);
        if(APIData.data.Status === 'failed'){
        } else {
          console.log("Data fetched");
          resolve(APIData.data)
        }
      } catch (error) {
        console.error('Error:', error);
        reject(error)
      }
    }); 
    }

  

  //API Call
let container: any;

const apiCall = async (eventData: any, apiUrl: any, Token: any, name?: any) => {
  try {
    const url = apiUrl;
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Max-Age': '0',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Authorization',
      authorization: Token,
    };
    const APIData = await axios.post(
      url,
      {
        ...eventData,
      },
      {
        headers: headers,
      },
    );
    console.log('API Response', APIData.data,name);
    container = JSON.stringify(APIData);
    return APIData.data;
  } catch (error: any) {
    console.log('Error in apiCall', error);
  }
};
