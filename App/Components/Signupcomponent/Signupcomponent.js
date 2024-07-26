import React, {useCallback, useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Alert,
  Platform,
  BackHandler,
  AppState,
} from 'react-native';
import Texinput from '../Texinput';
import Button from '../Button';
import {SignUpValidationSchema} from '../../Helper/Utils';
import {Formik} from 'formik';
import {Colors, ScaleSizeUtils} from '../../constants';
import {styles} from '../../Style/commonStyle';
import PrefManager from '../../Helper/PrefManager';
import {useFocusEffect} from '@react-navigation/native';
import {
  getSchool,
  registerUser,
  clearRegisterUser,
} from '../../redux/actionTypes';
import Toast from 'react-native-simple-toast';

import {connect} from 'react-redux';
import messaging, {firebase} from '@react-native-firebase/messaging';
import ProgressLoader from '../ProgressLoader';
import DotIndicator from '../dotIndicator';
import Dots from 'react-native-dots-pagination';
import ToastMessage from '../ToastMeassage';
import DeviceInfo from 'react-native-device-info';

const Signupcomponent = props => {
  const {
    navigation,
    getSchool,
    schoolDetail,
    registerUser,
    clearRegisterUser,
    registerUserDetail,
    loading,
  } = props;

  const [isSecureActive, setIsSecureActive] = useState(true);
  const [isfocuspass, setFocuspass] = useState(false);
  const [isfocusname, setFocusname] = useState(false);
  const [isfocussurname, setFocussurname] = useState(false);
  const [isfocusmobile, setFocusmobile] = useState(false);
  const [activeDot, setActiveDot] = useState(0);
  const [isfocusemail, setFocusemail] = useState(false);

  const [data, setData] = useState([]);
  const appState = useRef(AppState.currentState);

  const surnameRef = useRef(null);
  const mobileRef = useRef(null);
  const passwordRef = useRef(null);
  const emailRef = useRef(null);

  useFocusEffect(
    React.useCallback(async () => {
      getUserDetails();
      setInterval(getUserDetails, 1000);
    }, []),
  );

  useEffect(() => {
    props.getSchool();
    requestUserPermission();
  }, []);

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

  useEffect(() => {
    if (registerUserDetail?.api_status === 1) {
      ToastMessage(registerUserDetail?.api_message);
      // Toast.show(registerUserDetail?.api_message, Toast.LONG);
      navigation.navigate('SignIn');
      // navigation.navigate('OtpScreen', {
      //   reset: 'false',
      //   id: JSON.stringify(registerUserDetail?.data?.id),
      //   otp: '',
      // });
      clearRegisterUser();
    } else if (registerUserDetail?.api_status === 0) {
      ToastMessage(registerUserDetail?.api_message);

      // Toast.show(registerUserDetail?.api_message, Toast.LONG);
      clearRegisterUser();
    }
  }, [registerUserDetail]);

  async function getUserDetails() {
    const chil_data = await PrefManager.getValue('@child_Data');
    setData(JSON.parse(chil_data));
  }

  const isValid = async values => {
    if (data?.length > 0) {
      PrefManager.getValue('@fmctoken').then(id => {
        let request = {
          name: values.name + ' ' + values.surname,
          password: values.password,
          mobile_no: values.mobile,
          email: values.email,
          device_id: id,
          device_name: Platform.OS == 'ios' ? 'ios' : 'android',
          // deviceData: {
          //   device_build_number: DeviceInfo.getBuildNumber(),
          //   device_system_name: DeviceInfo.getSystemName(),
          //   device_model: DeviceInfo.getModel(),
          //   device_system_version: DeviceInfo.getSystemVersion(),
          //   device_brand: DeviceInfo.getBrand(),
          //   device_id: DeviceInfo.getDeviceId(),
          // },
          students: data,
        };
        console.log('====================================');
        console.log('register==>' + JSON.stringify(request));
        console.log('====================================');
        props.registerUser(request);
      });
    } else {
      ToastMessage('Please fill child details');
    }
  };

  const ListView = (lable, value) => {
    return (
      <View style={styles.Listview}>
        <Text style={styles.ListviewLable}>{lable}:</Text>
        <Text style={styles.ListviewValue}>{value}</Text>
      </View>
    );
  };

  const handleVieweableItemsChanged = useCallback(({viewableItems}) => {
    setActiveDot(viewableItems[0].index);
  }, []);

  const handleDelete = item => {
    const newdata = data.filter(x => x.id !== item.id);

    PrefManager.setValue('@child_Data', JSON.stringify(newdata));
  };

  const createTwoButtonAlert = item => {
    Alert.alert('Delete', 'Are you sure delete student details?', [
      {
        text: 'NO',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Yes', onPress: () => handleDelete(item)},
    ]);
  };

  useEffect(() => {
    fetch(); //here I send post request to update users state to active

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  const handleAppStateChange = nextAppState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      fetch(); // update users status to inactive
    } else {
      fetch(); // update users status to active
    }
    appState.current = nextAppState;
  };

  const fetch = () => {
    PrefManager.removeValue('@child_Data');
  };

  const ItemRender = ({item}) => {
    return (
      <View style={styleSheet.item}>
        <TouchableOpacity onPress={() => createTwoButtonAlert(item)}>
          <Image
            source={require('../../assets/delete.png')}
            style={{width: 30, height: 30, alignSelf: 'flex-end'}}
            resizeMode="center"
          />
        </TouchableOpacity>

        {item?.photo?.length > 0 ? (
          <Image
            source={{uri: item?.photo}}
            style={styles.child_image}
            resizeMode="center"
          />
        ) : (
          <Image
            source={require('../../assets/user.png')}
            style={{width: 50, height: 50, alignSelf: 'center'}}
            resizeMode="center"
          />
        )}
        <Text style={styles.school_name}>{item?.school_name}</Text>
        {ListView('Name', item?.student_name)}
        {ListView('Class', item?.class)}
        {ListView('Division', item?.divName)}
        {ListView('Shift', item?.master_shifts_name)}
      </View>
    );
  };

  const Separator = () => {
    return <View style={styles.seprator} />;
  };

  return (
    <View style={{marginTop: ScaleSizeUtils.LISTING_100}}>
      <ScrollView>
        <ProgressLoader loading={loading} />

        <View style={styles.bottomViewSignup}>
          <Formik
            validationSchema={SignUpValidationSchema}
            initialValues={{
              name: '',
              surname: '',
              password: '',
              mobile: '',
              email: '',
            }}
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
                  placeholder="Enter your name"
                  touched={touched.name}
                  value={values.name}
                  onTextChange={handleChange('name')}
                  errorText={errors.name}
                  returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                  onSubmitEditing={() => {
                    surnameRef.current.focus();
                  }}
                  isFocus={isfocusname}
                  onFocus={() => {
                    setFocusname(true);
                  }}
                  onBlur={() => {
                    setFocusname(false);
                  }}
                />
                <Texinput
                  placeholder="Enter your surname"
                  touched={touched.surname}
                  value={values.surname}
                  refs={surnameRef}
                  returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                  onSubmitEditing={() => {
                    mobileRef.current.focus();
                  }}
                  onTextChange={handleChange('surname')}
                  errorText={errors.surname}
                  isFocus={isfocussurname}
                  onFocus={() => {
                    setFocussurname(true);
                  }}
                  onBlur={() => {
                    setFocussurname(false);
                  }}
                />
                <Texinput
                  placeholder="Enter your mobile number"
                  value={values.mobile}
                  refs={mobileRef}
                  returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                  onSubmitEditing={() => {
                    emailRef.current.focus();
                  }}
                  keyboardType={'number-pad'}
                  touched={touched.mobile}
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

                <Texinput
                  placeholder="Enter your email"
                  touched={touched.email}
                  refs={emailRef}
                  value={values.email}
                  keyboardType={'email-address'}
                  onTextChange={handleChange('email')}
                  errorText={errors.email}
                  returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                  onSubmitEditing={() => {
                    passwordRef.current.focus();
                  }}
                  isFocus={isfocusemail}
                  onFocus={() => {
                    setFocusemail(true);
                  }}
                  onBlur={() => {
                    setFocusemail(false);
                  }}
                />

                <Texinput
                  placeholder="Enter your Password"
                  ChangeActivationSecure={() => {
                    setIsSecureActive(!isSecureActive);
                  }}
                  refs={passwordRef}
                  returnKeyType={'done'}
                  onSubmitEditing={() => {
                    handleSubmit();
                  }}
                  value={values.password}
                  isSecureActive={isSecureActive}
                  isFocus={isfocuspass}
                  touched={touched.password}
                  onFocus={() => {
                    setFocuspass(true);
                  }}
                  onBlur={() => {
                    setFocuspass(false);
                  }}
                  isSecure
                  onTextChange={handleChange('password')}
                  errorText={errors.password}
                />
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('AddchildScreen', {
                      type: 'Confirm',
                      data: {},
                    })
                  }>
                  <Text style={styles.addChild}>Add Child Details +</Text>
                </TouchableOpacity>
                <View style={{marginTop: 20}} />
                <>
                  <FlatList
                    data={data}
                    renderItem={({item}) => <ItemRender item={item} />}
                    ItemSeparatorComponent={Separator}
                    horizontal={true}
                    onViewableItemsChanged={handleVieweableItemsChanged}
                    showsHorizontalScrollIndicator={false}
                    // scrollEnabled
                    // onScroll={onScroll}
                  />

                  <Dots
                    activeDotWidth={10}
                    activeDotHeight={10}
                    passiveDotHeight={10}
                    passiveDotWidth={10}
                    length={data?.length}
                    activeColor={Colors.primary}
                    active={activeDot}
                  />
                </>
                <View
                  style={{
                    width: '100%',
                    marginBottom: ScaleSizeUtils.DIMEN_MARGIN_LARGE,
                  }}>
                  <Button
                    title="Sign Up"
                    backgroundColor={Colors.black}
                    textColor={Colors.white}
                    onPress={() => handleSubmit()}
                  />
                </View>
                <View style={styles.alreadyview}>
                  <Text style={styles.already}>Already have an account?</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('SignIn')}>
                    <Text style={styles.signinbtn}> Sign In</Text>
                  </TouchableOpacity>
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
    error: state.authUser.error && state.authUser.error,
    registerUserDetail:
      state.authUser.registerUser && state.authUser.registerUser,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getSchool: () => {
      dispatch(getSchool());
    },
    registerUser: data => {
      dispatch(registerUser(data));
    },
    clearRegisterUser: data => {
      dispatch(clearRegisterUser(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signupcomponent);

const styleSheet = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },

  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 12,
  },

  item: {
    width: ScaleSizeUtils.DIMEN_LARGE_400,
    height: ScaleSizeUtils.DIMEN_LARGE_250 * 1.2,
    backgroundColor: 'white',
    borderRadius: 15,
    marginHorizontal: 20,
    padding: 10,
    marginBottom: 20,
    marginTop: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },

  itemText: {
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
  },
});

