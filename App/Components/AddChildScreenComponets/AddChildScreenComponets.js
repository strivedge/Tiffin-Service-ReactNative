import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
  Platform,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import {Colors, ScaleSizeUtils} from '../../constants';
import {styles} from '../../Style/commonStyle';
import {Formik} from 'formik';
import {addChildValidationSchema} from '../../Helper/Utils';
import Texinput from '../Texinput';
import Button from '../Button';
import RadioButton from '../RadioButton';
import SwipeUpDownModal from '../bottomSheet';
import PrefManager from '../../Helper/PrefManager';
import {connect} from 'react-redux';
import {getSchool} from '../../redux/actionTypes';
import {useRoute} from '@react-navigation/native';
import DropdownComponent from '../Dropdown';
import Toast from 'react-native-simple-toast';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  clearCreateStudentDetails,
  clearEditStudentDetails,
  clearUploadPhotos,
  createStudentDetails,
  editStudentDetails,
  getUploadPhotos,
} from '../../redux/nonAuth/actions';
import {API} from '../../Helper/HttpService';
import ToastMessage from '../ToastMeassage';
import DatePicker from '../DatePicker';
import moment from 'moment';

const PROP = [
  {
    id: '1',
    name: 'Morning shift',
  },
  {
    id: '2',
    name: 'Noon shift',
  },
];

const food_type = [
  {id: 1, name: 'Regular'},
  {id: 2, name: 'Jain'},
  {id: 3, name: 'Swaminarayan'},
];

const class_type = [
  {id: -1, name: 'LKG'}, //new
  {id: 0, name: 'UKG'},
  {id: 1, name: '1'},
  {id: 2, name: '2'},
  {id: 3, name: '3'},
  {id: 4, name: '4'},
  {id: 5, name: '5'},
  {id: 6, name: '6'},
  {id: 7, name: '7'},
  {id: 8, name: '8'},
  {id: 9, name: '9'},
  {id: 10, name: '10'},
  {id: 11, name: '11'},
  {id: 12, name: '12'},
];

