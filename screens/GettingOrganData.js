import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { ListItem, Avatar, Badge, Overlay } from "react-native-elements";
import {
  Colors
} from './../components/styles';
const { primary } = Colors
import axios from "axios";

const Item = ({ organName }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{organName}</Text>
  </View>
);
const GettingOrganData = ({ route, navigation }) => {
  const { organName } = route.params;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [overlay, setOverlay] = useState([]);
  const credentials = {
    "organName":organName
  }
  useEffect(() => {
    setIsLoading(true)
    getAllRecord();
  }, [])

  const getAllRecord = () => {
    const url = 'https://mydonatmeapi.herokuapp.com/DonarsRecod';
    axios
      .post(url, credentials)
      .then(function (response) {
        const result = response.data;
        const { status, message, data } = result;
        console.log(message)
        if (status !== 'SUCCESS') {
          console.log(message)
        } else {
          setData(data)
        }
      })
      .catch((error) => {
        console.log(error.response.message)
      })
      .finally(() => setIsLoading(false));
  }

  const toggleOverlay = (l) => {
    setVisible(!visible);
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        {
          data.map((l, i) => (
            <ListItem key={i}
              bottomDivider
              Component={TouchableOpacity}
              style={{
                paddingLeft: 10,
                paddingRight: 10
              }}
              onPress={() => toggleOverlay(setOverlay(l))}
            >
              <Avatar source={require("./../assets/img/expo-bg1.png")} />
              <ListItem.Content >
                <ListItem.Title>{l.name}</ListItem.Title>
                <ListItem.Subtitle>{l.phoneNo}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron color="black" />
            </ListItem>
          ))
        }
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <Text style={{ alignSelf: "center", fontSize: 20 }}>{overlay.organ}</Text>
          <View style={styles.overlay}>
            <Text>Name: {overlay.name}</Text>
            <Text>PhoneNo: {overlay.phoneNo}</Text>
            <Text>Address: {overlay.address}</Text>
            <Text>Description: {overlay.description}</Text>
          </View>
        </Overlay>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primary,
  },
  overlay: {
    width: 250,
    height: 300,
    padding: 20,
  }
});

export default GettingOrganData