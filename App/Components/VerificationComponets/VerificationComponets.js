import React, {useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';
import Texinput from '../Texinput';
import Button from '../Button';
import Utils, {forgetpassValidationSchema} from '../../Helper/Utils';
import {Formik} from 'formik';
import {Colors, ScaleSizeUtils} from '../../constants';
import {styles} from '../../Style/commonStyle';
import Toast from 'react-native-simple-toast';
import {forgotPassword, clearforgotPassword} from '../../redux/actionTypes';
import {connect} from 'react-redux';
import ProgressLoader from '../ProgressLoader';
import ToastMessage from '../ToastMeassage';
export const SLIDER_HIGHT = Dimensions.get('window').height;

const VerificationComponets = props => {
  const {navigation, forgotPassword, clearforgotPassword, forgetPass, loading} =
    props;

  const isValid = async values => {
    if (Utils.isNetworkAvailable()) {
      let request = {
        mobile_no: values.mobile,
      };
      forgotPassword(request);
    }
  };

  useEffect(() => {
    if (forgetPass?.api_status === 1) {
      ToastMessage(forgetPass?.api_message);
      // Toast.show(forgetPass?.api_message, Toast.LONG);
      clearforgotPassword();
      setTimeout(() => {
        navigation.replace('OtpScreen', {
          reset: 'true',
          id: JSON.stringify(forgetPass?.data?.id),
          otp: JSON.stringify(forgetPass?.data?.otp),
        });
      }, 2500);
    } else if (forgetPass?.api_status === 0) {
      ToastMessage(forgetPass?.api_message);
      // Toast.show(forgetPass?.api_message, Toast.LONG);
      clearforgotPassword();
    }
  }, [forgetPass]);

  const [isfocusmobile, setFocusmobile] = useState(false);

  return (
    <View
      style={[styles.bottomView, {marginTop: SLIDER_HIGHT / 2.5, bottom: 0}]}>
      <ProgressLoader loading={loading} />

      <Formik
        validationSchema={forgetpassValidationSchema}
        initialValues={{mobile: ''}}
        onSubmit={values => isValid(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <Texinput
              placeholder="Enter your mobile number"
              value={values.mobile}
              touched={touched.mobile}
              keyboardType={'number-pad'}
              returnKeyType="done"
              onSubmitEditing={() => {
                handleSubmit();
              }}
              onTextChange={handleChange('mobile')}
              errorText={errors.mobile}
              isFocus={isfocusmobile}
              onFocus={() => {
                setFocusmobile(true);
              }}
              onBlur={() => {
                setFocusmobile(false);
              }}
            />
            <View
              style={{
                width: '100%',
                marginBottom: 10,
                marginTop: ScaleSizeUtils.DIMENSTION_LARGE,
              }}>
              <Button
                title="Send"
                backgroundColor={Colors.black}
                textColor={Colors.white}
                onPress={() => {
                  handleSubmit();
                }}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.authUser.loading,
    error: state.authUser.error && state.authUser.error,
    forgetPass: state.authUser.forgetPass && state.authUser.forgetPass,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    forgotPassword: data => {
      dispatch(forgotPassword(data));
    },
    clearforgotPassword: data => {
      dispatch(clearforgotPassword(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VerificationComponets);
