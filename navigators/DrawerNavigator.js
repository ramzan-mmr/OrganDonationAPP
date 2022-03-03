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
import Animated, { color } from "react-native-reanimated";

// Vector icon 
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Menu from 'react-native-vector-icons/Ionicons';

//React native base 
import { Center, Container } from 'native-base'

import { useWindowDimensions, View, Image, Text, styles } from "react-native";

// credentials context
import { CredentialsContext } from './../components/CredentialsContext';

// Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//style from component
import { ExtraText, Avatar } from '../components/styles';
import { Colors } from '../components/styles';
const { tabBar, secondary, darkLight, red, primary,tertiary,brand } = Colors
const Drawer = createDrawerNavigator();


const DrawerNavigator = ({ navigation }) => {
  const dimension = useWindowDimensions();
  drawerType = dimension.width >= 700 ? 'permanent' : 'front';
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
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
        setEmail(Email)
      }
      else if (!data) {
        const { name, email, photoUrl } = storedCredentials;
        setFirstName(name)
        setEmail(Email)
      }
    })
    return (
      <View style={{ backgroundColor: '#fff', height: 150, justifyContent: "center", marginTop: 40 }}>
        <View style={{ paddingHorizontal: 30 }}>
          <Avatar source={AvatarImg} style={{ width: 80, height: 80, borderRadius: 1000, }} />
          <Text style={{ marginLeft: 10, color: "#000000", fontSize: 15, fontWeight: "bold" }}>{FirstName + " " + LastName}</Text>
          <Text style={{ marginLeft: 10, color: "#041869", fontSize: 13 }}>{Email}</Text>
        </View>
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
            <MaterialIcons name="home" size={size} color={color} />
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
            onPress={() => navigation.navigate("home")}
            style={{ marginLeft: 20 }}
          />
        ),
        headerStyle:{
            backgroundColor:brand
          }
      }}>
      <Drawer.Screen name="home" component={BottomTabNavigator}
        options={{
          title: "Home",
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="home"
              size={25}
              color={focused ? '#e33e39' : '#041869'}
            />
          ),
        }}
      />
      <Drawer.Screen name="RegisAsDoner" component={RegAsDoner}
        options={{
          headerShown: true,
          title: "Doner Registration",
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="registered"
              size={25}
              color={focused ? '#e33e39' : '#041869'}
            />
          ),
        }}
      />
      <Drawer.Screen name="Profile" component={Profile}
        options={{
          headerShown: true,
          title: "Profile",
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="user"
              size={25}
              color={focused ? '#e33e39' : '#041869'}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;