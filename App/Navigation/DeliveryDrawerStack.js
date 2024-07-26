import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SideMenu from '../Components/SideMenu';
import {createStackNavigator} from '@react-navigation/stack';
import DeliveryHomeScreen from '../Screens/DeliveryMenu/DeliveryHomeScreen';
import {
  DeliveryHistoryScreen,
  MyAcountScreen,
  AboutUsScreen,
  ContactUsScreen,
  DeliveryProfileScreen,
  DeliveryCalendarScreen,
  DelieveryScanQrScreen,
} from './Route';
const DrawerStack = createDrawerNavigator();
const Stack = createStackNavigator();

function DeliveryDrawerStack() {
  return (
    <DrawerStack.Navigator drawerContent={props => <SideMenu {...props} />}>
      <DrawerStack.Screen
        options={{headerShown: false}}
        name="DeliveryHomeScreen"
        component={DeliveryHomeScreen}
      />
      <DrawerStack.Screen
        options={{headerShown: false}}
        name="DeliveryHistoryScreen"
        component={DeliveryHistoryScreen}
      />
      <DrawerStack.Screen
        options={{headerShown: false}}
        name="DeliveryProfileScreen"
        component={DeliveryProfileScreen}
      />
      <DrawerStack.Screen
        options={{headerShown: false}}
        name="DelieveryScanQrScreen"
        component={DelieveryScanQrScreen}
      />

      <DrawerStack.Screen
        options={{headerShown: false}}
        name="DeliveryCalendarScreen"
        component={DeliveryCalendarScreen}
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
    </DrawerStack.Navigator>
  );
}
export default DeliveryDrawerStack;

const styles = StyleSheet.create({});
