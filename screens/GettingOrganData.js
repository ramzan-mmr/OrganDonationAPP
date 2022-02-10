import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { ListItem, Avatar, Badge, Overlay, secondary } from "react-native-elements";
import {
  ButtonText,
  CardText,
  Colors, Line, StyledButton, VerticalLine
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
  const [status, setstatus] = useState(false);
  const credentials = {
    "organName": organName
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
          setstatus(true)
          console.log(data)
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
    <ScrollView style={{ backgroundColor: "#ffffff" }}>
      <View style={styles.container}>
        {
          data.map((l, i) => (
            <ListItem key={i}
              bottomDivider
              Component={TouchableOpacity}
              style={{
                paddingLeft: 5,
                paddingRight: 5,
              }}
              onPress={() => toggleOverlay(setOverlay(l))}
            >
              <View style={styles.Box}>
                <View style={styles.inerBox}>
                  <View style={styles.inerBoxHeader}>
                    <View style={{ marginEnd: 20 }}>
                      <Avatar source={require("./../assets/img/expo-bg1.png")} />
                    </View>
                    <Text style={styles.title}>{l.PatName}</Text>
                  </View>
                  <View style={styles.cardfooter}>
                    <View>
                      <Text style={styles.subtitle}>Organ</Text>
                      <Text>{l.PatRequired}</Text>
                    </View>
                    <VerticalLine />
                    <View>
                      <Text style={styles.subtitle}>Age</Text>
                      <Text>{l.Age}</Text>
                    </View>
                    <VerticalLine />
                    <View>
                      <Text style={styles.subtitle}>Status</Text>
                      {l.Status === "Requested" && (
                        <Text style={{ color: "#ffc107" }}>Active</Text>
                      )}
                      {l.Status === "Completed" && (
                        <Text style={{ color: "#3ea175" }}>Complete</Text>
                      )}
                    </View>
                    <ListItem.Chevron color="black" />
                  </View>
                </View>
              </View>
            </ListItem>
          ))
        }
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <View style={styles.overlay}>
            <View style={styles.Box}>
              <View style={styles.inerBoxforOverlay}>
                <View style={styles.inerBoxHeader}>
                  <View style={{ marginEnd: 20 }}>
                    <Avatar source={require("./../assets/img/expo-bg1.png")} />
                  </View>
                  <Text style={styles.title}>{overlay.PatName}</Text>
                </View>
                <View style={styles.cardfooter}>
                  <View>
                    <Text style={styles.subtitle}>Organ</Text>
                    <Text>{overlay.PatRequired}</Text>
                  </View>
                  <VerticalLine />
                  <View>
                    <Text style={styles.subtitle}>Age</Text>
                    <Text>{overlay.Age}</Text>
                  </View>
                  <VerticalLine />
                  <View>
                    <Text style={styles.subtitle}>Status</Text>
                    {overlay.Status === "Requested" && (
                      <Text style={{ color: "#ffc107" }}>Active</Text>
                    )}
                    {overlay.Status === "Completed" && (
                      <Text style={{ color: "#3ea175" }}>Complete</Text>
                    )}
                  </View>
                  <ListItem.Chevron color="black" />
                </View>
                <Line />
                <View>
                  <Text style={styles.subtitle}>Description</Text>
                  <TextInput style={{ maxWidth: '90%' }}>{overlay.Description}</TextInput>
                </View>
                <View style={{marginTop:40}}>
                  <StyledButton onPress={()=>navigation.navigate("RegisAsDoner")}>
                    <ButtonText>Become Donar</ButtonText>
                  </StyledButton>
                </View>
              </View>
            </View>
          </View>
        </Overlay>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    minWidth: "90%",
    height: "50%",
  },
  Box: {
    width: '100%',
    height: 160,
    borderRadius: 10,
    paddingVertical: 10
  },
  inerBox: {
    flex: 1,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 5,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingBottom: 5
  },
  cardfooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  inerBoxHeader: {
    flexDirection: 'row',
  },
  cardfooterdata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5
  },
  inerBoxforOverlay: {
    flex: 1,
    padding: 15,
    marginTop:30
  }
});

export default GettingOrganData