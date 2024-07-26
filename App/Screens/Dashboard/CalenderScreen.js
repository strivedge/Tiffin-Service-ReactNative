import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CalendarComponets from '../../Components/CalendarComponents/CalendarComponets';
import BottomTab from '../../Components/BottomTab';
import {Colors} from '../../constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function CalenderScreen({navigation}) {
  return (
    <View style={{flex: 1, backgroundColor: '#f2f2f2'}}>
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.primary}}>
        <KeyboardAwareScrollView style={{flex: 1}}>
          <CalendarComponets navigation={navigation} />
          <View
            style={{
              bottom: 0,
              position: 'absolute',
              backgroundColor: Colors.white,
            }}>
            <BottomTab navigation={props.navigation} activeIndex={'1'} />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({});
