import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DeliveryHistoryComponets from '../../Components/DeliveryHistoryComponets/DeliveryHistoryComponets';
import {Colors} from '../../constants';
import DeliveryFooter from '../../Components/DeliveryFooter';

const DeliveryHistoryScreen = props => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.primary}}>

    <View style={{flex: 1, backgroundColor:"#f2f2f2"}}>
      <DeliveryHistoryComponets navigation={props.navigation} />
      <View
        style={{
          bottom: 0,
          position: 'absolute',
          backgroundColor: Colors.white,
        }}>
        <DeliveryFooter navigation={props.navigation} activeIndex={'1'} />
      </View>
    </View>
    </SafeAreaView>
  );
};

export default DeliveryHistoryScreen;

const styles = StyleSheet.create({});
