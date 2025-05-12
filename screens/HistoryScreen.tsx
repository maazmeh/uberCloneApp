import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

// Sample data
const data = [
  { id: '1', date: '14/10/2023', time: '09:12', type: 'bike', typeTitle: 'Bike', fare: '125 NGN', distance: '25 Km' },
  { id: '2', date: '14/10/2023', time: '12:23', type: 'city', typeTitle: 'City to City', fare: '50 NGN', distance: '25 Km', passenger: '10' },
  { id: '3', date: '14/10/2023', time: '15:30', type: 'courier', typeTitle: 'Courier', fare: '125 NGN', weight: '5 kgs' },
  { id: '4', date: '14/10/2023', time: '18:00', type: 'freight', typeTitle: 'Freight', fare: '50 NGN', weight: '250 Kgs' },
  { id: '5', date: '14/10/2023', time: '09:12', type: 'bike', typeTitle: 'Bike', fare: '125 NGN', distance: '25 Km' },
];

const HistoryScreen = ({ navigation }) => {
  const [selectedSegment, setSelectedSegment] = useState(1);

  // Function to render each row in the table
  const renderItem = ({ item }) => {
    if (item.type === getSegmentType(selectedSegment)) {
      return (
        <View style={styles.historyItem}>
          <View style={styles.titleContainer}>
            <Text style={styles.categoryTitle}>{item.typeTitle}</Text>
            <Text style={styles.dateTitle}>{item.time} {item.date}</Text>
          </View>
          <View style={styles.contentContainer}>
            {renderSegmentContent(item)}
          </View>
        </View>
      );
    }
    return null;
  };

  // Function to render content based on the segment type
  const renderSegmentContent = (item:any) => {
    switch (item.type) {
      case 'bike':
        return (
          <>
            <Text style={styles.typeText}>Distance: {item.distance}</Text>
            <Text style={styles.dateText}>Fare: {item.fare}</Text>
          </>
        );
      case 'city':
        return (
          <>
            <Text style={styles.typeText}>Distance: {item.distance}</Text>
            <Text style={styles.dateText}>Fare: {item.fare}</Text>
            <Text style={styles.dateText}>Passengers: {item.passenger}</Text>
          </>
        );
      case 'courier':
        return (
          <>
            <Text style={styles.typeText}>Package Weight: {item.weight}</Text>
            <Text style={styles.dateText}>Fare: {item.fare}</Text>
          </>
        );
      case 'freight':
        return (
          <>
            <Text style={styles.typeText}>Package Weight: {item.weight}</Text>
            <Text style={styles.dateText}>Fare: {item.fare}</Text>
          </>
        );
      default:
        return null; // Ignore items with unknown types
    }
  };

  // Function to get the segment type based on the selected segment
  const getSegmentType = (segment:any) => {
    switch (segment) {
      case 1:
        return 'bike';
      case 2:
        return 'city';
      case 3:
        return 'courier';
      case 4:
        return 'freight';
      default:
        return '';
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.openDrawer()}>
        <AntDesign name="menufold" size={25} color={'white'} />
      </TouchableOpacity>
      <Text style={styles.title}>History</Text>

      <View style={styles.segmentButtons}>
        {[1, 2, 3, 4].map((segment) => (
          <TouchableOpacity
            key={segment}
            style={[styles.segmentButton, selectedSegment === segment && styles.selectedSegment]}
            onPress={() => setSelectedSegment(segment)}>
            <Text style={[styles.buttonText, selectedSegment === segment && styles.selectedButtonText]}>
              {getSegmentType(segment).toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content Area */}
      <View style={styles.contentArea}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
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
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    color: 'white',
    textAlign: 'center',
  },
  segmentButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    backgroundColor: '#051322',
  },
  segmentButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'transparent',
    borderColor: '#002251',
    borderWidth: 2,
    flex: 1,
    alignItems: 'center', // Center align the text
  },
  buttonText: {
    color: 'white',
  },
  selectedSegment: {
    backgroundColor: '#002251',
  },
  selectedButtonText: {
    fontWeight: 'bold',
  },
  contentArea: {
    flex: 1,
    paddingHorizontal: 10,
  },
  historyItem: {
    marginTop: 10,
    padding: 20,
    backgroundColor: '#030a13',
    borderRadius: 8,
    elevation: 5,
    width: '90%', // Updated width to cover almost the entire screen
    alignSelf: 'center', // Center the card horizontally
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  dateTitle: {
    fontSize: 14,
    color: 'white',
  },
  contentContainer: {},
  typeText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  dateText: {
    fontSize: 14,
    color: 'white',
  },
});

export default HistoryScreen;