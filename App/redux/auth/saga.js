/* eslint no-underscore-dangle: 0 */
import {all, call, fork, put, takeEvery, takeLatest} from 'redux-saga/effects';
import axiosConfig from '../../Helper/AxiosConfig';
import {API, Endpoint, end_point} from '../../Helper/HttpService';
import {
  GET_TOKEN_ERROR,
  GET_TOKEN_REQUEST,
  GET_TOKEN_SUCCESS,
  LOGIN_USER,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  RESEND_OTP_REQUEST,
  RESEND_OTP__SUCCESS,
  RESEND_OTP__ERROR,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP__SUCCESS,
  VERIFY_OTP__ERROR,
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD__SUCCESS,
  FORGET_PASSWORD__ERROR,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD__SUCCESS,
  RESET_PASSWORD__ERROR,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  GET_PROFILE_DETAILS_SUCCESS,
  GET_PROFILE_DETAILS_ERROR,
  GET_PROFILE_DETAILS_REQUEST,
  GET_PROFILE_UPDATE_REQUEST,
  GET_PROFILE_UPDATE_SUCCESS,
  GET_PROFILE_UPDATE_ERROR,
  GET_CHANGE_PASSWORD_SUCCESS,
  GET_CHANGE_PASSWORD_ERROR,
  GET_CHANGE_PASSWORD_REQUEST,
  GET_UPLOAD_PHOTO_SUCCESS,
  GET_UPLOAD_PHOTO_ERROR,
  GET_UPLOAD_PHOTO_REQUEST,
  GET_SCHOOL_ERROR,
  GET_SCHOOL_SUCCESS,
  GET_SCHOOL_REQUEST,
} from '../actionTypes';

function requestApi(type, url, params, headers) {
  return axiosConfig.request({
    method: type,
    url: url,
    data: params,
    headers: headers,
  });
}
function* getToken(action) {
  try {
    var postData = action.payload;
    let response = yield call(requestApi, 'POST', Endpoint.get_token, postData);
    yield put({
      type: GET_TOKEN_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    //alert(JSON.stringify(err));
    yield put({
      type: GET_TOKEN_ERROR,
      payload: err,
    });
  }
}

function* getTokenSaga() {
  yield takeEvery(GET_TOKEN_REQUEST, getToken);
}

function* getSchool() {
  try {
    let response = yield call(requestApi, 'GET', Endpoint.get_schools);
    yield put({
      type: GET_SCHOOL_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    //alert(JSON.stringify(err));
    yield put({
      type: GET_SCHOOL_ERROR,
      payload: err,
    });
  }
}

function* getSchoolSaga() {
  yield takeEvery(GET_SCHOOL_REQUEST, getSchool);
}

function* loginUser(action) {
  try {
    var postData = action.payload;
    let response = yield call(requestApi, 'POST', Endpoint.login, postData);

    console.log('response=====>>>', JSON.stringify(response));
    yield put({
      type: LOGIN_USER_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    console.log('err=====>>>', JSON.stringify(err));

    yield put({
      type: LOGIN_USER_ERROR,
      payload: err,
    });
  }
}

function* loginUserSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
}

function* resendOtpcall(action) {
  try {
    var postData = action.payload;
    let response = yield call(
      requestApi,
      'POST',
      Endpoint.resend_otp,
      postData,
    );
    yield put({
      type: RESEND_OTP__SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: RESEND_OTP__ERROR,
      payload: err,
    });
  }
}

function* resendOtpcallSaga() {
  yield takeEvery(RESEND_OTP_REQUEST, resendOtpcall);
}

function* verifyOtpcall(action) {
  try {
    var postData = action.payload;
    let response = yield call(
      requestApi,
      'GET',
      Endpoint.verify_otp + postData,
    );
    yield put({
      type: VERIFY_OTP__SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: VERIFY_OTP__ERROR,
      payload: err,
    });
  }
}

function* verifyOtpcallSaga() {
  yield takeEvery(VERIFY_OTP_REQUEST, verifyOtpcall);
}

function* forgetPass(action) {
  try {
    var postData = action.payload;
    let response = yield call(
      requestApi,
      'POST',
      Endpoint.forget_pass,
      postData,
    );
    yield put({
      type: FORGET_PASSWORD__SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: FORGET_PASSWORD__ERROR,
      payload: err,
    });
  }
}

function* forgetPassSaga() {
  yield takeEvery(FORGET_PASSWORD_REQUEST, forgetPass);
}

function* resetPass(action) {
  try {
    var postData = action.payload;
    let response = yield call(
      requestApi,
      'POST',
      Endpoint.reset_pass,
      postData,
    );
    yield put({
      type: RESET_PASSWORD__SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: RESET_PASSWORD__ERROR,
      payload: err,
    });
  }
}

function* resetPassSaga() {
  yield takeEvery(RESET_PASSWORD_REQUEST, resetPass);
}

function* registerUser(action) {
  try {
    var postData = action.payload;
    let response = yield call(requestApi, 'POST', Endpoint.register, postData);
    yield put({
      type: REGISTER_USER_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: REGISTER_USER_ERROR,
      payload: err,
    });
  }
}

function* registerUserSaga() {
  yield takeEvery(REGISTER_USER, registerUser);
}

function* getProfileDetails(action) {
  try {
    var postData = action.payload;
    let response = yield call(
      requestApi,
      'GET',
      Endpoint.user_profile + postData,
    );
    yield put({
      type: GET_PROFILE_DETAILS_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: GET_PROFILE_DETAILS_ERROR,
      payload: err,
    });
  }
}

function* getProfileDetailsSaga() {
  yield takeEvery(GET_PROFILE_DETAILS_REQUEST, getProfileDetails);
}

function* getProfileUpdate(action) {
  try {
    var postData = action.payload;
    let response = yield call(
      requestApi,
      'POST',
      Endpoint.update_profile,
      postData,
    );
    yield put({
      type: GET_PROFILE_UPDATE_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: GET_PROFILE_UPDATE_ERROR,
      payload: err,
    });
  }
}

function* getProfileUpdateSaga() {
  yield takeEvery(GET_PROFILE_UPDATE_REQUEST, getProfileUpdate);
}

function* getPasswordchnage(action) {
  try {
    var postData = action.payload;
    let response = yield call(
      requestApi,
      'POST',
      Endpoint.reset_pass,
      postData,
    );
    yield put({
      type: GET_CHANGE_PASSWORD_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: GET_CHANGE_PASSWORD_ERROR,
      payload: err,
    });
  }
}

function* getPasswordchnageSaga() {
  yield takeEvery(GET_CHANGE_PASSWORD_REQUEST, getPasswordchnage);
}

function* getPhotochnage(action) {
  try {
    var postData = action.payload;
    let response = yield call(
      requestApi,
      'POST',
      Endpoint.image_upload,
      postData,
    );
    yield put({
      type: GET_UPLOAD_PHOTO_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: GET_UPLOAD_PHOTO_ERROR,
      payload: err,
    });
  }
}

function* getPhotochnageSaga() {
  yield takeEvery(GET_UPLOAD_PHOTO_REQUEST, getPhotochnage);
}
export default function* authSagas() {
  yield all([
    getTokenSaga(),
    getSchoolSaga(),
    loginUserSaga(),
    resendOtpcallSaga(),
    verifyOtpcallSaga(),
    forgetPassSaga(),
    resetPassSaga(),
    registerUserSaga(),
    getProfileDetailsSaga(),
    getProfileUpdateSaga(),
    getPasswordchnageSaga(),
    getPhotochnageSaga(),
  ]);
}
