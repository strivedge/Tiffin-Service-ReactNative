import React from 'react';
import {View, Text, SafeAreaView, KeyboardAvoidingView} from 'react-native';
import SignIncomponent from '../../Components/SignIncomponent/SignIncomponent';
import ThemeProvider from '../../Components/ThemeProvider';
import {Colors} from '../../constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const SignIn = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.primary}}>
        <KeyboardAwareScrollView style={{flex: 1}}>
          <ThemeProvider
            isHeader={true}
            headerText={'Sign In'}
            subHeader={'Fresh Wholesome Meal to School'}
            navigation={navigation}
            isComponets={() => <SignIncomponent navigation={navigation} />}
          />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
};

export default SignIn;
