import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ThemeProvider from '../../Components/ThemeProvider';
import AddChildScreenComponets from '../../Components/AddChildScreenComponets/AddChildScreenComponets';
import {Colors} from '../../constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function AddchildScreen({navigation}) {
  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.primary}}>
        <KeyboardAwareScrollView style={{flex: 1}}>
          <ThemeProvider
            isHeader={true}
            headerText={'Enter your child detail'}
            subHeader={'Fresh Wholesome Meal to School'}
            navigation={navigation}
            isComponets={() => (
              <AddChildScreenComponets navigation={navigation} />
            )}
          />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({});
