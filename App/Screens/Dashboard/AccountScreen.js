import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ProfileScreenComponets from '../../Components/ProfileScreenComponets/ProfileScreenComponets';
import BottomTab from '../../Components/BottomTab';
import {Colors} from '../../constants';

export default function AccountScreen({navigation}) {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.primary}}>

    <View style={{flex: 1}}>
      <ProfileScreenComponets navigation={navigation} />
      <View
        style={{
          bottom: 0,
          position: 'absolute',
          backgroundColor: Colors.white,
        }}>
        <BottomTab navigation={props.navigation} activeIndex={'4'}/>
      </View>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
