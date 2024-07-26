import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  Animated,
  StyleSheet,
  Easing,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import {Colors} from '../../constants';
import PrefManager from '../../Helper/PrefManager';
import {getToken} from '../../redux/actionTypes';
import NetInfo from '@react-native-community/netinfo';
import {styles} from '../../Style/commonStyle';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const Splashcomponents = props => {
  const {navigation, getToken, tokenDetail} = props;

  useEffect(async () => {
    checkNotificationPermission();

    setTimeout(async () => {
      const id = await PrefManager.getValue('@id');
      const type = await PrefManager.getValue('@customer_type');

      if (id) {
        if (type == 2) {
          props.navigation.replace('AppDrawerStack');
        } else if (type == 3) {
          props.navigation.replace('DeliveryDrawerStack');
        }
      } else {
        props.navigation.replace('AuthenticationNavigator');
      }
    }, 2500);
  }, []);

  const startValue = useRef(new Animated.Value(1)).current;

  const [notificationPermission, setNotificationPermission] = useState(null);

  const endValue = 1.5;

  const checkNotificationPermission = async () => {
    try {
      const permission =
        Platform.OS === 'ios'
          ? await check(PERMISSIONS.IOS.NOTIFICATIONS)
          : await check(PERMISSIONS.ANDROID.NOTIFICATIONS);

      if (notificationPermission !== RESULTS.GRANTED) {
        requestNotificationPermission();
      }

      setNotificationPermission(permission);
    } catch (error) {
      console.error('Error checking notification permission:', error);
    }
  };
  const requestNotificationPermission = async () => {
    try {
      const permission =
        Platform.OS === 'ios'
          ? await request(PERMISSIONS.IOS.NOTIFICATIONS)
          : await request(PERMISSIONS.ANDROID.NOTIFICATIONS);

      setNotificationPermission(permission);
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  useEffect(() => {
    startAnimation();

    const data = {
      secret: '7a2af641381aa2adfc3393ae23c856ab',
    };
    getToken(data);
  }, []);

  useEffect(() => {
    if (tokenDetail?.access_token?.length > 0) {
      PrefManager.setValue('@assess_token', tokenDetail?.access_token);
    }
  }, [tokenDetail]);

  const startAnimation = async () => {
    Animated.spring(startValue, {
      toValue: endValue,
      friction: 0.5,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      <StatusBar backgroundColor={Colors.transparent} translucent />
      <View style={[styles.mainViewContainer, {justifyContent: 'center'}]}>
        <Animated.View
          style={[
            styles.roundCircleRightTop,
            {
              transform: [
                {
                  scale: startValue,
                },
              ],
            },
          ]}
        />

        <Animated.View
          style={[
            styles.roundCircleLeftTop,
            {
              transform: [
                {
                  scale: startValue,
                },
              ],
            },
          ]}
        />

        <Image
          source={require('../../assets/backscreen.gif')}
          style={{
            flex: 1,
            height: '100%',
            width: '100%',
          }}
        />
      </View>
    </>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.authUser.loading,
    tokenDetail: state.authUser.tokenDetail?.data,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getToken: data => {
      dispatch(getToken(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Splashcomponents);
