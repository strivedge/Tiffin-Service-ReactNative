import {
  Alert,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Colors, ScaleSizeUtils} from '../constants';
import {RFPercentage} from 'react-native-responsive-fontsize';
import AppFonts from '../constants/Fonts';
import PrefManager from '../Helper/PrefManager';

const NonAuthHeader = ({
  navigation,
  title,
  isBack,
  isLogo,
  isDrawer,
  isCart,
  backGround,
  isAdd,
  currentlocation,
  OpenDrawer,
  isOption,
  optionModal,
  reDireact,
  goBack,
  count,
}) => {
  return (
    <>
      <StatusBar backgroundColor={Colors.primary} />
      <View
        style={{
          height: Platform.OS == 'ios' ? 50 : 60,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.primary,
        }}>
        {isBack ? (
          <TouchableOpacity
            style={{
              position: 'absolute',
              left: 0,
              marginLeft: ScaleSizeUtils.MARGIN_TEN,
            }}
            onPress={() => {
              goBack == true ? reDireact() : navigation.goBack();
            }}>
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
        ) : null}
        {isDrawer && (
          <TouchableOpacity
            style={{
              position: 'absolute',
              left: 0,
              marginLeft: ScaleSizeUtils.MARGIN_TEN,
            }}
            onPress={() => {
              navigation.openDrawer();
            }}>
            <Image
              source={require('../assets/menu.png')}
              style={{
                height: 30,
                width: 30,
                resizeMode: 'contain',
                tintColor: Colors.white,
              }}
              //   style={commonStyle.header_menu}
            />
          </TouchableOpacity>
        )}

        {title && (
          <Text
            style={[
              {
                color: Colors.white,
                fontFamily: AppFonts.FONT_INTER_BOLD,
                fontSize: RFPercentage(3),
              },
            ]}>
            {title}
          </Text>
        )}
        {isCart === true && (
          <TouchableOpacity
            style={{
              position: 'absolute',
              alignItems: 'center',
              right: 20,
            }}
            onPress={() => {
              navigation.navigate('CardDetailScreen');
            }}>
            {count > 0 && (
              <View
                style={{
                  backgroundColor: Colors.green,
                  color: Colors.black,
                  width: 20,
                  height: 20,
                  justifyContent: 'center',
                  borderRadius: 20,
                  right: -20,
                  marginBottom: -10,
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    alignSelf: 'center',
                    fontSize: 15,
                    fontFamily: AppFonts.FONT_INTER_MEDIUM,
                  }}>
                  {count}
                </Text>
              </View>
            )}

            <Image
              source={require('../assets/cart.png')}
              style={{
                height: ScaleSizeUtils.MARGIN_DEAFULT_BOTTOM,
                width: ScaleSizeUtils.MARGIN_DEAFULT_BOTTOM,
                tintColor: Colors.white,
              }}
            />
          </TouchableOpacity>
        )}

        {isOption === true && (
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 10,
            }}
            onPress={() => {
              optionModal();
            }}>
            <Image
              source={require('../assets/options.png')}
              style={{
                height: ScaleSizeUtils.MENU_APP_ICON,
                width: ScaleSizeUtils.MENU_APP_ICON,
                tintColor: Colors.white,
              }}
            />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export default NonAuthHeader;

const styles = StyleSheet.create({});
