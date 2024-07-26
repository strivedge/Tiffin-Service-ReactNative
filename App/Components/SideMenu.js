import React, {Component, useState, useEffect} from 'react';
import {
  Button,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import deviceInfoModule from 'react-native-device-info';

const Drawer = createDrawerNavigator();

import {createStackNavigator} from '@react-navigation/stack';
import {createRef} from 'react';

import PrefManager from '../Helper/PrefManager';
import {useFocusEffect} from '@react-navigation/native';
const navigationRef = createRef();
const Stack = createStackNavigator();
import {Colors, String, ScaleSizeUtils, TextFontSize} from '../constants';
import {RFPercentage} from 'react-native-responsive-fontsize';
import AppFonts from '../constants/Fonts';
import SideMenuHeader from './SideMenuHeader';
import {allStateClearRequest} from '../redux/nonAuth/actions';
import {connect} from 'react-redux';
import {allAuthStateClearRequest} from '../redux/actionTypes';
import {SLIDER_HIGHT} from './HomeScreenComponents/HomeScreenComponents';
import DeviceInfo from 'react-native-device-info';

function SideMenu(props) {
  const [test, setTest] = React.useState(false);

  const [userFirstName, setUserFirstName] = React.useState('');
  const [userProfile, setuserProfile] = React.useState('');
  const [active, setActive] = useState('');
  const [sideMenu, setSideMenu] = useState([]);

  const {navigation, allStateClearRequest, allAuthStateClearRequest} = props;

  useFocusEffect(
    React.useCallback(async () => {
      getUserDetails();

      setInterval(() => {
        getUserDetails();
      }, 1000);
    }, [userFirstName, userProfile]),
  );

  const createThreeButtonAlert = () =>
    Alert.alert('Logout', 'Are you sure want logout your Account?', [
      {
        text: 'NO',
        style: 'cancel',
      },
      {text: 'YES', onPress: () => handlelogout()},
    ]);

  const handlelogout = () => {
    navigation.closeDrawer();
    PrefManager.removeValue('@id');
    PrefManager.removeValue('@name');
    PrefManager.removeValue('@photo');
    PrefManager.removeValue('@email');
    PrefManager.removeValue('@country_code');
    PrefManager.removeValue('@mobile_no');
    PrefManager.removeValue('@dateofbirth');
    PrefManager.removeValue('@gender');
    PrefManager.removeValue('@child_Data');
    PrefManager.removeValue('@customer_type');
    PrefManager.removeValue('@cart_count');
    PrefManager.removeValue('@students');
    allStateClearRequest();
    allAuthStateClearRequest();
    setTimeout(() => {
      navigation.replace('AuthenticationNavigator');
    }, 50);
  };

  useEffect(() => {
    getDrawerMenu();
  }, []);

  async function getUserDetails() {
    PrefManager.getValue('@name').then(name => {
      setUserFirstName(name);
    });

    PrefManager.getValue('@photo').then(image => {
      setuserProfile(image);
    });
  }

  var DeilveryMenu = [
    {
      name: 'Dashboard',
      icon: require('../assets/bottomTab/home.png'),
      navigateScreenName: 'DeliveryHomeScreen',
    },
    {
      name: 'My Account',
      icon: require('../assets/bottomTab/profile.png'),
      navigateScreenName: 'DeliveryProfileScreen',
    },
    {
      name: 'My Delivery',
      icon: require('../assets/bottomTab/order.png'),
      navigateScreenName: 'DeliveryHistoryScreen',
    },
    {
      name: 'Calendar',
      icon: require('../assets/bottomTab/calender.png'),
      navigateScreenName: 'DeliveryCalendarScreen',
    },
    {
      name: 'Scan QR',
      icon: require('../assets/bottomTab/qrcode.png'),
      navigateScreenName: 'DelieveryScanQrScreen',
    },
    {
      name: 'About us',
      icon: require('../assets/bottomTab/about.png'),
      navigateScreenName: 'AboutUsScreen',
    },

    {
      name: 'Contact us',
      icon: require('../assets/bottomTab/contact.png'),
      navigateScreenName: 'ContactUsScreen',
    },
    {
      name: 'Logout',
      icon: require('../assets/bottomTab/profile.png'),
      navigateScreenName: () => createThreeButtonAlert(),
    },
  ];

  var sideMenu1 = [
    {
      name: 'Dashboard',
      icon: require('../assets/bottomTab/home.png'),
      navigateScreenName: 'HomeScreen',
    },
    {
      name: 'My Profile',
      icon: require('../assets/bottomTab/profile.png'),
      navigateScreenName: 'MyAcountScreen',
    },
    {
      name: 'My Order',
      icon: require('../assets/bottomTab/order.png'),
      navigateScreenName: 'MyOrderScreen',
    },
    {
      name: 'Calendar',
      icon: require('../assets/bottomTab/calender.png'),
      navigateScreenName: 'CalenderScreen',
    },
    {
      name: 'Birthday Party',
      icon: require('../assets/bottomTab/birthday.png'),
      navigateScreenName: 'BirthdayScreen',
    },
    {
      name: 'Payment',
      icon: require('../assets/bottomTab/card.png'),
      navigateScreenName: 'PaymentScreen',
    },
    {
      name: 'About us',
      icon: require('../assets/bottomTab/about.png'),
      navigateScreenName: 'AboutUsScreen',
    },

    {
      name: 'Contact us',
      icon: require('../assets/bottomTab/contact.png'),
      navigateScreenName: 'ContactUsScreen',
    },
    {
      name: 'Logout',
      icon: require('../assets/bottomTab/profile.png'),
      navigateScreenName: () => createThreeButtonAlert(),
    },
  ];

  const getDrawerMenu = async () => {
    const type = await PrefManager.getValue('@customer_type');
    if (type == 2) {
      setSideMenu(sideMenu1);
    } else if (type == 3) {
      setSideMenu(DeilveryMenu);
    }
  };

  const handleActiveTab = index => {
    navigation.navigate(sideMenu[index].navigateScreenName);
    setActive(index.toString());
  };

  let menuItemView = [];
  for (let i = 0; i < sideMenu.length; i++) {
    menuItemView.push(
      <>
        <TouchableOpacity
          onPress={() => {
            typeof sideMenu[i].navigateScreenName === 'string'
              ? handleActiveTab(i)
              : sideMenu[i].navigateScreenName();
          }}
          style={styles.listItem}>
          <Image
            source={sideMenu[i].icon}
            resizeMode="contain"
            style={[
              styles.sideBarIcon,
              {
                tintColor:
                  i.toString() === active ? Colors.primary : Colors.black,
              },
            ]}
          />
          <Text
            style={[
              styles.title,
              {
                color: i.toString() === active ? Colors.primary : Colors.black,
              },
            ]}>
            {sideMenu[i].name}
          </Text>
        </TouchableOpacity>
      </>,
    );
  }

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          height:
            Platform.OS == 'ios' ? SLIDER_HIGHT / 3.5 : SLIDER_HIGHT / 4.5,
          backgroundColor: Colors.primary,
        }}>
        <SideMenuHeader
          name={userFirstName}
          photo={userProfile}
          navigation={navigation}
        />
      </View>
      <View style={{height: SLIDER_HIGHT / 1.5, marginTop: 10}}>
        <ScrollView>{menuItemView}</ScrollView>
        <Text
          style={{
            color: Colors.black,
            alignSelf: 'center',
            fontSize: RFPercentage(2.5),
            marginBottom: -20,
          }}>
          v {DeviceInfo.getVersion()}(Beta)
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentViewContainer: {
    flex: 1,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    backgroundColor: Colors.white,
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 4,
  },
  sideBarIcon: {
    height: ScaleSizeUtils.MENU_ICON_HEIGHT,
    width: ScaleSizeUtils.MENU_ICON_HEIGHT,
    alignSelf: 'center',
  },
  listItem: {
    padding: ScaleSizeUtils.MARGIN_TEN,
    width: '85%',
    flexDirection: 'row',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: ScaleSizeUtils.DIMEN_MARGIN_SMALL,
    marginBottom: ScaleSizeUtils.DIMEN_MARGIN_SMALL,
  },
  title: {
    fontSize: RFPercentage(2.3),
    color: Colors.black,
    fontFamily: AppFonts.FONT_INTER_REGULER,
    marginLeft: ScaleSizeUtils.MARGIN_DEFAULT,
  },
});

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    allStateClearRequest: data => {
      dispatch(allStateClearRequest(data));
    },
    allAuthStateClearRequest: data => {
      dispatch(allAuthStateClearRequest(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
