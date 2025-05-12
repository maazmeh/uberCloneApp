import { StyleSheet } from 'react-native';

export const sidebarStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#061627',
  },
  profileContainer:{
     paddingLeft: 2, 
     paddingTop:10, 
     flexDirection: 'row', 
     alignItems: 'center' 
  },
  profileImage:{
    width: 75, 
    height: 75, 
    marginRight: 5 
  },
  username:{
     color: 'white', 
     fontSize: 18, 
     fontWeight: 'bold' 
  },
  ratingContainer:{
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  rating:{
    color: 'white', 
    marginLeft: 5, 
    fontSize: 14
  },
  optionContainer:{
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 10
  },
  optionText:{
    color: 'white', 
    marginLeft: 10, 
    fontSize: 16
  },
  riderButton:{
    backgroundColor: '#007eff', 
    padding: 8,
    borderRadius: 18,
    marginBottom:15, 
    alignSelf:'center', 
    marginTop:20,
    width: '65%'
  },
  riderText:{
    color: 'white', 
    textAlign: 'center'
   },
   socialMediaContainer:{ 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingBottom: 20 
   },
   socialImage: { 
    width: 40, 
    height: 40, 
    marginHorizontal: 10 
   },
   compulsoryText:{
    color:'red', 
    marginTop:-5, 
    paddingLeft:5, 
    paddingBottom:5
   },
});