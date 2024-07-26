import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CardDetailScreenComponents from '../../Components/CardDetailScreenComponents/CardDetailScreenComponents';
import { Colors } from '../../constants';

const CardDetailScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1,backgroundColor:Colors.primary}}>
          <View style={{flex: 1,backgroundColor: Colors.white}}>

      <CardDetailScreenComponents navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

export default CardDetailScreen;

const styles = StyleSheet.create({});
