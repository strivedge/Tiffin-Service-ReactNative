import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function SocialButton(props) {
  return (
    <View style={{overflow: 'hidden', paddingBottom: 5}}>
      <View style={styles.continue}>
        <Image source={props.icon} style={styles.icon} />
        <Text style={styles.continuetxt}>{props.title}</Text>
        <Image
          source={require('../assets/arrowgrow.png')}
          style={styles.icon}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  continuetxt: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  continue: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 34,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    padding: 15,
    marginTop: 15,
  },
  icon: {
    height: 30,
    width: 30,
  },
});
