import React from 'react';
import {View, Text} from 'react-native';
import Splashcomponents from '../../Components/Splashscreen/Splashcomponents';
const SplashScreen = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <Splashcomponents navigation={navigation} />
    </View>
  );
};

export default SplashScreen;
