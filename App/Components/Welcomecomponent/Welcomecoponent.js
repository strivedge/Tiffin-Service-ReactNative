import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StatusBar, Animated} from 'react-native';
import {connect} from 'react-redux';
import {Colors, ScaleSizeUtils} from '../../constants';
import PrefManager from '../../Helper/PrefManager';
import {getToken} from '../../redux/actionTypes';
import {styles} from '../../Style/commonStyle';
import Button from '../Button';

const Welcomecomponent = props => {
  const width = new Animated.Value(600);
  const height = new Animated.Value(300);
  const {navigation, tokenDetail, getToken} = props;

  useEffect(() => {
    animationCall();
    setTimeout(() => {
      TokenAPII();
    }, 1000);
  }, []);

  const TokenAPII = () => {
    const data = {
      secret: '7a2af641381aa2adfc3393ae23c856ab',
    };
    getToken(data);
  };

  useEffect(() => {
    if (tokenDetail?.access_token?.length > 0) {
      PrefManager.setValue('@assess_token', tokenDetail?.access_token);
    }
  }, [tokenDetail]);

  const animationCall = async () => {
    Animated.spring(width, {
      toValue: 300,
      useNativeDriver: false,
    }).start();
    Animated.spring(height, {
      toValue: 80,
      useNativeDriver: false,
    }).start();
    Animated.spring(width, {
      toValue: 200,
      useNativeDriver: false,
    }).start();
    Animated.spring(height, {
      toValue: 70,
      useNativeDriver: false,
    }).start();
    Animated.spring(width, {
      toValue: 300,
      useNativeDriver: false,
    }).start();
    Animated.spring(height, {
      toValue: 60,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'white'} />
      <View style={styles.imagecontainer}>
        <Animated.Image
          source={require('../../assets/Whatameal.png')}
          style={{
            width: width,
            height: height,
            marginTop: 150,
            alignSelf: 'center',
          }}
        />
      </View>
      <View style={[styles.welcomecontainer]}>
        <Text style={styles.welcome}>Fresh Wholesome Meal to School</Text>
        <Text style={styles.text}></Text>
        <View style={styles.signview}>
          <View style={{width: '50%'}}>
            <Button
              title="Sign In"
              backgroundColor={Colors.black}
              textColor={Colors.white}
              onPress={() => navigation.navigate('SignIn')}
            />
          </View>
          <View style={{width: '50%'}}>
            <Button
              title="Sign Up"
              backgroundColor={Colors.white}
              textColor={Colors.black}
              onPress={() => navigation.navigate('Signup')}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.authUser.loading,
    tokenDetail: state.authUser.tokenDetail?.data,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getToken: data => {
      dispatch(getToken(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Welcomecomponent);
