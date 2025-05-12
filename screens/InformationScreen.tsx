import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const InformationScreen: React.FC = ({ navigation, route }) => {
  const { screenType } = route.params;
  const [heading, setHeading] = useState<any>();
  const [faqs, setFaqs] = useState<any[]>([
    {
      question: 'How much should I offer?',
      answer: 'Offer a fare that suits you and would be attractive for riders. Our fare is usually lower than average because riders pay lower service payments in the app. A minimum fare would be offered by the app depending on your location and destination, after you specify the destination, we may show a recommended fare for it.'
    },
    {
      question: 'What to do when I encounter toll routes?',
      answer: 'Toll roads are not included in the fare. Please be prepared to pay toll fees separately.'
    },
    {
      question: 'How do I change my information?',
      answer: 'To change your phone number; in the app click on "Settings" in the side menu then click on "Account settings" then click on "Phone Number".'
    },
    {
      question: 'How do I change my bank account?',
      answer: 'This works for users with card, online payment method available. In the side menu open Payment methods and upload new bank information.'
    },
    {
      question: 'I forgot my belongings in the vehicle, how do I retrieve it?',
      answer: 'If you forgot your belongings in the vehicle, Please call the rider immediately or you can kindly contact our Support team and provide information about your ride. Include the time and route of your ride, and if possible tell us the brand, colour, and registration plate of the vehicle. We\'ll help find your belongings. However, please note that we can’t guarantee it will be found.'
    },
    {
      question: 'How do I request for a door to door parcel delivery?',
      answer: 'In the bike/tricycle section you can book a ride by inputting your pick up location and destination, then select your agreed price; you can select one of the two types:\n- Tricycle — if you need an entire cabin or have larger parcels that can’t be carried out by a dispatch bike.\n- Bike— if you need door to door delivery.\nNOTE: Please select Courier or Freight in the side menu if you want to send a larger parcel within or outside the city.'
    },
    {
      question: 'Can I change fare during the ride?',
      answer: 'No, you can change the fare only while creating your ride request.'
    },
    {
      question: 'How do I share my route information?',
      answer: 'When the ride starts, click on the side menu over the map. Click on "Share my route information" and choose the contact you want to share this information with. They\'ll get a link that enables them to see your current location as well as your rider information and their car details.'
    },
    {
      question: 'How do I delete my account?',
      answer: 'In the side menu click on "Settings" and tap the "Delete account" button, confirm the deletion. If you have been blocked on the service or have any other unresolved issues related to your account, you need to resolve these pending issues before deleting your account. Our Support team will help you with this. You can\'t restore the deleted account, including your credit card information, any promotional codes, and wallet balance, although your data will be deleted we keep certain information such as invoices and payment information to comply with law as stated in privacy policy. NOTE: If you don’t have the option to delete your account in the app, please contact our support team.'
    },
    {
      question: 'How do I unblock my blocked account?',
      answer: 'Your account may be blocked:\n- if there have been multiple cancellation of orders\n- false or inappropriate ride requests: for example, with advertising or profanity\n- receive a lot of complaints from riders\n- violate privacy policy and Service standards\n- Using debit cards that have been stolen or lost\n- Using false email address\nWe\'ll send a notification in advance if your account is at risk of being blocked. It can be blocked for a certain period of time. In certain circumstances, a profile can be blocked permanently. Contact our support team via the App for clarification and assistance.'
    },
    {
      question: 'My desired city is not on the list',
      answer: 'Open the “Bike/Tricycle” tab in the fields \'pickup location\' or \'destination", start typing a city and select from the suggested list. Please check that the city is spelt correctly. If the city is not in the list, write to our Support team and specify:\n- Country\n- Area\n- Name of the city or other settlement\nWe\'ll process your request and let you know the status.'
    },
    {
      question: 'What do I do when I feel unsafe during the ride?',
      answer: 'If you feel uncomfortable or unsafe during the ride or need help, Click on the side menu, and do any of the following:\n- share your route details with friends or family\n- contact our Support team\n- call emergency services — police and ambulance\n- You can ask the rider to stop in a safe location so you can exit the vehicle. Always prioritize your safety, and report any concerning incidents to our Support service.'
    },
    {
      question: 'The rider suggested another price?',
      answer: 'Riders can always respond with an alternative fare. You can wait for another rider to agree to your terms or pick up an alternative offer.'
    },
    {
      question: 'My location on the map is incorrect.',
      answer: 'If your location in the app is incorrect:\n- In your phone settings turn off and turn on location.\n- Allow Nairide app to use your location.\n- Restart your phone.\n- Check if your location is correct in other map app such as Google Maps. If your location is incorrect in another app, please check your connection.'
    },
    {
      question: 'Do I pay extra for my luggage?',
      answer: 'User’s items or belongings can be carried in the trunk or passenger compartments of the car provided that the item passes freely, usually you don\'t need to pay for your luggage. You can describe your luggage in the rider request form “comments” to notify your rider about it in advance. If your luggage is oversized, you can use the "Freight" service in your location; create a request and transport any bulky or heavy luggage. NOTE: Nairide does not have additional fee for passenger luggage.'
    },
    {
      question: 'Riders don\'t accept my requests',
      answer: 'The fare you offer may not be attractive enough for the riders or there are no available riders nearby due to location or rush hour. Try raising your fare price or editing your options and comments to find a rider.'
    },
    {
      question: 'How to contact the rider',
      answer: 'After you accept the rider’s offer, you can contact your rider:\n- Tap the “comment” button to chat with your rider.\n- Tap the “call” button to call your rider.'
    },
    {
      question: 'The rider requested for more money, what do I do?',
      answer: 'Riders can\'t ask for more money outside the app. If you want to cancel this order, please choose the applicable cancellation reason. If this situation occurred after the ride is completed, pay the fare amount from the app. If you believe the charge is incorrect, please get in touch with our support team via the App. NOTE: If you have been charged more than the order price stated in your invoice, it may be due to a debt for a ride. This can happen if we cannot collect payment from your card, please check your “request history “on the side menu and check your bank account. Contact our support team via the App for clarification and assistance.'
    },
    {
      question: 'Verification issues',
      answer: 'To resolve this, tap the verification banner and follow the in-app instructions. You can also contact our support team via the App.'
    },
    {
      question: 'My rider was rude or my rider’s vehicle was in poor condition',
      answer: 'Thank you for reporting this to us and we are sorry to hear this. We promise to take necessary actions as we strive to provide comfortable and quality rides. Please reach out to our support team and let us know what was wrong.'
    },
    {
      question: 'Can I cancel my order?',
      answer: 'Before accepting an offer, you can cancel your ride request anytime. After accepting an offer, please don\'t cancel accepted orders too often. The rider may already be on the way, frequent cancellations will result in a lowered rating and temporary account blocking. If you have to cancel the order, please choose the correct cancellation reason or choose \'other reason\' and tell us more. For more information, please see our privacy policy and service standard.'
    },
    {
      question: 'How to select the request form from one city to another?',
      answer: 'In the request form, you can select one of the two types:\n- Within the city — if you need a ride within your city\n- City to city ride — if you need a ride outside your city\nPlease select Couriers in the side menu if you want to send a package within one city or another.'
    },
    {
      question: 'How do I book a scheduled ride?',
      answer: 'On the side menu, click on the "Taxi" icon. Fill in the “departure date” and “schedule pick up time”. Fill in the “pick up location” and “destination” and find rider. Wait for offers from riders and accept a suitable one. Call the rider to confirm the order. After the order is completed, rate your rider.'
    },
    {
      question: 'How to cancel an accepted order or a scheduled trip',
      answer: 'If your plans have changed, please let the rider know and tap the “cancel the ride” button.'
    },
    {
      question: 'How to change the destination',
      answer: 'You and your rider can edit destination at any moment before the rider confirms the end of the trip. You can do this from your App by clicking on the destination address. Change the address by selecting one of the suggested addresses or by manually typing it in and confirm the changes. NOTE: Please keep in mind that after changing the destination, the final price may be different from the upfront or estimated price that was shown when the ride request was made. If you change the final destination of a multiple destinations trip, the remaining stops will be removed.'
    },
    {
      question: 'My account has been compromised',
      answer: 'If you suspect someone has gained access to your account or unrecognized activities such as Order requests you didn’t make, Receipt(s) for orders you don’t recognize, Changes to your personal information you didn’t make, please contact your bank to block your card immediately to prevent further unauthorized use and contact our support team for further assistance and advice.'
    },
    {
      question: 'Pick up is longer',
      answer: 'We are sorry for the inconveniences; there may not be enough available riders nearby due to location, rush hour or traffic conditions. If you wish to provide feedback, please contact our support team to assist you better'
    }
  ]);

  useEffect(() => {
    console.log("screenType =>", screenType);
    if(screenType === 'Safety'){
        setHeading("Safety");
    } else if(screenType === 'FAQ'){
        setHeading("FAQ");
    } else if(screenType === 'Support'){
        setHeading("Support");
    } else if(screenType === 'Help'){
        setHeading("Help")
    }
  },[screenType])

  const renderSafetyTip = (tip: string) => (
    <View style={styles.safetyTipContainer}>
      <AntDesign name="checkcircle" size={20} color="#2ECC71" style={styles.safetyTipIcon} />
      <Text style={styles.safetyTipText}>{tip}</Text>
    </View>
  );

  const renderSupport = () => (
    <View>
      <Text style={styles.supportTitle}>Contact Our Support Team</Text>
      <Text style={styles.supportText}>Email: support@yourapp.com</Text>
      <Text style={styles.supportText}>Phone: +1 (555) 555-5555</Text>
    </View>
  );


  const renderHelp = () => {
    
  }

  const renderSafetySection = () => (
    <View>
      <Text style={styles.safetySectionTitle}>Safety Tips</Text>
      <View style={styles.safetyTipList}>
        {safetyTips.map(renderSafetyTip)}
      </View>
      <Text style={styles.safetySectionTitle}>Additional Safety Features</Text>
      <Text style={styles.safetyFeatureText}>{safetyFeatures.join('\n')}</Text>
    </View>
  );

  const safetyTips = [
    'Verify driver information: Photo, name, and license plate match the app.',
    'Share your ride details: Let someone know where you\'re going and who you\'re riding with (share driver info and ETA).',
    'Choose a well-lit location: Wait for pickup in a well-lit and populated area.',
    'Lock the doors: Once you\'re in the car, verify the doors are locked.',
    'Keep your seatbelt fastened: Buckle up for your safety throughout the ride.',
    'Know your location: Use the app to track your ride progress and be aware of your surroundings.',
    'Trust your instincts: If you feel unsafe, ask the driver to pull over and contact support or emergency services.',
  ];

  const safetyFeatures = [
    'Two-way communication: Contact your driver directly through the app.',
    'Real-time trip tracking: Share your ride details and track your progress in real time.',
    'Emergency button: Connect directly to emergency services if you feel unsafe.',
    'Ride history: Access information on past rides and driver details.',
    'Driver screening: Drivers undergo background checks and safety training before joining the platform.',
  ];

  const toggleExpand = (index: number) => {
    setFaqs(faqs.map((faq, i) => i === index ? { ...faq, expanded: !faq.expanded } : faq));
  };

  const renderFaq = (faq: { question: string; answer: string, expanded: boolean }, index: number) => (
    <View key={faq.question} style={styles.faqItem}>
      <TouchableOpacity style={styles.faqQuestion} onPress={() => toggleExpand(index)}>
        <Text style={styles.faqQuestionText}>{faq.question}</Text>
        <AntDesign name={faq.expanded ? "up" : "down"} size={18} color="white" />
      </TouchableOpacity>
      {faq.expanded && <Text style={styles.faqAnswer}>{faq.answer}</Text>}
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.openDrawer()}>
        <AntDesign name="menufold" size={25} color={'white'} />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>{heading ? heading : ''}</Text>

      <ScrollView style={styles.scrollView}>
        {screenType === 'Safety' && renderSafetySection()}
        {screenType === 'FAQ' && faqs.map(renderFaq)}
        {screenType === 'Support' && renderSupport()}
        {/* {screenType === 'Help' && renderHelp()} */}
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#061628', // Adjust background color as needed
  },
  menuIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1, // Ensure menu icon appears on top of other elements
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
  faqItem: {
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#293747', // Adjust background color for FAQ items
    borderRadius: 5,
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestionText: {
    fontSize: 16,
    color: 'white',
  },
  faqAnswer: {
    marginTop: 5,
    fontSize: 14,
    color: '#ddd', // Adjust text color for answers
  },
  noFaqText: {
    fontSize: 16,
    color: '#ddd',
    textAlign: 'center',
  },
  safetySectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  safetyTipList: {
    marginBottom: 20,
  },
  safetyTipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  safetyTipIcon: {
    marginRight: 10,
  },
  safetyTipText: {
    fontSize: 16,
    color: 'white',
  },
  safetyFeatureText: {
    fontSize: 14,
    color: '#ddd', // Adjust text color for features
  },
  supportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
    textAlign: 'center',
    marginTop: '10%'
  },
  supportText: {
    fontSize: 16,
    color: '#ddd', // Adjust text color for support information
    marginBottom: 5,
    textAlign: 'center',
  },
});

export default InformationScreen;