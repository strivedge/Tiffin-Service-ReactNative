import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import Texinput from '../Texinput';
import Button from '../Button';
import {Formik} from 'formik';
import {loginValidationSchema} from '../../Helper/Utils';
import {Colors, ScaleSizeUtils} from '../../constants';
import SocialButton from '../SocialButton';
import {styles} from '../../Style/commonStyle';
import messaging, {firebase} from '@react-native-firebase/messaging';
import PrefManager from '../../Helper/PrefManager';
import {connect} from 'react-redux';
import {loginUser, clearUser, getToken} from '../../redux/actionTypes';
import Toast from 'react-native-simple-toast';
import ProgressLoader from '../ProgressLoader';
import {SLIDER_HIGHT} from '../VerificationComponets/VerificationComponets';
import ToastMeassage from '../ToastMeassage';
import DeviceInfo from 'react-native-device-info';

const SignIncomponent = props => {
  const {navigation, currentUser, clearUser, tokenDetail, getToken, loading} =
    props;
  const [isSecureActive, setIsSecureActive] = useState(true);
  const [toastmessage, setToastmessage] = useState({});
  const [isfocus, setFocus] = useState(false);
  const [isfocuspass, setFocuspass] = useState(false);
  const passwordRef = useRef(null);

  useEffect(() => {
    if (tokenDetail?.access_token?.length > 0) {
      PrefManager.setValue('@assess_token', tokenDetail?.access_token);
    }
  }, [tokenDetail]);

  const isValid = async values => {
    PrefManager.getValue('@fmctoken').then(id => {
      let request = {
        mobile_no: values.phone,
        password: values.password,
        device_id: id ? id : 'ABCD',
        device_name: Platform.OS == 'ios' ? 'ios' : 'android',
        // deviceData: {
        //   device_build_number: DeviceInfo.getBuildNumber(),
        //   device_system_name: DeviceInfo.getSystemName(),
        //   device_model: DeviceInfo.getModel(),
        //   device_system_version: DeviceInfo.getSystemVersion(),
        //   device_brand: DeviceInfo.getBrand(),
        //   device_id: DeviceInfo.getDeviceId(),
        // },
      };
      const data = {
        secret: '7a2af641381aa2adfc3393ae23c856ab',
      };
      // getToken(data);

      props.loginUser(request);
    });
  };

  useEffect(() => {
    requestUserPermission();
  }, []);

  useEffect(() => {
    if (currentUser?.api_status === 1 && currentUser?.data?.is_verified === 1) {
      PrefManager.setValue(
        '@customer_type',
        JSON.stringify(currentUser?.data?.id_cms_privileges),
      );
      PrefManager.setValue('@id', JSON.stringify(currentUser?.data?.id));
      PrefManager.setValue('@name', currentUser?.data?.name);
      PrefManager.setValue(
        '@photo',
        currentUser?.data?.photo == null ? '' : currentUser?.data?.photo,
      );
      PrefManager.setValue('@email', currentUser?.data?.email);
      PrefManager.setValue(
        '@country_code',
        currentUser?.data?.country_code == null
          ? ''
          : currentUser?.data?.country_code,
      );
      PrefManager.setValue(
        '@mobile_no',
        currentUser?.data?.mobile_no == null
          ? ''
          : currentUser?.data?.mobile_no,
      );
      PrefManager.setValue(
        '@dateofbirth',
        currentUser?.data?.dob == null ? '' : currentUser?.data?.dob,
      );
      PrefManager.setValue(
        '@gender',
        currentUser?.data?.gender == null ? '' : currentUser?.data?.gender,
      );
      PrefManager.setValue(
        '@students',
        JSON.stringify(currentUser?.data?.student),
      );
      clearUser();
      if (currentUser?.data?.id_cms_privileges == 2) {
        props.navigation.replace('AppDrawerStack');
      } else if (currentUser?.data?.id_cms_privileges == 3) {
        props.navigation.replace('DeliveryDrawerStack');
      }
    } else if (
      currentUser?.api_status === 0 &&
      currentUser?.data?.is_verified === 0
    ) {
      // Toast.show(currentUser?.api_message, Toast.LONG);
      ToastMeassage(currentUser?.api_message);
      clearUser();
      navigation.navigate('VerificationScreen', {
        reset: 'false',
        id: JSON.stringify(currentUser?.data?.id),
      });
    } else if (currentUser?.api_message?.length > 0) {
      ToastMeassage(currentUser?.api_message);
      // Toast.show(currentUser?.api_message, Toast.LONG);
      clearUser();
    }
  }, [currentUser?.api_message]);

  async function requestUserPermission() {
    const authorizationStatus = await messaging().requestPermission();

    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      getFCMToken();
      console.log('User has notification permissions enabled.');
    } else if (
      authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      console.log('User has provisional notification permissions.');
    } else {
      console.log('User has notification permissions disabled');
    }
  }

  const getFCMToken = async () => {
    try {
      // Get the token
      await firebase.messaging().registerDeviceForRemoteMessages();
      const token = await firebase.messaging().getToken();
      if (token) {
        PrefManager.setValue('@fmctoken', token);
      }
      console.log(token);
    } catch (e) {
      console.log(error);
    }
  };
  return (
    <View style={{marginTop: '70%'}}>
      <ProgressLoader loading={loading} />

      <ScrollView>
        <View style={styles.bottomView}>
          <Text>{toastmessage?.messageText}</Text>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{phone: '', password: ''}}
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
                  placeholder="Enter your phone number"
                  value={values.phone}
                  keyboardType={'number-pad'}
                  onTextChange={handleChange('phone')}
                  errorText={errors.phone}
                  touched={touched.phone}
                  blurOnSubmit={false}
                  isFocus={isfocus}
                  returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                  onSubmitEditing={() => {
                    passwordRef.current.focus();
                  }}
                  onFocus={() => {
                    setFocus(true);
                  }}
                  onBlur={() => {
                    setFocus(false);
                  }}
                />

                <Texinput
                  placeholder="Password"
                  ChangeActivationSecure={() => {
                    setIsSecureActive(!isSecureActive);
                  }}
                  value={values.password}
                  isSecureActive={isSecureActive}
                  isFocus={isfocuspass}
                  touched={touched.password}
                  onFocus={() => {
                    setFocuspass(true);
                  }}
                  onEndEditing={() => {
                    handleSubmit();
                  }}
                  refs={passwordRef}
                  returnKeyType="done"
                  onBlur={() => {
                    setFocuspass(false);
                  }}
                  isSecure
                  onTextChange={handleChange('password')}
                  errorText={errors.password}
                />
                <TouchableOpacity
                  onPress={() => navigation.navigate('VerificationScreen')}>
                  <Text style={styles.forgot}>Forgot Password ?</Text>
                </TouchableOpacity>
                <View style={{marginTop: 10}} />

                {/* <SocialButton
                  title="Continue with Google"
                  icon={require('../../assets/google.png')}
                />
                <SocialButton
                  title="Continue with Facebook"
                  icon={require('../../assets/facebook.png')}
                /> */}

                <View
                  style={{
                    width: '100%',
                    marginBottom: 10,
                    marginTop: ScaleSizeUtils.DIMEN_MARGIN_LARGE,
                  }}>
                  <Button
                    title="Sign In"
                    backgroundColor={Colors.black}
                    textColor={Colors.white}
                    onPress={() => handleSubmit()}
                  />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </View>
  );
};
const mapStateToProps = state => {
  return {
    loading: state.authUser.loading,
    tokenDetail: state.authUser.tokenDetail?.data,
    error: state.authUser.error && state.authUser.error,
    currentUser: state.authUser.currentUser && state.authUser.currentUser,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getToken: data => {
      dispatch(getToken(data));
    },
    loginUser: data => {
      dispatch(loginUser(data));
    },
    clearUser: data => {
      dispatch(clearUser(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIncomponent);
