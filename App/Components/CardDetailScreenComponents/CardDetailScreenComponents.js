import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
  Alert,
  Image,
  Dimensions,
  Linking,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {Colors, ScaleSizeUtils} from '../../constants';
import AppFonts from '../../constants/Fonts';
import {
  addChildValidationSchema,
  cardDetailsValidationSchema,
} from '../../Helper/Utils';
import NonAuthHeader from '../NonAuthHeader';
import Texinput from '../Texinput';
import {Formik, useFormikContext} from 'formik';
import SuccessBtn from '../SuccessBtn';
import ItemDetailView from './ItemDetailView';
import CheckBox from 'react-native-check-box';
import {WebView} from 'react-native-webview';

import PrefManager from '../../Helper/PrefManager';
import {
  clearCartItem,
  clearDeleteItemRequest,
  clearHandleChargesTotalRequest,
  clearTranctionSuccessAPI,
  getCartItem,
  getDeleteItemRequest,
  getHandleChargesTotalRequest,
  getTranctionSuccessAPI,
} from '../../redux/nonAuth/actions';
import ProgressLoader from '../ProgressLoader';
import {connect} from 'react-redux';
import RazorpayCheckout from 'react-native-razorpay';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import {sign, decode} from 'react-native-pure-jwt';
import {API, Endpoint, razorpayKey} from '../../Helper/HttpService';
import moment from 'moment';
import ToastMessage from '../ToastMeassage';
import {SLIDER_HIGHT} from '../HomeScreenComponents/HomeScreenComponents';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const CardDetailScreenComponents = props => {
  const {
    navigation,
    getCartItem,
    loading,
    getCartDetails,
    getTranctionSuccessAPI,
    clearTranctionSuccessAPI,
    getDeleteItemRequest,
    clearDeleteItemRequest,
    getItemdetails,
    getHandleChargesTotalRequest,
    clearHandleChargesTotalRequest,
    getChargesApplyDetails,
  } = props;

  const [OthToken, setOthToken] = useState('');
  const [bdOrderID, setBdOrderID] = useState('');
  const [openWeb, setOpenWeb] = useState(false);
  const [orderID, setOrderID] = useState('');
  const [loader, setLoader] = useState(false);

  const HTMLCODE = `<html dir="ltr" lang="en">
  <head>
     <meta charset="utf-8">
     <meta name="viewport" content="width=${deviceWidth}, user-scalable=no">
     <script type="module" src="https://pay.billdesk.com/jssdk/v1/dist/billdesksdk/billdesksdk.esm.js"></script>
     <script nomodule="" src="https://pay.billdesk.com/jssdk/v1/dist/billdesksdk.js"></script>
     <script src="https://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>
     <link href="https://pay.billdesk.com/jssdk/v1/dist/billdesksdk/billdesksdk.css" rel="stylesheet">
  </head>
   
  <body>
     <script type="text/javascript">
  
        var flow_config = {
           merchantId: 'WHAATFDWRK',
           bdOrderId: ${JSON.stringify(bdOrderID)},
           authToken: ${JSON.stringify(OthToken)},
           childWindow: false,
           returnUrl: 'https://appadmin.whattameal.com/public/api/get-response',
        }
  
        var responseHandler = function (txn) {
           console.log("callback received status:: ", txn.status)
           console.log("callback received response:: ", txn.response)
        }
  
        var config = {
           responseHandler: responseHandler,
           merchantLogo: "",
           flowConfig: flow_config,
           flowType: "payments"
        }
  
        $(document).ready(function () { 
          setTimeout(function() { 
            window.loadBillDeskSdk(config);
           }, 300);
          
        });
     </script> 
  </body>
  </html>`;

  const pulldown = async () => {
    const id = await PrefManager.getValue('@id');
    getCartItem(`?cms_users_id=${id}`);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      pulldown();
    });
    return unsubscribe;
  }, [HTMLCODE, bdOrderID, OthToken]);

  useEffect(() => {
    if (getCartDetails?.data?.length > 0) {
      const Items = getCartDetails?.data?.length;

      PrefManager.setValue('@cart_count', JSON.stringify(Items));
      if (getCartDetails?.biodegradable_charge > 0) {
        setPackingItem(true);
      }
      setTimeout(() => {
        clearCartItem();
      }, 1000);
    } else {
      PrefManager.setValue('@cart_count', '0');
    }
  }, [getCartDetails, HTMLCODE, bdOrderID, OthToken]);

  useEffect(() => {
    if (getChargesApplyDetails.api_status == 1) {
      clearHandleChargesTotalRequest();
      pulldown();
    }
  }, [getChargesApplyDetails, HTMLCODE, bdOrderID, OthToken]);

  const handlePayment = async () => {
    setLoader(true);
    let cmsUserId = await PrefManager.getValue('@id');
    let cmsUserName = await PrefManager.getValue('@name');
    let cmsUserMobileNo = await PrefManager.getValue('@mobile_no');
    const idsArray = getCartDetails?.data.map(order => order.id).join(',');

    axios({
      method: 'post',
      url: 'https://appadmin.whattameal.com/public/api/bill-desk-api',
      data: {
        amount: getCartDetails?.sub_total,
        user_id: cmsUserId,
        user_name: cmsUserName,
        user_phone: cmsUserMobileNo,
        subscription_ids: idsArray,
      },
    })
      .then(res => {
        let tokenData = res?.data?.data;
        console.log('====================================');
        console.log('DATA++++++++>>>>>>> ' + JSON.stringify(res?.data));
        console.log('====================================');
        // navigation.navigate('PaymentWebViewScreen', {
        //   bdOrderID: tokenData?.bd_orderid,
        //   OthToken: tokenData?.authtoken,
        // });
        setOthToken(tokenData?.authtoken);
        setOrderID(tokenData?.order_id);
        setBdOrderID(tokenData?.bd_orderid);
        setTimeout(() => {
          setLoader(false);
          setOpenWeb(!openWeb);
        }, 300);
        setResponse(res?.data);
      })
      .catch(error => {
        console.log('ERROR=> ' + JSON.stringify(error));
      });

    // console.log(parseFloat(getCartDetails?.sub_total.toFixed(0)));
    // const email = await PrefManager.getValue('@email');
    // const name = await PrefManager.getValue('@name');
    // const mobile = await PrefManager.getValue('@mobile_no');

    // const options = {
    //   description: 'Whattameal',
    //   // image: re,
    //   currency: 'INR',
    //   key: razorpayKey,
    //   amount: parseFloat(getCartDetails?.sub_total.toFixed(0)) * 100,
    //   name: 'Whattameal',
    //   prefill: {
    //     email: email,
    //     contact: mobile,
    //     name: name,
    //   },
    //   theme: {color: Colors.primary},
    //   config: {
    //     display: {
    //       hide: [{method: 'paylater'}, {method: 'wallet'}],
    //       preferences: {show_default_blocks: true},
    //     },
    //   },
    // };

    // try {
    //   const paymentData = await RazorpayCheckout.open(options);
    //   console.log('Payment Successful:', paymentData);
    //   getCapturePayment(paymentData?.razorpay_payment_id);
    // } catch (error) {
    //   console.log('Payment Error:', error);
    // }
  };

  const Base64 = {
    btoa: (input = '') => {
      let str = input;
      let output = '';
      const chars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

      for (
        let block = 0, charCode, i = 0, map = chars;
        str.charAt(i | 0) || ((map = '='), i % 1);
        output += map.charAt(63 & (block >> (8 - (i % 1) * 8)))
      ) {
        charCode = str.charCodeAt((i += 3 / 4));

        if (charCode > 0xff) {
          throw new Error(
            "'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.",
          );
        }

        block = (block << 8) | charCode;
      }

      return output;
    },
  };
  const getCapturePayment = query => {
    let url = `https://api.razorpay.com/v1/payments/${query}/capture`;

    var username = 'rzp_test_9M9aEfAL8AOJAg';
    var password = 'jD8gGk3VbZ63YLn1yRsz0Ar8';
    var credentials = Base64.btoa(username + ':' + password);

    const data = {
      amount: parseFloat(getCartDetails?.sub_total.toFixed(0)) * 100,
      currency: 'INR',
    };

    var basicAuth = 'Basic ' + credentials;
    axios
      .post(url, data, {
        headers: {Authorization: basicAuth},
      })
      .then(function (response) {
        getTranctionAPI(response?.data?.id);
      })
      .catch(function (error) {
        console.log('Error on Authentication', JSON.stringify(error));
      });
  };

  useEffect(() => {
    if (getItemdetails?.api_status == 1) {
      ToastMessage(getItemdetails?.api_message);
      // Toast.show(getItemdetails?.api_message, Toast.LONG);

      clearDeleteItemRequest();
      setTimeout(() => {
        pulldown();
      }, 1000);
    }
  }, [getItemdetails]);

  const getTranctionAPI = query => {
    let url = `https://api.razorpay.com/v1/payments/${query}`;

    var username = 'rzp_test_9M9aEfAL8AOJAg';
    var password = 'jD8gGk3VbZ63YLn1yRsz0Ar8';
    var credentials = Base64.btoa(username + ':' + password);

    var basicAuth = 'Basic ' + credentials;
    axios
      .get(url, {
        headers: {Authorization: basicAuth},
      })
      .then(function (response) {
        PrefManager.removeValue('@cart_count');
        navigation.replace('PaymentSuccessScreen', {
          response: response?.data,
        });
        setTimeout(() => {
          getTranctionSuccess(response?.data);
        }, 1000);
      })
      .catch(function (error) {
        console.log('Error on Authentication', JSON.stringify(error));
      });
  };

  const getTranctionSuccess = async response => {
    var formatDate = response?.created_at * 1000;
    const ids = await PrefManager.getValue('@id');

    const data = {
      cms_users_id: ids,
      payment_id: response?.id,
      signature: null,
      order_id: response?.order_id,
      entity: response?.entity,
      amount: parseInt(response?.amount / 100),
      currency: response?.currency,
      status: response?.status,
      invoice_id: response?.invoice_id,
      international: response?.international,
      method: response?.method,
      amount_refunded: response?.amount_refunded,
      refund_status: response?.refund_status,
      captured: response?.captured,
      description: response?.description,
      card_id: response?.card_id,
      bank: response?.bank,
      wallet: response?.wallet,
      vpa: response?.vpa,
      email: response?.email,
      contact: response?.contact,
      notes: response?.notes,
      fee: response?.fee / 100,
      tax: response?.tax / 100,
      error_code: response?.error_code,
      error_description: response?.error_description,
      error_source: response?.error_source,
      error_step: response?.error_step,
      error_reason: response?.error_reason,
      rrn: response?.acquirer_data?.rrn,
      upi_transaction_id: response?.acquirer_data?.upi_transaction_id,
      date: moment(formatDate).format('YYYY-MM-DD HH:mm:ss'),
      subscription_ids: getCartDetails?.data?.map(x => x.id),
    };

    getTranctionSuccessAPI(data);
  };

  const showEmptyListView = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 40,
        }}>
        <Text style={{fontSize: RFPercentage(3), color: Colors.gray}}>
          No Items Found :(
        </Text>
      </View>
    );
  };

  const [packingItem, setPackingItem] = useState(false);

  const TotalView = (key, value) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'flex-end',
          padding: 5,
        }}>
        <View style={{flex: 1}}></View>
        <View style={{flex: 0.9}}>
          <Text
            style={{
              fontSize: RFPercentage(2),
              fontFamily: AppFonts.FONT_INTER_BOLD,
              color: Colors.primary,
            }}>
            {key}
          </Text>
        </View>
        <View style={{flex: 0.3}}>
          <Text
            style={{
              fontSize: RFPercentage(2),
              fontFamily: AppFonts.FONT_INTER_BOLD,
              color: Colors.primary,
            }}>
            {value}
          </Text>
        </View>
      </View>
    );
  };
  const confirmDelete = ids => {
    Alert.alert('Delete Item', 'Are you sure delete this Item?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => handleDeleteItem(ids)},
    ]);
  };

  const handleDeleteItem = ids => {
    getDeleteItemRequest(`?id=${ids}`);
  };

  const handlechargesTotal = async value => {
    const ids = await PrefManager.getValue('@id');

    console.log('charge total========>>>', value);
    getHandleChargesTotalRequest(
      `?cms_users_id=${ids}&is_biodegradable=${value}`,
    );
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => navigation.navigate('HomeScreen')},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const callingAPI = async () => {
    setLoader(true);
    axios
      .get(`${API.BASE_URL + Endpoint.get_order_details}?order_id=${orderID}`)
      .then(function (response) {
        console.log('====================================');
        console.log('orderID=> ' + JSON.stringify(orderID));
        console.log('====================================');
        console.log('====================================');
        console.log('RESPONSE=> ' + JSON.stringify(response));
        console.log('====================================');
        const idsArray = getCartDetails?.data.map(order => order.id);
        navigation.replace('PaymentSuccessScreen', {
          response: response?.data,
        });
        setLoader(false);
        setOpenWeb(false);
      });
  };

  const handleShouldStartLoadWithRequest = event => {
    const url = event.url;

    if (Platform.OS === 'android') {
      if (url.startsWith('upi:') || url.startsWith('intent:')) {
        try {
          Linking.openURL(url);
        } catch (error) {
          console.error('Failed to open URL: ', error);
        }
        return false;
      }
    } else if (Platform.OS === 'ios') {
      if (url.includes('//upi/') || url.includes('intent')) {
        try {
          Linking.openURL(url);
        } catch (error) {
          console.error('Failed to open URL: ', error);
        }
        return false;
      }
    }
    return true;
  };

  return (
    <>
      <NonAuthHeader
        navigation={navigation}
        title="Payments"
        isBack={true}
        isCart={false}
        goBack={true}
        reDireact={() => navigation.navigate('HomeScreen')}
      />

      {openWeb === false && (
        <View>
          <FlatList
            data={getCartDetails?.data}
            style={{height: SLIDER_HIGHT / 1.7}}
            ListEmptyComponent={showEmptyListView()}
            renderItem={({item, index}) => {
              return (
                <ItemDetailView
                  title={`${item.total_days} MEAL `}
                  counter={item.total_days + ' ' + 'X' + ' ' + item.price}
                  payment={item.sub_total}
                  student_name={item?.student_name}
                  ids={item.id}
                  confirmDelete={confirmDelete}
                  expiryMessage={item?.message}
                  validStartDate={item?.start_date}
                  validEndDate={item?.end_date}
                />
              );
            }}
          />
        </View>
      )}
      {loader == true ? <ProgressLoader /> : null}

      {console.log('getCartDetails==> ' + JSON.stringify(getCartDetails))}

      {openWeb === false ? (
        getCartDetails?.data?.length > 0 ? (
          <View
            style={{
              width: '100%',
              bottom: 0,
              position: 'absolute',
            }}>
            {getCartDetails?.is_biodegradable == 'yes' && (
              <View style={{alignSelf: 'center'}}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                  }}
                  onPress={() => {
                    if (packingItem == true) {
                      setPackingItem(false);
                      handlechargesTotal(0);
                    } else {
                      setPackingItem(true);
                      handlechargesTotal(1);
                    }
                  }}>
                  <CheckBox
                    onClick={() => {
                      if (packingItem == true) {
                        setPackingItem(false);
                        handlechargesTotal(0);
                      } else {
                        setPackingItem(true);
                        handlechargesTotal(1);
                      }
                    }}
                    isChecked={packingItem}
                    checkedImage={
                      <Image
                        source={require('../../assets/checkbox.png')}
                        style={{width: 20, height: 20}}
                      />
                    }
                    unCheckedImage={
                      <Image
                        source={require('../../assets/unchecked.png')}
                        style={{width: 20, height: 20}}
                      />
                    }
                  />
                  <View>
                    <Text
                      style={{
                        fontSize: RFPercentage(2),
                        fontFamily: AppFonts.FONT_INTER_MEDIUM,
                        color: Colors.primary,
                      }}>
                      {`Add Biodegradable Tray`}
                    </Text>
                    <Text
                      style={{
                        fontSize: RFPercentage(2),
                        fontFamily: AppFonts.FONT_INTER_MEDIUM,
                        color: Colors.primary,
                      }}>
                      {`(₹${getCartDetails?.bio_charge} per meal will be charged)`}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}

            <View style={{backgroundColor: '#D9D9D9'}}>
              {TotalView('TOTAL  ', `₹${getCartDetails?.total}`)}
              {TotalView(`Tran. Chg.`, `₹${getCartDetails?.tax_value}`)}
              {packingItem == true || getCartDetails?.biodegradable_charge > 0
                ? TotalView(
                    `Biodegradable Pack `,
                    `₹${getCartDetails?.biodegradable_charge}`,
                  )
                : null}

              {TotalView(`SUB TOTAL `, `₹${getCartDetails?.sub_total}`)}

              <View
                style={{width: '90%', alignSelf: 'center', marginBottom: 10}}>
                <SuccessBtn
                  title="Pay"
                  backgroundColor={Colors.green}
                  textColor={Colors.white}
                  onPress={() => handlePayment()}
                />
              </View>
            </View>
          </View>
        ) : null
      ) : null}

      {openWeb && (
        // <WebView
        //   source={{html: HTMLCODE}}
        //   userAgent={
        //     'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36'
        //   }
        //   javaScriptEnabled={true}
        //   domStorageEnabled={true}
        //   scalesPageToFit={true}
        //   scrollEnabled={false}
        //   useWebKit={true}
        //   onNavigationStateChange={navState => {
        //     console.log(navState.url);
        //     console.log(navState.loading);
        //   }}
        //   onError={syntheticEvent => {
        //     const {nativeEvent} = syntheticEvent;
        //     console.log('nativeEvent', nativeEvent);
        //   }}
        //   onHttpError={syntheticEvent => {
        //     const {nativeEvent} = syntheticEvent;
        //     console.log('WebView received error status code: ', nativeEvent);
        //   }}
        //   automaticallyAdjustContentInsets={false}
        //   startInLoadingState={true}
        //   originWhitelist={['*']}
        //   onMessage={event => {}}
        //   injectedJavaScript="window.ReactNativeWebView.postMessage(document.body.scrollHeight)"
        //   viewportContent={
        //     'width=device-width, user-scalable=no, initial-scale=1.0'
        //   }
        //   onContentProcessDidTerminate={syntheticEvent => {
        //     const {nativeEvent} = syntheticEvent;
        //     console.log('Content process terminated, reloading', nativeEvent);
        //   }}
        // />

        <WebView
          source={{html: HTMLCODE}}
          originWhitelist={['*']}
          startInLoadingState={true}
          style={{flex: 1, borderWidth: 1, height: '100%'}}
          mixedContentMode="always"
          javaScriptEnabled={true}
          domStorageEnabled={true}
          scalesPageToFit={true}
          scrollEnabled={false}
          automaticallyAdjustContentInsets={true}
          onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
          onHttpError={syntheticEvent => {
            const {nativeEvent} = syntheticEvent;
            console.warn('WebView received error status code: ', nativeEvent);
          }}
          onNavigationStateChange={navEvent => {
            if (
              navEvent['url'] ===
              'https://appadmin.whattameal.com/public/api/get-response'
            ) {
              setTimeout(() => {
                callingAPI();
              }, 1500);
              console.log('SUCCESSS');
            }
          }}
        />
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.nonAuth.loading,
    getCartDetails: state.nonAuth.getCartDetails,
    getItemdetails: state.nonAuth.getItemdetails,
    getChargesApplyDetails: state.nonAuth.getChargesApplyDetails,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getCartItem: data => {
      dispatch(getCartItem(data));
    },
    clearCartItem: data => {
      dispatch(clearCartItem(data));
    },
    getTranctionSuccessAPI: data => {
      dispatch(getTranctionSuccessAPI(data));
    },
    clearTranctionSuccessAPI: data => {
      dispatch(clearTranctionSuccessAPI(data));
    },
    getDeleteItemRequest: data => {
      dispatch(getDeleteItemRequest(data));
    },
    clearDeleteItemRequest: data => {
      dispatch(clearDeleteItemRequest(data));
    },
    getHandleChargesTotalRequest: data => {
      dispatch(getHandleChargesTotalRequest(data));
    },
    clearHandleChargesTotalRequest: data => {
      dispatch(clearHandleChargesTotalRequest(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardDetailScreenComponents);

const styles = StyleSheet.create({
  title: {
    padding: 10,
    fontSize: RFPercentage(2.5),
    fontFamily: AppFonts.FONT_INTER_BOLD,
    color: Colors.black,
  },
  subsribebTn: {
    backgroundColor: Colors.green,
    width: ScaleSizeUtils.LISTING_100 * 1.5,
    alignItems: 'center',
    alignContent: 'center',
    padding: 10,
    borderRadius: 5,
  },
  subsribetxt: {
    fontFamily: AppFonts.FONT_INTER_REGULER,
    fontSize: RFPercentage(2.5),
    color: Colors.white,
  },
});
