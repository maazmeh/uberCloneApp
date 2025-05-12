import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet, ActivityIndicator, ToastAndroid, KeyboardAvoidingView, ScrollView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';
import { cityRequest } from '../Providers/http'
import FetchPickupLocationModal from '../Providers/FetchPickupLocationModal';
import FetchDestinationModal from '../Providers/FetchDestinationModal';
import { calculateCost, calculateDistance } from '../Providers/common';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'; 
import DateTimePicker from '@react-native-community/datetimepicker';


const CityToCityScreen: React.FC = ({navigation}) => {
  const userData = useSelector((state:any) => state.user.userData); //All user Data
  const [selectedOption, setSelectedOption] = useState('cityToCity');
  const [profileImage, setProfileImage] = useState(null);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input4, setInput4] = useState('');
  const [input5, setInput5] = useState('');
  const [input8, setInput8] = useState('');
  //departure date & time
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [deptDate, setDeptDate] = useState<any>();
  const [deptTime, setDeptTime] = useState<any>();
  const [isLoading, setIsLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [showErrorFeilds, setShowErrorFeilds] = useState(false);
  const [allData, setAllData] =  useState({location1: null, location2: null});
  const [borderColor, setBorderColor] = useState<any>('#4169e1');
  const [decreaseCount, setDecreaseCount] = useState(0);
  const [increaseCount, setIncreaseCount] = useState(0);


  useEffect(()=>{
    let location1Data:any = allData.location1;
    let location2Data:any = allData.location2;
    if(location1Data && location1Data.latitude && location2Data && location2Data.latitude){
      calculateDistance(location1Data.latitude, location1Data.longitude, location2Data.latitude, location2Data.longitude).then((resp:any) => {
        console.log("resp =>", resp);
        let fare:any = resp.cost + ' NGN';
        setInput5(fare);
      }).catch((err:any) => {
        console.log("err while calculateDistance CityToCity =>", err);
      })
    }
  },[input1, input2])


  useEffect(()=>{
    if(showErrorFeilds){
      setTimeout(() => {
        setShowErrorFeilds(false)
      }, 5000);
    }
  },[showErrorFeilds])


  const handleDateChange = (event:any, selectedDate:any) => {
    if (selectedDate) {
      setDeptDate(selectedDate);
    }
    setShowDatePicker(false);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleTimeChange = (event:any, selectedTime:any) => {
    if(selectedTime){
      // selectedTime.toLocaleDateString();
      // let v:any = selectedTime.toLocaleDateString();
      // console.log(selectedTime);
      setDeptTime(selectedTime);
    }
    setShowTimePicker(false)
  }

  const showTimepicker = () => {
    setShowTimePicker(true)
  }

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


  const handleStartLocationSelect = (location:any) => {
    console.log("handleStartLocationSelect =>", location);
    setAllData((prevData) => ({
      ...prevData,
      location1: location,
    }));
    setInput1(location.description);
    // setModalVisible(false);
  };


  const handleDestinationLocation = (location:any) => {
    console.log("handleDestinationLocation =>", location);
    // Update location2
    setAllData((prevData) => ({
      ...prevData,
      location2: location,
    }));
    setInput2(location.description);
    setModalVisible(false);
  };

  const showToastWithGravity = (msg:any) => {
    ToastAndroid.showWithGravity(
      msg,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
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

  const handleIncrease = () => {
    const newCount = increaseCount + 1;
    setIncreaseCount(newCount);
    let val:any = '100';
    let numberOnly:any = input5.replace(/\D/g, '');
    let v:any = +numberOnly + +val;
    console.log("handle incerase => ", v.toString());
    setInput5(v.toString()); //+ ' NGN'
    if (newCount >= 3) {
      setBorderColor('yellow')
      showToast('Fare is too high...');
    }
  };

  const handleDecrease = () => {
    const newCount = decreaseCount + 1;
    setDecreaseCount(newCount);
    let val:any = '100';
    let numberOnly:any = input5.replace(/\D/g, '');
    let v:any = +numberOnly - +val;
    setInput5(v.toString()); //+ ' NGN'
    if (newCount >= 3) {
      setBorderColor('red')
      showToast('Rider are unlikely to accept at this rate');
    }
  };

  const handleSearch = () => {
    console.log('handleSearch...', selectedOption, input1, input2,input4);
    setIsLoading(true);
    let pickUp:any =  allData.location1;
    let drop:any = allData.location2;
    console.log('Pickup =>', pickUp);
    console.log('drop =>', drop);
    if(input1 && input2 && input5){
      let data:any = {
        pickUpLocation:input1, 
        destination:input2, 
        noOfPassengers: input4, 
        fare: input5, 
        comment:input8,
        pickUpLatitude: pickUp.latitude,
        pickUpLongitude: pickUp.longitude,
        dropOffLatitude: drop.latitude,
        dropOffLogitude: drop.longitude,
      };
      calculateCost(data.pickUpLatitude, data.pickUpLongitude, data.dropOffLatitude, data.dropOffLogitude).then((resp:any) => {
        console.log("Calculate Cost resp =>", resp)
        cityRequest(data.pickUpLocation, data.destination, data.noOfPassengers, resp, data.comment, userData.id, data.pickUpLatitude, data.pickUpLongitude, data.dropOffLatitude, data.pickUpLongitude).then((cityResp:any) => {
          console.log("cityResp2 =>", cityResp.id);
          setInput1('');
          setInput2('');
          setInput4('');
          setInput5('');
          setIsLoading(false)
          let screenParam:any = 'city';
          let userLatitude:any = pickUp.latitude;
          let userLongtitude:any = pickUp.longitude;
          let taskId:any = cityResp.id;
          navigation.navigate('FindRider',{screenParam, userLatitude, userLongtitude, taskId})
        }).catch((error:any) => {
          console.log("freight request error =>", error);
          setIsLoading(false)
        });
      }).catch((err:any) => {
        console.log("error while Calculate Cost =>", err);
      })
    } else {
      showToastWithGravity('Please Fill Out All the Details')
      setShowErrorFeilds(true);
      setIsLoading(false)
    }
  };

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

  return (
    <View style={{ flex: 1, backgroundColor: '#061628' }}>
      <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.openDrawer()}>
        <AntDesign name="menufold" size={25} color={'white'} />
      </TouchableOpacity>
      <Text style={styles.title}>City to city</Text>
      
      <ScrollView>
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
              style={[styles.optionBox, styles.selectedOption]}
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

          <View style={styles.inputContainer}>
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
              {profileImage ? (
                <TouchableOpacity onPress={handleImageUpload} style={styles.imageContainer}>
                  <Image source={{ uri: profileImage }} style={styles.profileImage} resizeMode="cover" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={handleImageUpload} style={styles.imageContainer}>
                  <Image source={require('../src/assets/upload.png')} style={styles.logo} resizeMode="contain" />
                  <Text style={styles.searchButtonText}>Upload Image</Text>
                </TouchableOpacity>
              )}

              <FetchPickupLocationModal
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSelectLocation={handleStartLocationSelect}
              />

              <TouchableOpacity onPress={showDatepicker} style={styles.dateInput}>
                <Text style={styles.inputText}>{deptDate ? deptDate.toLocaleDateString() : 'Select Departure Date'}</Text>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={deptDate || new Date()}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}

              <TouchableOpacity onPress={() => showTimepicker()} style={styles.dateInput}>
                <Text style={styles.inputText}>{deptTime ? deptTime.toLocaleTimeString() : 'Select schedule Pick Up Time'}</Text>
              </TouchableOpacity>

              {showTimePicker && (
                <DateTimePicker
                  value={new Date()}
                  mode="time"
                  is24Hour={false}
                  display="default"
                  onChange={handleTimeChange}
                />
              )}

              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <TextInput
                  style={styles.input}
                  placeholder="Pick Up Location"
                  placeholderTextColor="white"
                  value={input1}
                  onChangeText={setInput1}
                  editable={false}
                />
              </TouchableOpacity>
              {showErrorFeilds ? (
                <Text style={styles.errorStyle}>* Field is Mandatory</Text>
              ) : (
                <View></View>
              )}

              <FetchDestinationModal
                isVisible={modalVisible2}
                onClose={() => setModalVisible2(false)}
                onSelectLocation={handleDestinationLocation}
              />

              <TouchableOpacity onPress={() => setModalVisible2(true)}>
                <TextInput
                  style={styles.input}
                  placeholder="Destination"
                  placeholderTextColor="white"
                  value={input2}
                  onChangeText={setInput2}
                  editable={false}
                />
              </TouchableOpacity>
              {showErrorFeilds ? (
                <Text style={styles.errorStyle}>* Field is Mandatory</Text>
              ) : (
                <View></View>
              )}

              <TextInput
                style={styles.input}
                placeholder="Number of Passengers"
                placeholderTextColor="white"
                keyboardType="phone-pad"
                value={input4}
                onChangeText={setInput4}
              />

              <View style={styles.iconContainer}>
                <View style={styles.rowContainer}>
                  <TouchableOpacity onPress={handleIncrease}>
                    <AntDesign name="pluscircle" size={26} color="white" style={styles.arrowIconLeft} />
                  </TouchableOpacity>
                  <TextInput
                    style={[styles.textInput, { borderColor: borderColor }]}
                    placeholder="Enter Amount"
                    placeholderTextColor="white"
                    value={input5}
                    onChangeText={setInput5}
                    keyboardType="numeric"
                  />
                  <TouchableOpacity onPress={handleDecrease}>
                    <AntDesign name="minuscircle" size={26} color="white" style={styles.arrowIconRight} />
                  </TouchableOpacity>
                </View>
              </View>

              <TextInput
                style={styles.commentInput}
                placeholder="Comments"
                placeholderTextColor="white"
                value={input8}
                onChangeText={setInput8}
              />
              <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                {isLoading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={styles.searchButtonText}>Find Driver</Text>
                )}
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </View>
      </ScrollView>
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
  },
  inputText: {
    color: 'white',
  },
  profileImage: {
    width: 125,
    height: 125,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth:2,
    borderColor:'white'
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    color: 'white',
    textAlign: 'center',
  },
  datePicker: {
    width: '100%',
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: 'column',
    width: '100%',
  },
  errorStyle:{
    color:'red', 
    marginTop:-6, 
    paddingBottom:2, 
    paddingLeft:2
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
  dateInput:{
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius:8,
    backgroundColor:'#1a2939',
    color:'white',
    paddingTop:10
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
  emptyInput: {
    borderColor: 'red', // Border color when input is empty
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
});

export default CityToCityScreen;



