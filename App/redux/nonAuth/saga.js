import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axiosConfig from '../../Helper/AxiosConfig';
import { API, Endpoint, end_point } from '../../Helper/HttpService';
import {
  CREATE_STUDENT_DETAILS_ERROR,
  CREATE_STUDENT_DETAILS_REQUEST,
  CREATE_STUDENT_DETAILS_SUCCESS,
  CREATE_SUBSCRIPTION_ORDER_REQUEST,
  CREATE_SUBSCRIPTION_ORDER_SUCCESS,
  CREATE_SUBSCRIPTION_ORDER__ERROR,
  DELETE_STUDENT_DETAILS_ERROR,
  DELETE_STUDENT_DETAILS_REQUEST,
  DELETE_STUDENT_DETAILS_SUCCESS,
  GET_BANNER_ERROR,
  GET_BANNER_REQUEST,
  GET_BANNER_SUCCESS,
  GET_BIRTHDAY_SETTING_FAILURE,
  GET_BIRTHDAY_SETTING_REQUEST,
  GET_BIRTHDAY_SETTING_SUCCESS,
  GET_CANCEL_MEAL_TYPE_FAILURE,
  GET_CANCEL_MEAL_TYPE_REQUEST,
  GET_CANCEL_MEAL_TYPE_SUCCESS,
  GET_CART_ITEM_ERROR,
  GET_CART_ITEM_REQUEST,
  GET_CART_ITEM_SUCCESS,
  GET_CREATE_BIRTDAYPARTY_FALIURE,
  GET_CREATE_BIRTDAYPARTY_REQUEST,
  GET_CREATE_BIRTDAYPARTY_SUCCESS,
  GET_CREATE_RATING_FAILURE,
  GET_CREATE_RATING_REQUEST,
  GET_CREATE_RATING_SUCCESS,
  GET_DELETE_ACCOUNT_FAILURE,
  GET_DELETE_ACCOUNT_REQUEST,
  GET_DELETE_ACCOUNT_SUCCESS,
  GET_DELETE_ITEMS_FAILURE,
  GET_DELETE_ITEMS_REQUEST,
  GET_DELETE_ITEMS_SUCCESS,
  GET_FOOD_MENU_ERROR,
  GET_FOOD_MENU_REQUEST,
  GET_FOOD_MENU_SUCCESS,
  GET_MEAL_TYPE_ERROR,
  GET_MEAL_TYPE_REQUEST,
  GET_MEAL_TYPE_SUCCESS,
  GET_ORDER_DETAILS_ERROR,
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  GET_PACKCHARGIES_APPLY_FAILURE,
  GET_PACKCHARGIES_APPLY_REQUEST,
  GET_PACKCHARGIES_APPLY_SUCCESS,
  GET_PAYMENT_HISTORY_FAILURE,
  GET_PAYMENT_HISTORY_REQUEST,
  GET_PAYMENT_HISTORY_SUCCESS,
  GET_PROFILE_DETAILS_ERROR,
  GET_PROFILE_DETAILS_REQUEST,
  GET_PROFILE_DETAILS_SUCCESS,
  GET_PROFILE_UPDATE_ERROR,
  GET_PROFILE_UPDATE_REQUEST,
  GET_PROFILE_UPDATE_SUCCESS,
  GET_STUDENT_DETAILS_ERROR,
  GET_STUDENT_DETAILS_REQUEST,
  GET_STUDENT_DETAILS_SUCCESS,
  GET_STUDENT_SUBSCRIPTION_ERROR,
  GET_STUDENT_SUBSCRIPTION_ORDER_REQUEST,
  GET_STUDENT_SUBSCRIPTION_SUCCESS,
  GET_SUBSCRIPTION_ORDER_ERROR,
  GET_SUBSCRIPTION_ORDER_REQUEST,
  GET_SUBSCRIPTION_ORDER_SUCCESS,
  GET_TRANCTION_SUCCESS_FAILURE,
  GET_TRANCTION_SUCCESS_REQUEST,
  GET_TRANCTION_SUCCESS_SUCCESS,
  GET_UPDATE_PASSWORD_FAILURE,
  GET_UPDATE_PASSWORD_REQUEST,
  GET_UPDATE_PASSWORD_SUCCESS,
  GET_UPLOAD_PHOTO_ERROR,
  GET_UPLOAD_PHOTO_REQUEST,
  GET_UPLOAD_PHOTO_SUCCESS,
  UPDATE_STUDENT_DETAILS_ERROR,
  UPDATE_STUDENT_DETAILS_REQUEST,
  UPDATE_STUDENT_DETAILS_SUCCESS,
} from '../actionTypes';

