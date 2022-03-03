import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";
import { Formik } from 'formik';
import axios from "axios";
import { ListItem, Avatar, Badge, Overlay, SearchBar } from "react-native-elements";
// icon
import { Octicons, Ionicons } from '@expo/vector-icons';
import {

  StyledInputLabel,
  StyledTextInput,
  LeftIcon,
  MsgBox,
  Colors,
  OrganHeading,
  OrganHeadingText,
} from "../../components/styles";
const { secondary, darkLight, brand } = Colors;
const Search = () => {
  const [overlay, setOverlay] = useState([]);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [data, setData] = useState([]);
  const [FilterData, setFilterData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState();
  // const updateSearch = (search) => {
  //   setSearch({ search });
  // };

  //fatching data 
  useEffect(() => {
    setIsLoading(true)
    DoctorAndHospital();
  }, [])

  //get all doctors 
  const DoctorAndHospital = () => {
    const url = 'https://mydonatmeapi.herokuapp.com/DoctorAndHospital';
    axios
      .get(url)
      .then(function (response) {
        const result = response.data;
        const { status, message, data } = result;
        console.log(message)
        if (status !== 'SUCCESS') {
          console.log(message)
        } else {
          setData(data)
          setFilterData(data)
        }
      })
      .catch((error) => {
        console.log(error.response.message)
      })
      .finally(() => setIsLoading(false));
  }

  const handleMessage = (message, type = '') => {
    setMessage(message);
    setMessageType(type);
  };

  const searchFilterFunction = (value) => {
    if (value) {
      const newData = data.filter(
        function (item) {
          const itemData = item.Name
            ? item.Name.toUpperCase()
            : ''.toUpperCase();
          const textData = value.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      );
      setFilterData(newData);
      setSearch(value)
    } else {
      setFilterData(data);
    }
  };

  const toggleOverlay = (l) => {
    setVisible(!visible);
  };
  return (
    <KeyboardAvoidingWrapper>
      <View>
        <SearchBar
          inputStyle={{ backgroundColor: 'white' }}
          containerStyle={{ backgroundColor: 'white', borderWidth: 1, borderRadius: 5 }}
          inputContainerStyle={{ backgroundColor: 'white' }}
          placeholder="Tap to search..."
          onChangeText={(value) => { setSearch(value), searchFilterFunction(value) }}
          value={search}
        />
        {(
          FilterData.map((l, i) => (
            <ListItem key={i}
              bottomDivider
              Component={TouchableOpacity}
              style={{
                paddingLeft: 10,
                paddingRight: 10
              }}
              onPress={() => toggleOverlay(setOverlay(l))}
            >
              <Avatar source={require("./../../assets/profile.png")} />
              <ListItem.Content >
                <ListItem.Title>{l.Name}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron color="black" />
            </ListItem>
          ))
        )}
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <Text style={{ alignSelf: "center", fontSize: 20 }}>{overlay.Name}</Text>
          <View style={styles.overlay}>
            <Text>Name: {overlay.Location}</Text>
            <Text>Description: {overlay.HospDis}</Text>
          </View>
        </Overlay>
      </View>
    </KeyboardAvoidingWrapper>

  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  searchInput: {
    backgroundColor: secondary,
    height: 60,
    marginBottom: 10,
    marginVertical: 3
  },
  overlay: {
    width: 250,
    height: 300,
    padding: 20,
  }
});

export default Search;