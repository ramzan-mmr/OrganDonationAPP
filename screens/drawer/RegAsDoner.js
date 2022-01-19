import React, { useState, useContext, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

//Screens 
import Welcome from './../Welcome';

// formik
import { Formik } from 'formik';

import {
  DonarStyledContainer,
  PageTitle,
  StyledInputLabel,
  StyledFormArea,
  StyledButton,
  StyledTextInput,
  LeftIcon,
  RightIcon,
  InnerContainer,
  ButtonText,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
  SubTitle,
  Colors,
} from './../../components/styles';
import { View, TouchableOpacity, ActivityIndicator, Modal, StyleSheet, Text } from 'react-native';

//colors
const { darkLight, brand, primary, secondary, tertiary } = Colors;

// icon
import { Octicons, Ionicons } from '@expo/vector-icons';

// Datetimepicker
import DateTimePicker from '@react-native-community/datetimepicker';

// keyboard avoiding view
import KeyboardAvoidingWrapper from './../../components/KeyboardAvoidingWrapper';

// api client
import axios from 'axios';

// Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// credentials context
import { CredentialsContext } from './../../components/CredentialsContext';

// Picker 
import { Picker } from '@react-native-picker/picker';

function RegAsDoner({ navigation }) {
  const [hidePassword, setHidePassword] = useState(true);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(2000, 0, 1));
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [pickerValue, setPickerValue] = useState("");
  const [organ, setOrgan] = useState([]);

  //Actual Id of current user login
  const [id, setid] = useState("");
  // Actual value to be sent
  const [dob, setDob] = useState();

  // credentials context
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setDob(currentDate);
  };

  const showDatePicker = () => {
    setShow('date');
  };

  //Get all DropdownData API
  useEffect(() => {
    GettAllOrganForDropdown();
  }, [])
  const GettAllOrganForDropdown = () => {
    const url = 'https://mydonatmeapi.herokuapp.com/dropdownOrgan';
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
  }
  // Form handling API
  const handleSignup = (credentials, setSubmitting) => {
    handleMessage(null);
    const url = 'https://mydonatmeapi.herokuapp.com/Donars';
    axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data;
        const { status, message, data } = result;

        if (status !== 'SUCCESS') {
          handleMessage(message, status);
        } else {
          alert("Donar Registration Successfully")
          // persistLogin({ ...data }, message, status);
          setPickerValue("")
        }
        setSubmitting(false);
      })
      .catch((error) => {
        setSubmitting(false);
        handleMessage('An error occurred. Check your network and try again');
        console.log(error.toJSON());
      });
  };

  const handleMessage = (message, type = '') => {
    setMessage(message);
    setMessageType(type);
  };

  // Persisting login after signup
  const persistLogin = (credentials, message, status) => {
    AsyncStorage.setItem('flowerCribCredentials', JSON.stringify(credentials))
      .then(() => {
        handleMessage(message, status);
        // setTimeout(() => navigation.navigate('Welcome', credentials), 1000);
        setStoredCredentials(credentials);
      })
      .catch((error) => {
        handleMessage('Persisting login failed');
        console.log(error)
      });
  };

  // Get current user id
  const { data } = storedCredentials;
  useEffect(() => {
    if (data) {
      const { _id } = data;
      setid(_id);
    }
  })

  function DropDownPicker() {
    return (
      <View>
        <Picker
          style={{borderRadius:20,backgroundColor: secondary, height: 60,marginBottom: 10,marginVertical: 3}}
          selectedValue={pickerValue}
          onValueChange={(itemValue) => setPickerValue(itemValue)}
        >
          <Picker.Item label="Please select organ" value="" />
          {organ.map((item, index) => {
            return (<Picker.Item label={item.organName} value={item.organName} key={index} />)
          })}
        </Picker>
      </View>
    );
  }

  return (
    <KeyboardAvoidingWrapper>
      <DonarStyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChange}
              style={{
                backgroundColor: 'yellow',
              }}
            />
          )}

          <Formik
            initialValues={{ donarID: '', name: '', cnic: '', dateOfBirth: '', organ: '', phoneNo: '', address: '', description: '' }}
            onSubmit={(values, { setSubmitting }) => {
              values = { ...values, dateOfBirth: dob, organ: pickerValue, donarID: id };
              if (
                values.donarID == '' ||
                values.name == '' ||
                values.cnic == '' ||
                values.phoneNo == '' ||
                values.dateOfBirth == '' ||
                values.organ == '' ||
                values.address == ''
              ) {
                handleMessage('Please fill in all fields');
                setSubmitting(false);
              } else {
                handleSignup(values, setSubmitting);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
              <StyledFormArea>
                <MyTextInput
                  label="Full Name"
                  placeholder="Muhammad Ramzan"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  icon="person"
                />
                <MyTextInput
                  label="CNIC"
                  placeholder="00000-0000000-0"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('cnic')}
                  onBlur={handleBlur('cnic')}
                  value={values.cnic}
                  icon="person"
                />
                <MyTextInput
                  label="Date of Birth"
                  placeholder="YYYY - MM - DD"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('dateOfBirth')}
                  onBlur={handleBlur('dateOfBirth')}
                  value={dob ? dob.toDateString() : ''}
                  icon="calendar"
                  editable={false}
                  isDate={true}
                  showDatePicker={showDatePicker}
                />
                {/* <MyTextInput
                  label="Body Part"
                  placeholder="Select Organ"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('organ')}
                  onBlur={handleBlur('organ')}
                  value={values.organ}
                  icon="person"
                /> */}
                <StyledInputLabel>Select Organ</StyledInputLabel>
                <DropDownPicker />

                <MyTextInput
                  label="Phone No"
                  placeholder="92+ 3048796558"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('phoneNo')}
                  onBlur={handleBlur('phoneNo')}
                  value={values.phoneNo}
                  icon="mail"
                />
                <MyTextInput
                  label="Address"
                  placeholder="Your permanent address"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                  value={values.address}
                  icon="mail"
                />
                <MyTextInput
                  label="description"
                  placeholder="Your description in Detail"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  value={values.description}
                  style={{ height: 120 }}
                  multiline={true}
                  numberOfLines={4}
                />
                <MsgBox type={messageType}>{message}</MsgBox>

                {!isSubmitting && (
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>Registration</ButtonText>
                  </StyledButton>
                )}
                {isSubmitting && (
                  <StyledButton disabled={true}>
                    <ActivityIndicator size="large" color={primary} />
                  </StyledButton>
                )}

                <Line />
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </DonarStyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

const MyTextInput = ({ label, icon, isDate, showDatePicker, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>

      {isDate && (
        <TouchableOpacity onPress={showDatePicker}>
          <StyledTextInput {...props} />
        </TouchableOpacity>
      )}
      {!isDate && <StyledTextInput {...props} />}
    </View>
  );
}

const styles = StyleSheet.create({

})

export default RegAsDoner;
