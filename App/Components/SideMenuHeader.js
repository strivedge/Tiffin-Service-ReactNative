import {Image, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors, ScaleSizeUtils} from '../constants';
import AppFonts from '../constants/Fonts';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {API} from '../Helper/HttpService';

const SideMenuHeader = ({name, photo, navigation}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 10,
        marginTop:  Platform.OS == 'ios' ? 40 : 10,
      }}>
      <View>
        <TouchableOpacity onPress={() => navigation.closeDrawer()}>
          <Image
            source={require('../assets/back.png')}
            style={{
              height: 30,
              width: 30,
              resizeMode: 'contain',
              tintColor: Colors.white,
            }}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 0.8,
          marginTop: 20,
          marginLeft: 20,
          alignContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        {photo == '' ? (
          <Image
            source={require('../assets/user.png')}
            style={{
              width: ScaleSizeUtils.HEIGHT_MENU_PROFILE_PICTURE,
              height: ScaleSizeUtils.HEIGHT_MENU_PROFILE_PICTURE,
              alignSelf: 'center',
              padding: 10,
            }}
          />
        ) : (
          <Image
            source={{
              uri: API.IMAGE_URL + `${photo}`,
            }}
            style={{
              width: ScaleSizeUtils.HEIGHT_MENU_PROFILE_PICTURE,
              height: ScaleSizeUtils.HEIGHT_MENU_PROFILE_PICTURE,
              alignSelf: 'center',
              padding: 10,
              borderRadius: 50,
            }}
          />
        )}
        <Text
          style={{
            fontSize: RFPercentage(2.5),
            fontFamily: AppFonts.FONT_INTER_MEDIUM,
            color: Colors.white,
            marginTop: 10,
          }}>
          {name}
        </Text>
      </View>
      {/* <TouchableOpacity>
        <Text
          style={{
            fontSize: RFPercentage(2.5),
            fontFamily: AppFonts.FONT_INTER_REGULER,
            color: Colors.white,
          }}>
          Edit
        </Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default SideMenuHeader;

const styles = StyleSheet.create({});
