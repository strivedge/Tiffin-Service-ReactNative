import React, {useState} from 'react';
import NonAuthHeader from '../../Components/NonAuthHeader';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  Linking,
  ImageBackground,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {Colors} from '../../constants';
import {SLIDER_HIGHT} from '../../Components/VerificationComponets/VerificationComponets';
import {RFPercentage} from 'react-native-responsive-fontsize';
import AppFonts from '../../constants/Fonts';

export default function ContactUsScreen({navigation}) {
  const dialCall = number => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(`https://wa.me/${phoneNumber}`);
  };

  const mapLinking = () => {
    const latitude = '23.0742';
    const longitude = '72.5208';
    const label = 'Vraj Valencia';

    const url = Platform.select({
      ios: 'maps:' + latitude + ',' + longitude + '?q=' + label,
      android: 'geo:' + latitude + ',' + longitude + '?q=' + label,
    });
    Linking.openURL(url);
  };

  return (
    <SafeAreaView backgroundColor={Colors.primary}>
      <NonAuthHeader
        navigation={navigation}
        title="Contact us"
        isDrawer={true}
        isCart={false}
      />
      <ImageBackground
        style={{width: '100%', height: '100%'}}
        resizeMode="cover"
        source={require('../../assets/background.png')}>
        <ScrollView>
          <View
            style={{
              alignContent: 'center',
              marginTop: 20,
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/circle.png')}
              style={{width: 100, height: 100}}
              resizeMode="contain"
            />
            <Text
              style={{
                fontSize: RFPercentage(3),
                fontFamily: AppFonts.FONT_INTER_BOLD,
                color: Colors.primary,
                marginTop: 10,
              }}>
              Whattameal
            </Text>
          </View>
          <View
            style={{
              marginTop: 50,
              width: '90%',
              alignSelf: 'center',
              borderColor: '#E8E8E8',
              borderWidth: 3,
              padding: 20,
              marginBottom: 10,
              borderRadius: 10,
              alignItems: 'center',
              backgroundColor: Colors.white,
            }}>
            <TouchableOpacity
              onPress={() => {
                mapLinking();
              }}>
              <Image source={require('../../assets/map.png')} />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: RFPercentage(2),
                fontFamily: AppFonts.FONT_INTER_MEDIUM,
                color: Colors.black,
                marginTop: 5,
                textAlign: 'center',
              }}>
              502 Vraj Valencia, B/h Vertis Towers, Nr. Shalin Hospital, Off
              Science City Road, Sola, Ahmedabad 380 060, Gujarat, India
            </Text>
          </View>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              borderColor: '#E8E8E8',
              borderWidth: 3,
              padding: 20,
              marginBottom: 10,
              alignItems: 'center',

              borderRadius: 10,
              backgroundColor: Colors.white,
            }}>
            <TouchableOpacity
              onPress={() => {
                dialCall(+918866059595);
              }}>
              <Image
                source={require('../../assets/whatsapp.png')}
                style={{width: 50, height: 50}}
              />
            </TouchableOpacity>

            <Text
              style={{
                fontSize: RFPercentage(2),
                fontFamily: AppFonts.FONT_INTER_MEDIUM,
                color: Colors.black,
                marginTop: 5,
              }}>
              +91 8866059595
            </Text>
          </View>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              borderColor: '#E8E8E8',
              borderWidth: 3,
              padding: 20,
              marginBottom: 10,
              borderRadius: 10,
              backgroundColor: Colors.white,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  'mailto:hello@whattameal.com?subject=Subject&body=Description',
                )
              }>
              <Image source={require('../../assets/mail.png')} />
            </TouchableOpacity>

            <Text
              style={{
                fontSize: RFPercentage(2),
                fontFamily: AppFonts.FONT_INTER_MEDIUM,
                color: Colors.black,
                marginTop: 5,
              }}>
              hello@whattameal.com
            </Text>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
