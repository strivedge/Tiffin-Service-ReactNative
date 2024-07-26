import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AppFonts from '../constants/Fonts';
import {Colors, ScaleSizeUtils} from '../constants';
import {RFPercentage} from 'react-native-responsive-fontsize';

const SuccessBtn = props => {
  return (
    <TouchableOpacity
      style={[styles.subsribebTn, {backgroundColor: props.backgroundColor}]}
      onPress={() => props.onPress()}>
      <Text style={[styles.subsribetxt, {color: props.textColor}]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default SuccessBtn;

const styles = StyleSheet.create({
  title: {
    padding: 10,
    fontSize: RFPercentage(2.5),
    fontFamily: AppFonts.FONT_INTER_BOLD,
    color: Colors.black,
  },
  subsribebTn: {
    backgroundColor: Colors.green,
    alignItems: 'center',
    alignContent: 'center',
    padding: 10,
    borderRadius: 5,
  },
  subsribetxt: {
    fontFamily: AppFonts.FONT_INTER_MEDIUM,
    fontSize: RFPercentage(2.5),
    color: Colors.white,
  },
});
