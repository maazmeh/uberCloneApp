import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';


const WalletScreen = ({navigation}) => {
  const [showBalance, setShowBalance] = useState(true);
  const userData = useSelector((state:any) => state.user.userData); //All user Data
  // Sample data for the table
  const tableData = [
    { id: '1', date: '14/10/2023', time: '09:12', type: 'Refund', cost: '125 NGN' },
    { id: '2', date: '14/10/2023', time: '12:23', type: 'Refund', cost: '50 NGN' },
    { id: '3', date: '14/10/2023', time: '15:30', type: 'Payment to NaiRide', cost: '125 NGN' },
    { id: '4', date: '14/10/2023', time: '18:00', type: 'VAT', cost: '50 NGN' },
    { id: '5', date: '14/10/2023', time: '18:00', type: 'VAT', cost: '50 NGN' },
    { id: '6', date: '14/10/2023', time: '18:00', type: 'VAT', cost: '50 NGN' },
  ];

  // Render each row in the table
  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.date}</Text>
      <Text style={styles.cell}>{item.time}</Text>
      <Text style={styles.cell}>{item.type}</Text>
      <Text style={styles.cell}>{item.cost}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.openDrawer()}>
          <AntDesign name="menufold" size={25} color={'white'} />
        </TouchableOpacity>
      
      <Text style={styles.title}>Wallet</Text>


      <View style={styles.cardContainer}>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>Account Balance</Text>
        <TouchableOpacity
          style={styles.balanceToggle}
          onPress={() => setShowBalance(!showBalance)}>
          <MaterialIcons
            name={showBalance ? 'visibility-off' : 'visibility'}
            size={24}
            color="#007eff"
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.amountText}>{showBalance ? 'NGN ' + (userData.balance ? userData.balance : '0') : 'NGN XXXX'}</Text>
    </View>

      {/* Table header */}
      <View style={styles.rowHeader}>
        <Text style={styles.headerCell}>Date</Text>
        <Text style={styles.headerCell}>Time</Text>
        <Text style={styles.headerCell}>Type</Text>
        <Text style={styles.headerCell}>Cost</Text>
      </View>

      {/* Table data */}
      {/* <FlatList
        data={tableData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
 container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#061628',
  },
      menuIcon: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 1,
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
        textAlign: 'center',
      },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    paddingVertical: 10,
    backgroundColor:'#131a22'
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    paddingVertical: 10,
    backgroundColor:'#030a13',
    borderRadius:8,
    marginTop:12
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    color:'white'
  },
  headerCell: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color:'white'
  },
  cardContainer: {
    backgroundColor: '#030a13',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    width:'100%',
  },
  balanceText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color:"white"
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  balanceToggle: {
    padding: 10,
  },
  amountText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color:"white"
  },
});

export default WalletScreen;