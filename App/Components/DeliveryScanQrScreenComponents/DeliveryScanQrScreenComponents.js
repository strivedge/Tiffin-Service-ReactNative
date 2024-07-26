import React, {useEffect, useState} from 'react';
import NonAuthHeader from '../NonAuthHeader';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View,
  Image,
  Dimensions,
  Vibration,
  Modal,
  FlatList,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

import {RNCamera} from 'react-native-camera';
import Toast from 'react-native-simple-toast';

import PrefManager from '../../Helper/PrefManager';
import {Colors} from '../../constants';
import {SLIDER_WIDTH} from '../HomeScreenComponents/CarouselCardItem';
import {SLIDER_HIGHT} from '../VerificationComponets/VerificationComponets';
import SuccessBtn from '../SuccessBtn';
import {RFPercentage} from 'react-native-responsive-fontsize';
import AppFonts from '../../constants/Fonts';
import {connect} from 'react-redux';
import {
  clearDeliveryHistoryDetails,
  clearupdateOrderStatusRequest,
  getDeliveryHistoryDetails,
  updateOrderStatusRequest,
} from '../../redux/Delivery/actions';
import moment from 'moment';
import ToastMessage from '../ToastMeassage';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const DeliveryScanQrScreenComponents = props => {
  const [flashStart, setFlashStart] = useState(false);

  const [viewFocused, SetviewFocused] = useState(false);
  const {
    navigation,
    deliveryHistoryDetails,
    clearDeliveryHistoryDetails,
    clearupdateOrderStatusRequest,
    updateOrderStatusRequest,
    getDeliveryHistoryDetails,
  } = props;

  const [confirmationModal, setConfirmationModal] = useState(false);

  const changeFlash = item => {
    setFlashStart(!flashStart);
  };

  useEffect(() => {
    console.log('data===>' + JSON.stringify(deliveryHistoryDetails));
  }, [deliveryHistoryDetails]);

  const removeHandler = () => {
    PrefManager.removeValue('@select_child');
  };

  const onBarCodeRead = e => {
    clearDeliveryHistoryDetails();
    Vibration.vibrate(500);
    const today = moment(new Date()).format('YYYY-MM-DD');
    const id = e.data;
    pullDown(today, id);
    if (typeof e.data == 'string') {
      let ParseData = JSON.parse(e.data);
      PrefManager.setValue('@select_child', JSON.stringify(ParseData));

      setConfirmationModal(true);
      // navigation.navigate('DeliveryHistoryScreen');
    } else {
      ToastMessage('Please valid code scan');
      // Toast.show('Please valid code scan', Toast.LONG);
    }
  };

  const pullDown = async (date, id) => {
    const ids = await PrefManager.getValue('@id');
    getDeliveryHistoryDetails(
      `?master_delivery_person_id=${ids}&date=${date}&master_students_id=${id}`,
    );
  };

  useEffect(() => {
    navigation.addListener('focus', removeHandler, SetviewFocused(true));
    return () => {
      navigation.removeListener('focus', SetviewFocused(false));
    };
  }, [navigation]);

  const showEmptyListView = () => {
    return (
      <View style={styles.empty_view}>
        <Text style={{fontSize: RFPercentage(3), color: Colors.gray}}>
          No Delivery Found :(
        </Text>
      </View>
    );
  };

  const handleSubmit = async (status, id) => {
    const ids = await PrefManager.getValue('@id');
    const data = {
      id: id,
      status: status,
      delivered_time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      master_delivery_person_id: ids,
      cancel_reason: '',
    };
    updateOrderStatusRequest(data);
  };

  const renderitem = ({item, index}) => {
    const today = moment(new Date()).format('YYYY-MM-DD');
    return (
      <View>
        <View style={styles.viewdate}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../../assets/bottomTab/calender.png')}
              style={{
                tintColor: Colors.gray,
                width: 15,
                height: 15,
                resizeMode: 'stretch',
                marginRight: 10,
              }}
            />
            <Text style={{color: Colors.gray, fontSize: RFPercentage(2)}}>
              {moment(item?.date).format('MMMM DD, YYYY')}
            </Text>
          </View>

          {item?.status == 4 ? (
            <Text style={[styles.delviry, {color: Colors.green}]}>
              Delivered
            </Text>
          ) : null}

          {item?.status == 5 ? (
            <Text style={[styles.delviry, {color: Colors.red}]}>Cancelled</Text>
          ) : null}
        </View>
        <Text style={styles.name}>{item?.student?.name}</Text>
        <Text style={[styles.order, {color: Colors.gray}]}>
          Order ID : {item?.id}
        </Text>
        <Text style={[styles.order, {color: Colors.gray}]}>
          Food type : {item?.student?.food_type}
        </Text>

        <Text style={[styles.menu, {fontFamily: AppFonts.FONT_INTER_REGULER}]}>
          {item?.student?.school?.food_item?.name}
        </Text>
        <Text
          style={[
            styles.address,
            {color: Colors.gray, fontFamily: AppFonts.FONT_INTER_REGULER},
          ]}>
          {item?.student?.school?.name}, {item?.student?.school?.address}
        </Text>
        {item?.status == 1 && today == item?.date ? (
          <View style={styles.cnclbtnview}>
            <TouchableOpacity
              style={[styles.cnclbtn, {marginRight: 20}]}
              onPress={() => handleSubmit(5, item?.id)}>
              <Text style={styles.canceltxt}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cnfmbtn}
              onPress={() => handleSubmit(4, item?.id)}>
              <Text style={styles.confirmtxt}>Confirm</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  };

  return (
    <View>
      <NonAuthHeader
        title={'Scan QR'}
        isDrawer={true}
        navigation={navigation}
      />
      <View style={styles.fab_btn}>
        <TouchableOpacity
          style={styles.flashContainer}
          onPress={() => {
            changeFlash(flashStart);
          }}>
          <Image
            source={
              flashStart
                ? require('../../assets/flash.png')
                : require('../../assets/noflash.png')
            }
            style={styles.flashIcon}
          />
        </TouchableOpacity>
      </View>

      <RNCamera
        barCodeTypes={[
          confirmationModal == false && RNCamera.Constants.BarCodeType.qr,
        ]}
        onBarCodeRead={e => onBarCodeRead(e)}
        flashMode={
          !flashStart
            ? RNCamera.Constants.FlashMode.off
            : RNCamera.Constants.FlashMode.torch
        }
        ref={cam => {
          this.camera = cam;
        }}
        style={{height: '90%', width: '100%', justifyContent: 'center'}}>
        <View
          style={{
            width: SLIDER_WIDTH / 1.5,
            height: SLIDER_HIGHT / 3,
            borderWidth: 2,
            borderColor: Colors.green,
            alignContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      </RNCamera>

      <Modal
        animationType="fade"
        transparent={true}
        visible={confirmationModal}
        onRequestClose={() => {
          setConfirmationModal(!confirmationModal);
        }}>
        <View style={styles.centeredView}>
          <View
            style={[
              styles.modalView,
              {width: SLIDER_WIDTH / 1.2, height: SLIDER_HIGHT / 2.2},
            ]}>
            <View style={{marginTop: 20}} />
            <TouchableOpacity
              style={{alignSelf: 'flex-end'}}
              onPress={() => setConfirmationModal(false)}>
              <Image
                source={require('../../assets/cross.png')}
                style={{
                  tintColor: Colors.gray,
                  width: 20,
                  height: 20,
                  right: 20,
                  resizeMode: 'stretch',
                }}
              />
            </TouchableOpacity>

            <FlatList
              data={deliveryHistoryDetails}
              ListEmptyComponent={showEmptyListView()}
              renderItem={renderitem}
              style={{width: SLIDER_WIDTH / 1.4}}
            />

            {/* <View style={{flexDirection: 'row', marginTop: 20}}>
              <View
                style={{
                  width: SLIDER_WIDTH / 4,
                  marginRight: 10,
                }}>
                <SuccessBtn
                  title="Cancel"
                  backgroundColor={Colors.red}
                  textColor={Colors.white}
                  onPress={() => setConfirmationModal(false)}
                />
              </View>
              <View
                style={{
                  width: SLIDER_WIDTH / 4,
                }}>
                <SuccessBtn
                  title="Confirm"
                  backgroundColor={Colors.green}
                  textColor={Colors.white}
                  onPress={() => CancelButton()}
                />
              </View>
            </View> */}
            <View style={{marginBottom: 20}} />
          </View>
        </View>
      </Modal>

      {/* <Camera
        barCodeTypes={[Camera.constants.BarCodeType.qr]}
        flashMode={Camera.constants.FlashMode.on}
        style={styles.preview}
        onBarCodeRead={this.onBarCodeRead}
        ref={cam => (this.camera = cam)}
        aspect={Camera.constants.Aspect.fir}>
        <Text
          style={{
            backgroundColor: 'white',
          }}>
          {this.state.qrcode}
        </Text>
      </Camera> */}

      {/* {viewFocused && (
        <QRCodeScanner
          onRead={e => {
            onSuccess(e);
          }}
          reactivate={true}
          reactivateTimeout={2000}
          showMarker={true}
          flashMode={
            !flashStart
              ? RNCamera.Constants.FlashMode.off
              : RNCamera.Constants.FlashMode.torch
          }
          cameraStyle={{height: screenHeight}}
        />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  closeContainer: {
    height: 50,
    width: '100%',
    position: 'absolute',
    marginTop: 35,
    justifyContent: 'center',
    zIndex: 3,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
  },
  closeIcon: {
    height: 30,
    width: 30,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  flashContainer: {
    height: 50,
    width: 50,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    borderRadius: 50,
    marginRight: 10,
  },
  flashIcon: {
    height: 40,
    width: 40,
    alignSelf: 'center',
    tintColor: 'white',
  },
  fab_btn: {
    position: 'absolute',
    zIndex: 2,
    bottom: SLIDER_HIGHT / 8,
    justifyContent: 'center',
    height: 100,
    width: '100%',
  },
  viewdate: {flexDirection: 'row', justifyContent: 'space-between'},
  confirmtxt: {
    fontSize: 16,
    fontFamily: AppFonts.FONT_INTER_MEDIUM,
    paddingLeft: 15,
    paddingRight: 15,
    color: 'white',
  },
  cnfmbtn: {
    borderRadius: 15,
    padding: 10,
    backgroundColor: '#DD4326',
  },
  canceltxt: {
    fontSize: 16,
    fontFamily: AppFonts.FONT_INTER_MEDIUM,
    paddingLeft: 15,
    paddingRight: 15,
    color: '#DD4326',
  },
  cnclbtn: {
    borderRadius: 15,
    borderWidth: 1,
    padding: 10,
    borderColor: '#DD4326',
  },
  cnclbtnview: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SLIDER_HIGHT / 30,
  },
  address: {
    fontSize: RFPercentage(2),
    marginTop: 10,
  },
  menu: {
    fontSize: RFPercentage(2),
    marginTop: 10,
    color: Colors.black,
  },
  order: {
    fontSize: RFPercentage(2.2),
    fontFamily: AppFonts.FONT_INTER_MEDIUM,
    marginTop: 10,
  },
  name: {
    fontSize: RFPercentage(2.5),
    fontFamily: AppFonts.FONT_INTER_BOLD,
    color: Colors.black,
    marginTop: 10,
  },
  delviry: {
    fontSize: RFPercentage(2),
    fontFamily: AppFonts.FONT_INTER_BOLD,
  },
  empty_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
});

const mapStateToProps = state => {
  return {
    loading: state.deliveryReducer.loading,
    deliveryHistoryDetails: state.deliveryReducer.deliveryHistoryDetails?.data,
    updateOrderDetails: state.deliveryReducer.updateOrderDetails,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getDeliveryHistoryDetails: data => {
      dispatch(getDeliveryHistoryDetails(data));
    },
    clearDeliveryHistoryDetails: data => {
      dispatch(clearDeliveryHistoryDetails(data));
    },
    updateOrderStatusRequest: data => {
      dispatch(updateOrderStatusRequest(data));
    },

    clearupdateOrderStatusRequest: data => {
      dispatch(clearupdateOrderStatusRequest(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeliveryScanQrScreenComponents);
