//Authentication Navigator

import React, {Component, useEffect} from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {Provider} from 'react-redux';
import {createRef} from 'react';
const navigationRef = createRef();

// import store from './App/redux/store';
import StackNavigator from './App/Navigation/AppNavigator';
import {configureStore} from './App/redux/store';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import NotificationHelper from './App/Helper/NotificationHelper';
import PrefManager from './App/Helper/PrefManager';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import FlashMessage from 'react-native-flash-message';
import {View, Text, Image} from 'react-native';
import {Colors} from './App/constants';
import AppFonts from './App/constants/Fonts';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {SLIDER_HIGHT} from './App/Components/HomeScreenComponents/HomeScreenComponents';

const Stack = createStackNavigator();
// const stores = store();

const stores = configureStore();

messaging().setBackgroundMessageHandler(async remoteMessage => {
  PushNotification.createChannel(
    {
      channelId: 'Whattameal',
      channelName: 'Whattameal',
    },
    created => console.log('Background'),
  );
  PrefManager.removeValue('@notifationData');
  if (remoteMessage?.data?.type === 'Queue') {
    PrefManager.setValue(
      '@notifationData',
      JSON.stringify(remoteMessage?.data),
    );
  }
  // await PrefManager.setItem("@notificationData", "");
  NotificationHelper.showPushNotification(remoteMessage);
});

PushNotification.configure({
  onNotification: function (notification) {
    try {
      console.log('notication===>' + JSON.stringify(notification));
      if (notification?.data?.type === 'Queue') {
        PrefManager.setValue(
          '@notifationData',
          JSON.stringify(notification?.data),
        );
      }
    } catch (error) {
      console.log(notification);
    }
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  onAction: function (notification) {},

  onRegistrationError: function (err) {
    console.error(err.message, err);
  },

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  popInitialNotification: true,
  requestPermissions: true,
});

export default function App() {
  useEffect(() => {
    PushNotification.configure({
      onRegister: function (token) {
        if (Platform.OS === 'android') {
        }
      },
      permissions: {alert: true, badge: true, sound: true},
      popInitialNotification: true,
      requestPermissions: true,
    });
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(':notification======' + JSON.stringify(remoteMessage));
      if (Platform.OS !== 'ios') {
        PushNotification.createChannel(
          {
            channelId: 'Whattameal',
            channelName: 'Whattameal',
          },
          created => console.log(''),
        );
      }
      await NotificationHelper.showPushNotification(remoteMessage);
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      PrefManager.setItem('@notificationData', '');
      redirectToNotificationClickScreen(remoteMessage.data);
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          // if(navigationRef.current.getCurrentRoute().name === "SplashScreen") {
          //   AsyncStorage.setItem("@notificationData", JSON.stringify(remoteMessage.data));
          // } else {
          //   AsyncStorage.setItem("@notificationData", "");
          // }
        }
      });
    return () => {
      unsubscribe;
    };
  }, []);
  return (
    <Provider store={stores}>
      <FlashMessage
        position="top"
        animated={true}
        MessageComponent={({message}) => (
          <View
            style={{
              backgroundColor: Colors.green,
              padding: 10,
              borderRadius: 10,
              margin: 20,
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              height: SLIDER_HIGHT / 6,
              top: SLIDER_HIGHT / 3,
              elevation: 2,
            }}>
            <Image
              source={require('./App/assets/email1.png')}
              style={{width: 30, height: 30, tintColor: 'white'}}
            />
            <Text
              style={{
                fontFamily: AppFonts.FONT_MEDIUM,
                color: Colors.white,
                fontSize: RFPercentage(2.5),
              }}>
              {message.message}
            </Text>
          </View>
        )}
      />
      <StackNavigator />
    </Provider>
  );
}
