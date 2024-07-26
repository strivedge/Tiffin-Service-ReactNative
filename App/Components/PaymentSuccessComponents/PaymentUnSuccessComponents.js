import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useRef } from 'react';
import NonAuthHeader from '../NonAuthHeader';
import { Colors, Strings } from '../../constants';
import { styles } from '../../Style/commonStyle';
import moment from 'moment';
import AppFonts from '../../constants/Fonts';
import Button from '../Button';
import { RFPercentage } from 'react-native-responsive-fontsize';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFetchBlob from 'rn-fetch-blob';
import { useRoute } from '@react-navigation/native';

const PaymentUnSuccessComponents = props => {
  const route = useRoute();

  const { response, subcription_ids } = route.params;
  let Data = response?.data
  console.log("response==> " + JSON.stringify(response));


  var formatDate = response?.created_at * 1000;

  const viewShots = useRef('');
  captureAndShareScreenshot = async () => {
    viewShots.current.capture().then(async uri => {
      let optionss = {
        url: uri,
        filename: 'PAYMENT_SUCCESS_BILL',
      };

      await Share.open(optionss);

      console.log('URI:=> ' + JSON.stringify(uri));
    });
  };

  const myAsyncPDFFunction = async () => {
    var RNFS = require('react-native-fs');
    let options = {
      html: '<h1>PDF TEST</h1>',
      fileName: `Payment_${moment().format('DD-MM-YYYY')}`,
      directory: 'Download',
      base64: true,
    };

    let file = await RNHTMLtoPDF.convert(options);

    let optionss = {
      url: 'data:application/pdf;base64,' + file.base64,
      filename: 'PAYMENT_SUCCESS_BILL',
    };

    await Share.open(optionss);
  };
  return (
    <>
      <NonAuthHeader
        isDrawer={false}
        title={'Thanks for Order'}
        navigation={props.navigation}
      />
      <ScrollView>
        <View style={{ padding: 0, backgroundColor: Colors.white }}>
          <ViewShot
            style={{ backgroundColor: Colors.white, padding: 10 }}
            ref={viewShots}
            options={{
              format: 'jpg',
              fileName: 'Payment_Sucess_',
              quality: 0.9,
            }}>
            <View style={{ height: 50, width: '100%' }}></View>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.paymentText}>{'Payment Failed'}</Text>
              <Image
                source={require('../../assets/cancel.png')}
                style={{ height: 50, width: 50, alignSelf: 'center' }}
              />
            </View>

            <Text style={styles.paymentDes}>
              Your transaction has been not successfully processed and subscription
              plan is not done.
            </Text>

            <Text style={styles.paymentTime}>
              {moment(Data?.transaction_date).format('DD MMM YYYY hh:mm A')}
            </Text>

            <Text
              style={[
                styles.paymentDes,
                {
                  fontFamily: AppFonts.FONT_INTER_MEDIUM,
                },
              ]}>
              DETAILS
            </Text>

            <View style={styles.cardBoxContainer}>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.paidAmount}>Paid amount </Text>
                <Text style={styles.amountText}>
                  ₹ {Data?.amount}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.paidAmount}>Refrence number </Text>
                <Text style={styles.amountText}>
                  {Data?.orderid}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.paidAmount}>Payment mode</Text>
                <Text style={[styles.amountText, { textTransform: 'uppercase' }]}>
                  {Data?.payment_method_type}
                </Text>
              </View>
              <View
                style={{
                  marginTop: 10,
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.paidAmount}>Transaction ID</Text>
                <Text
                  style={[
                    styles.amountText,
                    { textAlign: 'left', alignSelf: 'flex-end' },
                  ]}
                  numberOfLines={2}>
                  {Data?.transactionid}
                </Text>
              </View>
            </View>
            <View style={{ height: 50, width: '100%' }}></View>
          </ViewShot>

          <View
            style={{
              flexDirection: 'row',
              width: '50%',
              alignSelf: 'flex-end',
              justifyContent: 'space-around',
              height: 60,
            }}>
            <TouchableOpacity
              onPress={() => {
                captureAndShareScreenshot();
              }}>
              <Image
                source={require('../../assets/share.png')}
                style={styles.shareIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require('../../assets/email.png')}
                style={styles.shareIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                myAsyncPDFFunction();
              }}>
              <Image
                source={require('../../assets/download.png')}
                style={styles.shareIcon}
              />
            </TouchableOpacity>
          </View>

          <Text style={[styles.paymentDes, { marginLeft: 10 }]}>
            Note: You can find detailed invoice of your transaction in Payment
            Options.
          </Text>

          <Button
            title="Done"
            onPress={() => {
              props.navigation.replace('AppDrawerStack');
            }}
            backgroundColor={Colors.green}
            textColor={Colors.white}
            buttonStyle={{
              borderRadius: RFPercentage(2),
              marginBottom: 10,
            }}
            textStyle={{
              fontFamily: AppFonts.FONT_INTER_BOLD,
              fontSize: RFPercentage(3),
            }}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default PaymentUnSuccessComponents;
