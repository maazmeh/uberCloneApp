import React, { useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity, StyleSheet, TextInput, ToastAndroid } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import StarRating from 'react-native-star-rating'; 
import { rateRider } from '../Providers/http';

const RatingScreen: React.FC = ({navigation, route}) => {
  const { riderInfo } = route.params;
  const [isChecked, setChecked] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [feedbackText, setFeedbackText] = useState('');

  const handleRating = (rating:any) => {
    setRating(rating);

    // Set feedback text based on the selected rating
    switch (rating) {
      case 1:
        setFeedbackText('Not Satisfied');
        break;
      case 2:
        setFeedbackText('Could be Better');
        break;
      case 3:
        setFeedbackText('Average');
        break;
      case 4:
        setFeedbackText('Good');
        break;
      case 5:
        setFeedbackText('Excellent');
        break;
      default:
        setFeedbackText('');
    }
  };

  const handleCommentChange = (text:any) => {
    setComment(text);
  };

  const handleSubmit = () => {
    console.log('Rating:', rating);
    console.log('Comment:', comment);
    console.log("riderInfo ==>", riderInfo)
    rateRider(riderInfo.riderId, rating, comment).then((resp:any) => {
      console.log("resp from RatingScreen =>");
      navigation.navigate('Home')
    }).catch((err:any) => {
      console.log("err RatingScreen =>", err);
    })
  };

  const handleCheckboxToggle = () => {
    setChecked(!isChecked);
  };



  return (
    <View style={styles.container}>

    <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.navigate('Home')}>
     <AntDesign name="closecircle" size={25} color={'white'} />
    </TouchableOpacity>
    
    <Text style={styles.title}>Rate & Review</Text>

     <View style={styles.detailItem}>
        <Text style={styles.heading}>Travel Time:</Text>
        <Text style={styles.ans}>30 minutes</Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.heading}>Total Price:</Text>
        <Text style={styles.ans}>{riderInfo ? 'NGN ' + riderInfo.riderOffer : 'NGN 50'}</Text>
      </View>

      <Text style={styles.ratingHeading}>Rate Your Ride</Text>
      <View style={styles.ratingContainer}>
      <StarRating
        disabled={false}
        maxStars={5}
        rating={rating}
        selectedStar={(rating:any) => handleRating(rating)}
        fullStarColor={'white'}
        starSize={30}
      />
      </View>
        {feedbackText !== '' && <Text style={styles.feedbackText}>{feedbackText}</Text>}

      <Text style={styles.commentHeading}>Write a Comment</Text>
      <TextInput
        style={styles.commentInput}
        placeholderTextColor="white"
        placeholder="Write your comment here"
        multiline
        value={comment}
        onChangeText={handleCommentChange}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    padding: 20,
    backgroundColor: '#061628',
  },
  ratingContainer:{
    paddingLeft:45, 
    paddingRight:45
  },
  termsText: {
    fontSize: 16,
    lineHeight: 24,
    color: 'white',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 5,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    width: 12,
    height: 12,
    backgroundColor: 'white',
    borderRadius: 3,
  },
  checkboxLabel: {
    color: 'white',
    fontSize: 16,
  },
    container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#061628',
  },
  menuIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  menuText: {
    color: 'white',
    fontSize: 18,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    textAlign: 'center',
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    color: 'white',
  },
  ratingHeading: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    color: 'white',
  },
  commentHeading: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    color: 'white',
  },
  commentInput: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    height: 100,
    color: 'white',
  },
  submitButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 24,
    alignItems: 'center',
    width:'100%'
  },
  submitButtonText: {
    color: '#061628',
    fontSize: 16,
    fontWeight: 'bold',
  },
  heading:{
    color:'white',
    fontWeight: 'bold',
  },
  ans:{
    color:'white',
  },
  feedbackText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
    textAlign:'center',
    paddingTop:15,
    fontWeight: 'bold',
  },
});

export default RatingScreen;