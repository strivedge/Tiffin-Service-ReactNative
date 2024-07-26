import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Button from '../Button';
import { Colors, ScaleSizeUtils } from '../../constants';
import { styles } from '../../Style/commonStyle';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';

import {
  resendCoderequest,
  clearCoderequest,
  verifyCoderequest,
  clearverifyCoderequest,
} from '../../redux/actionTypes';
import { useRoute } from '@react-navigation/native';
import { SLIDER_HIGHT } from '../VerificationComponets/VerificationComponets';
import ProgressLoader from '../ProgressLoader';
import ToastMessage from '../ToastMeassage';

const OtpScreencomponent = props => {
  const {
    navigation,
    verifyOTP,
    resendOTP,
    resendCoderequest,
    verifyCoderequest,
    clearCoderequest,
    clearverifyCoderequest,
    loading,
  } = props;

  const route = useRoute();

  const { otp, id, reset } = route.params;

  const [otpcode, setOtpCode] = useState('');

  useEffect(() => {
    // setOtpCode(otp);
  }, []);

  const VerifyCode = async () => {
    if (otpcode.length > 0 && id.length > 0) {
      verifyCoderequest(`?id=${id}&otp=${otpcode}`);
    } else {
      ToastMessage('Please enter valid OTP!');
      // Toast.show('Please enter valid OTP!', Toast.LONG);
    }
  };

  useEffect(() => {
    if (resendOTP?.api_status === 1) {
      ToastMessage(resendOTP?.api_message);
      // Toast.show(resendOTP?.api_message, Toast.LONG);
      // setOtpCode(JSON.stringify(resendOTP?.data?.otp));
      clearCoderequest();
    } else if (resendOTP?.api_status === 0) {
      ToastMessage(resendOTP?.api_message);

      // Toast.show(resendOTP?.api_message, Toast.LONG);
      clearCoderequest();
    }
  }, [resendOTP]);

  const resendCode = async () => {
    if (id.length > 0) {
      const data = {
        id: id,
      };
      resendCoderequest(data);
    }
  };

  useEffect(() => {
    if (verifyOTP?.api_status === 1) {
      ToastMessage(verifyOTP?.api_message);

      // Toast.show(verifyOTP?.api_message, Toast.LONG);
      clearverifyCoderequest();
      if (reset === 'true') {
        setTimeout(() => {
          navigation.replace('Resetpassword', { id: id });
        }, 1000);
      } else {
        setTimeout(() => {
          navigation.replace('SignIn');
        }, 1000);
      }
    } else if (verifyOTP?.api_status === 0) {
      ToastMessage(verifyOTP?.api_message);

      // Toast.show(verifyOTP?.api_message, Toast.LONG);
      clearverifyCoderequest();
    }
  }, [verifyOTP]);
  return (
    <View style={{ marginTop: SLIDER_HIGHT / 4 }}>
      <ProgressLoader loading={loading} />

      <View style={styles.bottomView}>
        <Image
          source={require('../../assets/lockmeal.png')}
          style={styles.lock}
        />


        <OTPInputView
          style={styles.otp}
          // code={otpcode}
          pinCount={4}
          keyboardType="phone-pad"
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={code => {
            console.log("CODE+>" + JSON.stringify(code));
            setOtpCode(code);
          }}
        />
        <TouchableOpacity onPress={() => resendCode()}>
          <Text style={styles.resend}>Resend</Text>
        </TouchableOpacity>

        <View
          style={{
            width: '100%',
            marginBottom: 10,
            marginTop: ScaleSizeUtils.DIMENSTION_LARGE,
          }}>
          <Button
            title="Confirm"
            backgroundColor={Colors.black}
            textColor={Colors.white}
            onPress={() => VerifyCode()}

          // onPress={() => navigation.navigate('Resetpassword')}
          />
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.authUser.loading,
    error: state.authUser.error && state.authUser.error,
    resendOTP: state.authUser.resendOTP && state.authUser.resendOTP,
    verifyOTP: state.authUser.verifyOTP && state.authUser.verifyOTP,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    resendCoderequest: data => {
      dispatch(resendCoderequest(data));
    },
    clearCoderequest: data => {
      dispatch(clearCoderequest(data));
    },
    verifyCoderequest: data => {
      dispatch(verifyCoderequest(data));
    },
    clearverifyCoderequest: data => {
      dispatch(clearverifyCoderequest(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OtpScreencomponent);
