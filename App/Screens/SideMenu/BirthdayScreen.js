import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BirthdayScreenComponets from '../../Components/BirthdayScreenComponets/BirthdayScreenComponets';
import {Colors} from '../../constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function BirthdayScreen({navigation}) {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.primary}}>
      <View style={{flex: 1, backgroundColor: Colors.white}}>
          <BirthdayScreenComponets navigation={navigation} />
       </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
