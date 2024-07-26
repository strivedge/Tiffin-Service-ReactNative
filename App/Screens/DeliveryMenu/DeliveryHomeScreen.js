import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DeliveryDashboardComponents from '../../Components/DeliveryDashboardComponents/DeliveryDashboardComponents';
import {Colors} from '../../constants';
import DeliveryFooter from '../../Components/DeliveryFooter';

const DeliveryHomeScreen = props => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.primary}}>

    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <DeliveryDashboardComponents navigation={props.navigation} />
      <View
        style={{
          bottom: 0,
          position: 'absolute',
          backgroundColor: Colors.white,
        }}>
        <DeliveryFooter navigation={props.navigation} activeIndex={'0'} />
      </View>
    </View>
    </SafeAreaView>
  );
};

export default DeliveryHomeScreen;

const styles = StyleSheet.create({});