function requestApi(type, url, params, headers) {
  return axiosConfig.request({
    method: type,
    url: url,
    data: params,
    headers: headers,
  });
}
function* getBannerDetails(action) {
  try {
    let response = yield call(requestApi, 'GET', Endpoint.dashboard_banner);
    yield put({
      type: GET_BANNER_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    //alert(JSON.stringify(err));
    yield put({
      type: GET_BANNER_ERROR,
      payload: err,
    });
  }
}

function* getBannerDetailsSaga() {
  yield takeEvery(GET_BANNER_REQUEST, getBannerDetails);
}

function* getMealDetails(action) {
  try {
    let response = yield call(
      requestApi,
      'GET',
      Endpoint.get_meal_types + action.payload,
    );
    yield put({
      type: GET_MEAL_TYPE_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    //alert(JSON.stringify(err));
    yield put({
      type: GET_MEAL_TYPE_ERROR,
      payload: err,
    });
  }
}

function* getMealDetailsSaga() {
  yield takeEvery(GET_MEAL_TYPE_REQUEST, getMealDetails);
}

function* getFoodMenuDetails(action) {
  try {
    let response = yield call(
      requestApi,
      'GET',
      Endpoint.get_food_menu + action.payload,
    );
    yield put({
      type: GET_FOOD_MENU_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    //alert(JSON.stringify(err));
    yield put({
      type: GET_FOOD_MENU_ERROR,
      payload: err,
    });
  }
}

function* getFoodMenuDetailsSaga() {
  yield takeEvery(GET_FOOD_MENU_REQUEST, getFoodMenuDetails);
}

function* getStudentsDetails(action) {
  try {
    let response = yield call(
      requestApi,
      'GET',
      Endpoint.get_students + action.payload,
    );
    yield put({
      type: GET_STUDENT_DETAILS_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    //alert(JSON.stringify(err));
    yield put({
      type: GET_STUDENT_DETAILS_ERROR,
      payload: err,
    });
  }
}

function* getStudentsDetailsSaga() {
  yield takeEvery(GET_STUDENT_DETAILS_REQUEST, getStudentsDetails);
}

function* createSubscription(action) {
  try {
    let response = yield call(
      requestApi,
      'POST',
      Endpoint.create_subscription,
      action.payload,
    );
    yield put({
      type: CREATE_SUBSCRIPTION_ORDER_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    //alert(JSON.stringify(err));
    yield put({
      type: CREATE_SUBSCRIPTION_ORDER__ERROR,
      payload: err,
    });
  }
}

function* createSubscriptionSaga() {
  yield takeEvery(CREATE_SUBSCRIPTION_ORDER_REQUEST, createSubscription);
}

function* getCartDetails(action) {
  try {
    let response = yield call(
      requestApi,
      'GET',
      Endpoint.get_cart_item + action.payload,
    );
    yield put({
      type: GET_CART_ITEM_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    //alert(JSON.stringify(err));
    yield put({
      type: GET_CART_ITEM_ERROR,
      payload: err,
    });
  }
}

function* getCartDetailsSaga() {
  yield takeEvery(GET_CART_ITEM_REQUEST, getCartDetails);
}

function* getUserDetails(action) {
  try {
    let response = yield call(
      requestApi,
      'GET',
      Endpoint.user_profile + action.payload,
    );
    yield put({
      type: GET_PROFILE_DETAILS_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    //alert(JSON.stringify(err));
    yield put({
      type: GET_PROFILE_DETAILS_ERROR,
      payload: err,
    });
  }
}

function* getUserDetailsSaga() {
  yield takeEvery(GET_PROFILE_DETAILS_REQUEST, getUserDetails);
}

function* updateUserDetails(action) {
  try {
    let response = yield call(
      requestApi,
      'POST',
      Endpoint.update_profile,
      action.payload,
    );
    yield put({
      type: GET_PROFILE_UPDATE_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    //alert(JSON.stringify(err));
    yield put({
      type: GET_PROFILE_UPDATE_ERROR,
      payload: err,
    });
  }
}

function* updateUserDetailsSaga() {
  yield takeEvery(GET_PROFILE_UPDATE_REQUEST, updateUserDetails);
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

function* createStudentDetails(action) {
  try {
    var postData = action.payload;
    let response = yield call(
      requestApi,
      'POST',
      Endpoint.create_student,
      postData,
    );
    yield put({
      type: CREATE_STUDENT_DETAILS_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: CREATE_STUDENT_DETAILS_ERROR,
      payload: err,
    });
  }
}

function* createStudentDetailsSaga() {
  yield takeEvery(CREATE_STUDENT_DETAILS_REQUEST, createStudentDetails);
}

function* updateStudentDetails(action) {
  try {
    var postData = action.payload;
    let response = yield call(
      requestApi,
      'POST',
      Endpoint.update_student_profile,
      postData,
    );
    yield put({
      type: UPDATE_STUDENT_DETAILS_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: UPDATE_STUDENT_DETAILS_ERROR,
      payload: err,
    });
  }
}

function* updateStudentDetailsSaga() {
  yield takeEvery(UPDATE_STUDENT_DETAILS_REQUEST, updateStudentDetails);
}

function* deleteStudentDetails(action) {
  try {
    var postData = action.payload;
    let response = yield call(
      requestApi,
      'GET',
      Endpoint.delete_student + postData,
    );
    yield put({
      type: DELETE_STUDENT_DETAILS_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: DELETE_STUDENT_DETAILS_ERROR,
      payload: err,
    });
  }
}

function* deleteStudentDetailsSaga() {
  yield takeEvery(DELETE_STUDENT_DETAILS_REQUEST, deleteStudentDetails);
}

function* getStudentSubscriptionDetail(action) {
  try {
    var postData = action.payload;
    let response = yield call(
      requestApi,
      'GET',
      Endpoint.get_student_subscription_orders + postData,
    );
    yield put({
      type: GET_STUDENT_SUBSCRIPTION_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: GET_STUDENT_SUBSCRIPTION_ERROR,
      payload: err,
    });
  }
}

function* getStudentSubscriptionDetailSaga() {
  yield takeEvery(
    GET_STUDENT_SUBSCRIPTION_ORDER_REQUEST,
    getStudentSubscriptionDetail,
  );
}

function* getOrderDetails(action) {
  try {
    var postData = action.payload;
    let response = yield call(
      requestApi,
      'GET',
      Endpoint.get_subscriptions_list + postData,
    );
    yield put({
      type: GET_ORDER_DETAILS_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: GET_ORDER_DETAILS_ERROR,
      payload: err,
    });
  }
}

function* getOrderDetailsSaga() {
  yield takeEvery(GET_ORDER_DETAILS_REQUEST, getOrderDetails);
}

function* getTransactionSuccess(action) {
  try {
    var postData = action.payload;
    let response = yield call(
      requestApi,
      'POST',
      Endpoint.create_payment,
      postData,
    );
    yield put({
      type: GET_TRANCTION_SUCCESS_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: GET_TRANCTION_SUCCESS_FAILURE,
      payload: err,
    });
  }
}

function* getTransactionSuccessSaga() {
  yield takeEvery(GET_TRANCTION_SUCCESS_REQUEST, getTransactionSuccess);
}

function* getPaymentHistory(action) {
  try {
    var postData = action.payload;
    let response = yield call(
      requestApi,
      'GET',
      Endpoint.get_payment_history + postData,
    );

    console.log("RESPONSE=> " + JSON.stringify(response));
    yield put({
      type: GET_PAYMENT_HISTORY_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: GET_PAYMENT_HISTORY_FAILURE,
      payload: err,
    });
  }
}

function* getPaymentHistorySaga() {
  yield takeEvery(GET_PAYMENT_HISTORY_REQUEST, getPaymentHistory);
}

function* getCancelMealtype(action) {
  try {
    var postData = action.payload;
    let response = yield call(
      requestApi,
      'POST',
      Endpoint.cancel_meal,
      postData,
    );
    yield put({
      type: GET_CANCEL_MEAL_TYPE_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: GET_CANCEL_MEAL_TYPE_FAILURE,
      payload: err,
    });
  }
}

function* getCancelMealtypeSaga() {
  yield takeEvery(GET_CANCEL_MEAL_TYPE_REQUEST, getCancelMealtype);
}

function* getdeleteAccount(action) {
  try {
    var postData = action.payload;
    let response = yield call(
      requestApi,
      'GET',
      Endpoint.user_account_delete + postData,
    );
    yield put({
      type: GET_DELETE_ACCOUNT_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: GET_DELETE_ACCOUNT_FAILURE,
      payload: err,
    });
  }
}

function* getdeleteAccountSaga() {
  yield takeEvery(GET_DELETE_ACCOUNT_REQUEST, getdeleteAccount);
}

function* getUpdatePassword(action) {
  try {
    var postData = action.payload;
    let response = yield call(
      requestApi,
      'POST',
      Endpoint.user_update_password,
      postData,
    );
    yield put({
      type: GET_UPDATE_PASSWORD_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: GET_UPDATE_PASSWORD_FAILURE,
      payload: err,
    });
  }
}

function* getUpdatePasswordSaga() {
  yield takeEvery(GET_UPDATE_PASSWORD_REQUEST, getUpdatePassword);
}

function* getDeleteItem(action) {
  try {
    var postData = action.payload;
    let response = yield call(
      requestApi,
      'GET',
      Endpoint.delete_cart_item + postData,
    );
    yield put({
      type: GET_DELETE_ITEMS_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: GET_DELETE_ITEMS_FAILURE,
      payload: err,
    });
  }
}

function* getDeleteItemSaga() {
  yield takeEvery(GET_DELETE_ITEMS_REQUEST, getDeleteItem);
}

function* getChargesApply(action) {
  try {
    var postData = action.payload;
    let response = yield call(
      requestApi,
      'GET',
      Endpoint.change_biodegradable_status + postData,
    );
    yield put({
      type: GET_PACKCHARGIES_APPLY_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: GET_PACKCHARGIES_APPLY_FAILURE,
      payload: err,
    });
  }
}

function* getChargesApplySaga() {
  yield takeEvery(GET_PACKCHARGIES_APPLY_REQUEST, getChargesApply);
}

function* getBirthdaySetting(action) {
  try {
    var postData = action.payload;
    let response = yield call(
      requestApi,
      'GET',
      Endpoint.get_birthday_party_setting + postData,
    );
    yield put({
      type: GET_BIRTHDAY_SETTING_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: GET_BIRTHDAY_SETTING_FAILURE,
      payload: err,
    });
  }
}

function* getBirthdaySettingSaga() {
  yield takeEvery(GET_BIRTHDAY_SETTING_REQUEST, getBirthdaySetting);
}

function* creatBirthdayParty(action) {
  try {
    var postData = action.payload;
    let response = yield call(
      requestApi,
      'POST',
      Endpoint.create_birthday_party_order,
      postData,
    );
    yield put({
      type: GET_CREATE_BIRTDAYPARTY_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: GET_CREATE_BIRTDAYPARTY_FALIURE,
      payload: err,
    });
  }
}

function* creatBirthdayPartySaga() {
  yield takeEvery(GET_CREATE_BIRTDAYPARTY_REQUEST, creatBirthdayParty);
}

function* createRatingAndFeedback(action) {
  try {
    var postData = action.payload;
    let response = yield call(
      requestApi,
      'POST',
      Endpoint.update_feedback,
      postData,
    );
    yield put({
      type: GET_CREATE_RATING_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: GET_CREATE_RATING_FAILURE,
      payload: err,
    });
  }
}

function* createRatingAndFeedbackSaga() {
  yield takeEvery(GET_CREATE_RATING_REQUEST, createRatingAndFeedback);
}

export default function* nonAuthSagas() {
  yield all([
    createRatingAndFeedbackSaga(),
    getDeleteItemSaga(),
    getUpdatePasswordSaga(),
    getdeleteAccountSaga(),
    getCancelMealtypeSaga(),
    getBannerDetailsSaga(),
    getMealDetailsSaga(),
    getFoodMenuDetailsSaga(),
    getStudentsDetailsSaga(),
    createSubscriptionSaga(),
    getCartDetailsSaga(),
    getUserDetailsSaga(),
    updateUserDetailsSaga(),
    getPhotochnageSaga(),
    createStudentDetailsSaga(),
    updateStudentDetailsSaga(),
    deleteStudentDetailsSaga(),
    getStudentSubscriptionDetailSaga(),
    getOrderDetailsSaga(),
    getTransactionSuccessSaga(),
    getPaymentHistorySaga(),
    getChargesApplySaga(),
    getBirthdaySettingSaga(),
  ]);
}
