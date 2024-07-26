import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import NonAuthHeader from '../NonAuthHeader';
import AppFonts from '../../constants/Fonts';
import {Colors} from '../../constants';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useRoute} from '@react-navigation/native';
import moment from 'moment';

const MoneyPaidScreenComponents = props => {
  const route = useRoute();

  const renderItemsub = ({item}) => {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <Text
          style={{
            fontFamily: AppFonts.FONT_INTER_BOLD,
            fontSize: RFPercentage(2.5),
            color: Colors.black,
          }}>
          {`${item.total_days} Meal`}
        </Text>
        <Text
          style={{
            fontFamily: AppFonts.FONT_INTER_BOLD,
            fontSize: RFPercentage(2.5),
            color: Colors.black,
          }}>
          {item.total_days} X {item.sub_total / item.total_days} =
        </Text>
        <Text
          style={{
            fontFamily: AppFonts.FONT_INTER_BOLD,
            fontSize: RFPercentage(2.5),
            color: Colors.black,
          }}>
          ₹{item.sub_total}
        </Text>
      </View>
    );
  };

  const {data, index} = route.params;
  const {navigation} = props;
  console.log('====================================');
  console.log('DATA=> ' + JSON.stringify(data));
  console.log('====================================');
  return (
    <View>
      <NonAuthHeader navigation={navigation} isBack={true} title="Money Paid" />
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          borderColor: '#E8E8E8',
          backgroundColor: Colors.white,
          marginTop: 20,
          padding: 20,
          marginBottom: 10,
          borderRadius: 10,
        }}>
        <ScrollView>
          <FlatList data={data?.subscriptions} renderItem={renderItemsub} />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: 20,
              paddingBottom: 20,
            }}>
            <Text
              style={{
                fontFamily: AppFonts.FONT_INTER_BOLD,
                fontSize: RFPercentage(6),
                color: Colors.black,
              }}>
              ₹{data?.amount}
            </Text>
            {data?.auth_status == '0300' &&
            data?.transaction_error_type == 'success' ? (
              <Image source={require('../../assets/checkSuccess.png')} />
            ) : (
              <Image
                source={require('../../assets/cancel.png')}
                style={{height: 50, width: 50}}
              />
            )}
          </View>
          <View>
            <Text
              style={{
                fontFamily: AppFonts.FONT_INTER_REGULER,
                fontSize: RFPercentage(2.5),
                color: Colors.black,
              }}>
              For
            </Text>
            <Text
              style={{
                fontFamily: AppFonts.FONT_INTER_BOLD,
                fontSize: RFPercentage(3),
                color: Colors.black,
              }}>
              {` Meal`}
            </Text>
            <Text
              style={{
                fontFamily: AppFonts.FONT_INTER_REGULER,
                fontSize: RFPercentage(2.5),
                color: Colors.black,
              }}>
              Online Payment
            </Text>
          </View>
          <View
            style={{borderBottomWidth: 1, marginTop: 20, marginBottom: 20}}
          />
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{
                  fontFamily: AppFonts.FONT_INTER_REGULER,
                  fontSize: RFPercentage(2.5),
                  color: Colors.black,
                }}>
                From
              </Text>
              <Text
                style={{
                  fontFamily: AppFonts.FONT_INTER_BOLD,
                  fontSize: RFPercentage(3),
                  color: Colors.black,
                }}>
                {data?.subscriptions[0]?.student?.name}
              </Text>
              <Text
                style={{
                  fontFamily: AppFonts.FONT_INTER_REGULER,
                  fontSize: RFPercentage(2.5),
                  color: Colors.black,
                  textTransform: 'uppercase',
                }}>
                {data?.method}
              </Text>
            </View>
            <View
              style={{
                borderRadius: 100,
                backgroundColor: Colors.green,
                padding: 10,
              }}>
              <Text
                style={{
                  fontSize: RFPercentage(4),
                  color: Colors.white,
                }}>
                {data?.subscriptions[0]?.student?.name
                  .split(' ')
                  .map(word => word.charAt(0))
                  .join('')}
              </Text>
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <Text
              style={{
                fontFamily: AppFonts.FONT_INTER_REGULER,
                fontSize: RFPercentage(2.5),
                color: Colors.black,
                marginBottom: 10,
              }}>
              Paid at{' '}
              {moment(data.transaction_date).format('DD MMM YYYY hh:mm A')}
            </Text>
            <Text
              style={{
                fontFamily: AppFonts.FONT_INTER_REGULER,
                fontSize: RFPercentage(2.5),
                color: Colors.black,
                marginBottom: 10,
              }}>
              Order ID: {data?.orderid}
            </Text>
            <View>
              <Text
                style={{
                  fontFamily: AppFonts.FONT_INTER_REGULER,
                  fontSize: RFPercentage(2.5),
                  color: Colors.black,
                  marginBottom: 10,
                }}>
                Transaction ID -
              </Text>
              <Text
                style={{
                  fontFamily: AppFonts.FONT_INTER_REGULER,
                  fontSize: RFPercentage(2.5),
                  color: Colors.black,
                  marginBottom: 10,
                  alignSelf: 'flex-end',
                }}>
                {data.transactionid}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: AppFonts.FONT_INTER_REGULER,
                fontSize: RFPercentage(2.5),
                color: Colors.black,
                marginBottom: 10,
              }}>
              Ref No: {data?.transaction_error_code + data?.transactionid}
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default MoneyPaidScreenComponents;

const styles = StyleSheet.create({});
