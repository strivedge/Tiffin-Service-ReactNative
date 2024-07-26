import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CalendarComponets from '../../Components/CalendarComponents/CalendarComponets';
import BottomTab from '../../Components/BottomTab';
import {Colors} from '../../constants';

export default function CalendarScreen({navigation}) {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.primary}}>
      <View style={{flex: 1, backgroundColor: Colors.white}}>
        <CalendarComponets navigation={navigation} />
        <View
          style={{
            bottom: 0,
            position: 'absolute',
            backgroundColor: Colors.white,
          }}>
          <BottomTab navigation={navigation} activeIndex={'1'} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
