import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import Signupcomponent from '../../Components/Signupcomponent/Signupcomponent';
import ThemeProvider from '../../Components/ThemeProvider';
import {Colors} from '../../constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const Signup = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.primary}}>
        <KeyboardAwareScrollView style={{flex: 1}}>
          <ThemeProvider
            isHeader={true}
            headerText={'Sign Up'}
            subHeader={'Fresh Wholesome Meal to School'}
            navigation={navigation}
            isComponets={() => <Signupcomponent navigation={navigation} />}
          />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Signup;
