import {
  CLEAR_DELIVERY_DASHBOARD_DETAILS_REQUEST,
  CLEAR_DELIVERY_HISTORY_DETAILS_REQUEST,
  CLEAR_ORDER_STATUS_REQUEST,
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

const INIT_STATE = {
  loading: false,
  error: '',

  deliveryDashboardDetails: [],
  deliveryHistoryDetails: [],
  updateOrderDetails: [],
};

const deliveryReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_DELIVERY_DASHBOARD_DETAILS_REQUEST:
      return {...state, loading: true, error: ''};
    case GET_DELIVERY_DASHBOARD_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        deliveryDashboardDetails: action.payload,
        error: '',
      };
    case GET_DELIVERY_DASHBOARD_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_DELIVERY_DASHBOARD_DETAILS_REQUEST:
      return {
        ...state,
        loading: false,
        deliveryDashboardDetails: [],
        error: [],
      };

    case GET_DELIVERY_HISTORY_DETAILS_REQUEST:
      return {...state, loading: true, error: ''};
    case GET_DELIVERY_HISTORY_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        deliveryHistoryDetails: action.payload,
        error: '',
      };
    case GET_DELIVERY_HISTORY_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_DELIVERY_HISTORY_DETAILS_REQUEST:
      return {
        ...state,
        loading: false,
        deliveryHistoryDetails: [],
        error: [],
      };

    case UPDATE_ORDER_STATUS_REQUEST:
      return {...state, loading: true, error: ''};
    case UPDATE_ORDER_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        updateOrderDetails: action.payload,
        error: '',
      };
    case UPDATE_ORDER_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ORDER_STATUS_REQUEST:
      return {
        ...state,
        loading: false,
        updateOrderDetails: [],
        error: [],
      };

    default:
      return {...state};
  }
};

export default deliveryReducer;
