import {
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import NonAuthHeader from '../NonAuthHeader';
import {FlatList} from 'react-native-gesture-handler';
import {Colors, ScaleSizeUtils} from '../../constants';
import {RFPercentage} from 'react-native-responsive-fontsize';
import AppFonts from '../../constants/Fonts';
import PrefManager from '../../Helper/PrefManager';
import {connect} from 'react-redux';
import {
  clearOrderDetailsRequest,
  getOrderDetailsRequest,
} from '../../redux/nonAuth/actions';
import {SLIDER_WIDTH} from '../HomeScreenComponents/CarouselCardItem';
import ProgressLoader from '../ProgressLoader';

const MyOrderScreenComponents = props => {
  const {
    navigation,
    getOrderDetailsRequest,
    clearOrderDetailsRequest,
    getSubscriptionOrders,
    loading,
  } = props;

  const [refreshing, setRefreshing] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  const handleFocus = async () => {
    const ids = await PrefManager.getValue('@id');
    getOrderDetailsRequest(`?cms_users_id=${ids}`);
    const count = await PrefManager.getValue('@cart_count');
    setCartCount(count);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      handleFocus();
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    setRefreshing(false);
  }, [getSubscriptionOrders]);

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
          No Orders Found :(
        </Text>
      </View>
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('OrderDetailScreen', {item: item, index: index})
        }>
        <View style={styles.item}>
          <View style={{flex: 0.8}}>
            {item.status == 1 && (
              <View style={{justifyContent: 'center', flexDirection: 'column'}}>
                <Text
                  style={{
                    fontSize: RFPercentage(2.3),
                    fontFamily: AppFonts.FONT_INTER_BOLD,
                    color: Colors.primary,
                    padding: 5,
                  }}>
                  Your Order Completed
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    maxWidth: SLIDER_WIDTH / 2,
                    alignContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    numberOfLines={2}
                    style={{
                      fontSize: RFPercentage(2),
                      fontFamily: AppFonts.FONT_INTER_REGULER,
                      color: Colors.black,
                      padding: 5,
                    }}>
                    {`${item?.total_days} Meal`} ₹
                    {item?.sub_total / item?.total_days} X {item?.total_days}
                  </Text>
                  <Text
                    style={{
                      fontSize: RFPercentage(2),
                      fontFamily: AppFonts.FONT_INTER_MEDIUM,
                      color: Colors.black,
                      padding: 5,
                    }}>
                    = ₹{item?.sub_total}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: RFPercentage(1.8),
                    fontFamily: AppFonts.FONT_INTER_REGULER,
                    color: Colors.black,
                    padding: 5,
                  }}>
                  Order ID - {item?.id}
                </Text>
                <Text
                  style={{
                    fontSize: RFPercentage(1.8),
                    fontFamily: AppFonts.FONT_INTER_BOLD,
                    color: Colors.black,
                    padding: 5,
                  }}>
                  Student - {item?.student?.name}
                </Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    handleFocus();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View>
      <NonAuthHeader
        navigation={navigation}
        title="Your Order"
        isDrawer={true}
        isCart={true}
        count={cartCount}
      />
      {loading == true ? <ProgressLoader /> : null}

      <View style={{marginTop: 10}} />
      <FlatList
        data={getSubscriptionOrders?.data}
        renderItem={renderItem}
        style={{marginBottom: '40%'}}
        ListEmptyComponent={showEmptyListView()}
        refreshControl={
          <RefreshControl
            //refresh control used for the Pull to Refresh
            onRefresh={onRefresh}
            refreshing={refreshing}
          />
        }
      />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.nonAuth.loading,
    getSubscriptionOrders: state.nonAuth.getSubscriptionOrders,
    error: state.nonAuth.error && state.nonAuth.error,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getOrderDetailsRequest: data => {
      dispatch(getOrderDetailsRequest(data));
    },
    clearOrderDetailsRequest: data => {
      dispatch(clearOrderDetailsRequest(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyOrderScreenComponents);

const styles = StyleSheet.create({
  item: {
    width: SLIDER_WIDTH / 1.12,
    height: ScaleSizeUtils.LISTING_100 * 1.5,
    backgroundColor: 'white',
    borderRadius: 15,
    marginHorizontal: 20,
    padding: 10,
    marginBottom: 20,
    flexDirection: 'row',

    alignItems: 'center',
    shadowRadius: 5,
  },
});
