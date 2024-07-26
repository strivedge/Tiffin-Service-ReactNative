import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MenuViewScreenComponents from '../../Components/MenuViewScreenComponents/MenuViewScreenComponents';
import { Colors } from '../../constants';

const MenuViewScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1,backgroundColor:Colors.primary}}>
          < View style={{flex: 1,backgroundColor:"#f2f2f2"}}>

      <MenuViewScreenComponents navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

export default MenuViewScreen;

const styles = StyleSheet.create({});
