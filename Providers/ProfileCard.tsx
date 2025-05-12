import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';


const ProfileCard = ({ data, onAcceptPress }) => {

    return (
    <View style={styles.profileCard}>
      <View style={styles.innerProfile}>
        {
          data.riderProfilePicture === null ?
          <Image source={require('../src/assets/logoForSideBar.png')} style={styles.profileImage} />
          :
          <Image source={data.riderProfilePicture} style={styles.profileImage} />
        }
        <View style={styles.profileInfo}>
          <View style={styles.leftContainer}>
            <Text style={styles.modelName}>{data.riderVehicle}</Text>
            <Text style={styles.name}>{data.riderFirstName}</Text>
            <View style={styles.ratingContainer}>
              <AntDesign name="star" size={15} color={'gold'} />
              <Text style={styles.rating}>{data.avgRating}</Text>
            </View>
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.offerPrice}>{data.riderOffer} NGN</Text>
            <Text style={styles.timeDistance}>{data.riderDistance} km</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button, styles.greenButton]} onPress={() => onAcceptPress(data)}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
      </View>
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
      borderRadius: 12,
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
  
  export default ProfileCard;