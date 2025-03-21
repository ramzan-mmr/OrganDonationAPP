// import React from 'react';

// // React navigation stack
// import RootStack from './navigators/RootStack';

// export default function App() {
//   return <RootStack />;
// }

import { Text } from 'react-native';

import React, { useState } from 'react';

// React navigation stack
import RootStack from './navigators/RootStack';

// apploading
import AppLoading from 'expo-app-loading';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// credentials context
import { CredentialsContext } from './components/CredentialsContext';

// Navigation container
import { NavigationContainer } from '@react-navigation/native';

//Tabs 
import BottomTabNavigator from './navigators/TabNavigator';
//Drawer
import DrawerNavigator from './navigators/DrawerNavigator';

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState("");

  const checkLoginCredentials = () => {
    AsyncStorage.getItem('flowerCribCredentials')
      .then((result) => {
        if (result !== null) {
          setStoredCredentials(JSON.parse(result));
        } else {
          setStoredCredentials(null);
        }
      })
      .catch((error) => console.log(error));

  };

  if (!appReady) {
    return <AppLoading startAsync={checkLoginCredentials} onFinish={() => setAppReady(true)} onError={console.warn} />;
  }

  return (
    <CredentialsContext.Provider value={{ storedCredentials, setStoredCredentials }}>
      <NavigationContainer>
      <RootStack />
      </NavigationContainer>
    </CredentialsContext.Provider>
  );
}
