import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import NonAuthHeader from '../../Components/NonAuthHeader';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {Colors} from '../../constants';
import {SLIDER_HIGHT} from '../../Components/VerificationComponets/VerificationComponets';
import AppFonts from '../../constants/Fonts';

export default function AboutUsScreen({navigation}) {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.primary}}>
      <NonAuthHeader
        navigation={navigation}
        title="About us"
        isDrawer={true}
        isCart={false}
      />
      <ImageBackground
        style={{width: '100%', height: '100%'}}
        resizeMode="cover"
        source={require('../../assets/aboutbg.png')}>
        <ScrollView>
          <View style={{marginTop: SLIDER_HIGHT / 2}}>
            <View
              style={{flexDirection: 'row', marginLeft: 20, marginBottom: 10}}>
              <Text
                style={{
                  fontSize: RFPercentage(4),
                  color: Colors.black,

                  color: '#123144',
                  fontFamily: AppFonts.FONT_INTER_BOLD,
                }}>
                A
              </Text>
              <Text
                style={{
                  fontSize: RFPercentage(4),
                  color: Colors.black,
                  color: Colors.primary,
                  fontFamily: AppFonts.FONT_INTER_BOLD,
                }}>
                bout us
              </Text>
            </View>
            <View
              style={{flexDirection: 'row', marginLeft: 20, marginBottom: 5}}>
              <Text
                style={{
                  fontSize: RFPercentage(2.5),
                  color: '#123144',
                  fontFamily: AppFonts.FONT_INTER_BOLD,
                }}>
                In{' '}
              </Text>
              <Text
                style={{
                  fontSize: RFPercentage(2.5),
                  color: Colors.black,
                  color: Colors.primary,
                  fontFamily: AppFonts.FONT_INTER_BOLD,
                }}>
                Healthy Food Meal Delivery{' '}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: RFPercentage(2),
                  width: '90%',
                  alignSelf: 'center',
                  color: Colors.black,
                }}>
                Whattameal brings convenience to school lunches! Our app offers
                a curated menu of nutritious meals, ensuring your child enjoys a
                healthy lunch delivered directly to their school. Say goodbye to
                lunch-packing stress with scheduled deliveries, quality
                ingredients, and a user-friendly experience. Trust us for
                delicious, wholesome meals prepared under strict safety
                standards. Download the Whattameal App – make every lunch a
                delightful and worry-free experience for your child!
              </Text>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
