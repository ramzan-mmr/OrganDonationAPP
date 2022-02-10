import React, { Component, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image, SafeAreaView, Title } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CredentialsContext } from '../../components/CredentialsContext';
// keyboard avoiding view
import KeyboardAvoidingWrapper from './../../components/KeyboardAvoidingWrapper';
//styles
import { Avatar, ButtonText, CardStyle, Colors, DonarStyledContainer, Line, StyledButton, StyledFormArea, VerticalLine } from '../../components/styles';
//Icon
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fonts } from 'react-native-elements/dist/config';
import axios from 'axios';
const { primary, darkLight } = Colors;
function Profile() {
  // const { name, email, photoUrl } = storedCredentials;
  // const AvatarImg = photoUrl ? { uri: photoUrl } : require('./../../assets/img/Logo.png');
  // const UserName = name ? {name} : FirstName + LastName;
  // const UserEmail = email ? {email} : Email;  
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const { data, photoUrl } = storedCredentials;
  const AvatarImg = photoUrl ? { uri: photoUrl } : require('./../../assets/img/organlogo.jpg');
  const [Donar, setDonar] = useState("")
  const [status, setstatus] = useState(false);
  const [ID, setID] = useState(data._id)

  useEffect(() => {
    if (data) {
      // console.log(data)
      const { FirstName, LastName, Email, Phone_No } = data;
      setFirstName(FirstName);
      setLastName(LastName);
      setEmail(Email);
    }
    else if (!data) {
      const { name, email, photoUrl } = storedCredentials;
      setFirstName(name)
      setEmail(email)
    }
  })
  //For Logout
  const clearLogin = () => {
    AsyncStorage.removeItem('flowerCribCredentials')
      .then(() => {
        setStoredCredentials("");
      })
      .catch((error) => console.log(error));
  };
  const getDonarRegistration = () => {
    const url = `http://mydonatmeapi.herokuapp.com/GetDonarData/${ID}`;
    axios
      .get(url)
      .then(function (response) {
        const result = response.data;
        const { status, message, data } = result;
        if (status !== 'SUCCESS') {
          setstatus(false)
        } else {
          setDonar(...data)
          setstatus(true)
        }
      })
      .catch((error) => {
        console.log(error.response.message)
      })
  }
  useEffect(() => {
    getDonarRegistration()
  }, [])
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 30, paddingBottom: 10 }}>
            <View>
              <Avatar source={AvatarImg} />
            </View>
            <View style={{ marginLeft: 15 }}><Text style={styles.fullname}>{FirstName + " " + LastName}</Text></View>
          </View>
          <View style={styles.userInfoSection}>
            <View style={styles.row}>
              <Icon name="map-marker-radius" color="#777777" size={25} />
              <Text style={{ color: "black", marginLeft: 20 }}>Karachi, Pakistan</Text>
            </View>
          </View>
          <View style={styles.userInfoSection}>
            <View style={styles.row}>
              <Icon name="phone" color="#777777" size={25} />
              <Text style={{ color: "black", marginLeft: 20 }}>+92 038745764736</Text>
            </View>
          </View>
          <View style={styles.userInfoSection}>
            <View style={styles.row}>
              <Icon name="email" color="#777777" size={25} />
              <Text style={{ color: "black", marginLeft: 20 }}>{Email}</Text>
            </View>
          </View>
        </View>
        {status && (
          <View style={styles.Box}>
            <View style={styles.inerBox}>
              <Text style={styles.title}>{Donar.name}</Text>
              <Text style={{ paddingTop: 5 }}>{Donar.organ}</Text>
              <View style={styles.cardfooter}>
                <View>
                  <Text style={styles.subtitle}>Organ</Text>
                  <Text>{Donar.organ}</Text>
                </View>
                <VerticalLine />
                <View>
                <Text style={styles.subtitle}>Age</Text>
                  <Text>{Donar.Age}</Text>
                </View>
                <VerticalLine />
                <View>
                <Text style={styles.subtitle}>IsSelect</Text>
                  {!Donar.IsSelect &&(
                    <Text style={{ color: "#ffc107" }}>Pending</Text>
                  )}
                  {Donar.IsSelect &&(
                    <Text style={{ color: "#3ea175" }}>Selected</Text>
                  )}
                </View>
              </View>
            </View>
          </View>
        )}
        <View style={styles.logoutSection}>
          <StyledFormArea>
            <Line />
            <StyledButton onPress={clearLogin}>
              <ButtonText>Logout</ButtonText>
            </StyledButton>
          </StyledFormArea>
        </View>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primary,
  },
  innerContainer: {
    marginTop: 30,
    width: '100%'
  },
  fullname: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black'
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 5,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500'
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
  },
  menuWrapper: {
    marginTop: 10
  },
  logoutSection: {
    alignItems: 'center'
  },
  Box: {
    width: '100%',
    height: 160,
    padding: 10,
    borderRadius: 10,
  },
  inerBox: {
    flex: 1,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.27,
    elevation: 9,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 14,
    fontWeight:'bold',
    paddingBottom:5
  },
  cardfooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  cardfooterdata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5
  }

});

export default Profile;
