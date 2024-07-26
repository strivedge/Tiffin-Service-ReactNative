import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import OrderDetailsScreenComponents from '../../Components/OrderDetailsScreenComponents/OrderDetailsScreenComponents';
import { Colors } from '../../constants';

const OrderDetailScreen = props => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.primary}}>

    <View style={{flex: 1 , backgroundColor:"#f2f2f2"}}>
      <OrderDetailsScreenComponents navigation={props.navigation} />
    </View>
    </SafeAreaView>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({});
