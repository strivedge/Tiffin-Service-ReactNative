import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Colors, ScaleSizeUtils} from '../../constants';
import Button from '../Button';
import Texinput from '../Texinput';
import {styles} from '../../Style/commonStyle';
import ProgressLoader from '../ProgressLoader';
import {Formik} from 'formik';
import Toast from 'react-native-simple-toast';
import PrefManager from '../../Helper/PrefManager';
import {
  clearUpdatePasswordRequest,
  getUpdatePasswordRequest,
} from '../../redux/nonAuth/actions';
import {connect} from 'react-redux';
import {navigationRef} from '../../Navigation/NavigationHelper';
import ToastMessage from '../ToastMeassage';

const ChangePasswordComponets = props => {
  const {
    clearUpdatePasswordRequest,
    getUpdatePasswordRequest,
    getPasswordUpdate,
    navigation,
  } = props;
  const [isSecureActive, setIsSecureActive] = useState(true);
  const [toastmessage, setToastmessage] = useState(false);
  const [isfocus, setFocus] = useState(false);
  const [isfocuspass, setFocuspass] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isNewSecureActive, setIsNewSecureActive] = useState(true);
  const [isOldSecureActive, setIsOldSecureActive] = useState(true);

  const [oldPasswordError, setOldPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [isConfirmfocuspass, setFocusConfirmpass] = useState(false);
  const [isfocusNewpass, setFocusNewpass] = useState(false);
  function checkPassword(str) {
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(str);
  }

  const handleSubmit = async () => {
    if (oldPassword.length <= 0) {
      setOldPasswordError('Old password required.');
    } else if (!checkPassword(oldPassword)) {
      setOldPasswordError('Enter Valid Password');
    } else if (newPassword.length <= 0) {
      setOldPasswordError('');
      setNewPasswordError('New password required.');
    } else if (!checkPassword(newPassword)) {
      setNewPasswordError('Enter Valid Password');
    } else if (confirmPassword.length <= 0) {
      setNewPasswordError('');
      setConfirmPasswordError('Confirm password required.');
    } else if (!checkPassword(confirmPassword)) {
      setConfirmPasswordError('Enter Valid Password');
    } else if (newPassword !== confirmPassword) {
      setConfirmPasswordError('');
      ToastMessage('Password and Confirm Password does not match');
      // Toast.show('Password and Confirm Password does not match', Toast.LONG);
    } else {
      setConfirmPasswordError('');
      const id = await PrefManager.getValue('@id');
      const data = {
        id: id,
        old_password: oldPassword,
        new_password: newPassword,
      };
      getUpdatePasswordRequest(data);
    }
  };

  useEffect(() => {
    if (getPasswordUpdate.api_status == 1) {
      ToastMessage(getPasswordUpdate?.api_message);
      // Toast.show(getPasswordUpdate?.api_message, Toast.LONG);
      clearUpdatePasswordRequest();
      setTimeout(() => {
        navigation.navigate('MyAcountScreen');
      }, 1000);
    } else if (getPasswordUpdate.api_status == 0) {
      ToastMessage(getPasswordUpdate?.api_message);

      // Toast.show(getPasswordUpdate?.api_message, Toast.LONG);
      clearUpdatePasswordRequest();
    }
  }, [getPasswordUpdate]);

  const newPassref = useRef(null);
  const confirmPassref = useRef(null);

  return (
    <View style={{marginTop: '40%'}}>
      <ScrollView>
        <View style={styles.bottomView}>
          <View>
            <Texinput
              placeholder="Old password"
              value={oldPassword}
              returnKeyType={'next'}
              onSubmitEditing={() => {
                newPassref.current.focus();
              }}
              onTextChange={text => setOldPassword(text)}
              ChangeActivationSecure={() => {
                setIsSecureActive(!isSecureActive);
              }}
              isSecureActive={isSecureActive}
              touched={true}
              isFocus={isfocus}
              isSecure
              onFocus={() => {
                setFocus(true);
              }}
              onBlur={() => {
                setFocus(false);
              }}
              errorText={oldPasswordError}
            />

            <Texinput
              placeholder="New password"
              ChangeActivationSecure={() => {
                setIsNewSecureActive(!isNewSecureActive);
              }}
              refs={newPassref}
              returnKeyType={'next'}
              onSubmitEditing={() => {
                confirmPassref.current.focus();
              }}
              touched={true}
              value={newPassword}
              isSecureActive={isNewSecureActive}
              isFocus={isfocusNewpass}
              onFocus={() => {
                setFocusNewpass(true);
              }}
              onBlur={() => {
                setFocusNewpass(false);
              }}
              errorText={newPasswordError}
              isSecure
              onTextChange={text => setNewPassword(text)}
            />

            <Texinput
              placeholder="Confirm password"
              ChangeActivationSecure={() => {
                setIsOldSecureActive(!isOldSecureActive);
              }}
              refs={confirmPassref}
              returnKeyType={'done'}
              onSubmitEditing={() => {
                handleSubmit();
              }}
              errorText={confirmPasswordError}
              value={confirmPassword}
              isSecureActive={isOldSecureActive}
              isFocus={isConfirmfocuspass}
              touched={true}
              onFocus={() => {
                setFocusConfirmpass(true);
              }}
              onBlur={() => {
                setFocusConfirmpass(false);
              }}
              isSecure
              onTextChange={text => setConfirmPassword(text)}
            />

            <View style={{marginTop: 10}} />

            <View
              style={{
                width: '100%',
                marginBottom: 10,
                marginTop: ScaleSizeUtils.DIMEN_MARGIN_LARGE,
              }}>
              <Button
                title="Change Password"
                backgroundColor={Colors.black}
                textColor={Colors.white}
                onPress={() => handleSubmit()}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    getPasswordUpdate: state.nonAuth.getPasswordUpdate,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    clearUpdatePasswordRequest: data => {
      dispatch(clearUpdatePasswordRequest(data));
    },
    getUpdatePasswordRequest: data => {
      dispatch(getUpdatePasswordRequest(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangePasswordComponets);
