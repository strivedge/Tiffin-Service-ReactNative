import {
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Calendar} from 'react-native-calendars';
import NonAuthHeader from '../NonAuthHeader';
import {Colors, ScaleSizeUtils} from '../../constants';
import {connect} from 'react-redux';
import {
  clearCancelMealtype,
  clearGetStudentSubscriptionOrder,
  clearRatingFeedbackRequest,
  getCancelMealtype,
  getRatingFeedbackRequest,
  getStudentDetatil,
  getStudentSubscriptionOrder,
} from '../../redux/nonAuth/actions';
import DropdownComponent from '../Dropdown';
import PrefManager from '../../Helper/PrefManager';
import {RFPercentage} from 'react-native-responsive-fontsize';
import AppFonts from '../../constants/Fonts';
import {SLIDER_WIDTH} from '../HomeScreenComponents/CarouselCardItem';
import SuccessBtn from '../SuccessBtn';
import Texinput from '../Texinput';
import {SLIDER_HIGHT} from '../VerificationComponets/VerificationComponets';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import {API} from '../../Helper/HttpService';
import ToastMessage from '../ToastMeassage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomRatingBar from '../CustomRatingBar';
import ProgressLoader from '../ProgressLoader';

const CalendarComponets = props => {
  const [students, setStudents] = useState([]);

  const [studendIds, setStudentIds] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [dateSlot, setDateSlot] = useState('');
  const [markedSlot, setMarkedSlot] = useState({});
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [isfocusname, setFocusname] = useState(false);

  const [reasonError, setReasonError] = useState('');

  const [cReason, setCreason] = useState('');

  const [cancelIds, setCancelIds] = useState('');
  const [cartCount, setCartCount] = useState(0);

  const [ratingModalVisible, setRatingModalVisibel] = useState(false);

  const [defaultRating, setDefaultRating] = useState(2);
  // To set the max number of Stars
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  const [feedbackText, setFeedBackText] = useState('');

  const [feedbackIds, setFeedbackids] = useState('');

  const {
    navigation,
    getSubscriptionDetails,
    getStudentSubscriptionOrder,
    getStudentDetatil,
    clearGetStudentSubscriptionOrder,
    studentDetail,
    getCancelMealtype,
    clearCancelMealtype,
    getCancelMealtypeDetails,
    getRatingFeedbackRequest,
    clearRatingFeedbackRequest,
    ratingFeedbackDetails,
    loading,
  } = props;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      pulldown();
    });
    return unsubscribe;
  }, []);

  const pulldown = async () => {
    const id = await PrefManager.getValue('@id');
    getStudentDetatil(`?cms_users_id=${id}`);
    const count = await PrefManager.getValue('@cart_count');
    setCartCount(count);
  };

  useEffect(() => {
    if (studentDetail.api_status == 1) {
      setStudents(studentDetail?.data);
      console.log('oopppppp===>' + JSON.stringify(studentDetail?.data[0].id));
      setStudentIds(studentDetail?.data[0].id);
      getStudentDetatilrequest(studentDetail?.data[0]?.id);
    }
  }, [studentDetail]);

  useEffect(() => {
    if (getCancelMealtypeDetails?.api_status == 1) {
      ToastMessage(getCancelMealtypeDetails?.api_message);
      // Toast.show(getCancelMealtypeDetails?.api_message, Toast.LONG);
      clearCancelMealtype();
      setTimeout(() => {
        setCancelModalVisible(false);
        setModalVisible(false);
        getStudentDetatilrequest(studendIds);
      }, 1000);
    }
  }, [getCancelMealtypeDetails]);

  useEffect(() => {
    if (getSubscriptionDetails?.api_status == 1) {
      if (getSubscriptionDetails?.data?.length !== 0) {
        var obj = getSubscriptionDetails?.data?.reduce(
          (c, v) =>
            Object.assign(c, {
              [v.date]: {
                selected: true,
                marked: true,
                customStyles: {
                  container: {
                    backgroundColor:
                      v.status == 1
                        ? Colors.primary
                        : v.status == 2
                        ? Colors.primary
                        : v.status == 3
                        ? Colors.primary
                        : v.status == 4
                        ? Colors.green
                        : v.status == 5
                        ? Colors.red
                        : Colors.primary,
                    borderRadius: 10,
                  },
                  text: {
                    color: 'white',
                  },
                },
              },
            }),
          {},
        );
        setMarkedSlot(obj);
      } else {
        setMarkedSlot({});
      }
    }
  }, [getSubscriptionDetails]);

  const getStudentDetatilrequest = id => {
    if (id > 0) {
      getStudentSubscriptionOrder(`?master_students_id=${id}`);
    }
  };

  const selectItemId = item => {
    setStudentIds(item.id);
    getStudentDetatilrequest(item.id);
    // setSchoolname(item.name);
  };

  const handleCancel = ids => {
    setCancelIds(ids);
    setModalVisible(false);
    setCancelModalVisible(true);
  };

  const handleRatingAndFeedback = item => {
    setDefaultRating(item?.rating);
    setFeedBackText(item?.feedback);
    setFeedbackids(item?.id);
    setModalVisible(false);
    setRatingModalVisibel(true);
  };

 
  

  const renderItem = ({item, index}) => {
    let result = item?.date.concat(' ', item?.cancellation_time);

 
    let today = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

    const checkCondition = !(item?.status == 5 || item?.status == 4);

    return (
      <View>
        {item.date == dateSlot ? (
          <View>
            <View
              style={{
                width: SLIDER_WIDTH / 1.2,
                backgroundColor: 'white',
                borderRadius: 15,
                borderColor: '#E8E8E8',
                marginTop: 20,
                marginBottom: 20,
                borderWidth: 1.5,
              }}>
              <View style={{marginHorizontal: 20}}>
                <View
                  style={{
                    justifyContent: 'center',
                    flexDirection: 'column',
                    marginTop: 20,
                    marginBottom: 20,
                  }}>
                  <Text
                    style={{
                      fontSize: RFPercentage(2.3),
                      fontFamily: AppFonts.FONT_INTER_BOLD,
                      color: Colors.primary,
                      textTransform: 'capitalize',
                    }}>
                    {item?.food_name}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontSize: RFPercentage(2),
                        fontFamily: AppFonts.FONT_INTER_MEDIUM,
                        color: Colors.black,
                        padding: 5,
                      }}>
                      Status{':'}
                    </Text>
                    <Text
                      style={{
                        fontSize: RFPercentage(2),
                        fontFamily: AppFonts.FONT_INTER_MEDIUM,
                        color:
                          item?.status == 1 ||
                          item?.status == 2 ||
                          item?.status == 3
                            ? Colors.dark_yellow
                            : item?.status == 4
                            ? Colors.green
                            : item?.status == 5
                            ? Colors.red
                            : Colors.black,
                        padding: 5,
                      }}>
                      {item?.status == 1 ||
                      item?.status == 2 ||
                      item?.status == 3
                        ? 'Pending'
                        : item?.status == 4
                        ? 'Delivered'
                        : item?.status == 5
                        ? 'Cancelled'
                        : null}
                    </Text>
                  </View>
                </View>
              </View>

              {checkCondition && result >= today ? (
                <View
                  style={{
                    marginBottom: 10,
                    width: SLIDER_WIDTH / 2.5,
                    alignSelf: 'flex-end',
                  }}>
                  <SuccessBtn
                    title="Carry Forward"
                    backgroundColor={Colors.red}
                    textColor={Colors.white}
                    onPress={() => handleCancel(item?.id)}
                  />
                </View>
              ) : null}
            </View>
          </View>
        ) : null}
      </View>
    );
  };

  const CancelButton = () => {
    if (cReason.length <= 0) {
      setReasonError('Please Enter Cancel Reason');
    } else {
      const data = {
        id: cancelIds,
        cancel_time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        cancel_reason: cReason,
      };
      getCancelMealtype(data);
    }
  };

  const AddRatingandFeedback = () => {
    if (feedbackText.length <= 0) {
      setReasonError('Please enter Feedback');
    } else {
      const data = {
        id: feedbackIds,
        rating: defaultRating,
        feedback: feedbackText,
      };
      getRatingFeedbackRequest(data);
    }
  };

  useEffect(() => {
    if (ratingFeedbackDetails?.api_status == 1) {
      ToastMessage(ratingFeedbackDetails?.api_message);
      clearRatingFeedbackRequest();
      setTimeout(() => {
        setRatingModalVisibel(false);
        setModalVisible(false);
        getStudentDetatilrequest(studendIds);
      }, 1000);
    }
  }, [ratingFeedbackDetails]);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    console.log('kkk=>' + studendIds);
    getStudentDetatilrequest(studendIds);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View>
      <NonAuthHeader
        navigation={navigation}
        title="Calendar"
        isDrawer={true}
        isCart={true}
        count={cartCount}
      />
      {loading == true ? <ProgressLoader /> : null}

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{marginTop: 10}}>
          <DropdownComponent
            data={students}
            selectItemId={selectItemId}
            value={studendIds}
            placeholder="Select Child/Children"
          />
        </View>
        <Calendar
          markingType={'custom'}
          monthFormat={'MMMM yyyy'}
          markedDates={markedSlot}
          theme={{
            backgroundColor: Colors.white,
            calendarBackground: Colors.white,
            textSectionTitleColor: Colors.primary,
            textSectionTitleDisabledColor: Colors.primary,
            selectedDayBackgroundColor: Colors.primary,
            selectedDayTextColor: Colors.white,
            todayTextColor: Colors.black,
            dayTextColor: Colors.black,
            textDisabledColor: Colors.black,
            dotColor: Colors.primary,
            selectedDotColor: Colors.primary,
            arrowColor: Colors.primary,
            disabledArrowColor: Colors.primary,
            monthTextColor: Colors.black,
            indicatorColor: Colors.primary,
            textMonthFontFamily: AppFonts.FONT_INTER_MEDIUM,
            textDayHeaderFontFamily: AppFonts.FONT_INTER_MEDIUM,
            textDayFontFamily: AppFonts.FONT_INTER_MEDIUM,
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 14,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 14,
            sundaytextSectionTitleColor: 'red',
          }}
          onDayPress={day => {
            if (
              getSubscriptionDetails &&
              getSubscriptionDetails.data.length > 0
            ) {
              for (let i = 0; i < getSubscriptionDetails.data.length; i++) {
                if (
                  getSubscriptionDetails.data.some(
                    el => el.date === day.dateString,
                  )
                ) {
                  setModalVisible(true);
                  setDateSlot(day.dateString);
                }
              }
            }
          }}
        />
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View
            style={[
              styles.modalView,
              {width: '90%', height: SLIDER_HIGHT / 2.2},
            ]}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {getSubscriptionDetails?.data?.length > 0 ? (
                <FlatList
                  data={getSubscriptionDetails?.data}
                  renderItem={renderItem}
                />
              ) : null}
            </ScrollView>
            {getSubscriptionDetails?.data?.map(item => {
              if (item.date == dateSlot) {
                return (
                  item?.status == 4 && (
                    <TouchableOpacity
                      onPress={() => handleRatingAndFeedback(item)}>
                      <Text
                        style={{
                          alignSelf: 'flex-end',
                          fontSize: RFPercentage(2.5),
                          color: Colors.primary,
                          textDecorationLine: 'underline',
                        }}>
                        Feedback and Ratings 
                      </Text>
                    </TouchableOpacity>
                  )
                );
              }
            })}
            <View style={{marginTop: 20}} />
            <View
              style={{
                width: SLIDER_WIDTH / 3,
              }}>
              <SuccessBtn
                title="Close"
                backgroundColor={Colors.green}
                textColor={Colors.white}
                onPress={() => setModalVisible(false)}
              />
            </View>
            <View style={{marginBottom: 20}} />
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={cancelModalVisible}
        onRequestClose={() => {
          setCancelModalVisible(!modalVisible);
        }}>
        <TouchableOpacity
          style={{
            flex: 1,
          }}
          onPressOut={() => {
            setCancelModalVisible(false);
          }}>
          <KeyboardAvoidingView style={styles.centeredView}>
            <View
              style={[
                styles.modalView,
                {width: SLIDER_WIDTH / 1.2, height: SLIDER_HIGHT / 2.2},
              ]}>
              <View style={{marginTop: 20}} />
              <Text
                style={{
                  fontSize: RFPercentage(3),
                  color: Colors.black,
                  fontFamily: AppFonts.FONT_INTER_MEDIUM,
                }}>
                Carry Forward Reason
              </Text>
              <View style={{width: SLIDER_WIDTH / 1.2}}>
                <Texinput
                  placeholder="Enter Carry Forward Reason"
                  value={cReason}
                  maxLength={80}
                  onTextChange={text => setCreason(text)}
                  errorText={reasonError}
                  touched={true}
                  returnKeyType={'done'}
                  isFocus={isfocusname}
                  numberOfLines={Platform.OS === 'ios' ? null : 4}
                  minHeight={Platform.OS === 'ios' && 4 ? 20 * 6 : null}
                  // multiline={true}
                  onFocus={() => {
                    setFocusname(true);
                  }}
                  onBlur={() => {
                    setFocusname(false);
                  }}
                />
                {cReason?.length > 80 && (
                  <Text
                    style={{
                      color: 'red',
                      fontSize: RFPercentage(1.8),
                      left: 40,
                    }}>
                    Maximum 80 character
                  </Text>
                )}
              </View>
              <View
                style={{flexDirection: 'row', marginTop: SLIDER_HIGHT / 20}}>
                <View
                  style={{
                    width: SLIDER_WIDTH / 4,
                    marginRight: 10,
                  }}>
                  <SuccessBtn
                    title="NO"
                    backgroundColor={Colors.gray}
                    textColor={Colors.white}
                    onPress={() =>
                      setCancelModalVisible(false) + setModalVisible(true)
                    }
                  />
                </View>
                <View
                  style={{
                    width: SLIDER_WIDTH / 4,
                  }}>
                  <SuccessBtn
                    title="YES"
                    backgroundColor={Colors.green}
                    textColor={Colors.white}
                    onPress={() => CancelButton()}
                  />
                </View>
              </View>
              <View style={{marginBottom: 20}} />
            </View>
          </KeyboardAvoidingView>
        </TouchableOpacity>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={ratingModalVisible}
        onRequestClose={() => {
          setRatingModalVisibel(!ratingModalVisible);
        }}>
        <TouchableOpacity
          style={{
            flex: 1,
          }}
          onPressOut={() => {
            setRatingModalVisibel(false);
          }}>
          <View style={styles.centeredView}>
            <View
              style={[
                {
                  width: SLIDER_WIDTH / 1.2,
                  height: SLIDER_HIGHT / 1.5,
                  backgroundColor: 'white',
                  borderRadius: 20,
                },
              ]}>
              <KeyboardAwareScrollView>
                <View style={{marginTop: 15}} />

                <Text
                  style={{
                    fontSize: RFPercentage(2.2),
                    fontFamily: AppFonts.FONT_INTER_MEDIUM,
                    color: Colors.primary,
                    textAlign: 'left',
                    marginHorizontal: 20,
                  }}>
                  Give Feedback
                </Text>
                <Text
                  style={{
                    fontSize: RFPercentage(2),
                    fontFamily: AppFonts.FONT_INTER_MEDIUM,
                    color: Colors.primary,
                    textAlign: 'left',
                    marginHorizontal: 20,
                    marginTop: 10,
                  }}>
                  How was your experience with Whattameal Services
                </Text>
                {/*View to hold our Stars*/}
                <CustomRatingBar
                  defaultRating={defaultRating}
                  setDefaultRating={setDefaultRating}
                  maxRating={maxRating}
                />
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: RFPercentage(2.5),
                    color: Colors.gray,
                    marginTop: 15,
                    fontFamily: AppFonts.FONT_INTER_MEDIUM,
                  }}>
                  {/*To show the rating selected*/}
                  {defaultRating} / {Math.max.apply(null, maxRating)}
                </Text>

                <Texinput
                  placeholder="Feedback"
                  value={feedbackText}
                  maxLength={80}
                  onTextChange={text => setFeedBackText(text)}
                  errorText={reasonError}
                  touched={true}
                  returnKeyType={'done'}
                  isFocus={isfocusname}
                  numberOfLines={Platform.OS === 'ios' ? null : 4}
                  minHeight={Platform.OS === 'ios' && 4 ? 20 * 6 : null}
                  // multiline={true}
                  onFocus={() => {
                    setFocusname(true);
                  }}
                  onBlur={() => {
                    setFocusname(false);
                  }}
                />

                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: SLIDER_HIGHT / 10,
                    alignItems: 'center',
                    alignSelf: 'center',
                  }}>
                  <View
                    style={{
                      width: SLIDER_WIDTH / 4,
                      marginRight: 10,
                    }}>
                    <SuccessBtn
                      title="Cancel"
                      backgroundColor={Colors.gray}
                      textColor={Colors.white}
                      onPress={() =>
                        setRatingModalVisibel(false) + setModalVisible(true)
                      }
                    />
                  </View>
                  <View
                    style={{
                      width: SLIDER_WIDTH / 4,
                    }}>
                    <SuccessBtn
                      title="Save"
                      backgroundColor={Colors.green}
                      textColor={Colors.white}
                      onPress={() => AddRatingandFeedback()}
                    />
                  </View>
                </View>
              </KeyboardAwareScrollView>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.nonAuth.loading,
    getSubscriptionDetails: state.nonAuth.getSubscriptionDetails,
    studentDetail: state.nonAuth.studentDetail,
    getCancelMealtypeDetails: state.nonAuth.getCancelMealtype,
    ratingFeedbackDetails: state.nonAuth.ratingFeedbackDetails,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getStudentSubscriptionOrder: data => {
      dispatch(getStudentSubscriptionOrder(data));
    },
    clearGetStudentSubscriptionOrder: data => {
      dispatch(clearGetStudentSubscriptionOrder(data));
    },
    getStudentDetatil: data => {
      dispatch(getStudentDetatil(data));
    },
    getCancelMealtype: data => {
      dispatch(getCancelMealtype(data));
    },
    clearCancelMealtype: data => {
      dispatch(clearCancelMealtype(data));
    },

    getRatingFeedbackRequest: data => {
      dispatch(getRatingFeedbackRequest(data));
    },
    clearRatingFeedbackRequest: data => {
      dispatch(clearRatingFeedbackRequest(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarComponets);

const styles = StyleSheet.create({
  textStyle: {
    textAlign: 'center',
    fontSize: 23,
    color: Colors.primary,
    marginTop: 15,
  },
  textStyleSmall: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.primary,
    marginTop: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
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
});
