import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import Texinput from '../Texinput';
import Toast from 'react-native-simple-toast';
import Button from '../Button';
import Utils, {resetPassValidationSchema} from '../../Helper/Utils';
import {Formik} from 'formik';
import {Colors, ScaleSizeUtils} from '../../constants';
import {styles} from '../../Style/commonStyle';
import {useRoute} from '@react-navigation/native';
import {resetPassword, clearResetPassword} from '../../redux/actionTypes';
import {connect} from 'react-redux';
import {SLIDER_HIGHT} from '../VerificationComponets/VerificationComponets';
import ProgressLoader from '../ProgressLoader';
import ToastMessage from '../ToastMeassage';

const Resetpasswordcomponent = props => {
  const {navigation, resetPass, resetPassword, clearResetPassword} = props;
  const route = useRoute();
  const {id} = route.params;
  const [isSecureActive, setIsSecureActive] = useState(true);
  const [isCSecureActive, setIsCSecureActive] = useState(true);
  const [isfocusrepass, setFocusrepass] = useState(false);
  const [isfocusconfipass, setFocusconfipass] = useState(false);

  const isValid = async values => {
    if (id.length > 0) {
      if (Utils.isNetworkAvailable()) {
        let request = {
          id: id,
          password: values.password,
          confirm_password: values.confirmpassword,
        };
        resetPassword(request);
      }
    }
  };

  useEffect(() => {
    if (resetPass?.api_status === 1) {
      ToastMessage(resetPass?.api_message);
      // Toast.show(resetPass?.api_message, Toast.LONG);
      clearResetPassword();
      navigation.replace('SignIn');
    } else if (resetPass?.api_status === 0) {
      ToastMessage(resetPass?.api_message);

      // Toast.show(resetPass?.api_message, Toast.LONG);
      clearResetPassword();
    }
  }, [resetPass]);

  const confirmPassword = useRef(null);

  return (
    <View style={{marginTop: SLIDER_HIGHT / 3}}>
      <View style={styles.bottomView}>
        <ProgressLoader loading={props.loading} />

        <Formik
          validationSchema={resetPassValidationSchema}
          initialValues={{password: '', confirmpassword: ''}}
          onSubmit={values => isValid(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={{marginTop: '5%'}}>
              <View>
                <Texinput
                  placeholder="Password"
                  ChangeActivationSecure={() => {
                    setIsSecureActive(!isSecureActive);
                  }}
                  returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                  onSubmitEditing={() => {
                    confirmPassword.current.focus();
                  }}
                  touched={touched.password}
                  isFocus={isfocusrepass}
                  onFocus={() => {
                    setFocusrepass(true);
                  }}
                  onBlur={() => {
                    setFocusrepass(false);
                  }}
                  value={values.password}
                  isSecureActive={isSecureActive}
                  isSecure
                  onTextChange={handleChange('password')}
                  errorText={errors.password}
                />
                <Texinput
                  placeholder="Confirm Password"
                  ChangeActivationSecure={() => {
                    setIsCSecureActive(!isCSecureActive);
                  }}
                  onEndEditing={() => {
                    handleSubmit();
                  }}
                  refs={confirmPassword}
                  returnKeyType="done"
                  touched={touched.confirmpassword}
                  isFocus={isfocusconfipass}
                  onFocus={() => {
                    setFocusconfipass(true);
                  }}
                  onBlur={() => {
                    setFocusconfipass(false);
                  }}
                  value={values.confirmpassword}
                  isSecureActive={isCSecureActive}
                  isSecure
                  onTextChange={handleChange('confirmpassword')}
                  errorText={errors.confirmpassword}
                />

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
                    onPress={() => handleSubmit()}
                  />
                </View>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};
const mapStateToProps = state => {
  return {
    loading: state.authUser.loading,
    resetPass: state.authUser.resetPass && state.authUser.resetPass,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    resetPassword: data => {
      dispatch(resetPassword(data));
    },
    clearResetPassword: data => {
      dispatch(clearResetPassword(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Resetpasswordcomponent);
