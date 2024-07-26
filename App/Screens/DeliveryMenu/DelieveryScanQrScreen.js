import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DeliveryScanQrScreenComponents from '../../Components/DeliveryScanQrScreenComponents/DeliveryScanQrScreenComponents';
import {Colors} from '../../constants';
import DeliveryFooter from '../../Components/DeliveryFooter';

const DelieveryScanQrScreen = props => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.primary}}>
      <DeliveryScanQrScreenComponents navigation={props.navigation} />
      <View
        style={{
          bottom: 0,
          position: 'absolute',
          backgroundColor: Colors.white,
        }}>
        <DeliveryFooter navigation={props.navigation} activeIndex={'2'} />
      </View>
    </SafeAreaView>
  );
};

export default DelieveryScanQrScreen;

const styles = StyleSheet.create({});
