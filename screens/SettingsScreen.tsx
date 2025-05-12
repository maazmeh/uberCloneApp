import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Switch } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SettingsScreen: React.FC = ({ navigation }) => {
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const settingsOptions = [
    { name: 'Get Push Notification', icon: 'notification', type: 'toggle' },
    { name: 'Account Settings', icon: 'user', type: 'modal' },
    { name: 'Change Password', icon: 'unlock', type: 'modal' },
  ];

  const handleSettingPress = (setting: string) => {
    if (setting === 'Help') {
      navigation.navigate('Information', { screenType: 'Help' });
    } else if (setting === 'Account Settings' || setting === 'Change Password') {
      setModalContent(setting);
      setModalVisible(true);
    }
  };

  const handleSaveChanges = () => {
    console.log('Changes saved!');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.openDrawer()}>
        <AntDesign name="menufold" size={25} color={'white'} />
      </TouchableOpacity>

      <Text style={styles.title}>Settings</Text>

      <View style={styles.settingsList}>
        {settingsOptions.map((option, index) => (
          <View key={index} style={styles.settingOption}>
            <TouchableOpacity
              style={styles.settingContent}
              onPress={() => option.type === 'modal' && handleSettingPress(option.name)}>
              <View style={styles.iconContainer}>
                <AntDesign name={option.icon} size={24} color="#3498db" />
              </View>
              <Text style={styles.settingText}>{option.name}</Text>
            </TouchableOpacity>
            {option.type === 'toggle' && (
              <Switch
                value={isNotificationEnabled}
                onValueChange={setIsNotificationEnabled}
                thumbColor={isNotificationEnabled ? '#3498db' : '#ccc'}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
              />
            )}
          </View>
        ))}
      </View>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{modalContent}</Text>
            {modalContent === 'Account Settings' && (
              <View>
                <TextInput style={styles.input} placeholder="Username" placeholderTextColor="gray" />
                <TextInput style={styles.input} placeholder="Email" placeholderTextColor="gray" />
                <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                  <Text style={styles.buttonText}>Save Changes</Text>
                </TouchableOpacity>
              </View>
            )}
            {modalContent === 'Change Password' && (
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Current Password"
                  placeholderTextColor="gray"
                  secureTextEntry
                />
                <TextInput
                  style={styles.input}
                  placeholder="New Password"
                  placeholderTextColor="gray"
                  secureTextEntry
                />
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  placeholderTextColor="gray"
                  secureTextEntry
                />
                <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                  <Text style={styles.buttonText}>Change Password</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
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
  menuText: {
    color: 'white',
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
    marginBottom: 20,
  },
  privacyPolicyText: {
    fontSize: 16,
    lineHeight: 24,
    color: 'white',
    textAlign: 'left',
  },
  continueButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  settingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
    justifyContent: 'space-between',
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 15,
  },
  settingText: {
    fontSize: 18,
    color: 'white',
  },
  settingsList: {
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 10,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  saveButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default SettingsScreen;