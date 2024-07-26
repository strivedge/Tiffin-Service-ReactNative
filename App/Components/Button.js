import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors, ScaleSizeUtils, TextFontSize} from '../constants';
import AppFonts from '../constants/Fonts';

export default function Button(props) {
  return (
    <TouchableOpacity
      style={[
        {
          width: '90%',
          alignSelf: 'center',
          marginTop: ScaleSizeUtils.MARGIN_DEAFULT_BOTTOM,
          backgroundColor: props.backgroundColor,
          borderRadius: 34,
        },
        props.buttonStyle,
      ]}
      onPress={() => {
        props.onPress();
      }}>
      <View
        style={{
          height: ScaleSizeUtils.DIMENSTION_LARGE * 1.2,
          borderRadius: 15,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={[
            {
              color: props.textColor,
              fontSize: TextFontSize.TEXT_SIZE_MEDIUM_20,
              fontFamily: AppFonts.FONT_INTER_REGULER,
            },
            props.textStyle,
          ]}>
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.black,
    height: ScaleSizeUtils.DIMENSTION_LARGE * 1.2,
    borderRadius: 34,
  },
});
