import React from 'react';
import {View, Text} from 'react-native';
import Welcomecomponent from '../../Components/Welcomecomponent/Welcomecoponent';
const Welcomescreen = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <Welcomecomponent navigation={navigation} />
    </View>
  );
};

export default Welcomescreen;
