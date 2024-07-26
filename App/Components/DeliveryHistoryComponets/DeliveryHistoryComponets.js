import React, {useEffect, useState} from 'react';
import NonAuthHeader from '../NonAuthHeader';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  Platform,
} from 'react-native';
import Texinput from '../Texinput';
import {Colors} from '../../constants';
import moment from 'moment';
import {RFPercentage} from 'react-native-responsive-fontsize';
import AppFonts from '../../constants/Fonts';
import PrefManager from '../../Helper/PrefManager';
import {
  clearDeliveryHistoryDetails,
  clearupdateOrderStatusRequest,
  getDeliveryHistoryDetails,
  updateOrderStatusRequest,
} from '../../redux/Delivery/actions';
import Toast from 'react-native-simple-toast';

import {connect} from 'react-redux';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import ProgressLoader from '../ProgressLoader';
import SwitchSelector from 'react-native-switch-selector';
import ToastMessage from '../ToastMeassage';

const DeliveryHistoryComponets = props => {
  const {
    navigation,
    getDeliveryHistoryDetails,
    clearDeliveryHistoryDetails,
    deliveryHistoryDetails,
    updateOrderStatusRequest,
    updateOrderDetails,
    clearupdateOrderStatusRequest,
    loading,
  } = props;
  const [isfocusname, setFocusname] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [selectDate, setSelectDate] = useState('');
  const route = useRoute();

  const SearchFilterFunction = text => {
    const {deliveryHistoryDetails} = props;
    const newdata = deliveryHistoryDetails?.filter(item => {
      const itemName =
        item?.student?.name.toUpperCase().indexOf(text.toUpperCase()) > -1;

      return itemName;
    });
    setData(newdata);
    setSearch(text);
  };

  useEffect(() => {
    navigation.addListener('focus', getUserDetails);
    navigation.addListener('blur', getUserDetailsclaen);
    return () => {
      navigation.removeListener('focus', getUserDetails);
      navigation.removeListener('blur', getUserDetailsclaen);
    };
  }, [navigation]);

  async function getUserDetails() {
    const select_date = await PrefManager.getValue('@select_Date');
    const ids = await PrefManager.getValue('@select_child');
    setSelectDate(select_date);
    const original_ids = ids.length > 0 ? ids : '';

    if (select_date) {
      pullDown(select_date, original_ids, '1');
    } else {
      const today = moment(new Date()).format('YYYY-MM-DD');
      pullDown(today, original_ids, '1');
    }
  }

  async function getUserDetailsclaen() {
    PrefManager.removeValue('@select_Date');
    PrefManager.removeValue('@select_child');
  }

  // async function getUserDetailsQRids() {
  //   const ids = await PrefManager.getValue('@select_child');
  //   const today = moment(new Date()).format('YYYY-MM-DD');

  //   if (ids) {
  //     pullDown(today, ids);
  //   }
  // }

  // async function getUserDetailsQRidsclaen() {
  //   PrefManager.removeValue('@select_child');
  // }
  useEffect(() => {
    if (updateOrderDetails?.api_status == 1) {
      ToastMessage(updateOrderDetails?.api_message);
      // Toast.show(updateOrderDetails?.api_message, Toast.LONG);
      clearupdateOrderStatusRequest();
      setTimeout(() => {
        getUserDetails();
      }, 1000);
    }
  }, [updateOrderDetails]);

  const pullDown = async (date, id, type) => {
    const ids = await PrefManager.getValue('@id');
    getDeliveryHistoryDetails(
      `?master_delivery_person_id=${ids}&date=${date}&master_students_id=${id}&day_type=${type}`,
    );
  };
  useEffect(() => {
    const today = moment(new Date()).format('YYYY-MM-DD');
    pullDown(today, '', '1');
  }, []);

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
    console.log('kkkkkkk=====' + JSON.stringify(item));
    const today = moment(new Date()).format('YYYY-MM-DD');
    return (
      <View style={styles.container}>
        <View style={styles.innerview}>
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
            {item?.status != 5 && today < item?.date ? (
              <>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={require('../../assets/hourglass.png')}
                    style={{
                      tintColor: Colors.dark_yellow,
                      width: 25,
                      height: 25,
                      resizeMode: 'stretch',
                      marginRight: 5,
                    }}
                  />
                  <Text style={[styles.delviry, {color: Colors.dark_yellow}]}>
                    Pending
                  </Text>
                </View>
              </>
            ) : null}

            {item?.status == 4 ? (
              <Text style={[styles.delviry, {color: Colors.green}]}>
                Delivered
              </Text>
            ) : null}

            {item?.status == 5 ? (
              <Text style={[styles.delviry, {color: Colors.red}]}>
                Cancelled
              </Text>
            ) : null}
          </View>
          <Text style={styles.name}>{item?.student?.name}</Text>
          <Text style={[styles.order, {color: Colors.gray}]}>
            Order ID : {item?.id}
          </Text>
          <Text style={[styles.order, {color: Colors.gray}]}>
            Food type : {item?.student?.food_type}
          </Text>

          <Text
            style={[styles.menu, {fontFamily: AppFonts.FONT_INTER_REGULER}]}>
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
                style={styles.cnclbtn}
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
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <NonAuthHeader
        title={'Delivery History'}
        isDrawer={true}
        navigation={navigation}
      />

      <ProgressLoader loading={loading} />
      <SwitchSelector
        initial={0}
        onPress={value =>
          pullDown(
            selectDate ? selectDate : moment(new Date()).format('YYYY-MM-DD'),
            '',
            value,
          )
        }
        backgroundColor={'#EEEEEE'}
        textColor={Colors.primary} //'#7a44cf'
        selectedColor={Colors.white}
        buttonColor={Colors.primary}
        fontSize={RFPercentage(2.5)}
        style={{
          width: '70%',
          alignSelf: 'center',
          marginTop: 20,
          marginBottom: Platform.OS == 'ios' ? 20 : -20,
        }}
        borderColor={Colors.primary}
        options={[
          {label: 'Morning', value: '1'}, //images.feminino = require('./path_to/assets/img/feminino.png')
          {label: 'Evening', value: '2'}, //images.masculino = require('./path_to/assets/img/masculino.png')
        ]}
        testID="gender-switch-selector"
        accessibilityLabel="gender-switch-selector"
      />
      <Texinput
        isIcone
        placeholder="Searching..."
        value={search}
        onTextChange={txt => SearchFilterFunction(txt)}
        isFocus={isfocusname}
        onFocus={() => {
          setFocusname(true);
        }}
        onBlur={() => {
          setFocusname(false);
        }}
      />
      <FlatList
        data={
          deliveryHistoryDetails?.length !== 0
            ? search == ''
              ? deliveryHistoryDetails
              : data
            : []
        }
        ListEmptyComponent={showEmptyListView()}
        renderItem={renderitem}
        style={{marginBottom: '20%'}}
      />
    </View>
  );
};

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
)(DeliveryHistoryComponets);

const styles = StyleSheet.create({
  container: {paddingBottom: 10, flex: 1},
  innerview: {
    borderRadius: 15,
    backgroundColor: 'white',
    elevation: 10,
    marginHorizontal: 20,
    marginTop: '4%',
    padding: 15,
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
    justifyContent: 'space-between',
    marginTop: 20,
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
