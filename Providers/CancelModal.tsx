import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, FlatList } from 'react-native';

const reasonsList = [
  { id: '1', reason: 'Rider is not picking up call' },
  { id: '2', reason: 'I Changed my mind' },
  { id: '3', reason: 'Emergency Situation' },
  // Add more reasons as needed
];

const CancelRideModal = ({ modalVisible, onCancel, onConfirm }) => {
  const [selectedReason, setSelectedReason] = useState(null);

  const confirmCancelRide = () => {
    if (selectedReason) {
      onConfirm(selectedReason);
    } else {
      // Handle the case when no reason is selected
    }
  };

  const cancelCancelRide = () => {
    onCancel();
  };

  const renderReasonItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.reasonItem, selectedReason?.id === item.id && styles.selectedReasonItem]}
      onPress={() => setSelectedReason(item)}
    >
      <Text style={[styles.reasonText, selectedReason?.id === item.id && styles.selectedReasonText]}>{item.reason}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={onCancel}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Select a reason for canceling the ride:</Text>
          <FlatList
            data={reasonsList}
            keyExtractor={(item) => item.id}
            renderItem={renderReasonItem}
            style={styles.reasonsList}
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.yesmodalButton} onPress={confirmCancelRide}>
              <Text style={styles.modalButtonText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={cancelCancelRide}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },
      modalText: {
        fontSize: 18,
        marginBottom: 20,
        color:'black'
      },
      reasonsList: {
        maxHeight: 150,
        marginBottom: 20,
      },
      reasonItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        color:'black'
      },
      selectedReasonItem: {
        backgroundColor: '#061628',
        borderRadius:12,
        color:'red'
      },
      reasonText: {
        fontSize: 16,
        color:'black'
      },
      selectedReasonText:{
        fontSize: 16,
        color:'white'
      },
      modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      modalButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        width: '48%',
      },
      yesmodalButton:{
        backgroundColor: '#061628',
        padding: 10,
        borderRadius: 5,
        width: '48%',
      },
      modalButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
      },
});

export default CancelRideModal;