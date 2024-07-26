import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PaymentSuccessComponents from '../../Components/PaymentSuccessComponents/PaymentSuccessComponents';
import {Colors} from '../../constants';
import PaymentUnSuccessComponents from '../../Components/PaymentSuccessComponents/PaymentUnSuccessComponents';

const PaymentSuccessScreen = props => {
  let Data = props?.route?.params?.response;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.primary}}>
      <PaymentSuccessComponents navigation={props.navigation} />
      {/* {Data?.data?.auth_status == '0300' &&
      Data?.data?.transaction_error_type == 'success' ? (
        <PaymentSuccessComponents navigation={props.navigation} />
      ) : (
        <PaymentUnSuccessComponents navigation={props.navigation} />
      )} */}
    </SafeAreaView>
  );
};

export default PaymentSuccessScreen;

const styles = StyleSheet.create({});
