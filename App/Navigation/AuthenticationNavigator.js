import React, {Component} from 'react';

import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionSpecs,
  HeaderStyleInterpolators,
  TransitionPresets,
} from '@react-navigation/stack';
import {
  Button,
  View,
  Text,
  Alert,
  TouchableOpacity,
  Image,
  Icon,
  Animated,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {
  AddchildScreen,
  VerificationScreen,
  Resetpassword,
  OtpScreen,
  Signup,
  SignIn,
  Welcomescreen,
  SplashScreen,
} from './Route';
import SideMenu from '../Components/SideMenu';
const Stack = createStackNavigator();

export function springyFadeIn() {
  const transitionSpec = {
    timing: Animated.spring,
    tension: 10,
  };
  return {
    transitionSpec,
    screenInterpolator: ({position, scene}) => {
      const {index} = scene;

      const opacity = position.interpolate({
        inputRange: [index - 1, index],
        outputRange: [0, 1],
      });

      return {opacity};
    },
  };
}
const AuthenticationNavigator = () => {
  return (
    <Stack.Navigator
      presentation="modal"
      animation={springyFadeIn()}
      screenOptions={{
        headerShown: false,
        estureEnabled: false,
        cardOverlayEnabled: true,
        ...TransitionPresets.SlideFromRightIOS, // <-- The preset causing this issue!
      }}>
      <Stack.Screen
        name="Welcomescreen"
        component={Welcomescreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OtpScreen"
        component={OtpScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VerificationScreen"
        component={VerificationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Resetpassword"
        component={Resetpassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddchildScreen"
        component={AddchildScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export {AuthenticationNavigator};
