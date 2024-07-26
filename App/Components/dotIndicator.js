import {View, Text} from 'react-native';
import React from 'react';
import {Colors} from '../constants';

const DotIndicator = ({data}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 10,
      }}>
      {data?.map(() => (
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: Colors.primary,
              marginRight: 20,
              width: 10,
              height: 10,
              borderRadius: 50,
            }}
          />
        </View>
      ))}
    </View>
  );
};

export default DotIndicator;
