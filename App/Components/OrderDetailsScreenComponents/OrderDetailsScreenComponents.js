import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import NonAuthHeader from '../NonAuthHeader';
import AppFonts from '../../constants/Fonts';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {Colors} from '../../constants';
import {useRoute} from '@react-navigation/native';
import TimelineStatus from '../TimelineStatus';

const OrderDetailsScreenComponents = ({navigation}) => {
  const route = useRoute();

  const {item, index} = route.params;

  console.log('kkkk===>' + JSON.stringify(item));
  return (
    <View style={{flex: 1}}>
      <NonAuthHeader
        navigation={navigation}
        isBack={true}
        title="Order Details"
      />
      <ScrollView>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            borderColor: '#E8E8E8',
            marginTop: 10,
            borderWidth: 3,
            backgroundColor: Colors.white,
            padding: 20,
            marginBottom: 10,
            borderRadius: 15,
          }}>
          <Text
            style={{
              fontFamily: AppFonts.FONT_INTER_REGULER,
              fontSize: RFPercentage(2),
              color: Colors.black,
              marginBottom: 10,
            }}>
            Order ID - {item?.id}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{
                  fontFamily: AppFonts.FONT_INTER_BOLD,
                  fontSize: RFPercentage(2.5),
                  color: Colors.green,
                  marginBottom: 10,
                }}>
                Your Order Completed
              </Text>
              <Text
                style={{
                  fontFamily: AppFonts.FONT_INTER_BOLD,
                  fontSize: RFPercentage(2.5),
                  color: Colors.black,
                  marginBottom: 10,
                }}>
                {`${item?.qty} Meal`}
              </Text>
              {/* <Text
                style={{
                  fontFamily: AppFonts.FONT_INTER_REGULER,
                  fontSize: RFPercentage(2),
                  color: Colors.black,
                  maxWidth: '80%',
                  marginBottom: 10,
                }}>
                Rice+Salad+Achar+Buttermilk+ ...{' '}
              </Text> */}
            </View>
          </View>
          <View
            style={{
              height: 0.5,
              backgroundColor: Colors.black,
              marginBottom: 20,
            }}
          />

          <View>
            <Text
              style={{
                fontFamily: AppFonts.FONT_INTER_REGULER,
                fontSize: RFPercentage(2),
                color: Colors.black,
                marginBottom: 10,
              }}>
              Quantity {item?.qty}{' '}
            </Text>
            <Text
              style={{
                fontFamily: AppFonts.FONT_INTER_REGULER,
                fontSize: RFPercentage(2),
                color: Colors.black,
                marginBottom: 10,
              }}>
              Price per meal ₹{item?.sub_total / item?.total_days}{' '}
            </Text>
            <Text
              style={{
                fontFamily: AppFonts.FONT_INTER_REGULER,
                fontSize: RFPercentage(2),
                color: Colors.black,
                maxWidth: '60%',
                marginBottom: 10,
              }}>
              Total ₹{item?.sub_total}
            </Text>
          </View>
          <View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  fontFamily: AppFonts.FONT_INTER_REGULER,
                  fontSize: RFPercentage(2),
                  color: Colors.black,
                  maxWidth: '60%',
                  marginBottom: 10,
                }}>
                Paid amount{' '}
              </Text>
              <Text
                style={{
                  fontFamily: AppFonts.FONT_INTER_MEDIUM,
                  fontSize: RFPercentage(2),
                  color: Colors.black,
                  maxWidth: '60%',
                  marginBottom: 10,
                }}>
                ₹{item?.sub_total}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontFamily: AppFonts.FONT_INTER_REGULER,
                  fontSize: RFPercentage(2),
                  color: Colors.black,
                  maxWidth: '60%',
                  marginBottom: 10,
                }}>
                Refrence number{' '}
              </Text>
              <Text
                style={{
                  fontFamily: AppFonts.FONT_INTER_MEDIUM,
                  fontSize: RFPercentage(2),
                  color: Colors.black,
                  maxWidth: '60%',
                  marginBottom: 10,
                }}>
                {item?.payment?.rrn}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontFamily: AppFonts.FONT_INTER_REGULER,
                  fontSize: RFPercentage(2),
                  color: Colors.black,
                  maxWidth: '60%',
                  marginBottom: 10,
                }}>
                Payment ID
              </Text>
              <Text
                style={{
                  fontFamily: AppFonts.FONT_INTER_MEDIUM,
                  fontSize: RFPercentage(2),
                  color: Colors.black,
                  maxWidth: '60%',
                  marginBottom: 10,
                }}>
                {item?.payment?.payment_id}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontFamily: AppFonts.FONT_INTER_REGULER,
                  fontSize: RFPercentage(2),
                  color: Colors.black,
                  maxWidth: '60%',
                  marginBottom: 10,
                }}>
                Payment mode
              </Text>
              <Text
                style={{
                  fontFamily: AppFonts.FONT_INTER_MEDIUM,
                  fontSize: RFPercentage(2),
                  color: Colors.black,
                  maxWidth: '60%',
                  marginBottom: 10,
                  textTransform: 'uppercase',
                }}>
                {item?.payment?.method}
              </Text>
            </View>
          </View>

          <View
            style={{
              height: 0.5,
              backgroundColor: Colors.black,
              marginBottom: 20,
            }}
          />
          <TimelineStatus
            start_date={item?.start_date}
            end_date={item?.end_date}
          />
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  MainContainer: {},

  listStyle: {
    marginTop: 20,
    marginLeft: 20,
  },

  text: {
    textAlign: 'center',
    fontSize: 24,
    marginTop: 20,
  },
});

export default OrderDetailsScreenComponents;
