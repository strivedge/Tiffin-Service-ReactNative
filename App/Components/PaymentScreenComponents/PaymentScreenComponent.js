import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import NonAuthHeader from '../NonAuthHeader';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {Colors} from '../../constants';
import AppFonts from '../../constants/Fonts';
import PrefManager from '../../Helper/PrefManager';
import {connect} from 'react-redux';
import {
  clearPaymentHistory,
  getPaymentHistory,
} from '../../redux/nonAuth/actions';
import moment from 'moment';
import ProgressLoader from '../ProgressLoader';

function PaymentScreenComponent(props) {
  const {
    navigation,
    getPaymentHistory,
    clearPaymentHistory,
    getPaymentHistoryDetails,
    loading,
  } = props;

  const [cartCount, setCartCount] = useState(0);

  const pullDown = async () => {
    const ids = await PrefManager.getValue('@id');
    getPaymentHistory(`?user_id=${ids}`);

    const count = await PrefManager.getValue('@cart_count');
    setCartCount(count);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      pullDown();
    });
    return unsubscribe;
  }, []);

  const renderItemsub = ({item, index}) => {
    return (
      <View>
        <Text
          style={{
            fontSize: RFPercentage(2.2),
            color: Colors.gray,
            maxWidth: '60%',
          }}>
          {`${index + 1} Meal   `} {item.total_days} X{' '}
          {item.sub_total / item.total_days}
        </Text>
      </View>
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('MoneyPaidScreen', {data: item, index: index})
        }
        style={{
          width: '90%',
          alignSelf: 'center',
          borderColor: '#E8E8E8',
          backgroundColor: Colors.white,
          padding: 20,
          marginBottom: 10,
          borderRadius: 10,
        }}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <Text
              style={{
                fontSize: RFPercentage(2),
                color: Colors.gray,
                maxWidth: '60%',
              }}>
              {moment(item.transaction_date).format('YYYY-MM-DD hh:mm A')}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: RFPercentage(3),
                  color: Colors.black,
                  fontFamily: AppFonts.FONT_INTER_BOLD,
                }}>
                ₹{item.amount}
              </Text>
            </View>
          </View>
          <FlatList
            data={item?.subscriptions}
            inverted={true}
            renderItem={renderItemsub}
          />

          <View>
            <Text
              style={{
                fontFamily: AppFonts.FONT_INTER_MEDIUM,
                fontSize: RFPercentage(2),
                color: Colors.black,
              }}>
              Transaction ID -
            </Text>
            <Text
              style={{
                fontFamily: AppFonts.FONT_INTER_MEDIUM,
                fontSize: RFPercentage(2),
                color: Colors.black,
                alignSelf: 'flex-end',
              }}>
              {item?.transactionid}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
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
          No Payments Found :(
        </Text>
      </View>
    );
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    pullDown();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <View style={{flex: 1}}>
      <NonAuthHeader
        isDrawer={true}
        title="Payment"
        navigation={navigation}
        isCart={true}
        count={cartCount}
      />
      {loading == true ? <ProgressLoader /> : null}

      <View style={{marginLeft: 10, marginTop: 10}}></View>
      <FlatList
        data={
          getPaymentHistoryDetails?.length > 0 ? getPaymentHistoryDetails : []
        }
        renderItem={renderItem}
        style={{marginBottom: '25%'}}
        ListEmptyComponent={showEmptyListView()}
        refreshing={refreshing} // Added pull to refesh state
        onRefresh={onRefresh}
      />
    </View>
  );
}

const mapStateToProps = state => {
  return {
    loading: state.nonAuth.loading,
    getPaymentHistoryDetails: state.nonAuth.getPaymentHistory?.data,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getPaymentHistory: data => {
      dispatch(getPaymentHistory(data));
    },
    clearPaymentHistory: data => {
      dispatch(clearPaymentHistory(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PaymentScreenComponent);
