import {
  Alert,
  Image,
  Linking,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import NonAuthHeader from '../NonAuthHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '../../constants';
import {WebView} from 'react-native-webview';

const PaymentWebViewScreen = props => {
  const data = props?.route?.params?.data;
  const [numberOfmeal, setNumberofMeal] = useState('0');
  console.log('====================================');
  console.log('datadata=> ' + JSON.stringify(data));
  console.log('====================================');

  const webViewRef = React.useRef(null);

  const handleShouldStartLoadWithRequest = event => {
    const url = event.url;
    if (Platform.OS === 'android') {
      if (url.startsWith('upi:') || url.startsWith('intent:')) {
        Linking.openURL(url);
        return false;
      }
    }
    return true;
  };

  const HTMLCODE = `<html dir="ltr" lang="en">
  <head>
     <meta charset="utf-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <script type="module" src="https://uat.billdesk.com/jssdk/v1/dist/billdesksdk/billdesksdk.esm.js"></script>
     <script nomodule="" src="https://uat.billdesk.com/jssdk/v1/dist/billdesksdk.js"></script>
     <script src="https://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>
     <link href="https://uat.billdesk.com/jssdk/v1/dist/billdesksdk/billdesksdk.css" rel="stylesheet">
  </head>
  
  <body>
     <script type="text/javascript">
  
        var flow_config = {
           merchantId: 'BDUATV2GJT',
           bdOrderId: ${JSON.stringify(data?.data?.bdOrderID)},
           authToken: ${JSON.stringify(data?.data?.OthToken)},
           childWindow: false,
           returnUrl: "https://appadmin.whattameal.com/public/api/get-response",
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
           window.loadBillDeskSdk(config);
        });
     </script>
  </body>
  </html>`;

  return (
    <WebView
      source={{html: HTMLCODE}}
      useWebKit
      javaScriptEnabled={true}
      originWhitelist={['*']}
      style={{flex: 1}}
      onNavigationStateChange={navEvent => {
        if (
          navEvent['url'] ===
          'https://appadmin.whattameal.com/public/api/get-response'
        ) {
          //   callingAPI();
          console.log('SUCCESSS');
        }
      }}
      allowFileAccess={true}
      allowUniversalAccessFromFileURLs={true}
      allowFileAccessFromFileURLs={true}
      allowsInlineMediaPlayback={true}
      onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
      ref={webViewRef}
      startInLoadingState={true}
    />
  );
};

export default PaymentWebViewScreen;

const styles = StyleSheet.create({});
