import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DeliveryCalendarComponents from '../../Components/DeliveryCalendarComponents/DeliveryCalendarComponents';
import {Colors} from '../../constants';
import DeliveryFooter from '../../Components/DeliveryFooter';

const DeliveryCalendarScreen = props => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.primary}}>
      <View style={{flex: 1, backgroundColor: Colors.white}}>

      <DeliveryCalendarComponents navigation={props.navigation} />
      <View
        style={{
          bottom: 0,
          position: 'absolute',
          backgroundColor: Colors.white,
        }}>
        <DeliveryFooter navigation={props.navigation} activeIndex={'3'} />
      </View>
      </View>

    </SafeAreaView>
  );
};

export default DeliveryCalendarScreen;

const styles = StyleSheet.create({});
