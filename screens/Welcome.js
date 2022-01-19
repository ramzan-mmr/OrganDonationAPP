import React, { useContext, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, ScrollView } from 'react-native';

import {
  Colors,
  Avatar,
  WelcomeImage,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButton,
  InnerContainer,
  WelcomeContainer,
  ButtonText,
  Line,
  WelcomeStyledContainer,
  MsgBox,
  OrganHeading,
  OrganHeadingText, CardImage, CardText, CardStyle
} from './../components/styles';


// keyboard avoiding view
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';

// Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// credentials context
import { CredentialsContext } from './../components/CredentialsContext';

//color 
const { primary, secondary } = Colors;

//screens 
import GettingOrganData from './GettingOrganData';
import axios from 'axios';


const Welcome = ({ navigation }) => {

  // const { name, email, photoUrl } = route.params.storedCredentials ? route.params.storedCredentials : route.params;

  // credentials context
  {/*const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

  const { name, email, photoUrl } = storedCredentials;

  const AvatarImg = photoUrl
    ? {
      uri: photoUrl,
    }
    : require('./../assets/img/expo-bg1.png');
 */}
  //  const clearLogin = () => {
  //   AsyncStorage.removeItem('flowerCribCredentials')
  //     .then(() => {
  //       setStoredCredentials("");
  //     })
  //     .catch((error) => console.log(error));
  // };
  const [organ, setOrgan] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true)
    getAllOrgan();
  }, [])

  const getAllOrgan = () => {
    const url = 'http://mydonatmeapi.herokuapp.com/Organ';
    axios
      .get(url)
      .then(function (response) {
        const result = response.data;
        const { status, message, data } = result;
        console.log(message)
        if (status !== 'SUCCESS') {
          console.log(message)
        } else {
          setOrgan(data)
        }
      })
      .catch((error) => {
        console.log(error.response.message)
      })
      .finally(() => setIsLoading(false));
  }

  const renderItem = ({ item }) => {
    const avatar = item.avatar
    return (
      <View style={styles.Box}>
        <View style={styles.inerBox}>
          <CardStyle onPress={() => navigation.navigate("GettingOrganData", { organName: item.organName })}>
            <CardImage source={{ uri: avatar }} />
            <CardText>{item.organName}</CardText>
          </CardStyle>
        </View>
      </View>
    )
  }
  return (
    
      <WelcomeStyledContainer>
        <StatusBar style="dark" />
        <OrganHeading>
          <OrganHeadingText>Donate Able Organ</OrganHeadingText>
        </OrganHeading>
        <View style={styles.container}>
          <FlatList
            data={organ}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </WelcomeStyledContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    paddingBottom:160
  },
  Box: {
    width: '50%',
    height: 200,
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
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default Welcome;
