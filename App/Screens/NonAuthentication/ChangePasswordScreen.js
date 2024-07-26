import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ThemeProvider from '../../Components/ThemeProvider';
import {Colors} from '../../constants';
import ChangePasswordComponets from '../../Components/ChangePasswordComponets/ChangePasswordComponets';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ChangePasswordScreen = ({navigation}) => {
  return (
    <KeyboardAwareScrollView style={{flex: 1}}>
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.primary}}>
        <ThemeProvider
          isHeader={true}
          headerText={'Change your password'}
          subHeader={'Fresh Wholesome Meal to School'}
          navigation={navigation}
          isComponets={() => (
            <ChangePasswordComponets navigation={navigation} />
          )}
        />
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({});
