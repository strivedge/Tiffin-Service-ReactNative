import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  Alert,
  PermissionsAndroid,
  Platform,
  Modal,
  TouchableNativeFeedback,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import NonAuthHeader from '../NonAuthHeader';
import {styles} from '../../Style/commonStyle';
import {Formik} from 'formik';
import Texinput from '../Texinput';
import Button from '../Button';
import {Colors, ScaleSizeUtils} from '../../constants';
import {profileUpdateScreenSchema} from '../../Helper/Utils';
import SwipeUpDownModal from '../bottomSheet';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import AppFonts from '../../constants/Fonts';
import {RFPercentage} from 'react-native-responsive-fontsize';
import PrefManager from '../../Helper/PrefManager';
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast';

import {
  getUseProfileDetails,
  clearUseProfileDetails,
  updateUserProfileDetails,
  clearUpdateProfileDetails,
  getUploadPhotos,
  clearUploadPhotos,
  deleteStudentDetails,
  clearDeleteStudentDetails,
  getAccountDeleteRequest,
  clearAccountDeleteRequest,
} from '../../redux/nonAuth/actions';
import {API} from '../../Helper/HttpService';
import Dots from 'react-native-dots-pagination';
import DatePicker from '../DatePicker';
import moment from 'moment';
import RNFetchBlob from 'rn-fetch-blob';

import {SLIDER_WIDTH} from '../HomeScreenComponents/CarouselCardItem';
import {SLIDER_HIGHT} from '../HomeScreenComponents/HomeScreenComponents';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import ToastMessage from '../ToastMeassage';
import ProgressLoader from '../ProgressLoader';

