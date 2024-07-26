import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  Modal,
  Alert,
  Dimensions,
  RefreshControl,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import NonAuthHeader from '../NonAuthHeader';
import {connect} from 'react-redux';
import {
  getDashboardbanner,
  getMealType,
  getStudentDetatil,
} from '../../redux/nonAuth/actions';
import Carousel from 'react-native-snap-carousel';
import CarouselCardItem, {SLIDER_WIDTH, ITEM_WIDTH} from './CarouselCardItem';
import {Colors, ScaleSizeUtils} from '../../constants';
import {RFPercentage} from 'react-native-responsive-fontsize';
import AppFonts from '../../constants/Fonts';
import PrefManager from '../../Helper/PrefManager';
import messaging from '@react-native-firebase/messaging';
import DropdownComponent from '../Dropdown';
import MultiSelectDropDown from '../MultiSelectDropdown';
import ProgressLoader from '../ProgressLoader';
import {getToken} from '../../redux/actionTypes';
export const SLIDER_WIDTHS = Dimensions.get('window').width;
export const SLIDER_HIGHT = Dimensions.get('window').height;

const HomeScreenComponents = props => {
  const {
    navigation,
    getDashboardbanner,
    bannerDetail,
    getMealType,
    mealDetail,
    getStudentDetatil,
    studentDetail,
    mealDetailOne,
    loading,
    tokenDetail,
    getToken,
  } = props;

  const [modalVisible, setModalVisible] = useState(false);
  const [students, setStudents] = useState([]);

  const [selectStudent, setSelectStudent] = useState([]);
  const [activeIndex, setActive] = useState(0);
  const [selectItem, setSelectItem] = useState([]);

  const [studentId, setStudentId] = useState('');

  const [cartCount, setCartCount] = useState(0);

  const TokenAPII = () => {
    const data = {
      secret: '7a2af641381aa2adfc3393ae23c856ab',
    };
    getToken(data);
  };

  useEffect(() => {
    if (tokenDetail?.access_token?.length > 0) {
      PrefManager.setValue('@assess_token', tokenDetail?.access_token);
      pullDown();
    }
  }, [tokenDetail]);

  checkFocusDashboard = async () => {
    const token = await PrefManager.getValue('@assess_token');
    if (token?.length > 0) {
      pullDown();
    } else {
      TokenAPII();
    }
  };

  const pullDown = async () => {
    const id = await PrefManager.getValue('@id');
    getStudentDetatil(`?cms_users_id=${id}`);
    getDashboardbanner();
    const count = await PrefManager.getValue('@cart_count');
    setCartCount(count);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      checkFocusDashboard();
    });
    return unsubscribe;
  }, []);

  const mealTypebyIds = async studenids => {
    const id = await PrefManager.getValue('@id');
    getMealType(`?cms_users_id=${id}&master_students_id=${studenids}`);
  };

  const Subscription = item => {
    if (studentDetail.api_status == 1) {
      setSelectItem(item);
      const price = item.sale_price ? item.sale_price : item.price;
      PrefManager.setValue('@student_datas', JSON.stringify(item));
      const studentids = typeof studentId == 'number' ? [studentId] : studentId;
      navigation.navigate('MenuItemScreen', {
        price: price,
        qty: item.qty,
        select_ids: studentids,
      });
    }
  };

  useEffect(() => {
    console.log('kkkkk=====>' + JSON.stringify(studentDetail?.data));
    if (studentDetail.api_status == 1) {
      setStudents(studentDetail?.data);
      if (studentDetail?.select_all == true) {
        const ids = studentDetail?.data?.map(x => x?.id);
        setStudentId(ids);
      } else {
        setStudentId(studentDetail?.data[0]?.id);
      }
      mealTypebyIds(studentDetail?.data[0]?.id);
    }
  }, [studentDetail]);

  const handleContinue = () => {
    setModalVisible(false);
    PrefManager.setValue('@student_datas', JSON.stringify(selectStudent));
    navigation.navigate('MenuItemScreen', {
      price: selectItem.price,
      qty: selectItem.qty,
      select_ids: JSON.stringify([selectStudent.id]),
    });
  };

  const studentView = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => setSelectStudent(item) + setActive(index)}
        style={[
          styles.student_View,
          {backgroundColor: index === activeIndex ? '#34A853' : Colors.white},
        ]}>
        <Text
          style={{
            color: index === activeIndex ? Colors.white : Colors.black,
            fontSize: RFPercentage(2),
            fontFamily: AppFonts.FONT_INTER_BOLD,
          }}>
          {item?.name}
        </Text>
        <Text
          style={{
            color: index === activeIndex ? Colors.white : Colors.black,
            fontSize: RFPercentage(2),
            fontFamily: AppFonts.FONT_INTER_MEDIUM,
          }}>
          {item?.email ? item?.email : ''}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({item}) => {
    return (
      <View style={{marginTop: 10}}>
        <View style={styles.mealView}>
          <View style={{marginLeft: 10}}>
            <Text style={styles.mealViewtype}>{item.type}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.mealViewprice}>₹ {item.sale_price}</Text>
              {item.price > 0 && item.price > item.sale_price ? (
                <Text
                  style={[
                    styles.mealViewprice,
                    {
                      textDecorationLine: 'line-through',
                      textDecorationStyle: 'solid',
                    },
                  ]}>
                  ₹ {item.price}
                </Text>
              ) : null}
            </View>
          </View>
          <View style={{marginRight: 10}}>
            <TouchableOpacity
              style={styles.subsribebTn}
              onPress={() => Subscription(item)}>
              <Text style={styles.subsribetxt}>Subscribe</Text>
            </TouchableOpacity>
          </View>
        </View>
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

  const selectItemId = async item => {
    console.log('selectedItem' + JSON.stringify(item));
    const ids = await PrefManager.getValue('@id');
    if (studentDetail?.select_all == true) {
      setStudentId(item);
      getMealType(`?cms_users_id=${ids}&master_students_id=${item[0]}`);
    } else {
      setStudentId(item?.id);
      getMealType(`?cms_users_id=${ids}&master_students_id=${item.id}`);
    }
  };
  const renderItemOnetime = ({item}) => {
    console.log('kkkk===>' + JSON.stringify(item));
    return (
      <View style={styles.listBox}>
        <View style={{marginHorizontal: 10, marginVertical: 5}}>
          <Text style={styles.typemeal}>Tomorrow's Meal</Text>
          <Text style={styles.decs}>{item?.name}</Text>
          {item?.sale_price > 0 && (
            <Text style={styles.price}>₹{item?.sale_price}</Text>
          )}

          {item.price > 0 && item.price > item.sale_price ? (
            <Text
              style={[
                styles.mealViewprice,
                {
                  textDecorationLine: 'line-through',
                  textDecorationStyle: 'solid',
                },
              ]}>
              ₹ {item.price}
            </Text>
          ) : null}
        </View>
      </View>
    );
  };

  return (
    <View>
      <NonAuthHeader
        navigation={navigation}
        title="Dashboard"
        isDrawer={true}
        isCart={true}
        count={cartCount}
      />
      {loading == true ? <ProgressLoader /> : null}

      <ScrollView
        style={{height: '90%'}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Carousel
          layout="default"
          data={bannerDetail?.length > 0 ? bannerDetail : []}
          renderItem={CarouselCardItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          autoplay={true}
          loop={true}
        />
        {studentDetail?.data?.length > 0 ? (
          studentDetail?.select_all == true ? (
            <View style={{marginBottom: 20, marginHorizontal: 10}}>
              <MultiSelectDropDown
                data={studentDetail?.data}
                selectItemId={selectItemId}
                value={studentId}
                placeholder="Select Child/Children"
              />
            </View>
          ) : (
            <View style={{marginBottom: 20, marginHorizontal: 10}}>
              <DropdownComponent
                data={studentDetail?.data}
                selectItemId={selectItemId}
                value={studentId}
                placeholder="Select Child/Children"
              />
            </View>
          )
        ) : null}
        {/* <View style={styles.boxstyle}>
          <Text style={styles.join}>JOIN SUBSCRIPTION</Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => joinSubscription()}>
            <Text style={styles.more}>JOIN NOW</Text>
          </TouchableOpacity>
        </View> */}
        <FlatList data={mealDetail?.next_meal} renderItem={renderItemOnetime} />
        <View style={{marginTop: 0, marginBottom: SLIDER_HIGHT / 8}}>
          <FlatList data={mealDetail?.data} renderItem={renderItem} />
        </View>
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <TouchableOpacity
          style={styles.centeredView}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalView}>
            <Text
              style={{
                fontSize: RFPercentage(2.5),
                color: Colors.black,
                fontFamily: AppFonts.FONT_INTER_REGULER,
                marginBottom: 10,
              }}>
              Select Student
            </Text>
            <FlatList data={students} renderItem={studentView} />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => handleContinue()}>
              <Text style={styles.textStyle}>Continue</Text>
            </Pressable>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.nonAuth.loading,
    bannerDetail: state.nonAuth.bannerDetail?.data,
    mealDetail: state.nonAuth.mealDetail,
    tokenDetail: state.authUser.tokenDetail?.data,

    studentDetail: state.nonAuth.studentDetail && state.nonAuth.studentDetail,
    error: state.nonAuth.error && state.nonAuth.error,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getDashboardbanner: data => {
      dispatch(getDashboardbanner(data));
    },
    getMealType: data => {
      dispatch(getMealType(data));
    },
    getStudentDetatil: data => {
      dispatch(getStudentDetatil(data));
    },
    getToken: data => {
      dispatch(getToken(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreenComponents);

const styles = StyleSheet.create({
  more: {
    color: Colors.primary,
    textAlign: 'center',
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    fontFamily: AppFonts.FONT_INTER_BOLD,
  },
  btn: {
    backgroundColor: Colors.white,
    borderRadius: 25,
    alignItems: 'center',
    padding: 10,
    width: ScaleSizeUtils.LISTING_100 * 1.8,
    marginTop: 20,
  },
  join: {
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
    color: Colors.white,
    fontFamily: AppFonts.FONT_INTER_BOLD,
  },
  boxstyle: {
    marginTop: -5,
    backgroundColor: '#464646',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 10,
    marginVertical: 20,
    elevation: 3,
  },
  listBox: {
    borderRadius: 20,
    padding: 10,
    borderColor: '#E8E8E8',
    borderWidth: 0.5,
    marginHorizontal: 10,
    justifyContent: 'center',
    backgroundColor: Colors.white,
    marginBottom: 10,
  },
  image: {
    width: ScaleSizeUtils.LISTING_100 * 1.1,
    height: ScaleSizeUtils.LISTING_100 * 1.1,
  },
  addbTn: {
    color: '#59A044',
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    fontFamily: AppFonts.FONT_INTER_BOLD,
    backgroundColor: Colors.white,
    width: ScaleSizeUtils.DRAWER_HEIGHT_MENU_PROFILE_PICTURE,
    textAlign: 'center',
    borderRadius: 5,
    marginTop: -10,
    elevation: 3,
  },
  typemeal: {
    color: Colors.primary,
    fontSize: RFPercentage(2.2),
    fontFamily: AppFonts.FONT_INTER_BOLD,
  },
  price: {
    color: Colors.black,
    fontSize: RFPercentage(2.5),
    fontFamily: AppFonts.FONT_INTER_BOLD,
  },
  decs: {
    color: Colors.black,
    fontSize: RFPercentage(2),
    fontFamily: AppFonts.FONT_INTER_REGULER,
  },
  mealView: {
    borderRadius: 10,
    padding: 10,
    borderColor: '#E8E8E8',
    borderWidth: 0.5,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  mealViewtype: {
    fontFamily: AppFonts.FONT_INTER_MEDIUM,
    fontSize: RFPercentage(2),
    color: Colors.black,
    padding: 5,
  },
  mealViewprice: {
    fontFamily: AppFonts.FONT_INTER_REGULER,
    fontSize: RFPercentage(2),
    color: Colors.gray,
    padding: 5,
  },
  subsribebTn: {
    backgroundColor: Colors.green,
    padding: 5,
    borderRadius: 5,
  },
  subsribetxt: {
    fontFamily: AppFonts.FONT_INTER_REGULER,
    fontSize: RFPercentage(2),
    color: Colors.white,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',

    height: SLIDER_HIGHT / 2.2,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    width: SLIDER_WIDTH / 2,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: Colors.primary,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  student_View: {
    width: SLIDER_WIDTHS / 1.3,
    borderRadius: 10,
    padding: 10,
    borderColor: '#E8E8E8',
    borderWidth: 1,
    marginBottom: 10,
  },
});
