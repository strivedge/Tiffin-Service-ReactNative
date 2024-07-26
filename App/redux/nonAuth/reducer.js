import {
  ALL_STATE_CLEAR_REQUEST,
  CLEAR_BANNER,
  CLEAR_BIRTHDAY_SETTING_REQUEST,
  CLEAR_CANCEL_MEAL_TYPE,
  CLEAR_CART_ITEM,
  CLEAR_CREATE_BIRTDAYPARTY_REQUEST,
  CLEAR_CREATE_STUDENT_DETAILS,
  CLEAR_DELETE_STUDENT_DETAILS,
  CLEAR_FOOD_MENU,
  CLEAR_GET_DELETE_ACCOUNT,
  CLEAR_GET_DELETE_ITEMS,
  CLEAR_GET_ORDER_DETAILS,
  CLEAR_GET_PACKCHARGIES_APPLY,
  CLEAR_GET_STUDENT_SUBSCRIPTION,
  CLEAR_GET_SUBSCRIPTION_ORDER,
  CLEAR_GET_UPDATE_PASSWORD,
  CLEAR_MEAL_TYPE,
  CLEAR_PAYMENT_HISTORY_REQUEST,
  CLEAR_PROFILE_DETAILS,
  CLEAR_PROFILE_UPDATE,
  CLEAR_RATING_REQUEST,
  CLEAR_STUDENT_DETAILS,
  CLEAR_SUBSCRIPTION_ORDER,
  CLEAR_TRANCTION_SUCCESS_REQUEST,
  CLEAR_UPDATE_STUDENT_DETAILS,
  CLEAR_UPLOAD_PHOTO,
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

const INIT_STATE = {
  loading: false,
  error: '',

  bannerDetail: [],
  mealDetail: [],
  foodMenuDetail: [],
  studentDetail: [],
  createSubscription: [],
  getCartDetails: [],
  getUserDetails: [],
  updateUserDetails: [],
  updateUserDetails: [],
  photoUpload: [],
  createStudent: [],
  updateStudent: [],
  deleteStudent: [],
  getSubscriptionOrders: [],
  getTransctionDetail: [],
  deleteAccountdetails: [],
  getPasswordUpdate: [],
  getItemdetails: [],
  getChargesApplyDetails: [],
  getBirthdaySetting: [],
  ratingFeedbackDetails: [],
};

const nonAuth = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_BANNER_REQUEST:
      return {...state, loading: false, error: ''};
    case GET_BANNER_SUCCESS:
      return {
        ...state,
        loading: false,
        bannerDetail: action.payload,
        error: '',
      };
    case GET_BANNER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_BANNER:
      return {
        ...state,
        loading: false,
        bannerDetail: [],
        error: [],
      };

    case GET_MEAL_TYPE_REQUEST:
      return {...state, loading: true, error: ''};
    case GET_MEAL_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        mealDetail: action.payload,
        error: '',
      };
    case GET_MEAL_TYPE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_MEAL_TYPE:
      return {
        ...state,
        loading: false,
        mealDetail: [],
        error: [],
      };

    case GET_FOOD_MENU_REQUEST:
      return {...state, loading: true, error: ''};
    case GET_FOOD_MENU_SUCCESS:
      return {
        ...state,
        loading: false,
        foodMenuDetail: action.payload,
        error: '',
      };
    case GET_FOOD_MENU_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_FOOD_MENU:
      return {
        ...state,
        loading: false,
        foodMenuDetail: [],
        error: [],
      };

    case GET_STUDENT_DETAILS_REQUEST:
      return {...state, loading: false, error: ''};
    case GET_STUDENT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        studentDetail: action.payload,
        error: '',
      };
    case GET_STUDENT_DETAILS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_STUDENT_DETAILS:
      return {
        ...state,
        loading: false,
        studentDetail: [],
        error: [],
      };

    case CREATE_SUBSCRIPTION_ORDER_REQUEST:
      return {...state, loading: true, error: ''};
    case CREATE_SUBSCRIPTION_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        createSubscription: action.payload,
        error: '',
      };
    case CREATE_SUBSCRIPTION_ORDER__ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_SUBSCRIPTION_ORDER:
      return {
        ...state,
        loading: false,
        createSubscription: [],
        error: [],
      };

    case GET_CART_ITEM_REQUEST:
      return {...state, loading: true, error: ''};
    case GET_CART_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        getCartDetails: action.payload,
        error: '',
      };
    case GET_CART_ITEM_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_CART_ITEM:
      return {
        ...state,
        loading: false,
        getCartDetails: [],
        error: [],
      };

    case GET_PROFILE_DETAILS_REQUEST:
      return {...state, loading: true, error: ''};
    case GET_PROFILE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        getUserDetails: action.payload,
        error: '',
      };
    case GET_PROFILE_DETAILS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_PROFILE_DETAILS:
      return {
        ...state,
        loading: false,
        getUserDetails: [],
        error: [],
      };

    case GET_PROFILE_UPDATE_REQUEST:
      return {...state, loading: true, error: ''};
    case GET_PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        updateUserDetails: action.payload,
        error: '',
      };
    case GET_PROFILE_UPDATE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_PROFILE_UPDATE:
      return {
        ...state,
        loading: false,
        updateUserDetails: [],
        error: [],
      };

    case GET_UPLOAD_PHOTO_REQUEST:
      return {...state, loading: true, error: ''};
    case GET_UPLOAD_PHOTO_SUCCESS:
      return {
        ...state,
        loading: false,
        photoUpload: action.payload,
        error: '',
      };
    case GET_UPLOAD_PHOTO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case CLEAR_UPLOAD_PHOTO:
      return {
        ...state,
        loading: false,
        photoUpload: [],
        error: [],
      };

    case CREATE_STUDENT_DETAILS_REQUEST:
      return {...state, loading: true, error: ''};
    case CREATE_STUDENT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        createStudent: action.payload,
        error: '',
      };
    case CREATE_STUDENT_DETAILS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case CLEAR_CREATE_STUDENT_DETAILS:
      return {
        ...state,
        loading: false,
        createStudent: [],
        error: [],
      };

    case UPDATE_STUDENT_DETAILS_REQUEST:
      return {...state, loading: true, error: ''};
    case UPDATE_STUDENT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        updateStudent: action.payload,
        error: '',
      };
    case UPDATE_STUDENT_DETAILS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case CLEAR_UPDATE_STUDENT_DETAILS:
      return {
        ...state,
        loading: false,
        updateStudent: [],
        error: [],
      };

    case DELETE_STUDENT_DETAILS_REQUEST:
      return {...state, loading: true, error: ''};
    case DELETE_STUDENT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        deleteStudent: action.payload,
        error: '',
      };
    case DELETE_STUDENT_DETAILS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case CLEAR_DELETE_STUDENT_DETAILS:
      return {
        ...state,
        loading: false,
        deleteStudent: [],
        error: [],
      };

    case GET_STUDENT_SUBSCRIPTION_ORDER_REQUEST:
      return {...state, loading: true, error: ''};
    case GET_STUDENT_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        loading: false,
        getSubscriptionDetails: action.payload,
        error: '',
      };
    case GET_STUDENT_SUBSCRIPTION_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case CLEAR_GET_STUDENT_SUBSCRIPTION:
      return {
        ...state,
        loading: false,
        getSubscriptionDetails: [],
        error: [],
      };

    case GET_ORDER_DETAILS_REQUEST:
      return {...state, loading: true, error: ''};
    case GET_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        getSubscriptionOrders: action.payload,
        error: '',
      };
    case GET_ORDER_DETAILS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case CLEAR_GET_ORDER_DETAILS:
      return {
        ...state,
        loading: false,
        getSubscriptionOrders: [],
        error: [],
      };

    case ALL_STATE_CLEAR_REQUEST:
      return {
        ...state,
        loading: false,
        error: '',
        bannerDetail: [],
        mealDetail: [],
        foodMenuDetail: [],
        studentDetail: [],
        createSubscription: [],
        getCartDetails: [],
        getUserDetails: [],
        updateUserDetails: [],
        updateUserDetails: [],
        photoUpload: [],
        createStudent: [],
        updateStudent: [],
        deleteStudent: [],
        getSubscriptionOrders: [],
        getTransctionDetail: [],
      };

    case GET_TRANCTION_SUCCESS_REQUEST:
      return {...state, loading: true, error: ''};
    case GET_TRANCTION_SUCCESS_SUCCESS:
      return {
        ...state,
        loading: false,
        getTransctionDetail: action.payload,
        error: '',
      };
    case GET_TRANCTION_SUCCESS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case CLEAR_TRANCTION_SUCCESS_REQUEST:
      return {
        ...state,
        loading: false,
        getTransctionDetail: [],
        error: [],
      };

    case GET_PAYMENT_HISTORY_REQUEST:
      return {...state, loading: true, error: ''};
    case GET_PAYMENT_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        getPaymentHistory: action.payload,
        error: '',
      };
    case GET_PAYMENT_HISTORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case CLEAR_PAYMENT_HISTORY_REQUEST:
      return {
        ...state,
        loading: false,
        getPaymentHistory: [],
        error: [],
      };

    case GET_CANCEL_MEAL_TYPE_REQUEST:
      return {...state, loading: true, error: ''};
    case GET_CANCEL_MEAL_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        getCancelMealtype: action.payload,
        error: '',
      };
    case GET_CANCEL_MEAL_TYPE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case CLEAR_CANCEL_MEAL_TYPE:
      return {
        ...state,
        loading: false,
        getCancelMealtype: [],
        error: [],
      };

    case GET_DELETE_ACCOUNT_REQUEST:
      return {...state, loading: true, error: ''};
    case GET_DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        deleteAccountdetails: action.payload,
        error: '',
      };
    case GET_DELETE_ACCOUNT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case CLEAR_GET_DELETE_ACCOUNT:
      return {
        ...state,
        loading: false,
        deleteAccountdetails: [],
        error: [],
      };

    case GET_UPDATE_PASSWORD_REQUEST:
      return {...state, loading: true, error: ''};
    case GET_UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        getPasswordUpdate: action.payload,
        error: '',
      };
    case GET_UPDATE_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case CLEAR_GET_UPDATE_PASSWORD:
      return {
        ...state,
        loading: false,
        getPasswordUpdate: [],
        error: [],
      };

    case GET_DELETE_ITEMS_REQUEST:
      return {...state, loading: true, error: ''};
    case GET_DELETE_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        getItemdetails: action.payload,
        error: '',
      };
    case GET_DELETE_ITEMS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case CLEAR_GET_DELETE_ITEMS:
      return {
        ...state,
        loading: false,
        getItemdetails: [],
        error: [],
      };

    case GET_PACKCHARGIES_APPLY_REQUEST:
      return {...state, loading: true, error: ''};
    case GET_PACKCHARGIES_APPLY_SUCCESS:
      return {
        ...state,
        loading: false,
        getChargesApplyDetails: action.payload,
        error: '',
      };
    case GET_PACKCHARGIES_APPLY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case CLEAR_GET_PACKCHARGIES_APPLY:
      return {
        ...state,
        loading: false,
        getChargesApplyDetails: [],
        error: [],
      };

    case GET_BIRTHDAY_SETTING_REQUEST:
      return {...state, loading: true, error: ''};
    case GET_BIRTHDAY_SETTING_SUCCESS:
      return {
        ...state,
        loading: false,
        getBirthdaySetting: action.payload,
        error: '',
      };
    case GET_BIRTHDAY_SETTING_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case CLEAR_BIRTHDAY_SETTING_REQUEST:
      return {
        ...state,
        loading: false,
        getBirthdaySetting: [],
        error: [],
      };

    case GET_CREATE_BIRTDAYPARTY_REQUEST:
      return {...state, loading: true, error: ''};
    case GET_CREATE_BIRTDAYPARTY_SUCCESS:
      return {
        ...state,
        loading: false,
        createBirthdayParty: action.payload,
        error: '',
      };
    case GET_CREATE_BIRTDAYPARTY_FALIURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case CLEAR_CREATE_BIRTDAYPARTY_REQUEST:
      return {
        ...state,
        loading: false,
        createBirthdayParty: [],
        error: [],
      };

    case GET_CREATE_RATING_REQUEST:
      return {...state, loading: true, error: ''};
    case GET_CREATE_RATING_SUCCESS:
      return {
        ...state,
        loading: false,
        ratingFeedbackDetails: action.payload,
        error: '',
      };
    case GET_CREATE_RATING_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case CLEAR_RATING_REQUEST:
      return {
        ...state,
        loading: false,
        ratingFeedbackDetails: [],
        error: [],
      };
    default:
      return {...state};
  }
};

export default nonAuth;
