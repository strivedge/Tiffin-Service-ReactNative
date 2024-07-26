import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import NonAuthHeader from '../NonAuthHeader';
import {RFPercentage} from 'react-native-responsive-fontsize';
import AppFonts from '../../constants/Fonts';
import {Colors, ScaleSizeUtils} from '../../constants';
import Texinput from '../Texinput';
import {SLIDER_WIDTH} from '../HomeScreenComponents/CarouselCardItem';
import Button from '../Button';
import SuccessBtn from '../SuccessBtn';
import {SLIDER_HIGHT} from '../HomeScreenComponents/HomeScreenComponents';
import ToastMessage from '../ToastMeassage';
import DropdownComponent from '../Dropdown';
import {connect} from 'react-redux';
import {
  clearBirthDaySettingRequest,
  clearCreateBirthdayPartyRequest,
  getBirthDaySettingRequest,
  getCreateBirthdayPartyRequest,
} from '../../redux/nonAuth/actions';
import PrefManager from '../../Helper/PrefManager';
import {API} from '../../Helper/HttpService';
import DatePicker from '../DatePicker';
import moment from 'moment';
import ProgressLoader from '../ProgressLoader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const BirthdayScreenComponets = props => {
  const {
    navigation,
    clearBirthDaySettingRequest,
    getBirthDaySettingRequest,
    getBirthdaySetting,
    createBirthdayParty,
    getCreateBirthdayPartyRequest,
    clearCreateBirthdayPartyRequest,
    loading,
  } = props;
  const [numberOfmeal, setNumberofMeal] = useState('0');
  const [pricemeal, setPriceMeal] = useState('');
  const [dataVisible, setDateVisible] = useState(false);
  const [dataselectd, setDateSelected] = useState('');
  const [name, setName] = useState('');
  const [addressDetails, setAddressDetail] = useState('');

  const [mobile, setMobile] = useState('');
  const [banner, setBanner] = useState('');
  const [selectedCity, setCityItem] = useState('');
  const [budgeData, setBudgetData] = useState([]);
  const [selectPrice, setSelectPrice] = useState('');

  const handleIncrement = () => {
    setNumberofMeal(parseInt(numberOfmeal) + 1);
  };

  const handleDecrement = () => {
    if (numberOfmeal > getBirthdaySetting?.data?.minimum_qty) {
      setNumberofMeal(numberOfmeal - 1);
    } else {
      ToastMessage(
        `Minimum ${getBirthdaySetting?.data?.minimum_qty} meal in required`,
      );
    }
  };

  const pullDown = async () => {
    const id = await PrefManager.getValue('@id');
    getBirthDaySettingRequest(`?cms_users_id=${id}`);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      pullDown();
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (getBirthdaySetting.api_status == 1) {
      setName(getBirthdaySetting?.data?.name);
      setMobile(getBirthdaySetting?.data?.mobile);
      setNumberofMeal(getBirthdaySetting?.data?.minimum_qty);
      setBanner(getBirthdaySetting?.data?.banner);
      setBudgetData(getBirthdaySetting?.data?.budget);
    }
  }, [getBirthdaySetting]);

  const citys = [{id: '01', name: 'Ahmedabad'}];

  const selectItemId = item => {
    setPriceMeal(item.id);
    setSelectPrice(item.name);
  };

  const selectCityItem = item => {
    setCityItem(item.id);
  };
  const handleChange = () => {
    if (numberOfmeal > getBirthdaySetting?.data?.minimum_qty) {
      setNumberofMeal(numberOfmeal - 1);
    } else {
      ToastMessage(
        `Minimum ${getBirthdaySetting?.data?.minimum_qty} meal in required`,
      );
    }
  };

  const handleSubmit = async () => {
    const id = await PrefManager.getValue('@id');

    if (dataselectd.length == 0) {
      ToastMessage('Select Birthdate');
    } else if (name.length == 0) {
      ToastMessage('Enter name');
    } else if (mobile.length == 0) {
      ToastMessage('Enter your mobile');
    } else if (numberOfmeal < getBirthdaySetting?.data?.minimum_qty) {
      ToastMessage(
        `Minimum ${getBirthdaySetting?.data?.minimum_qty} meal in required`,
      );
    } else if (selectPrice.length == 0) {
      ToastMessage('Select your meal type Budget');
    } else if (addressDetails.length == 0) {
      ToastMessage('Enter your address');
    } else {
      const data = {
        cms_users_id: id,
        name: name,
        mobile: mobile,
        date: dataselectd,
        qty: numberOfmeal,
        budget: selectPrice,
        address: addressDetails,
      };
      getCreateBirthdayPartyRequest(data);
    }
  };

  useEffect(() => {
    if (createBirthdayParty?.api_status == 1) {
      ToastMessage(createBirthdayParty?.api_message);
      setTimeout(() => {
        clearCreateBirthdayPartyRequest();
        navigation.navigate('HomeScreen');
      }, 1000);
    }
  }, [createBirthdayParty]);
  return (
    <View style={{flex: 1}}>
      <NonAuthHeader
        navigation={navigation}
        title="Birthday Party"
        isBack={false}
        isCart={false}
        isDrawer={true}
      />
      <KeyboardAwareScrollView style={{flex: 1}}>
        {loading == true && <ProgressLoader loading={loading} />}
        <Image
          source={{uri: API.IMAGE_URL + banner}}
          style={{width: '100%', height: SLIDER_HIGHT / 8}}
          resizeMode="cover"
        />
        <View>
          <Text
            style={[
              styles.fonttitle,
              {marginBottom: Platform.OS == 'ios' ? 0 : -25},
            ]}>
            Select Birthdate
          </Text>

          <TouchableOpacity onPress={() => setDateVisible(true)}>
            <Texinput
              value={dataselectd}
              placeholder="Enter your birthdate"
              isDisbale={false}
              DatePickerActive={() => setDateVisible(true)}
              onTextChange={date => setDateSelected(date)}
              isDate={true}
              onFocus={() => {
                setFocusdate(true);
              }}
              onBlur={() => {
                setFocusdate(false);
              }}
            />
          </TouchableOpacity>
          <View>
            <Text
              style={[
                styles.fonttitle,
                {marginBottom: Platform.OS == 'ios' ? 0 : -25},
                ,
              ]}>
              Name
            </Text>
            <Texinput placeholder="Enter your name" value={name} />
          </View>
          <View>
            <Text
              style={[
                styles.fonttitle,
                {marginBottom: Platform.OS == 'ios' ? 0 : -25},
                ,
              ]}>
              Phone number
            </Text>
            <Texinput placeholder="Enter your phone number" value={mobile} />
          </View>
          <View>
            <Text
              style={[
                styles.fonttitle,
                {marginBottom: Platform.OS == 'ios' ? 0 : -25},
                ,
              ]}>
              No of Meal Packs
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'flex-start',
                marginTop: SLIDER_HIGHT / 20,
                justifyContent: 'center',
                marginLeft: 20,
              }}>
              <TouchableOpacity
                onPress={() => handleDecrement()}
                style={{
                  backgroundColor: Colors.primary,
                  height: 40,
                  width: 40,
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontFamily: AppFonts.FONT_INTER_BOLD,
                    fontSize: RFPercentage(3),
                    alignSelf: 'center',
                  }}>
                  -
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  width: SLIDER_WIDTH / 3,
                  marginTop: SLIDER_HIGHT / -25,
                }}>
                <Texinput
                  value={numberOfmeal.toString()}
                  keyboardType={'number-pad'}
                  onTextChange={text => setNumberofMeal(text)}
                  onSubmitEditing={() => {
                    handleChange();
                  }}
                />
              </View>
              <TouchableOpacity
                onPress={() => handleIncrement()}
                style={{
                  backgroundColor: Colors.primary,
                  height: 40,
                  width: 40,
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontFamily: AppFonts.FONT_INTER_BOLD,
                    fontSize: RFPercentage(3),
                    alignSelf: 'center',
                  }}>
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text
              style={[
                styles.fonttitle,
                {marginBottom: Platform.OS == 'ios' ? -30 : -25},
                ,
              ]}>
              Budget per pack
            </Text>
            <View style={{marginTop: 30}}></View>
            <DropdownComponent
              data={budgeData}
              selectItemId={selectItemId}
              value={pricemeal}
              placeholder="Choose Per Pack Budget"
            />
          </View>
          <View>
            <Text
              style={[
                styles.fonttitle,
                {marginBottom: Platform.OS == 'ios' ? -30 : -25},
                ,
              ]}>
              City
            </Text>
            <View style={{marginTop: 30}}></View>
            <DropdownComponent
              data={citys}
              selectItemId={selectCityItem}
              value={citys[0].id}
              placeholder="Choose Per Pack Budget"
            />
          </View>
          <View>
            <Text
              style={[
                styles.fonttitle,
                {marginBottom: Platform.OS == 'ios' ? -15 : -25},
                ,
              ]}>
              Address
            </Text>
            <View style={{marginTop: 10}}></View>
            <Texinput
              onTextChange={text => setAddressDetail(text)}
              placeholder="Enter your address"
              numberOfLines={2}
              multiline={true}
            />
          </View>
          <View
            style={{
              width: '100%',
              marginBottom: 10,
              marginTop: ScaleSizeUtils.DIMEN_MARGIN_LARGE,
            }}>
            <Button
              title="Confirm"
              backgroundColor={Colors.black}
              textColor={Colors.white}
              onPress={() => handleSubmit()}
            />
          </View>
        </View>
        {dataVisible == true ? (
          <DatePicker
            maximumDate={new Date()}
            onChange={(event, selectedDate) => {
              if (Platform.OS === 'ios') {
                setDateVisible(!dataVisible);
                setDateSelected(moment(selectedDate).format('YYYY-MM-DD'));
              } else {
                if (event.type == 'set') {
                  setDateVisible(!dataVisible);
                  setDateSelected(moment(selectedDate).format('YYYY-MM-DD'));
                } else if (event.type == 'dismissed') {
                  setDateVisible(!dataVisible);
                }
              }
            }}
            isVisible={dataVisible}
            isClose={() => setDateVisible(!dataVisible)}
          />
        ) : null}
      </KeyboardAwareScrollView>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    getBirthdaySetting: state.nonAuth.getBirthdaySetting,
    createBirthdayParty: state.nonAuth.createBirthdayParty,
    loading: state.nonAuth.loading,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    clearBirthDaySettingRequest: data => {
      dispatch(clearBirthDaySettingRequest(data));
    },
    getBirthDaySettingRequest: data => {
      dispatch(getBirthDaySettingRequest(data));
    },
    getCreateBirthdayPartyRequest: data => {
      dispatch(getCreateBirthdayPartyRequest(data));
    },
    clearCreateBirthdayPartyRequest: data => {
      dispatch(clearCreateBirthdayPartyRequest(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BirthdayScreenComponets);

const styles = StyleSheet.create({
  title: {
    fontSize: RFPercentage(2.5),
    padding: 10,
    fontFamily: AppFonts.FONT_INTER_BOLD,
    alignSelf: 'center',
    color: Colors.primary,
  },
  fonttitle: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 20,
    fontSize: RFPercentage(2.3),
    color: Colors.primary,
    fontFamily: AppFonts.FONT_INTER_MEDIUM,
  },
});
