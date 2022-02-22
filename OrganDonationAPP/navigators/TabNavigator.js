// ./navigation/TabNavigator.js

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


import { Header } from "react-native/Libraries/NewAppScreen";

//Screen 
import Search from '../screens/Tabs/Search';
import Notification from '../screens/Tabs/Notification';
import Profile from "../screens/drawer/Profile";

// credentials context
import { CredentialsContext } from './../components/CredentialsContext';

// Vector icon 
import Icon from 'react-native-vector-icons/FontAwesome';
import Menu from 'react-native-vector-icons/Ionicons';

//Colors from style 
import { Colors } from '../components/styles';
import { FastField } from "formik";
import Welcome from "../screens/Welcome";
const { tabBar, secondary, darkLight, red, primary,tertiary,brand } = Colors

const Tab = createBottomTabNavigator();
const HomeTab = createBottomTabNavigator();

const BottomTabNavigator = ({ navigation }) => {
  return (
    <Tab.Navigator initialRouteName={Welcome} screenOptions={{
      tabBarHideOnKeyboard: true,
      tabBarStyle: {
        position: 'absolute',
        elevation: 0,
        borderRadius: 15,
        height: 60,
      },
      headerStyle:{
        backgroundColor:brand
      },
      headerRight: (tabInfo) => (
        <Menu name="md-menu" size={28} color={tabInfo.focused ? "#10B981" : "#8e8e93"}
          onPress={() => navigation.openDrawer()}
          style={{ marginRight: 20 }}
        />
      )
    }}>
      <>
        <Tab.Screen name="Home" component={Welcome}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: (tabInfo) => (
              <Icon name="home" size={28} color={tabInfo.focused ? brand : "#8e8e93"} />
            )
          }}
        />
        <Tab.Screen name="Search" component={Search}
          options={{
            tabBarLabel: "Search",
            tabBarIcon: (tabInfo) => (
              <Icon name="search" size={28} color={tabInfo.focused ? brand : "#8e8e93"} />
            )
          }}
        />
        <Tab.Screen name="Notification" component={Notification}
          options={{
            tabBarLabel: "Notification",
            tabBarIcon: (tabInfo) => (
              <Icon name="bell" size={28} color={tabInfo.focused ? brand : "#8e8e93"} />
            )
          }}
        />
        <Tab.Screen name="Profile" component={Profile}
          options={{
            tabBarIcon: (tabInfo) => (
              <Icon name="user" size={28} color={tabInfo.focused ? brand : "#8e8e93"}/>
            )
          }}
        />
      </>

    </Tab.Navigator>
  )
};

export default BottomTabNavigator;

