import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SideMenu from '../Components/SideMenu';
const DrawerStack = createDrawerNavigator();
import {
  MyAcountScreen,
  PaymentScreen,
  AboutUsScreen,
  ContactUsScreen,
  MenuViewScreen,
  CalendarScreen,
  PaymentSuccessScreen,
  BirthdayScreen,
} from './Route';
import HomeScreen from '../Screens/Dashboard/HomeScreen';

import MyOrderScreen from '../Screens/SideMenu/MyOrderScreen';

function AppDrawerStack() {
  return (
    <DrawerStack.Navigator drawerContent={props => <SideMenu {...props} />}>
      <DrawerStack.Screen
        options={{headerShown: false}}
        name="HomeScreen"
        component={HomeScreen}
      />

      <DrawerStack.Screen
        options={{headerShown: false}}
        name="MyAcountScreen"
        component={MyAcountScreen}
      />
      <DrawerStack.Screen
        options={{headerShown: false}}
        name="MyOrderScreen"
        component={MyOrderScreen}
      />

      <DrawerStack.Screen
        options={{headerShown: false}}
        name="PaymentScreen"
        component={PaymentScreen}
      />
      <DrawerStack.Screen
        options={{headerShown: false}}
        name="AboutUsScreen"
        component={AboutUsScreen}
      />
      <DrawerStack.Screen
        options={{headerShown: false}}
        name="ContactUsScreen"
        component={ContactUsScreen}
      />
      <DrawerStack.Screen
        options={{headerShown: false}}
        name="CalenderScreen"
        component={CalendarScreen}
      />
      <DrawerStack.Screen
        options={{headerShown: false}}
        name="PaymentSuccessScreen"
        component={PaymentSuccessScreen}
      />

      <DrawerStack.Screen
        options={{headerShown: false}}
        name="BirthdayScreen"
        component={BirthdayScreen}
      />
    </DrawerStack.Navigator>
  );
}
export default AppDrawerStack;

const styles = StyleSheet.create({});