const ProfileScreenComponets = props => {
  const {
    navigation,
    getUseProfileDetails,
    clearUseProfileDetails,
    getUserDetails,
    updateUserProfileDetails,
    clearUpdateProfileDetails,
    updateUserDetails,
    getUserDetailsUpdate,
    getUserDetails1,
    getUploadPhotos,
    clearUploadPhotos,
    photoUpload,
    deleteStudentDetails,
    clearDeleteStudentDetails,
    deleteStudent,
    getAccountDeleteRequest,
    clearAccountDeleteRequest,
    deleteAccountdetails,
  } = props;
  const [isfocusname, setFocusname] = useState(false);
  const [isfocusemail, setFocusemail] = useState(false);
  const [dataVisible, setDateVisible] = useState(false);
  const [dataselectd, setDateSelected] = useState('');
  const [isfocusmobile, setFocusmobile] = useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [isfocusdate, setFocusdate] = useState(false);
  const [base, setBase] = useState('');
  const [photo, setPhoto] = useState('');
  const [studentDetails, setStudentDetails] = useState([]);
  const [activeDot, setActiveDot] = useState(0);
  const [sideMenu, setSideMenu] = useState('');
  const [optionModal, setOptionModal] = useState(false);

  const camera = () => {
    ImagePicker.openCamera({
      multiple: false,
      includeBase64: true,
      includeExif: true,
      maxFiles: 1,
      width: 300,
      height: 400,
      cropping: true,
      compressImageQuality: 0.9,
      mediaType: 'photo',
    })
      .then(images => {
        if (Platform.OS === 'ios') {
        }
        setBase('data:image/png;base64,' + images.data);
        setModalVisible(false);
        uploadphotos(images.data);
      })
      .catch(e => {
        setModalVisible(false);
      });
  };

  const gallary = () => {
    ImagePicker.openPicker({
      multiple: false,
      includeBase64: true,
      includeExif: true,
      maxFiles: 1,
      width: 300,
      height: 400,
      cropping: true,
      compressImageQuality: 0.9,
      mediaType: 'photo',
    })
      .then(images => {
        setBase('data:image/png;base64,' + images.data);
        uploadphotos(images.data);
        setModalVisible(false);
      })
      .catch(e => {
        setModalVisible(false);
      });
  };

  const [loading, setLoading] = useState(false);

  const checkPermission = async code => {
    // const url = 'https://picsum.photos/id/237/200/300';
    const url = API.IMAGE_URL + code.qr_code;

    if (Platform.OS === 'ios') {
      downloadImage(url, code);
    } else {
      setLoading(true);
      downloadImage(url, code);

      // try {
      //   const granted = await PermissionsAndroid.request(
      //     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      //     {
      //       title: 'Storage Permission Required',
      //       message: 'App needs access to your storage to download Photos',
      //     },
      //   );
      //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      //     // Once user grant the permission start downloading
      //     console.log('Storage Permission Granted.');
      //   } else {
      //     // If permission denied then show alert
      //     console.log('Storage Permission Not Granted');
      //   }
      // } catch (err) {
      //   // To handle permission related exception
      //   console.warn(err);
      // }
    }
  };

  const downloadImage = (url, code) => {
    // Main function to download the image

    // To add the time suffix in filename
    let date = new Date();
    // Image URL which we want to download
    let image_URL = url;
    // Getting the extention of the file
    let ext = getExtention(image_URL);
    ext = ext[0];

    const {config, android, ios, fs} = RNFetchBlob;

    const downloadDir =
      Platform.OS === 'ios' ? fs.dirs.DocumentDir : fs.dirs.DownloadDir;

    const fileName = `${code?.name}_${Math.floor(Math.random() * 10)}`;

    const mimeType = 'png';

    const configOptions = Platform.select({
      ios: {
        fileCache: true,
        path: `${downloadDir}/${fileName}.${ext}`,
        // mime: 'application/xlsx',
        // appendExt: 'xlsx',
        //path: filePath,
        //appendExt: fileExt,
        notification: true,
        mimeType,
      },
      android: {
        fileCache: false,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: `${downloadDir}/${fileName}.png`,
          description: 'Image',
          mimeType,
        },
      },
    });

    config(configOptions)
      .fetch('GET', image_URL)
      .then(res => {
        if (Platform.OS === 'ios') {
          RNFetchBlob.ios.openDocument(res.data);
        } else {
          android.actionViewIntent(res.path(), mimeType);
        }
        setLoading(false);
        // Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        ToastMessage('Qr code downloaded successfully.');

        // Toast.show('Qr code downloaded successfully.', Toast.SHORT);
      });
  };

  const getExtention = filename => {
    // To get the file extension
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  const uploadphotos = async image => {
    const id = await PrefManager.getValue('@id');
    const data = {
      id: id,
      photo: 'data:image/png;base64,' + image,
      type: 'cms_users',
    };
    getUploadPhotos(data);
  };
  const Separator = () => {
    return <View style={styles.seprator} />;
  };

  const getUserData = async () => {
    const ids = await PrefManager.getValue('@id');

    const type = await PrefManager.getValue('@customer_type');
    if (type == 2) {
      setSideMenu('customer');
    } else if (type == 3) {
      setSideMenu('delivery');
    }

    getUseProfileDetails(`?id=${ids}`);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUserData();
    });
    return unsubscribe;
  }, [navigation]);

  const updateAsycstorage = getUserDetailsDatad => {
    PrefManager.setValue('@name', getUserDetailsDatad?.name);
    PrefManager.setValue('@photo', getUserDetailsDatad?.photo);
  };

  useEffect(() => {
    if (getUserDetails1?.api_status === 1) {
      setStudentDetails(getUserDetails?.student);
      updateAsycstorage(getUserDetails);
      setPhoto(getUserDetails?.photo);
      setDateSelected(getUserDetails?.dob);
    }
  }, [getUserDetails1]);

  useEffect(() => {
    if (photoUpload?.api_status === 1) {
      ToastMessage(photoUpload?.api_message);
      // Toast.show(photoUpload?.api_message, Toast.LONG);
      PrefManager.setValue('@photo', photoUpload?.data);
      setPhoto(photoUpload?.data);
      clearUploadPhotos();
    }
  }, [photoUpload]);

  useEffect(() => {
    if (updateUserDetails?.api_status === 1) {
      ToastMessage(updateUserDetails?.api_message);

      // Toast.show(updateUserDetails?.api_message, Toast.LONG);
      clearUpdateProfileDetails();
      setTimeout(() => {
        getUserData();
      }, 1000);
    }
  }, [updateUserDetails]);

  useEffect(() => {
    if (deleteStudent?.api_status === 1) {
      ToastMessage(deleteStudent?.api_message);

      // Toast.show(deleteStudent?.api_message, Toast.LONG);
      clearDeleteStudentDetails();
      setTimeout(() => {
        getUserData();
      }, 1000);
    }
  }, [deleteStudent]);

  const handleDelete = async item => {
    const students = await PrefManager.getValue('@students');
    const allStudent = JSON.parse(students);

    const newArray = allStudent.filter(item => item.name !== item?.name);

    PrefManager.setValue('@students', JSON.stringify(newArray));
    deleteStudentDetails(`?id=${item?.id}`);
  };

  const isValid = async values => {
    const ids = await PrefManager.getValue('@id');
    const data = {
      id: ids,
      name: values.name,
      email: values.email,
    };
    updateUserProfileDetails(data);
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

  const handleVieweableItemsChanged = useCallback(({viewableItems}) => {
    setActiveDot(viewableItems[0].index);
  }, []);

  const ItemRender = ({item}) => {
    return (
      <View style={[styleSheet.item]}>
        <View
          style={{
            flexDirection: 'row',
            height: ScaleSizeUtils.LISTING_100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{flex: 0.3}}>
            {item?.photo !== null ? (
              <Image
                source={{uri: API.IMAGE_URL + item?.photo}}
                style={styles.child_image}
                resizeMode="center"
              />
            ) : (
              <Image
                source={require('../../assets/user.png')}
                style={{width: 70, height: 70, alignSelf: 'center'}}
              />
            )}
          </View>
          <View style={{flex: 0.8}}>
            <Text
              style={[
                {
                  textAlign: 'left',
                  color: Colors.black,
                  fontFamily: AppFonts.FONT_INTER_BOLD,
                  fontSize: RFPercentage(3),
                  marginBottom: 10,
                },
              ]}>
              {item?.name}
            </Text>
            <Text
              style={[
                ,
                {
                  textAlign: 'left',
                  fontSize: RFPercentage(2.5),
                  color: Colors.black,
                  fontFamily: AppFonts.FONT_INTER_MEDIUM,
                },
              ]}>
              {item?.school?.name}
            </Text>
          </View>
          <TouchableOpacity
            style={{marginTop: -25}}
            onPress={() => checkPermission(item)}>
            <Image
              source={require('../../assets/qrdownload.png')}
              style={{width: 40, height: 40}}
            />
          </TouchableOpacity>
        </View>
        <View style={styleSheet.btn_view}>
          <TouchableOpacity
            style={styleSheet.btn}
            onPress={() => createTwoButtonAlert(item)}>
            <Text style={{fontSize: RFPercentage(2.5), color: Colors.white}}>
              Delete
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styleSheet.btn}
            onPress={() =>
              navigation.navigate('AddchildScreen', {
                type: 'Edit',
                data: item,
              })
            }>
            <Text style={{fontSize: RFPercentage(2.5), color: Colors.white}}>
              Edit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const handleDeleteAlert = () => {
    Alert.alert('Delete', 'Are you sure delete account?', [
      {
        text: 'NO',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Yes', onPress: () => handleDeleteAccount()},
    ]);
  };

  const handleDeleteAccount = async () => {
    setOptionModal(false);
    const ids = await PrefManager.getValue('@id');
    getAccountDeleteRequest(`?id=${ids}`);
  };

  const clearAcyncStorageDetail = async () => {
    PrefManager.removeValue('@id');
    PrefManager.removeValue('@name');
    PrefManager.removeValue('@photo');
    PrefManager.removeValue('@email');
    PrefManager.removeValue('@country_code');
    PrefManager.removeValue('@mobile_no');
    PrefManager.removeValue('@dateofbirth');
    PrefManager.removeValue('@gender');
    PrefManager.removeValue('@child_Data');
    PrefManager.removeValue('@customer_type');
  };

  useEffect(() => {
    if (deleteAccountdetails?.api_status == 1) {
      ToastMessage(deleteAccountdetails?.api_message);
      // Toast.show(deleteAccountdetails?.api_message, Toast.LONG);
      clearAccountDeleteRequest();
      clearAcyncStorageDetail();
      setTimeout(() => {
        navigation.navigate('AuthenticationNavigator');
      }, 1000);
    }
  }, [deleteAccountdetails]);

  return (
    <View style={{flex: 1}}>
      <NonAuthHeader
        navigation={navigation}
        title="My Profile"
        isDrawer={true}
        isCart={false}
        isOption={true}
        optionModal={() => setOptionModal(true)}
      />

      <ProgressLoader loading={loading} />
      <ScrollView>
        <View style={{marginTop: 20}} />

        <View style={{alignSelf: 'center'}}>
          {photo?.length > 0 ? (
            <>
              <View>
                <Image
                  style={[styles.profile_image, {borderRadius: 100}]}
                  source={{
                    uri: API.IMAGE_URL + `${photo}`,
                  }}
                />
                <TouchableOpacity
                  onPress={() => setModalVisible(true)}
                  style={styles.profile_view}>
                  <Image
                    source={require('../../assets/camera.png')}
                    style={styles.camera_icon}
                  />
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <View>
                <Image
                  source={require('../../assets/user.png')}
                  style={styles.profile_image}
                />
                <TouchableOpacity
                  onPress={() => setModalVisible(true)}
                  style={styles.profile_view}>
                  <Image
                    source={require('../../assets/camera.png')}
                    style={styles.camera_icon}
                  />
                </TouchableOpacity>
              </View>
            </>
          )}
          <View>
            <Text style={styles.profile_title}>{getUserDetails?.name}</Text>
            <Text style={styles.profile_mobile}>
              {getUserDetails?.country_code} {getUserDetails?.mobile_no}
            </Text>
          </View>
        </View>

        <Formik
          validationSchema={profileUpdateScreenSchema}
          enableReinitialize
          initialValues={{
            name: getUserDetails?.name ? getUserDetails?.name : '',
            mobile: getUserDetails?.mobile_no ? getUserDetails?.mobile_no : '',
            email: getUserDetails?.email ? getUserDetails?.email : '',
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
                isFocus={isfocusname}
                onFocus={() => {
                  setFocusname(true);
                }}
                onBlur={() => {
                  setFocusname(false);
                }}
              />

              <Texinput
                placeholder="Enter your email"
                touched={touched.email}
                value={values.email}
                onTextChange={handleChange('email')}
                errorText={errors.email}
                isFocus={isfocusemail}
                onFocus={() => {
                  setFocusemail(true);
                }}
                onBlur={() => {
                  setFocusemail(false);
                }}
              />

              <Texinput
                placeholder="Enter your mobile number"
                value={values.mobile}
                keyboardType={'number-pad'}
                touched={touched.mobile}
                isDisbale={false}
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
              <View style={{marginTop: 20}} />
              {sideMenu == 'customer' ? (
                <>
                  <>
                    {studentDetails?.length > 0 && (
                      <>
                        <FlatList
                          data={
                            studentDetails?.length > 0 ? studentDetails : []
                          }
                          renderItem={({item}) => <ItemRender item={item} />}
                          ItemSeparatorComponent={Separator}
                          horizontal={true}
                          onViewableItemsChanged={handleVieweableItemsChanged}
                          showsHorizontalScrollIndicator={false}
                        />

                        {studentDetails?.length > 1 && (
                          <Dots
                            activeDotWidth={10}
                            activeDotHeight={10}
                            passiveDotHeight={10}
                            passiveDotWidth={10}
                            length={studentDetails?.length}
                            activeColor={Colors.primary}
                            active={activeDot}
                          />
                        )}
                      </>
                    )}
                  </>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('AddchildScreen', {
                        type: 'Add',
                        data: {},
                      })
                    }>
                    <Text style={styles.addChild}>Add Child Details +</Text>
                  </TouchableOpacity>
                </>
              ) : null}
              <View
                style={{
                  width: '100%',
                  marginBottom: SLIDER_HIGHT / 5,
                }}>
                <Button
                  title="Update"
                  backgroundColor={Colors.black}
                  textColor={Colors.white}
                  onPress={() => handleSubmit()}
                />
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
      <View></View>

      <SwipeUpDownModal
        modalVisible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        ContentModal={
          <View style={{flex: 1}}>
            <View style={styles.bottom_modal}>
              <TouchableOpacity
                onPress={() => {
                  camera();
                }}>
                <Image
                  source={require('../../assets/camera.png')}
                  style={styles.camera_touch}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  gallary();
                }}>
                <Image
                  source={require('../../assets/gallery.png')}
                  style={styles.camera_touch}
                />
              </TouchableOpacity>
            </View>
          </View>
        }
        ContentModalStyle={styles.modal_bottom_style}
        onClose={() => {
          setModalVisible(!modalVisible);
        }}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={optionModal}
        onRequestClose={() => {
          setOptionModal(!optionModal);
        }}>
        <TouchableOpacity
          style={{
            flex: 1,
          }}
          onPressOut={() => {
            setOptionModal(false);
          }}>
          <View
            style={{
              width: SLIDER_WIDTH / 1.8,
              backgroundColor: 'white',
              borderRadius: 20,
              alignSelf: 'flex-end',
              padding: 20,
              right: SLIDER_WIDTH / 25,
              top: SLIDER_HIGHT / 25,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              marginTop: Platform.OS == 'ios' ? 20 : 0,
              shadowOpacity: 0.25,
              shadowRadius: 4,
            }}>
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={() =>
                setOptionModal(false) +
                navigation.navigate('ChangePasswordScreen')
              }>
              <Image
                source={require('../../assets/doorkey.png')}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: Colors.primary,
                  marginRight: 5,
                }}
              />
              <Text
                numberOfLines={1}
                style={{
                  marginBottom: 15,
                  color: Colors.black,
                  fontSize: RFPercentage(2.3),
                }}>
                Change Password
              </Text>
            </TouchableOpacity>

            <View
              style={{
                borderWidth: 0.2,
                marginBottom: 10,
                borderColor: Colors.gray,
              }}
            />
            <TouchableOpacity
              onPress={() => handleDeleteAlert()}
              style={{
                flexDirection: 'row',
              }}>
              <Image
                source={require('../../assets/deleteaccount.png')}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: Colors.primary,
                  marginRight: 5,
                }}
              />

              <Text
                style={{
                  marginBottom: 5,
                  color: Colors.black,
                  fontSize: RFPercentage(2.3),
                }}>
                Delete Account
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styleSheet = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  item: {
    width: SLIDER_WIDTH / 1.1,
    height: ScaleSizeUtils.LISTING_100 * 1.7,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 15,
    marginHorizontal: 20,
    padding: 10,
    elevation: 5,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  btn_view: {
    height: ScaleSizeUtils.DIMEN_MARGIN_EXTRA_LERGE,
    width: ScaleSizeUtils.DIMEN_LARGE_400,
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  btn: {
    backgroundColor: Colors.primary,
    height: ScaleSizeUtils.DIMEN_MARGIN_EXTRA_LERGE,
    width: ScaleSizeUtils.LISTING_100,
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
  },

  modalView: {
    margin: 20,
    backgroundColor: 'red',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: RFPercentage(3),
  },
});

