import React, { useContext } from 'react';

//colors
import { Colors } from './../components/styles';
const { darkLight, brand, primary, tertiary, secondary } = Colors;

// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import Login from './../screens/Login';
import Signup from './../screens/Signup';
import Welcome from './../screens/Welcome';
import GettingOrganData from '../screens/GettingOrganData';

const Stack = createNativeStackNavigator();


// credentials context
import { CredentialsContext } from './../components/CredentialsContext';
import DrawerNavigator from './DrawerNavigator';
import Map from '../components/Map';

const MainStackNavigator = () => {
  return (
    <CredentialsContext.Consumer>
      {({ storedCredentials }) => (

        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: 'transparent',
            },
            headerTintColor: tertiary,
            headerTransparent: false,
            headerTitle: '',
            headerLeftContainerStyle: {
              paddingLeft: 20,
            },
            headerShadowVisible: false,
            headerShown: false
          }}
        >
          {storedCredentials ? (
            <>
              <Stack.Screen
                options={{
                  headerTintColor: primary,
                }}
                name="DrawerNavigator"
                component={DrawerNavigator}
              />
              <Stack.Screen name="GettingOrganData" component={GettingOrganData}
                options={{
                  headerShown: true,
                  title: "Patient Needs",
                  headerStyle: {
                    backgroundColor: '#f4511e',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                  headerTitleAlign: 'center'
                }}
              />
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={Signup} />
            </>
          )}
        </Stack.Navigator>

      )}
    </CredentialsContext.Consumer>
  )
}

const RootStack = () => {
  // function NavigationLinks() {
  //   return(
  //   <MainStackNavigator/>
  //   )
  // }
  return (
    <MainStackNavigator />
  );
};

export default RootStack;
