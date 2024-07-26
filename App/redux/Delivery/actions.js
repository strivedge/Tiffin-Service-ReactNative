import {
  CLEAR_DELIVERY_DASHBOARD_DETAILS_REQUEST,
  CLEAR_DELIVERY_HISTORY_DETAILS_REQUEST,
  CLEAR_ORDER_STATUS_REQUEST,
  GET_DELIVERY_DASHBOARD_DETAILS_REQUEST,
  GET_DELIVERY_HISTORY_DETAILS_REQUEST,
  UPDATE_ORDER_STATUS_REQUEST,
} from '../actionTypes';

export const getDeliveryDashboardReport = data => ({
  type: GET_DELIVERY_DASHBOARD_DETAILS_REQUEST,
  payload: data,
});

export const clearDeliveryDashboardReport = () => ({
  type: CLEAR_DELIVERY_DASHBOARD_DETAILS_REQUEST,
  payload: '',
});

export const getDeliveryHistoryDetails = data => ({
  type: GET_DELIVERY_HISTORY_DETAILS_REQUEST,
  payload: data,
});

export const clearDeliveryHistoryDetails = () => ({
  type: CLEAR_DELIVERY_HISTORY_DETAILS_REQUEST,
  payload: '',
});

export const updateOrderStatusRequest = data => ({
  type: UPDATE_ORDER_STATUS_REQUEST,
  payload: data,
});

export const clearupdateOrderStatusRequest = data => ({
  type: CLEAR_ORDER_STATUS_REQUEST,
  payload: data,
});
