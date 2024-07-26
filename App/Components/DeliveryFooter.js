import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Image,
  StatusBar,
  Platform,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Animated,
  useColorScheme,
  View,
  Alert,
} from 'react-native';

import {getLayoutSize, getFontSize} from '../resources/ResponsiveHelper';

import DeviceInfo from 'react-native-device-info';
import {Colors, ScaleSizeUtils, Strings, TextFontSize} from '../constants';
import AppFonts from '../constants/Fonts';
import {useRoute} from '@react-navigation/native';
let isTablet = DeviceInfo.isTablet();
const DeliveryFooter = props => {
  const {width} = Dimensions.get('screen');

  const [position] = useState(new Animated.ValueXY());
  const {navigation, route, activeIndex} = props;
  const routes = useRoute();

  const tabsList = [
    {
      icon: require('../assets/bottomTab/home.png'),
      text: 'Home',
      screenName: 'DeliveryHomeScreen',
    },
    {
      icon: require('../assets/bottomTab/order.png'),
      text: 'Delivery',
      screenName: 'DeliveryHistoryScreen',
    },
    {
      icon: require('../assets/bottomTab/qrcode.png'),
      text: 'Scan',
      screenName: 'DelieveryScanQrScreen',
    },
    {
      icon: require('../assets/bottomTab/calender.png'),
      text: 'Calender',
      screenName: 'DeliveryCalendarScreen',
    },
    {
      icon: require('../assets/bottomTab/profile.png'),
      text: 'Account',
      screenName: 'DeliveryProfileScreen',
    },
  ];

  const animate = value => {
    Animated.timing(position, {
      toValue: {x: value, y: 0},
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.rootContainer(width)}>
      {tabsList.map((prop, index) => {
        return (
          <>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.tabParentContainer}
              onPress={() => {
                navigation.navigate(prop.screenName);
                console.log(activeIndex, index);
                //
              }}
              onLayout={event => {
                const layout = event.nativeEvent.layout;
                const isFocused = activeIndex == index;
                if (isFocused) {
                  animate(parseInt(layout.x));
                }
              }}>
              {activeIndex == index ? (
                <>
                  <View style={styles.backgroundRound}>
                    <Image
                      source={prop.icon}
                      style={[
                        styles.tabIcon,
                        {
                          tintColor: Colors.white,
                        },
                      ]}
                    />
                  </View>
                  {activeIndex != index ? (
                    <Text
                      style={[
                        styles.tabNames,
                        {
                          color: Colors.gray,
                        },
                      ]}>
                      {prop.text}
                    </Text>
                  ) : null}
                </>
              ) : (
                <>
                  <Image
                    source={prop.icon}
                    style={[
                      styles.tabIcon,
                      {
                        tintColor:
                          activeIndex != index ? Colors.gray : Colors.black,
                      },
                    ]}
                  />
                  <Text
                    style={[
                      styles.tabNames,
                      {
                        marginTop: ScaleSizeUtils.PADDING_DEFAULT,
                        color: Colors.gray,
                      },
                    ]}>
                    {prop.text}
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </>
        );
      })}
    </View>
  );
};

export default DeliveryFooter;

const styles = StyleSheet.create({
  rootContainer: width => ({
    flexDirection: 'row',
    height:
      Platform.OS === 'ios'
        ? ScaleSizeUtils.HEIGHT_MENU_PROFILE_PICTURE
        : ScaleSizeUtils.HEIGHT_MENU_PROFILE_PICTURE,
    padding: ScaleSizeUtils.MARGIN_DEFAULT,
    width: isTablet
      ? Dimensions.get('screen').width
      : Dimensions.get('screen').width,
    justifyContent: 'space-between',
  }),
  tabParentContainer: {
    alignItems: 'center',
    elevation: 3,
    justifyContent: 'center',
  },
  tabIcon: {
    height: ScaleSizeUtils.MARGIN_TEN * 2.5,
    width: ScaleSizeUtils.MARGIN_TEN * 2.5,
    resizeMode: 'contain',
    alignItems: 'center',
  },
  tabText: color => ({
    color: color,
    fontSize: 15,
    //fontFamily: AppFonts.font_regular,
  }),
  tabViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconHeader: {
    tintColor: '#484848',
  },
  backgroundRound: {
    height: ScaleSizeUtils.MARGIN_TEN * 5.5,
    width: ScaleSizeUtils.MARGIN_TEN * 5.5,
    backgroundColor: Colors.primary,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabNames: {
    fontFamily: AppFonts.Font_Mulish_Medium,
    fontSize: TextFontSize.TEXT_SIZE_REGULAR - 3,
    alignSelf: 'center',
    textAlign: 'center',
  },
});