function AddChildScreenComponets(props) {
  const {
    navigation,
    schoolDetail,
    clearCreateStudentDetails,
    clearEditStudentDetails,
    createStudentDetails,
    editStudentDetails,
    createStudent,
    updateStudent,
    clearUploadPhotos,
    getUploadPhotos,
    photoUpload,
  } = props;
  const route = useRoute();
  const {data, type} = route.params;
  const [isfocusclass, setFocusclass] = useState(false);
  const [isfocusname, setFocusname] = useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [base, setBase] = useState('');
  const [name, setName] = useState('');
  const [classas, setClass] = useState('');
  const [schoolId, setSchoolId] = useState(0);
  const [schoolname, setSchoolname] = useState('');
  const [studentsIds, setStudentIds] = useState('');
  const [photo, setPhoto] = useState('');
  const [divisionId, setDivisionId] = useState('');
  const [selectDivision, setSelectDevision] = useState([]);

  const [foodtypeName, setFoodtypeName] = useState('');

  const [foodtypeId, setFoodtypeId] = useState('');
  const [divisionName, setDivisionname] = useState('');
  const [isfocusdate, setFocusdate] = useState(false);

  const [shiftName, setShiftName] = useState('');
  const [shiftId, setShiftId] = useState('');

  const [classId, setClassId] = useState('');
  const [className, setClassname] = useState('');

  const [dataVisible, setDateVisible] = useState(false);
  const [dataselectd, setDateSelected] = useState('');

  const camera = () => {
    ImagePicker.openCamera({
      multiple: false,
      includeBase64: true,
      includeExif: true,
      maxFiles: 1,
      width: 300,
      height: 400,
      cropping: true,
      compressImageQuality: 0.9,
      mediaType: 'photo',
    })
      .then(images => {
        if (Platform.OS === 'ios') {
        }
        setModalVisible(false);
        setBase(images.data);
        setPhoto('data:image/png;base64,' + images.data);
        if (type == 'Edit') {
          uploadphotos(images.data);
        }
      })
      .catch(e => {
        setModalVisible(false);
      });
  };

  const gallary = () => {
    ImagePicker.openPicker({
      multiple: false,
      includeBase64: true,
      includeExif: true,
      maxFiles: 1,
      width: 300,
      height: 400,
      cropping: true,
      compressImageQuality: 0.9,
      mediaType: 'photo',
    })
      .then(images => {
        setModalVisible(false);
        setBase(images.data);
        setPhoto('data:image/png;base64,' + images.data);
        if (type == 'Edit') {
          uploadphotos(images.data);
        }
      })
      .catch(e => {
        setModalVisible(false);
      });
  };

  const uploadphotos = async image => {
    const {data, type} = route.params;
    const datanew = {
      id: data?.id,
      photo: 'data:image/png;base64,' + image,
      type: 'master_students',
    };
    getUploadPhotos(datanew);
  };

  useEffect(() => {
    props.getSchool();
    if (type == 'Edit') {
      console.log('kkk===>' + JSON.stringify(data));
      setStudentIds(data?.id);
      setSchoolId(data?.master_schools_id);
      setName(data?.name);
      setClassId(
        data?.class == 'Upper Class'
          ? 0
          : data?.class == 'Lower Class'
          ? -1
          : data?.class,
      );
      setDivisionId(data?.div);
      setFoodtypeId(
        data?.food_type == 'Regular' ? 1 : data?.food_type == 'Jain' ? 2 : 3,
      );
      setDateSelected(data?.dob);
      setSelectDevision(data?.school);
      setShiftId(JSON.parse(data?.master_shifts_id));
      setPhoto(data?.photo !== null ? API.IMAGE_URL + data?.photo : null);
    }
  }, []);

  useEffect(() => {
    if (photoUpload?.api_status === 1) {
      setPhoto(API.IMAGE_URL + photoUpload?.data);
      clearUploadPhotos();
    }
  }, [photoUpload?.api_status === 1]);

  useEffect(() => {
    if (createStudent?.api_status == 1) {
      ToastMessage(createStudent?.api_message);
      // Toast.show(createStudent?.api_message, Toast.LONG);
      clearCreateStudentDetails();
      setTimeout(() => {
        navigation.navigate('MyAcountScreen');
      }, 1000);
    }
  }, [createStudent]);

  useEffect(() => {
    if (updateStudent?.api_status == 1) {
      ToastMessage(updateStudent?.api_message);

      // Toast.show(updateStudent?.api_message, Toast.LONG);
      clearEditStudentDetails();
      setTimeout(() => {
        navigation.navigate('MyAcountScreen');
      }, 1000);
    }
  }, [updateStudent]);

  const handleConfirm = async values => {
    const students = await PrefManager.getValue('@child_Data');

    const allStudent = students?.length > 0 ? JSON.parse(students) : [];

    const isNameInArray = allStudent?.some(
      item => item.student_name === values.fname,
    );
    if (isNameInArray) {
      ToastMessage('Student name already exiting');
    } else {
      const childArray = [];
      const data = {
        id: Math.random().toFixed(2) * 100,
        student_name: values.fname,
        master_schools_id: parseInt(schoolId),
        school_name: schoolname,
        class:
          classId == 0
            ? 'Upper Class'
            : classId == -1
            ? 'Lower Class'
            : classId,
        divName: divisionName,
        div: divisionId,
        food_type: foodtypeName,
        master_shifts_id: shiftId,
        master_shifts_name: shiftName,
        photo: base?.length > 0 ? `data:image/png;base64,${base}` : '',
        dob: dataselectd,
      };

      childArray.push(data);

      PrefManager.getValue('@child_Data').then(value => {
        if (value.length > 0) {
          var newIds = JSON.parse(value).concat(childArray);
          PrefManager.setValue('@child_Data', JSON.stringify(newIds));
        } else {
          PrefManager.setValue('@child_Data', JSON.stringify(childArray));
        }
      });
      navigation.navigate('Signup');
    }
  };

  const handleAdd = async values => {
    const students = await PrefManager.getValue('@students');
    const allStudent = JSON.parse(students);
    const id = await PrefManager.getValue('@id');

    const isNameInArray = allStudent.some(item => item.name === values.fname);

    if (isNameInArray) {
      ToastMessage('Student name already exiting');
    } else {
      const data = {
        name: values.fname,
        cms_users_id: id,
        master_schools_id: parseInt(schoolId),
        class:
          classId == 0
            ? 'Upper Class'
            : classId == -1
            ? 'Lower Class'
            : classId,
        div: divisionId,
        food_type: foodtypeName,
        master_shifts_id: shiftId,
        photo: base?.length > 0 ? `data:image/png;base64,${base}` : '',
        dob: dataselectd,
      };
      const dataMerge = allStudent.concat([data]);
      PrefManager.setValue('@students', JSON.stringify(dataMerge));
      createStudentDetails(data);
    }
  };

  const handleEdit = async values => {
    const {data, type} = route.params;
    const id = await PrefManager.getValue('@id');
    const students = await PrefManager.getValue('@students');
    const allStudent = JSON.parse(students);

    const isNameInArray = allStudent.some(item => item.name === values.fname);

    if (isNameInArray) {
      ToastMessage('Student name already exiting');
    } else {
      const datanew = {
        id: data?.id,
        name: values.fname,
        cms_users_id: id,
        master_schools_id: parseInt(schoolId),
        class:
          classId == 0
            ? 'Upper Class'
            : classId == -1
            ? 'Lower Class'
            : classId,
        div: divisionId,
        food_type: foodtypeName,
        master_shifts_id: shiftId,
        dob: dataselectd,
      };
      const dataMerge = allStudent.concat([datanew]);
      PrefManager.setValue('@students', JSON.stringify(dataMerge));
      editStudentDetails(datanew);
    }
  };
  const isValid = values => {
    if (divisionId.length <= 0) {
      ToastMessage('Please select division');
      // Toast.show('Please select division', Toast.LONG);
    } else if (shiftId.length <= 0) {
      ToastMessage('Please select Shift');
      // Toast.show('Please select Shift', Toast.LONG);
    } else {
      if (type == 'Add') {
        handleAdd(values);
      } else if (type == 'Edit') {
        handleEdit(values);
      } else if (type == 'Confirm') {
        handleConfirm(values);
      }
    }
  };

  const selectItemId = item => {
    setSelectDevision(item);
    setSchoolId(item.id);
    setSchoolname(item.name);
  };

  const selectClassId = item => {
    setClassId(item.id);
    setClassname(item.name);
  };

  const selectDivisionId = item => {
    setDivisionId(item.id);
    setDivisionname(item.name);
  };

  const selectShiftId = item => {
    setShiftId(item.id);
    setShiftName(item.name);
  };

  const selectFoodtype = item => {
    setFoodtypeName(item.name);
    setFoodtypeId(item.id);
  };

  const classRef = useRef(null);

  return (
    <View style={{marginTop: ScaleSizeUtils.LISTING_100}}>
      <View style={styles.bottomView}>
        <Formik
          validationSchema={addChildValidationSchema}
          enableReinitialize
          initialValues={{
            fname: name,
          }}
          onSubmit={values => isValid(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View>
              <Texinput
                placeholder="Enter full name"
                value={values.fname}
                returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                onTextChange={handleChange('fname')}
                errorText={errors.fname}
                touched={touched.fname}
                isFocus={isfocusname}
                onFocus={() => {
                  setFocusname(true);
                }}
                onBlur={() => {
                  setFocusname(false);
                }}
              />

              <TouchableOpacity onPress={() => setDateVisible(true)}>
                <Texinput
                  value={dataselectd}
                  placeholder="Enter your birthdate"
                  isDisbale={false}
                  DatePickerActive={() => setDateVisible(true)}
                  onTextChange={text => setDateSelected(text)}
                  isDate={true}
                  onFocus={() => {
                    setFocusdate(true);
                  }}
                  onBlur={() => {
                    setFocusdate(false);
                  }}
                />
              </TouchableOpacity>

              <View style={{marginTop: 10}}>
                <DropdownComponent
                  disable={type == 'Edit' ? true : false}
                  data={schoolDetail}
                  selectItemId={selectItemId}
                  value={schoolId}
                  placeholder="Enter school name"
                />
              </View>

              <View
                style={{
                  marginTop: Platform.OS == 'ios' ? 0 : -20,
                  flexDirection: 'row',
                  width: '100%',
                  alignSelf: 'center',
                }}>
                <View
                  style={{
                    width: '50%',
                    marginTop: Platform.OS == 'ios' ? 0 : 20,
                  }}>
                  <DropdownComponent
                    disable={type == 'Edit' ? true : false}
                    data={class_type}
                    selectItemId={selectClassId}
                    value={parseInt(classId)}
                    placeholder="Enter class"
                  />
                  {/* <Texinput
                    placeholder="Enter Class"
                    value={values.class}
                    refs={classRef}
                    returnKeyType="done"
                    onTextChange={handleChange('class')}
                    errorText={errors.class}
                    touched={touched.class}
                    keyboardType="number-pad"
                    isFocus={isfocusclass}
                    onFocus={() => {
                      setFocusclass(true);
                    }}
                    onBlur={() => {
                      setFocusclass(false);
                    }}
                  /> */}
                </View>
                <View
                  style={{
                    width: '50%',
                    marginTop: Platform.OS == 'ios' ? 0 : 20,
                  }}>
                  <DropdownComponent
                    data={selectDivision?.divisions}
                    selectItemId={selectDivisionId}
                    value={divisionId}
                    placeholder="Division"
                  />
                  {/* <Texinput
                    placeholder="Division"
                    value={values.division}
                    onTextChange={handleChange('division')}
                    errorText={errors.division}
                    touched={touched.division}
                    isFocus={isfocusdivision}
                    onFocus={() => {
                      setFocusdivision(true);
                    }}
                    onBlur={() => {
                      setFocusdivision(false);
                    }}
                  /> */}
                </View>
              </View>
              <View style={{marginTop: 10}}>
                <DropdownComponent
                  data={food_type}
                  selectItemId={selectFoodtype}
                  value={foodtypeId}
                  placeholder="Select type"
                />
              </View>
              <View style={{marginBottom: '10%', marginTop: '2%'}}>
                <DropdownComponent
                  data={selectDivision?.shifts}
                  selectItemId={selectShiftId}
                  value={shiftId}
                  placeholder="Select shift"
                />
                {/* <RadioButton
                    radioStyle={styles.radioForm}
                    value={values.shiftTime}
                    onChange={handleChange('shiftTime')}
                    PROP={selectDivision?.shifts}
                  /> */}
              </View>

              <TouchableOpacity
                style={styles.uploadBox}
                onPress={() => setModalVisible(true)}>
                {type == 'Confirm' && base?.length > 0 ? (
                  <Image
                    source={{uri: `data:image/png;base64,${base}`}}
                    style={{
                      width: ScaleSizeUtils.DIMENSTION_LARGE * 2,
                      height: ScaleSizeUtils.DIMENSTION_LARGE * 2,
                    }}
                  />
                ) : null}
                {(type == 'Add' || type == 'Edit') && photo?.length > 0 ? (
                  <Image
                    source={{uri: photo}}
                    style={{
                      width: ScaleSizeUtils.DIMENSTION_LARGE * 2,
                      height: ScaleSizeUtils.DIMENSTION_LARGE * 2,
                    }}
                  />
                ) : null}
                {base?.length == 0 &&
                  (photo?.length == null || photo?.length == 0) && (
                    <Image
                      source={require('../../assets/upload.png')}
                      style={{
                        padding: 20,
                        width: ScaleSizeUtils.DIMENSTION_LARGE * 2,
                        height: ScaleSizeUtils.DIMENSTION_LARGE * 2,
                      }}
                    />
                  )}
                <Text style={{color: Colors.gray}}>Choose a file</Text>
                <Text style={{color: Colors.gray}}>Upload child image</Text>
              </TouchableOpacity>
              <View style={{marginBottom: 10}}>
                <Button
                  title={
                    type == 'Add'
                      ? 'Add'
                      : type == 'Edit'
                      ? 'Update'
                      : 'Confirm'
                  }
                  backgroundColor={Colors.black}
                  textColor={Colors.white}
                  onPress={() => handleSubmit()}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>

      {dataVisible == true ? (
        <DatePicker
          minimumDate={new Date('1890-01-01')}
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

      <SwipeUpDownModal
        modalVisible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        ContentModal={
          <View style={{flex: 1}}>
            <View style={styles.bottom_modal}>
              <TouchableOpacity
                onPress={() => {
                  camera();
                }}>
                <Image
                  source={require('../../assets/camera.png')}
                  style={styles.camera_touch}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  gallary();
                }}>
                <Image
                  source={require('../../assets/gallery.png')}
                  style={styles.camera_touch}
                />
              </TouchableOpacity>
            </View>
          </View>
        }
        ContentModalStyle={styles.modal_bottom_style}
        onClose={() => {
          setModalVisible(!modalVisible);
        }}
      />
    </View>
  );
}

const mapStateToProps = state => {
  return {
    loading: state.authUser.loading,
    schoolDetail: state.authUser.schoolDetail?.data,
    createStudent: state.nonAuth.createStudent,
    updateStudent: state.nonAuth.updateStudent,
    photoUpload: state.nonAuth.photoUpload,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getSchool: data => {
      dispatch(getSchool(data));
    },
    loginUser: data => {
      dispatch(loginUser(data));
    },
    clearUser: data => {
      dispatch(clearUser(data));
    },
    createStudentDetails: data => {
      dispatch(createStudentDetails(data));
    },
    clearCreateStudentDetails: data => {
      dispatch(clearCreateStudentDetails(data));
    },
    editStudentDetails: data => {
      dispatch(editStudentDetails(data));
    },
    clearEditStudentDetails: data => {
      dispatch(clearEditStudentDetails(data));
    },
    getUploadPhotos: data => {
      dispatch(getUploadPhotos(data));
    },
    clearUploadPhotos: data => {
      dispatch(clearUploadPhotos(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddChildScreenComponets);
