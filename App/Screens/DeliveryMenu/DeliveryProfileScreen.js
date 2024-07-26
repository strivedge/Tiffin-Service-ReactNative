import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DeliveryFooter from '../../Components/DeliveryFooter';
import {Colors} from '../../constants';
import ProfileScreenComponets from '../../Components/ProfileScreenComponets/ProfileScreenComponets';

const DeliveryProfileScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.primary}}>

    <View style={{flex: 1,backgroundColor: Colors.white}}>
      <ProfileScreenComponets navigation={navigation} />
      <View
        style={{
          bottom: 0,
          position: 'absolute',
          backgroundColor: Colors.white,
        }}>
        <DeliveryFooter navigation={navigation} activeIndex={'4'} />
      </View>
    </View>
    </SafeAreaView>
  );
};

export default DeliveryProfileScreen;

const styles = StyleSheet.create({});
