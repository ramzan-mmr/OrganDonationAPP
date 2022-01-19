// ./navigation/DrawerNavigator.js

import React, { useContext, useEffect, useState } from "react";

import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";

import BottomTabNavigator from "./TabNavigator";

//Screen
import RegAsDoner from "../screens/drawer/RegAsDoner";
import Profile from "../screens/drawer/Profile";
import Login from "../screens/Login";
import Welcome from "../screens/Welcome";

//Animator 
import Animated from "react-native-reanimated";

// Vector icon 
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Menu from 'react-native-vector-icons/Ionicons';

//React native base 
import { Center, Container } from 'native-base'

import { useWindowDimensions, View, Image, Text, styles } from "react-native";

// credentials context
import { CredentialsContext } from './../components/CredentialsContext';
import { Colors } from "react-native/Libraries/NewAppScreen";

// Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//style from component
import { ExtraText, Avatar } from '../components/styles';

const { orange } = Colors;
const Drawer = createDrawerNavigator();


const DrawerNavigator = ({ navigation }) => {
  const dimension = useWindowDimensions();
  drawerType = dimension.width >= 700 ? 'permanent' : 'front';
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  //UserView 
  const UserView = () => {
    // credentials context
    const { data, photoUrl } = storedCredentials;
    const AvatarImg = photoUrl ? { uri: photoUrl } : require('./../assets/img/organlogo.jpg');
    useEffect(() => {
      if (data) {
        const { FirstName, LastName, Email, Phone_No } = data;
        setFirstName(FirstName);
        setLastName(LastName);
      }
      else if (!data) {
        const { name, email, photoUrl } = storedCredentials;
        setFirstName(name)
      }
    })
    return (
      <View style={{ backgroundColor: 'orange', height: 250, alignItems: 'center', justifyContent: 'center' }}>
        <Avatar resizeMode="cover" source={AvatarImg} />
        <Text>{FirstName +" "+ LastName}</Text>
        <ExtraText>Follow us</ExtraText>
      </View>
    )
  }

  const ClearLogin = () => {
    AsyncStorage.removeItem('flowerCribCredentials')
      .then(() => {
        setStoredCredentials("");
      })
      .catch((error) => console.log(error));
  };

  const CustomDrawerContent = (props) => {
    return (
      <View style={{ flex: 1 }}>
        <UserView />
        <DrawerContentScrollView>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
        <DrawerItem label="Logout"
          icon={({ size, color }) => {
            <MaterialIcons name="logout" size={size} color={color} />
          }}
          onPress={ClearLogin}
        />
      </View>
    )
  }

  return (
    <Drawer.Navigator
      drawerType={drawerType}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        headerLeft: (Info) => (
          <Menu name="arrow-back-outline" size={28} color={Info.focused ? "#10B981" : "#000000"}
            onPress={() => navigation.navigate("Profile")}
            style={{ marginLeft: 20 }}
          />
        )
      }}>
      <Drawer.Screen name="home" component={BottomTabNavigator}
        options={{
          drawerLabel: "Home",
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="home"
              size={27}
              color={focused ? '#10B981' : '#ccc'}
            />
          ),
        }}
      />
      <Drawer.Screen name="RegisAsDoner" component={RegAsDoner}
        options={{
          headerShown: true,
          title: "Doner Registration",
          headerTitleAlign: "center",

          drawerIcon: ({ focused, size }) => (
            <Icon
              name="home"
              size={27}
              color={focused ? '#10B981' : '#ccc'}
            />
          ),
        }}
      />
      <Drawer.Screen name="Profile" component={Profile}
        options={{
          drawerLabel: "Profile",
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="user"
              size={27}
              color={focused ? '#10B981' : '#ccc'}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;