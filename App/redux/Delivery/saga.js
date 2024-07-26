import {all, call, fork, put, takeEvery, takeLatest} from 'redux-saga/effects';
import axiosConfig from '../../Helper/AxiosConfig';
import {API, Endpoint, end_point} from '../../Helper/HttpService';
import {
  GET_DELIVERY_DASHBOARD_DETAILS_FAILURE,
  GET_DELIVERY_DASHBOARD_DETAILS_REQUEST,
  GET_DELIVERY_DASHBOARD_DETAILS_SUCCESS,
  GET_DELIVERY_HISTORY_DETAILS_FAILURE,
  GET_DELIVERY_HISTORY_DETAILS_REQUEST,
  GET_DELIVERY_HISTORY_DETAILS_SUCCESS,
  UPDATE_ORDER_STATUS_FAILURE,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
} from '../actionTypes';

function requestApi(type, url, params, headers) {
  return axiosConfig.request({
    method: type,
    url: url,
    data: params,
    headers: headers,
  });
}

function* getDeliveryDashbordReport(action) {
  try {
    var postData = action.payload;
    let response = yield call(
      requestApi,
      'GET',
      Endpoint.get_deliver_boy_dashboard + postData,
    );
    yield put({
      type: GET_DELIVERY_DASHBOARD_DETAILS_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    //alert(JSON.stringify(err));
    yield put({
      type: GET_DELIVERY_DASHBOARD_DETAILS_FAILURE,
      payload: err,
    });
  }
}

function* getDeliveryDashbordReportSaga() {
  yield takeEvery(
    GET_DELIVERY_DASHBOARD_DETAILS_REQUEST,
    getDeliveryDashbordReport,
  );
}

function* getDeliveryHistory(action) {
  try {
    var postData = action.payload;
    let response = yield call(
      requestApi,
      'GET',
      Endpoint.get_delivery_orders + postData,
    );
    yield put({
      type: GET_DELIVERY_HISTORY_DETAILS_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    //alert(JSON.stringify(err));
    yield put({
      type: GET_DELIVERY_HISTORY_DETAILS_FAILURE,
      payload: err,
    });
  }
}

function* getDeliveryHistorySaga() {
  yield takeEvery(GET_DELIVERY_HISTORY_DETAILS_REQUEST, getDeliveryHistory);
}

function* updateOrderStatus(action) {
  try {
    var postData = action.payload;
    let response = yield call(
      requestApi,
      'POST',
      Endpoint.update_order_status,
      postData,
    );
    yield put({
      type: UPDATE_ORDER_STATUS_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    //alert(JSON.stringify(err));
    yield put({
      type: UPDATE_ORDER_STATUS_FAILURE,
      payload: err,
    });
  }
}

function* updateOrderStatusSaga() {
  yield takeEvery(UPDATE_ORDER_STATUS_REQUEST, updateOrderStatus);
}

export default function* deliverySagas() {
  yield all([
    getDeliveryDashbordReportSaga(),
    getDeliveryHistorySaga(),
    updateOrderStatusSaga(),
  ]);
}
