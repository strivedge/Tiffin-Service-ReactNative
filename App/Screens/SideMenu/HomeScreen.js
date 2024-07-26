import {View, Text} from 'react-native';
import React from 'react';
import HomeScreenComponents from '../../Components/HomeScreenComponents/HomeScreenComponents';

const HomeScreen = props => {
  return (
    <View style={{flex: 1}}>
      <HomeScreenComponents navigation={props.navigation} />
    </View>
  );
};

export default HomeScreen;
