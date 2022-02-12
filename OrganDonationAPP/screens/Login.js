import React, { useState,useContext } from 'react';
import { StatusBar } from 'expo-status-bar';

// formik
import { Formik } from 'formik';

import {
  StyledContainer,
  PageLogo,
  PageTitle,
  SubTitle,
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
  Colors,
} from './../components/styles';
import { View, ActivityIndicator } from 'react-native';

//colors
const { darkLight, brand, primary } = Colors;

// icon
import { Octicons, Fontisto, Ionicons } from '@expo/vector-icons';

// keyboard avoiding view
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';

// api client
import axios from 'axios';

// Google Signin
import * as Google from 'expo-google-app-auth';

// Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';


// credentials context
import { CredentialsContext } from './../components/CredentialsContext';

const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [googleSubmitting, setGoogleSubmitting] = useState(false);
  const [signinWithEmail , setsigninWithEmail] = useState(false);

  // credentials context
  const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
  const handleLogin = (credentials, setSubmitting) => {
    console.log(credentials)
    handleMessage(null);
    const url = 'http://mydonatmeapi.herokuapp.com/Login';
    axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data;
        const { status, message, data } = result;
        if (status !== 'SUCCESS') {
          handleMessage(message, status);
          console.log(message)
        } else {
          // persistLogin({ ...data[0] }, message, status, data);
          persistLogin({data}, message, status);
        }
        setSubmitting(false);
      })
      .catch((error) => {
        // console.log(error.toJSON());
        setSubmitting(false);
        handleMessage('An error occurred. Check your network and try again');
        
      });
  };

  const handleMessage = (message, type = 'FAILED') => {
    setMessage(message);
    setMessageType(type);
  };

  const handleGoogleSignin = () => {
    setGoogleSubmitting(true);
    const config = {
      iosClientId: `208539984522-j4uvp8bkol45nmge97s16ogheak2nufn.apps.googleusercontent.com`,
      androidClientId: `208539984522-ai6ticj3g2fb97fnt0qkannmnkogujtf.apps.googleusercontent.com`,
      scopes: ['profile', 'email'],
    };

    Google.logInAsync(config)
    .then((result) => {
      const { type, user } = result;
      if (type == 'success') {
        const { email, name, photoUrl } = user;
        persistLogin({ email, name, photoUrl }, 'Google signin successful', 'SUCCESS');
      } else {
        handleMessage('Google Signin was cancelled');
      }
      setGoogleSubmitting(false);
    })
    .catch((error) => {
      handleMessage('An error occurred. Check your network and try again');
      console.log(error);
      setGoogleSubmitting(false);
    });
  };

  // Persisting login
  const persistLogin = (credentials, message, status) => {
    // console.log(message)
    // console.log(credentials);
    AsyncStorage.setItem('flowerCribCredentials', JSON.stringify(credentials))
      .then(() => {
        handleMessage(message, status);
        // setTimeout(() => navigation.navigate('Welcome', credentials), 1000);
        setStoredCredentials(credentials);
      })
      .catch((error) => {
        handleMessage('Persisting login failed');
        console.log(error);
      });
  };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageLogo resizeMode="cover" source={require('./../assets/img/organlogo.jpg')} />
          <PageTitle>DonateME</PageTitle>
          <SubTitle>Account Login</SubTitle>

          <Formik
            initialValues={{ Email: '', Password: '' }}
            onSubmit={(values, { setSubmitting }) => {
              if (values.Email == '' || values.Password == '') {
                handleMessage('Please fill in all fields');
                setSubmitting(false);
              } else {
                handleLogin(values, setSubmitting);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
              <StyledFormArea>
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
                <MsgBox type={messageType}>{message}</MsgBox>

                {!isSubmitting && (
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>Login</ButtonText>
                  </StyledButton>
                )}
                {isSubmitting && (
                  <StyledButton disabled={true}>
                    <ActivityIndicator size="large" color={primary} />
                  </StyledButton>
                )}

                <Line />

                {!googleSubmitting && (
                  <StyledButton onPress={handleGoogleSignin} google={true}>
                    <Fontisto name="google" size={25} color={primary} />
                    <ButtonText google={true}>Sign in with Google</ButtonText>
                  </StyledButton>
                )}
                {googleSubmitting && (
                  <StyledButton disabled={true} google={true}>
                    <ActivityIndicator size="large" color={primary} />
                  </StyledButton>
                )}

                <ExtraView>
                  <ExtraText>Don't have an account already? </ExtraText>
                  <TextLink onPress={() => navigation.navigate('Signup')}>
                    <TextLinkContent>Signup</TextLinkContent>
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

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
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

export default Login;