//   maincontainor: {backgroundColor: '#F94A29', flex: 1},
//   back: {
//     height: 30,
//     width: 30,
//     tintColor: 'white',
//     marginLeft: 10,
//     marginTop: 5,
//   },
//   signupupper: {
//     color: 'white',
//     fontWeight: 'bold',
//     marginLeft: 15,
//     fontSize: 35,
//     marginTop: 15,
//   },
//   text: {
//     color: 'white',
//     fontSize: 20,
//     marginLeft: 15,
//     marginTop: '2%',
//     fontFamily: 'Roboto-Regular',
//   },
//   lowerview: {
//     borderTopLeftRadius: 50,
//     backgroundColor: 'white',
//     borderTopRightRadius: 50,
//   },

//   signupbtn: {
//     backgroundColor: 'black',
//     borderRadius: 34,
//     marginHorizontal: 20,
//     padding: 12,
//     marginTop: 15,
//   },
//   signbtntxt: {
//     color: 'white',
//     alignSelf: 'center',
//     fontWeight: 'bold',
//     fontSize: 23,
//     fontFamily: 'Roboto-Bold',
//   },
//   already: {
//     color: 'black',
//     fontFamily: AppFonts.FONT_MEDIUM,
//     fontSize: RFPercentage(2.5),
//   },
//   signinbtn: {
//     color: 'blue',
//     fontFamily: AppFonts.FONT_MEDIUM,
//     fontSize: RFPercentage(2.5),
//   },
//   alreadyview: {
//     flexDirection: 'row',
//     marginBottom: 10,
//     marginTop: 15,
//     alignSelf: 'center',
//   },
// });
