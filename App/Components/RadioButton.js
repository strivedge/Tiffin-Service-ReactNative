import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  ScrollView,
} from 'react-native';
import {Colors} from '../constants';
import AppFonts from '../constants/Fonts';
const s = StyleSheet.create({
  container: {
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  radioText: {
    marginRight: 35,
    fontSize: 18,
    fontFamily: AppFonts.FONT_INTER_REGULER,
    color: Colors.gray,
  },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedRb: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.primary,
  },
  result: {
    marginTop: 20,
    color: 'white',
    fontWeight: '600',
    backgroundColor: '#F3FBFE',
  },
});
class RadioButton extends Component<props> {
  springValue = new Animated.Value(0.5);
  spring = () => {
    Animated.spring(this.springValue, {
      toValue: 0.95,
      friction: 2,
      tension: 15,
      useNativeDriver: false,
    }).start();
  };
  render() {
    const {PROP, radioStyle, value, type} = this.props;
    const isValue =
      type == 'value' ? value && value.toString().toLowerCase() : value;
    // console.log('isValue',isValue);
    return (
      <View style={{flex: 1}}>
        <ScrollView
          style={radioStyle}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {PROP.map(res => {
            return (
              <View id={res.id} style={s.container}>
                <TouchableOpacity
                  style={s.radioCircle}
                  onPress={() => {
                    this.props.onChange(type == 'value' ? res.name : res.id),
                      this.spring();
                  }}>
                  {isValue ==
                    (type == 'value' ? res.name.toLowerCase() : res.id) && (
                    <Animated.View
                      style={[
                        s.selectedRb,
                        {transform: [{scale: this.springValue}]},
                      ]}
                      onLayout={() => {
                        this.springValue = new Animated.Value(0.5);
                      }}
                    />
                  )}
                </TouchableOpacity>
                <Text style={s.radioText}>{res.name}</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

export default RadioButton;
