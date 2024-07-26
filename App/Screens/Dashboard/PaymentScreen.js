import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PaymentScreenComponent from '../../Components/PaymentScreenComponents/PaymentScreenComponent';
import {Colors} from '../../constants';
import BottomTab from '../../Components/BottomTab';

export default function PaymentScreen(props) {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.primary}}>

    <View style={{flex: 1,backgroundColor:"#f2f2f2"}}>
      <PaymentScreenComponent navigation={props.navigation} />

      <View
        style={{
          bottom: 0,
          position: 'absolute',
          backgroundColor: Colors.white,
        }}>
        <BottomTab navigation={props.navigation} activeIndex={'3'} />
      </View>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
