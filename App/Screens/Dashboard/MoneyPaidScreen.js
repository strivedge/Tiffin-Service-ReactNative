import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MoneyPaidScreenComponents from '../../Components/MoneyPaidScreenComponents/MoneyPaidScreenComponents';
import { Colors } from '../../constants';

const MoneyPaidScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.primary}}>

    <View style={{flex: 1,   backgroundColor:"#f2f2f2"}}>
      <MoneyPaidScreenComponents navigation={navigation} />
    </View>
    </SafeAreaView>
  );
};

export default MoneyPaidScreen;

const styles = StyleSheet.create({});
