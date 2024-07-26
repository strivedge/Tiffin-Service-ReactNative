import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import Resetpasswordcomponent from '../../Components/Resetpasswordcomponent/Resetpasswordcomponent';
import ThemeProvider from '../../Components/ThemeProvider';
import {Colors} from '../../constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const Resetpassword = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.primary}}>
        <KeyboardAwareScrollView style={{flex: 1}}>
          <ThemeProvider
            isHeader={true}
            headerText={'Reset password'}
            subHeader={'Fresh Wholesome Meal to School'}
            navigation={navigation}
            isComponets={() => (
              <Resetpasswordcomponent navigation={navigation} />
            )}
          />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Resetpassword;
