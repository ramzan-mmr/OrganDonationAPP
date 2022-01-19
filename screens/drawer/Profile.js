import React, { Component, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image, SafeAreaView, Title } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CredentialsContext } from '../../components/CredentialsContext';
// keyboard avoiding view
import KeyboardAvoidingWrapper from './../../components/KeyboardAvoidingWrapper';
//styles
import { Avatar, ButtonText, Colors, Line, StyledButton, StyledFormArea } from '../../components/styles';
//Icon
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';
const { primary,darkLight } = Colors;
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
  useEffect(() => {
    if (data) {
      console.log(data)
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
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={{flexDirection:'row', alignItems:'center',paddingHorizontal:30,paddingBottom:10 }}>
            <View>
              <Avatar source={AvatarImg} />
            </View>
            <View style={{marginLeft:15}}><Text style={styles.fullname}>{FirstName + " " + LastName}</Text></View>
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
  fullname:{
    fontSize:17,
    fontWeight:'bold',
    color:'black'
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
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
  }

});

export default Profile;
