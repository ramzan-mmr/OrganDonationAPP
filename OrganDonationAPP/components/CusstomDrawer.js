import React, { Component } from 'react';
//Screens 
import RegAsDoner from '../screens/drawer/RegAsDoner';
import Profile from '../screens/drawer/Profile';

// react navigation 
import { createDrawerNavigator } from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

const Drawer = createDrawerNavigator();

function CusstomDrawer(){
    return(
        
        <Drawer.Navigator initialRouteName="Profile">
          <Drawer.Screen name="Profile" component={Profile} />
          <Drawer.Screen name="RegAsDoner" component={RegAsDoner} />
        </Drawer.Navigator>
    )
}
export default CusstomDrawer