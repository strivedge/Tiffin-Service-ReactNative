import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import OtpScreencomponent from '../../Components/OtpScreencomponent/OtpScreencomponents';
import ThemeProvider from '../../Components/ThemeProvider';
import {Colors} from '../../constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const OtpScreen = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.primary}}>
        <KeyboardAwareScrollView style={{flex: 1}}>
          <ThemeProvider
            isHeader={true}
            headerText={'Enter Code'}
            subHeader={'Fresh Wholesome Meal to School'}
            navigation={navigation}
            isComponets={() => <OtpScreencomponent navigation={navigation} />}
          />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>

    // <View style={{flex: 1}}>
    //   <OtpScreencomponent navigation={navigation} />
    // </View>
  );
};

export default OtpScreen;
