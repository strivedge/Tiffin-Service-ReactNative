import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from './Header';
import {Colors} from '../constants';
import AppFonts from '../constants/Fonts';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

export default function ThemeProvider(props) {
  const {isComponets, navigation} = props;
  return (
    <View style={{backgroundColor: Colors.primary, flex: 1}}>
      {props.isHeader && <Header navigation={navigation} />}
       
        <StatusBar backgroundColor={Colors.primary} />
        <View style={{width: '90%', alignSelf: 'center', flex: 0.2}}>
          {props.headerText && (
            <View style={{marginTop: '8%'}}>
              <Text style={styles.headerText}>{props.headerText}</Text>
            </View>
          )}
          {props.subHeader && (
            <View style={{marginTop: '2%'}}>
              <Text style={styles.subHeader}>{props.subHeader}</Text>
            </View>
          )}
        </View>
        <View style={{flex: 0.8}}>
          {props.isComponets && (
            <View style={{marginTop: 20, bottom: 0}}>{isComponets()}</View>
          )}
        </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontFamily: AppFonts.FONT_INTER_BOLD,
    color: Colors.white,
    fontSize: RFPercentage(3.5),
  },
  subHeader: {
    fontFamily: AppFonts.FONT_INTER_REGULER,
    color: Colors.white,
    fontSize: RFPercentage(2.5),
  },
});
