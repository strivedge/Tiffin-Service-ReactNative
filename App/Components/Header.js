import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const Header = ({navigation}) => {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={require('../assets/back.png')} style={styles.back} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  back: {
    height: 30,
    width: 30,
    tintColor: 'white',
    marginTop: 5,
    left: 20,
  },
});
