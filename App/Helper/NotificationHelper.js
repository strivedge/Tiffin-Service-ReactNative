import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PrefManager from './PrefManager';

export default class NotificationHelper {
  static showPushNotification = async remoteMessage1 => {
    console.log('NOTIFICATION==> ' + JSON.stringify(remoteMessage1));
    PrefManager.removeValue('@notifationData');

    var data = remoteMessage1.data;
    if (Platform.OS === 'ios') {
      title = remoteMessage1.notification.title;
      message = remoteMessage1.notification.body;
      PushNotification.localNotification({
        id: new Date().toString(),
        title: title,
        message: message,
        userInfo: data,
        contentAvailable: true,
        vibrate: true,
        soundName: 'default',
      });
    } else {
      title = remoteMessage1.notification.title;
      message = remoteMessage1.notification.body;
      PushNotification.localNotification({
        channelId: 'Whattameal',
        title: title, // (optional)
        message: message, // (required)
        userInfo: data, // (optional) default: {} (using null throws a JSON value '<null>' error)
        playSound: false, // (optional) default: true
        soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
        vibrate: true,
      });
    }
  };
}
