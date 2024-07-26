import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import BottomTab from '../../Components/BottomTab';
import HomeScreenComponents from '../../Components/HomeScreenComponents/HomeScreenComponents';
import {Colors} from '../../constants';

function HomeScreen(props) {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.primary}}>

    <View style={{flex: 1, backgroundColor:"#f2f2f2"}}>
      <HomeScreenComponents navigation={props.navigation} />
      <View
        style={{
          bottom: 0,
          position: 'absolute',
          backgroundColor: Colors.white,
        }}>
        <BottomTab navigation={props.navigation} activeIndex={'0'} />
      </View>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default HomeScreen;
