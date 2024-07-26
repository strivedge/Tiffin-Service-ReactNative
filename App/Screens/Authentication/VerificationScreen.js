import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import ThemeProvider from '../../Components/ThemeProvider';

import VerificationComponets from '../../Components/VerificationComponets/VerificationComponets';
import {Colors} from '../../constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const VerificationScreen = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.primary}}>
        <KeyboardAwareScrollView style={{flex: 1}}>
          <ThemeProvider
            isHeader={true}
            headerText={'Verification'}
            subHeader={'Fresh Wholesome Meal to School'}
            navigation={navigation}
            isComponets={() => (
              <VerificationComponets navigation={navigation} />
            )}
          />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>

    // <View style={{flex: 1}}>
    //   <Verifycomponent navigation={navigation} />
    // </View>
  );
};

export default VerificationScreen;
