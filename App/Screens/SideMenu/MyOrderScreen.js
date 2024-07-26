import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MyOrderScreenComponents from '../../Components/MyOrderScreenComponents/MyOrderScreenComponents';
import BottomTab from '../../Components/BottomTab';
import {Colors} from '../../constants';

export default function MyOrderScreen({navigation}) {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.primary}}>

    <View style={{flex: 1, backgroundColor:"#f2f2f2"}}>
      <MyOrderScreenComponents navigation={navigation} />
      <View
        style={{
          bottom: 0,
          position: 'absolute',
          backgroundColor: Colors.white,
        }}>
        <BottomTab navigation={navigation} activeIndex={'2'} />
      </View>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