const mapStateToProps = state => {
  return {
    loading: state.nonAuth.loading,
    getUserDetails: state.nonAuth.getUserDetails?.data,
    getUserDetails1: state.nonAuth.getUserDetails,
    updateUserDetails: state.nonAuth.updateUserDetails,
    photoUpload: state.nonAuth.photoUpload,
    deleteStudent: state.nonAuth.deleteStudent,
    deleteAccountdetails: state.nonAuth.deleteAccountdetails,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getUseProfileDetails: data => {
      dispatch(getUseProfileDetails(data));
    },
    clearUseProfileDetails: data => {
      dispatch(clearUseProfileDetails(data));
    },
    updateUserProfileDetails: data => {
      dispatch(updateUserProfileDetails(data));
    },
    clearUpdateProfileDetails: data => {
      dispatch(clearUpdateProfileDetails(data));
    },
    getUploadPhotos: data => {
      dispatch(getUploadPhotos(data));
    },
    clearUploadPhotos: data => {
      dispatch(clearUploadPhotos(data));
    },
    deleteStudentDetails: data => {
      dispatch(deleteStudentDetails(data));
    },
    clearDeleteStudentDetails: data => {
      dispatch(clearDeleteStudentDetails(data));
    },
    getAccountDeleteRequest: data => {
      dispatch(getAccountDeleteRequest(data));
    },

    clearAccountDeleteRequest: data => {
      dispatch(clearAccountDeleteRequest(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileScreenComponets);
