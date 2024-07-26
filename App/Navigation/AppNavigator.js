import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Animated,
  LogBox,
  Platform,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {Colors} from '../constants';
import AppDrawerStack from './AppDrawerStack';
import {
  SplashScreen,
  MenuViewScreen,
  CardDetailScreen,
  AddchildScreen,
  MyAcountScreen,
  PaymentSuccessScreen,
  MoneyPaidScreen,
  OrderDetailScreen,
  DeliveryHistoryScreen,
  DeliveryHomeScreen,
  Welcomescreen,
  ChangePasswordScreen,
  PaymentWebViewScreen,
} from './Route';
import {AuthenticationNavigator} from './AuthenticationNavigator';
import HomeScreen from '../Screens/Dashboard/HomeScreen';
import DeliveryDrawerStack from './DeliveryDrawerStack';
import NotificationHelper from '../Helper/NotificationHelper';
import PrefManager from '../Helper/PrefManager';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import {setNavigationRef} from './NavigationHelper';

LogBox.ignoreAllLogs();
const Stack = createStackNavigator();

const StackNavigator = () => {
  function springyFadeIn() {
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

  return (
    <NavigationContainer ref={setNavigationRef}>
      <Stack.Navigator
        presentation="modal"
        animation={springyFadeIn()}
        screenOptions={{
          headerShown: false,
          estureEnabled: false,
          cardOverlayEnabled: true,
          ...TransitionPresets.DefaultTransition, // <-- The preset causing this issue!
        }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen
          name="Welcomescreen"
          component={Welcomescreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="AppDrawerStack"
          component={AppDrawerStack}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="DeliveryDrawerStack"
          component={DeliveryDrawerStack}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="AuthenticationNavigator"
          component={AuthenticationNavigator}
        />
        <Stack.Screen name="MenuItemScreen" component={MenuViewScreen} />
        <Stack.Screen
          name="PaymentWebViewScreen"
          component={PaymentWebViewScreen}
        />
        <Stack.Screen name="CardDetailScreen" component={CardDetailScreen} />
        <Stack.Screen
          name="AddchildScreen"
          component={AddchildScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PaymentSuccessScreen"
          component={PaymentSuccessScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MoneyPaidScreen"
          component={MoneyPaidScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OrderDetailScreen"
          component={OrderDetailScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="DeliveryHistoryScreen"
          component={DeliveryHistoryScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="ChangePasswordScreen"
          component={ChangePasswordScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});

export default StackNavigator;
