import React, { useState } from "react";
import { TouchableOpacity, Image, ScrollView,Modal, StyleSheet, View, Text,SafeAreaView, Alert } from "react-native";
import { RadioButton } from 'react-native-paper';
import * as firebase from 'firebase';
import db from '../config';

function ServiceDetail({route}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [checked, setChecked] = React.useState('first');

    const Booking_Time = route.params.details.Booking_Time;
    const CategoryName= route.params.details.CategoryName;
    const BookingAddress= route.params.details.BookingAddress;
    const BookingArea= route.params.details.BookingArea;
    const BookingCity= route.params.details.BookingCity;
    const BookingPincode= route.params.details.BookingPincode;
    const SlotTime= route.params.details.SlotTime;
    const SlotDate = route.params.details.SlotDate;
    const ConsumerName = route.params.details.ConsumerName;
    const Booking_id =route.params.details.Booking_id;
    const Consumer_id = route.params.details.Consumer_id;
    const email=firebase.auth().currentUser.email;

  const jobStatus = ()=>{
    db.collection("booking").doc(Consumer_id).collection(Consumer_id).doc(Booking_id).update({
      jobStatus:"accepted"
    })  
    Alert.alert("Job Status Updated");
  }

  const jobCancel =()=>{
    db.collection("booking").doc(Consumer_id).collection(Consumer_id).doc(Booking_id).update({
      jobStatus:'cancelled',
      rejectionReason:checked,
      rejected_by:email
    })
    setModalVisible(!modalVisible);
    Alert.alert("Job Cancelled");
  }

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollView}>
      <View style={styles.servicedetailbox}>
        <View style={styles.bordersheet} >
        <Text style={styles.serviceDetail}>Service Details</Text>
        </View>
        <View style={styles.bordersheet} >
        <Text style={styles.bookingAmount}>Booking Amount</Text>
        <Text style={styles.bookingAmountnum}>300</Text>
        <Text style={styles.bookingAmount}>Booking Time</Text>
        <Text style={styles.bookingAmountnum}>{Booking_Time}</Text>
        </View>
        <View style={styles.bordersheet} >
        <Text style={styles.dateTime}>Date &amp; Time</Text>
        </View>
        <View style={styles.bordersheet} >
        <Text style={styles.bookingTime}>Slot Time</Text>
        <Text style={styles.Date}>{SlotDate} between {SlotTime}</Text>
        </View>
        <View style={styles.bordersheet} >
        <Text style={styles.clientDetails}>Client Details</Text>
        </View>
        <View style={styles.bordersheet} >      
        <Text style={styles.Name}>Name</Text>
        <Text style={styles.NameDetail}>{ConsumerName}</Text>
        
        <Text style={styles.Category}>Category</Text>
        <Text style={styles.Categorytype}> {CategoryName}</Text>
        </View>
        <View style={styles.bordersheet} >
        <Text style={styles.customerLocation}>Customer Location</Text>
        </View>        
        <View style={styles.bordersheet} >
        <Text style={styles.LocationArea}>{BookingAddress}</Text>
        <Text style={styles.LocationArea}>{BookingArea}</Text>
        <Text style={styles.LocationState}>{BookingCity} {BookingPincode}</Text></View>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <View style={{marginLeft:55}}>
            <Text style={styles.modalText}>Please tell us Your Reason</Text></View>
            <View>
            <RadioButton
        value="Customer Rescheduled"
        status={ checked === 'Customer Reschedule' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('Customer Reschedule')}
      /><Text style={{marginLeft:50, marginTop:-27, marginBottom:7}}>Customer Rescheduled</Text>
      <RadioButton
        value="Customer Cancelled"
        status={ checked === 'Customer Cancelled' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('Customer Cancelled')}
      /><Text style={{marginLeft:50, marginTop:-27, marginBottom:7}}>Customer Cancelled</Text>
      <RadioButton
        value="Cannot Deliver"
        status={ checked === 'Cannot Deliver' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('Cannot Deliver')}
      /><Text style={{marginLeft:50, marginTop:-27, marginBottom:7}}>Can't Deliver</Text>
      </View>
      <TouchableOpacity style={styles.buttonClose} onPress={() => jobCancel()}>
          <Text style={styles.respond2}
              >Respond</Text>
        </TouchableOpacity>
          </View>
        </View>
      </Modal>
      </View>
      <View style={{marginBottom:15,width:'100%'}}> 
      <TouchableOpacity style={styles.marginbutton} onPress={() => setModalVisible(true)}>
          <Text style={styles.respond} >Reject Job </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.marginbutton2} onPress={() => jobStatus()}>
          <Text style={styles.respond1} >Accept Job</Text>
        </TouchableOpacity></View>
       </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    width:'100%',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
      width:332,
      height:284,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },  
  buttonClose: {
    borderRadius: 20,
    padding: 10,
    marginTop:20,
    marginLeft:25,
    width: 222,
    height: 48,
    backgroundColor: "#C4C4C4",
     },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 18,
    fontWeight:'bold',

  },
  servicedetailbox: {
    width: '100%',
    height: 666,
    backgroundColor: "rgba(255,255,255,1)",
    marginTop: 5
  },
  serviceDetail: {
    color: "#121212",
    height: 27,
    width: "90%",
    fontSize: 18,
    marginTop: 3,
    marginLeft: 21,
    marginBottom:5,
    fontWeight:'bold',

  },
  bordersheet:{
    borderBottomColor:'#000000',
        borderBottomWidth:.8,
        marginBottom:10,
        },
  bookingAmount: {
    color: "#121212",
    height: 27,
    width: 150,
    fontSize: 18,
    marginTop: 5,
    marginLeft: 21,
  },
  bookingAmountnum: {
    color: "#121212",
    height: 27,
    width: '90%',
    fontSize: 18,
    marginTop: 5,
    marginLeft: 21,    
    marginBottom:5,
  
  },
  dateTime: {
    color: "#121212",
    width: 250,
    height: 27,
    fontSize: 18,
    marginLeft: 21,
    fontWeight:'bold',
    marginBottom:5,
  },
  bookingTime: {
    color: "#121212",
    height: 27,
    width: 140,
    fontSize: 18,
    marginLeft: 21,
    marginBottom:5,
  },
  Date: {
    color: "#121212",
    width: 250,
    fontSize: 18,
    marginLeft: 23,
    marginBottom:5,
  },
  time: {
    color: "#121212",
    width: 120,
    fontSize: 18,
    marginLeft: 23,
    marginBottom:5,
  },
  clientDetails: {
    color: "#121212",
    height: 27,
    width: 130,
    fontSize: 18,
    marginLeft: 21,
    marginBottom:5,
    fontWeight:'bold',
  },
  Name: {
    color: "#121212",
    width: 229,
    fontSize: 18,
    marginLeft: 22,
    marginBottom:5,
  },
  NameDetail: {
    color: "#121212",
    width: 229,
    fontSize: 18,
    marginLeft: 22,
    marginBottom:10,
  },
  Category: {
    color: "#121212",
    width: 180,
    fontSize: 18,
    marginLeft: 23,
    marginBottom:5,
  },
  Categorytype:{
    color: "#121212",
    width: 180,
    fontSize: 18,
    marginLeft: 20,
    marginBottom:5,
  },
  customerLocation: {
    color: "#121212",
    width: 172,
    fontSize: 18,
    marginLeft: 21,
    fontWeight:'bold',
    marginBottom:5,
  },
  LocationArea: {
    color: "#121212",
    width: 180,
    fontSize: 18,
    marginLeft: 22,
    
  },
  LocationState: {
    color: "#121212",
    width: 180,
    fontSize: 18,
    marginLeft: 22,
    marginBottom:5,
  },
  marginbutton: {
    width: 170,
    height: 48,
    backgroundColor: "#C4C4C4",
    borderRadius: 100,
    marginTop: 10,
    marginLeft: 23,
  },
  marginbutton2: {
    width: 170,
    height: 48,
    backgroundColor: "#C4C4C4",
    borderRadius: 100,
    marginTop:-47,
    marginLeft: 210,
  },
  respond: {
    color: "#FFFFFF",
    fontWeight:'bold',
    width: 122,
    fontSize: 18,
    marginTop: 12,
    margin:30
  },
  respond1: {
    color: "#FFFFFF",
    fontWeight:'bold',
    width: 122,
    fontSize: 18,
    marginTop: 12,
    margin:50
  },
  respond2:{
    color: "#FFFFFF",
    fontWeight:'bold',
    height: 20,
    width: 102,
    fontSize: 16,
    marginLeft: 67
  }
});

export default ServiceDetail;
