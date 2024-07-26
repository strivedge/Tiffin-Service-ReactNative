import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import NonAuthHeader from '../NonAuthHeader';
import {RFPercentage} from 'react-native-responsive-fontsize';
import AppFonts from '../../constants/Fonts';
import {Colors, ScaleSizeUtils} from '../../constants';
import CheckBox from 'react-native-check-box';
import {useRoute} from '@react-navigation/native';
import {connect} from 'react-redux';
import {
  clearFoodMenu,
  clearSubscriptionOrder,
  createSubscriptionOrder,
  getFoodMenu,
} from '../../redux/nonAuth/actions';

import Button from '../Button';
import PrefManager from '../../Helper/PrefManager';
import {SLIDER_HIGHT} from '../VerificationComponets/VerificationComponets';
import moment from 'moment';
import SuccessBtn from '../SuccessBtn';
import Toast from 'react-native-simple-toast';
import ToastMessage from '../ToastMeassage';

const MenuViewScreenComponents = props => {
  const {
    navigation,
    foodMenuDetail,
    getFoodMenu,
    clearFoodMenu,
    mealDetail,
    createSubscriptionOrder,
    createSubsription,
    clearSubscriptionOrder,
  } = props;
  const [data, setData] = useState();
  const [selectData, setSelectData] = useState(0);
  const [mealtypeids, setMealtypeids] = useState('');
  const [foodmenuIds, setFoodMenuIds] = useState('');

  const [selectAll, setSelectAll] = useState(false);

  const route = useRoute();

  let new_price = 0;

  const [qty, setQty] = useState();
  const [price, setPrice] = useState(new_price);

  const [totalPrice, setTotalPrice] = useState(0);

  // const {qty, price} = route.params;

  const pullDown = async () => {
    const {qty, price, select_ids} = route.params;
    setPrice(price);
    setQty(qty);
    clearFoodMenu();
    const studentsDatas = await PrefManager.getValue('@student_datas');
    const convert = JSON.parse(studentsDatas);
    const ids = JSON.stringify(convert.id);
    getFoodMenu(`?master_students_id=${select_ids[0]}`);
  };
  useEffect(async () => {
    pullDown();
  }, []);

  useEffect(() => {
    if (foodMenuDetail?.api_status === 1) {
      const newQty = parseInt(qty);
      let renderData = [...foodMenuDetail?.data];
      if (newQty > 0) {
        if (renderData?.length >= newQty) {
          total = newQty;
        } else {
          total = renderData?.length;
        }
        for (let i = 0; i < total; i++) {
          renderData[i].selected = true;
        }
        setData(renderData);
        const newRenderdata = renderData.filter(x => x.selected == true);
        const FoodmenuIds = newRenderdata.map(x => x.id);
        setFoodMenuIds(FoodmenuIds);

        setSelectData(newRenderdata?.length);
        clearFoodMenu();
        CheckCustomorNot(renderData);
      } else {
        setData(renderData);
        clearFoodMenu();
        CheckCustomorNot(renderData);
      }
    }
  }, [foodMenuDetail]);

  useEffect(() => {
    if (createSubsription?.api_status == 1) {
      ToastMessage(createSubsription?.api_message);
      // Toast.show(createSubsription?.api_message, Toast.LONG);
      clearSubscriptionOrder();
      setTimeout(() => {
        navigation.navigate('CardDetailScreen');
      }, 2000);
    }
  }, [createSubsription?.api_status == 1]);

  const onPressHandler = async id => {
    let renderData = [...data];
    for (let datas of renderData) {
      if (datas.id == id) {
        datas.selected = datas.selected == null ? true : !datas.selected;
        break;
      }
    }
    setData(renderData);
    const newRenderdata = renderData.filter(x => x.selected == true);
    const FoodmenuIds = newRenderdata.map(x => x.id);
    setSelectData(newRenderdata.length);
    setFoodMenuIds(FoodmenuIds);
    setSelectAll(false);
  };

  const CheckCustomorNot = datanew => {
    let newArr = [];
    let startIndex = -1;
    for (let i = 0; i < datanew?.length; i++) {
      if (datanew[i].selected) {
        if (startIndex === -1) {
          startIndex = i;
        }
      } else {
        if (startIndex !== -1) {
          newArr.push(datanew?.slice(startIndex, i).map(item => item.id));

          startIndex = -1;
        }
      }
    }
    if (startIndex !== -1) {
      newArr.push(datanew?.slice(startIndex).map(item => item.id));
    }
    let longestArr =
      newArr?.length &&
      newArr?.reduce((acc, curr) => {
        if (curr?.length > acc?.length) {
          return curr;
        } else {
          return acc;
        }
      });

    for (let i = 0; i < mealDetail?.length; i++) {
      if (mealDetail[i].qty == 0 && mealDetail[i].qty == 1) {
        setMealtypeids(mealDetail[i].id);
      } else if (mealDetail[i].qty <= longestArr?.length) {
        setMealtypeids(mealDetail[i].id);
      } else if (mealDetail[i].qty == 0 && longestArr?.length > 1) {
        setMealtypeids(mealDetail[i].id);
      }
    }

    let totalPrice = 0;

    newArr.forEach(subArray => {
      const subArrayLength = subArray.length;
      const selectedPrice = getPriceForQuantity(subArrayLength);
      const subtotal = selectedPrice * subArrayLength;

      totalPrice += subtotal;
    });

    setTotalPrice(totalPrice);

    function getPriceForQuantity(quantity) {
      const sortedPrices = mealDetail.slice().sort((a, b) => a.qty - b.qty);

      for (let i = sortedPrices.length - 1; i >= 0; i--) {
        if (quantity >= sortedPrices[i].qty) {
          return sortedPrices[i].sale_price
            ? sortedPrices[i].sale_price
            : sortedPrices[i].price;
        }
      }
      return 0;
    }
  };

  const handleItemBuy = async () => {
    const {select_ids} = route.params;

    const studentsDatas = await PrefManager.getValue('@student_datas');
    const parentIds = await PrefManager.getValue('@id');

    const studentIds = select_ids;

    const data = {
      cms_users_id: parentIds,
      master_students_ids: studentIds,
      qty: '1',
      master_meal_types_id: mealtypeids,
      master_food_menu_id: foodmenuIds,
      total_days: selectData,
      sub_total: totalPrice,
    };

    createSubscriptionOrder(data);
  };

  const TotalView = (key, value) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 0.3}}>
          <Text
            style={{
              fontSize: key === 'Total' ? RFPercentage(2.5) : RFPercentage(2),
              color: Colors.black,
              fontFamily:
                key === 'Total'
                  ? AppFonts.FONT_INTER_MEDIUM
                  : AppFonts.FONT_INTER_REGULER,
            }}>
            {key}:
          </Text>
        </View>
        <View style={{flex: 0.5}}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: key === 'Total' ? RFPercentage(3) : RFPercentage(2.5),
              color: Colors.black,
              fontFamily:
                key === 'Total'
                  ? AppFonts.FONT_INTER_MEDIUM
                  : AppFonts.FONT_INTER_REGULER,
            }}>
            ₹{value}
          </Text>
        </View>
      </View>
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.menuViewContainer}
        onPress={() => {
          onPressHandler(item?.id) + CheckCustomorNot(data);
        }}>
        <View style={{flexDirection: 'row', padding: 10}}>
          <View style={styles.checkBoxViewContainer}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <CheckBox
                onClick={() => {
                  onPressHandler(item?.id) + CheckCustomorNot(data);
                }}
                isChecked={item?.selected}
                checkedImage={
                  <Image
                    source={require('../../assets/checkbox2.png')}
                    style={{
                      width: 28,
                      height: 28,
                      alignItems: 'center',
                      marginLeft: -15,
                    }}
                  />
                }
                unCheckedImage={
                  <Image
                    source={require('../../assets/unCheckbox.png')}
                    style={{
                      width: 28,
                      height: 28,
                      alignItems: 'center',
                      marginLeft: -15,
                    }}
                  />
                }
              />
              <View
                style={{
                  flexDirection: 'column',
                  marginRight: ScaleSizeUtils.MARGIN_TEN / 2,
                }}>
                <Text
                  style={[styles.dateTimeText, {textTransform: 'uppercase'}]}>
                  {moment(item.date).format('ddd')}
                </Text>
                <Text
                  style={[
                    styles.dateTimeText,
                    {
                      fontSize: RFPercentage(3),
                    },
                  ]}>
                  {moment(item.date).format('DD')}
                </Text>
                <Text
                  style={[styles.dateTimeText, {textTransform: 'uppercase'}]}>
                  {moment(item.date).format(" MMM' YY")}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              width: '60%',
              justifyContent: 'center',
              padding: ScaleSizeUtils.MARGIN_TEN,
              backgroundColor: 'white',
            }}>
            <Text
              style={{
                fontSize: RFPercentage(2.3),
                color: item.selected ? Colors.green : Colors.black,
                fontFamily: AppFonts.FONT_INTER_MEDIUM,
              }}>
              {item.name}
            </Text>
          </View>
          <View style={{width: '10%', padding: ScaleSizeUtils.MARGIN_TEN}}>
            {item?.is_recommended == 1 ? (
              <Image
                source={require('../../assets/thumb.png')}
                style={{
                  height: 22,
                  width: 22,
                  resizeMode: 'contain',
                  tintColor: Colors.green,
                }}
              />
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const onSelectAll = () => {
    const updatedCheckboxes = data.map(checkbox => {
      return {...checkbox, selected: !selectAll};
    });

    const ids = mealDetail.map(object => {
      return object.id;
    });

    const max = Math.max(...ids);

    const obj = mealDetail.find(element => element.id === max);

    const newRenderdata = updatedCheckboxes.filter(x => x.selected == true);

    const subtotal = obj.sale_price * newRenderdata.length;
    setTotalPrice(subtotal);

    const FoodmenuIds = newRenderdata.map(x => x.id);

    setFoodMenuIds(FoodmenuIds);

    setPrice(obj.sale_price);
    setSelectData(newRenderdata.length);
    setData(updatedCheckboxes);
    setSelectAll(!selectAll);
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
    <>
      <View style={{}}>
        <NonAuthHeader
          navigation={navigation}
          title="Subscription plans"
          isBack={true}
          isCart={false}
        />
        <Image
          source={require('../../assets/menuItemBanner.png')}
          style={{width: '100%'}}
        />
        <View>
          <Text style={styles.title}>Menu</Text>
        </View>

        {data?.length > 0 ? (
          <TouchableOpacity style={{padding: 10}} onPress={() => onSelectAll()}>
            <View style={{flexDirection: 'row'}}>
              <CheckBox
                isChecked={selectAll}
                onClick={() => {
                  onSelectAll();
                }}
                checkedImage={
                  <Image
                    source={require('../../assets/checkbox.png')}
                    style={{width: 25, height: 25}}
                  />
                }
                unCheckedImage={
                  <Image
                    source={require('../../assets/unchecked.png')}
                    style={{width: 25, height: 25}}
                  />
                }
              />
              <Text
                style={{
                  fontSize: RFPercentage(2.5),
                  color: selectAll == true ? Colors.primary : Colors.black,
                  fontFamily: AppFonts.FONT_INTER_MEDIUM,
                }}>
                Select All
              </Text>
            </View>
          </TouchableOpacity>
        ) : null}
        <View style={{height: '70%'}}>
          <FlatList
            data={data}
            style={{marginBottom: '35%'}}
            renderItem={renderItem}
            refreshing={refreshing} // Added pull to refesh state
            onRefresh={onRefresh}
          />
        </View>
      </View>
      <View style={styles.menu_list}>
        <View style={styles.menuView}>
          <View style={styles.menuheader}>
            <View style={{flex: 0.8}}>
              <View style={{}}>
                {TotalView(
                  'Price',
                  totalPrice ? (totalPrice / selectData).toFixed(2) : 0,
                )}
                {TotalView('Total', totalPrice.toFixed(2))}
              </View>
            </View>
            <View style={{flex: 0.4}}>
              <SuccessBtn
                title="Buy"
                backgroundColor={Colors.green}
                textColor={Colors.white}
                onPress={() => handleItemBuy()}
                // onPress={() => navigation.navigate('CardDetailScreen')}
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.nonAuth.loading,
    foodMenuDetail:
      state.nonAuth.foodMenuDetail && state.nonAuth.foodMenuDetail,
    mealDetail: state.nonAuth.mealDetail?.data,
    createSubsription: state.nonAuth.createSubscription,

    error: state.nonAuth.error && state.nonAuth.error,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getFoodMenu: data => {
      dispatch(getFoodMenu(data));
    },
    clearFoodMenu: data => {
      dispatch(clearFoodMenu(data));
    },
    createSubscriptionOrder: data => {
      dispatch(createSubscriptionOrder(data));
    },
    clearSubscriptionOrder: data => {
      dispatch(clearSubscriptionOrder(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MenuViewScreenComponents);

const styles = StyleSheet.create({
  title: {
    padding: 10,
    fontSize: RFPercentage(2.5),
    fontFamily: AppFonts.FONT_INTER_BOLD,
    color: Colors.black,
  },
  menuViewContainer: {
    width: '95%',
    alignSelf: 'center',
    backgroundColor: Colors.white,
    elevation: 2,
    margin: ScaleSizeUtils.MARGIN_TEN / 2,
    borderRadius: ScaleSizeUtils.MARGIN_BOTTOM_REGISTER_TEXT / 2,
  },
  checkBoxViewContainer: {
    width: '30%',
    borderRadius: ScaleSizeUtils.MARGIN_TEN,
    backgroundColor: Colors.green,
    paddingHorizontal: ScaleSizeUtils.MARGIN_BOTTOM_REGISTER_TEXT / 2,
    paddingVertical: ScaleSizeUtils.MARGIN_BOTTOM_REGISTER_TEXT / 2.5,
  },
  dateTimeText: {
    fontSize: RFPercentage(2.5),
    color: Colors.white,
    textAlign: 'center',
    fontFamily: AppFonts.FONT_INTER_MEDIUM,
  },

  subsribebTn: {
    backgroundColor: Colors.green,
    width: ScaleSizeUtils.LISTING_100 * 1.5,
    alignItems: 'center',
    alignContent: 'center',
    padding: ScaleSizeUtils.MARGIN_BOTTOM_REGISTER_TEXT / 2,
    borderRadius: 5,
  },
  subsribetxt: {
    fontFamily: AppFonts.FONT_INTER_REGULER,
    fontSize: RFPercentage(2.5),
    color: Colors.white,
  },
  menu_list: {
    width: '100%',
    backgroundColor: '#D9D9D9',
    height: ScaleSizeUtils.LISTING_100,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    bottom: 0,
    position: 'absolute',
  },
  menuView: {
    marginHorizontal: 20,
    alignContent: 'center',
    alignItems: 'center',
  },
  menuheader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});
