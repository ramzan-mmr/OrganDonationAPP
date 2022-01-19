import React, { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';

// formik
import { Formik } from 'formik';

import {
  StyledContainer,
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
} from './../components/styles';
import { View, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';

//colors
const { darkLight, brand, primary, secondary } = Colors;

// icon
import { Octicons, Ionicons } from '@expo/vector-icons';


// keyboard avoiding view
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';

// api client
import axios from 'axios';

// Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// credentials context
import { CredentialsContext } from './../components/CredentialsContext';

// Picker 
import { Picker } from '@react-native-picker/picker';

const Signup = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [pickerValue, setPickerValue] = useState("");

  // credentials context
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

  // Form handling
  const handleSignup = (credentials, setSubmitting) => {
    handleMessage(null);
    axios
      .post('http://mydonatmeapi.herokuapp.com/Users', credentials)
      .then((response) => {
        const result = response.data;
        const { status, message, data } = result;
        if (status !== 'SUCCESS') {
          handleMessage(message, status);
        } else {
          persistLogin({data}, message, status);
          setPickerValue("")
        }
        setSubmitting(false);
      })
      .catch((error) => {
        console.log(error);
        setSubmitting(false);
        handleMessage('An error occurred. Check your network and try again');
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
        //without going to login screen
        setStoredCredentials(credentials);
      })
      .catch((error) => {
        handleMessage('Persisting login failed');
        console.log(error)
      });
  };

  function DropDownPicker() {
    return (
      <View>
        <Picker style={styles.picker}
          placeholder="Please select Organ"
          selectedValue={pickerValue}
          onValueChange={(itemValue) => setPickerValue(itemValue)}
        >
          <Picker.Item label="select gender " value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>
    );
  }
  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageTitle>DonateME</PageTitle>
          <SubTitle>Account Signup</SubTitle>
          <Formik
            initialValues={{ FirstName: '', LastName: '', Email: '', Phone_No: '', Gender: '', Password: '', IsActive: true, UserType: 'User', confirmPassword: '' }}
            onSubmit={(values, { setSubmitting }) => {
              values = { ...values, Gender: pickerValue };
              if (
                values.Email == '' ||
                values.Password == '' ||
                values.FirstName == '' ||
                values.Phone_No == '' ||
                values.Gender == '' ||
                values.LastName == '' ||
                values.confirmPassword == ''
              ) {
                handleMessage('Please fill in all fields');
                setSubmitting(false);
              } else if (values.Password !== values.confirmPassword) {
                handleMessage('Passwords do not match');
                setSubmitting(false);
              } else {
                handleSignup(values, setSubmitting);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
              <StyledFormArea>
                <MyTextInput
                  label="First Name"
                  placeholder="First Name"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('FirstName')}
                  onBlur={handleBlur('FirstName')}
                  value={values.FirstName}
                  icon="person"
                />
                <MyTextInput
                  label="Last Name"
                  placeholder="Last Name"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('LastName')}
                  onBlur={handleBlur('LastName')}
                  value={values.LastName}
                  icon="person"
                />
                <MyTextInput
                  label="Email Address"
                  placeholder="andyj@gmail.com"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('Email')}
                  onBlur={handleBlur('Email')}
                  value={values.Email}
                  keyboardType="email-address"
                  icon="mail"
                />
                <MyTextInput
                  label="Phone No"
                  placeholder="Phone No"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('Phone_No')}
                  onBlur={handleBlur('Phone_No')}
                  value={values.Phone_No}
                  icon="mail"
                />
                <StyledInputLabel>Select Gender</StyledInputLabel>
                <DropDownPicker />
                <MyTextInput
                  label="Password"
                  placeholder="* * * * * * * *"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('Password')}
                  onBlur={handleBlur('Password')}
                  value={values.Password}
                  secureTextEntry={hidePassword}
                  icon="lock"
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MyTextInput
                  label="Confirm Password"
                  placeholder="* * * * * * * *"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  secureTextEntry={hidePassword}
                  icon="lock"
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MsgBox type={messageType}>{message}</MsgBox>

                {!isSubmitting && (
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>Signup</ButtonText>
                  </StyledButton>
                )}
                {isSubmitting && (
                  <StyledButton disabled={true}>
                    <ActivityIndicator size="large" color={primary} />
                  </StyledButton>
                )}

                <Line />
                <ExtraView>
                  <ExtraText>Already have an account? </ExtraText>
                  <TextLink onPress={() => navigation.navigate('Login')}>
                    <TextLinkContent>Login</TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, isDate, showDatePicker, ...props }) => {
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

      {isPassword && (
        <RightIcon
          onPress={() => {
            setHidePassword(!hidePassword);
          }}
        >
          <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
        </RightIcon>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    backgroundColor: secondary,
    height: 60,
    marginBottom: 10,
    marginVertical: 3,
  }
})
export default Signup;
