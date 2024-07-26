import {
  ALL_STATE_CLEAR_REQUEST,
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
  CLEAR_PAYMENT_HISTORY_REQUEST,
  CLEAR_PROFILE_DETAILS,
  CLEAR_PROFILE_UPDATE,
  CLEAR_RATING_REQUEST,
  CLEAR_SUBSCRIPTION_ORDER,
  CLEAR_TRANCTION_SUCCESS_REQUEST,
  CLEAR_UPDATE_STUDENT_DETAILS,
  CLEAR_UPLOAD_PHOTO,
  CREATE_STUDENT_DETAILS_REQUEST,
  CREATE_SUBSCRIPTION_ORDER_REQUEST,
  DELETE_STUDENT_DETAILS_REQUEST,
  GET_BANNER_REQUEST,
  GET_BIRTHDAY_SETTING_REQUEST,
  GET_CANCEL_MEAL_TYPE_REQUEST,
  GET_CART_ITEM_REQUEST,
  GET_CREATE_BIRTDAYPARTY_REQUEST,
  GET_CREATE_RATING_REQUEST,
  GET_DELETE_ACCOUNT_REQUEST,
  GET_DELETE_ITEMS_REQUEST,
  GET_FOOD_MENU_REQUEST,
  GET_MEAL_TYPE_REQUEST,
  GET_ORDER_DETAILS_REQUEST,
  GET_PACKCHARGIES_APPLY_REQUEST,
  GET_PAYMENT_HISTORY_REQUEST,
  GET_PROFILE_DETAILS_REQUEST,
  GET_PROFILE_UPDATE_REQUEST,
  GET_STUDENT_DETAILS_REQUEST,
  GET_STUDENT_SUBSCRIPTION_ORDER_REQUEST,
  GET_SUBSCRIPTION_ORDER_REQUEST,
  GET_TRANCTION_SUCCESS_REQUEST,
  GET_UPDATE_PASSWORD_REQUEST,
  GET_UPLOAD_PHOTO_REQUEST,
  UPDATE_STUDENT_DETAILS_REQUEST,
} from '../actionTypes';

export const getDashboardbanner = data => ({
  type: GET_BANNER_REQUEST,
  payload: data,
});

export const getMealType = data => ({
  type: GET_MEAL_TYPE_REQUEST,
  payload: data,
});

export const getFoodMenu = data => ({
  type: GET_FOOD_MENU_REQUEST,
  payload: data,
});

export const clearFoodMenu = data => ({
  type: CLEAR_FOOD_MENU,
  payload: data,
});

export const getStudentDetatil = data => ({
  type: GET_STUDENT_DETAILS_REQUEST,
  payload: data,
});

export const createSubscriptionOrder = data => ({
  type: CREATE_SUBSCRIPTION_ORDER_REQUEST,
  payload: data,
});

export const clearSubscriptionOrder = data => ({
  type: CLEAR_SUBSCRIPTION_ORDER,
  payload: data,
});

export const getCartItem = data => ({
  type: GET_CART_ITEM_REQUEST,
  payload: data,
});

export const clearCartItem = data => ({
  type: CLEAR_CART_ITEM,
  payload: data,
});

export const getUseProfileDetails = data => ({
  type: GET_PROFILE_DETAILS_REQUEST,
  payload: data,
});

export const clearUseProfileDetails = data => ({
  type: CLEAR_PROFILE_DETAILS,
  payload: data,
});

export const updateUserProfileDetails = data => ({
  type: GET_PROFILE_UPDATE_REQUEST,
  payload: data,
});

export const clearUpdateProfileDetails = data => ({
  type: CLEAR_PROFILE_UPDATE,
  payload: data,
});

export const getUploadPhotos = data => ({
  type: GET_UPLOAD_PHOTO_REQUEST,
  payload: data,
});

export const clearUploadPhotos = data => ({
  type: CLEAR_UPLOAD_PHOTO,
  payload: data,
});

export const createStudentDetails = data => ({
  type: CREATE_STUDENT_DETAILS_REQUEST,
  payload: data,
});

export const clearCreateStudentDetails = data => ({
  type: CLEAR_CREATE_STUDENT_DETAILS,
  payload: data,
});

export const editStudentDetails = data => ({
  type: UPDATE_STUDENT_DETAILS_REQUEST,
  payload: data,
});

export const clearEditStudentDetails = data => ({
  type: CLEAR_UPDATE_STUDENT_DETAILS,
  payload: data,
});

export const deleteStudentDetails = data => ({
  type: DELETE_STUDENT_DETAILS_REQUEST,
  payload: data,
});

export const clearDeleteStudentDetails = data => ({
  type: CLEAR_DELETE_STUDENT_DETAILS,
  payload: data,
});

export const getStudentSubscriptionOrder = data => ({
  type: GET_STUDENT_SUBSCRIPTION_ORDER_REQUEST,
  payload: data,
});

export const clearGetStudentSubscriptionOrder = data => ({
  type: CLEAR_GET_STUDENT_SUBSCRIPTION,
  payload: data,
});

export const getOrderDetailsRequest = data => ({
  type: GET_ORDER_DETAILS_REQUEST,
  payload: data,
});

export const clearOrderDetailsRequest = data => ({
  type: CLEAR_GET_ORDER_DETAILS,
  payload: data,
});

export const allStateClearRequest = data => ({
  type: ALL_STATE_CLEAR_REQUEST,
  payload: data,
});

export const getTranctionSuccessAPI = data => ({
  type: GET_TRANCTION_SUCCESS_REQUEST,
  payload: data,
});

export const clearTranctionSuccessAPI = data => ({
  type: CLEAR_TRANCTION_SUCCESS_REQUEST,
  payload: data,
});

export const getPaymentHistory = data => ({
  type: GET_PAYMENT_HISTORY_REQUEST,
  payload: data,
});

export const clearPaymentHistory = data => ({
  type: CLEAR_PAYMENT_HISTORY_REQUEST,
  payload: data,
});

export const getCancelMealtype = data => ({
  type: GET_CANCEL_MEAL_TYPE_REQUEST,
  payload: data,
});

export const clearCancelMealtype = data => ({
  type: CLEAR_CANCEL_MEAL_TYPE,
  payload: data,
});

export const getAccountDeleteRequest = data => ({
  type: GET_DELETE_ACCOUNT_REQUEST,
  payload: data,
});

export const clearAccountDeleteRequest = data => ({
  type: CLEAR_GET_DELETE_ACCOUNT,
  payload: data,
});

export const getUpdatePasswordRequest = data => ({
  type: GET_UPDATE_PASSWORD_REQUEST,
  payload: data,
});

export const clearUpdatePasswordRequest = data => ({
  type: CLEAR_GET_UPDATE_PASSWORD,
  payload: data,
});

export const getDeleteItemRequest = data => ({
  type: GET_DELETE_ITEMS_REQUEST,
  payload: data,
});

export const clearDeleteItemRequest = data => ({
  type: CLEAR_GET_DELETE_ITEMS,
  payload: data,
});

export const getHandleChargesTotalRequest = data => ({
  type: GET_PACKCHARGIES_APPLY_REQUEST,
  payload: data,
});

export const clearHandleChargesTotalRequest = data => ({
  type: CLEAR_GET_PACKCHARGIES_APPLY,
  payload: data,
});

export const getBirthDaySettingRequest = data => ({
  type: GET_BIRTHDAY_SETTING_REQUEST,
  payload: data,
});

export const clearBirthDaySettingRequest = data => ({
  type: CLEAR_BIRTHDAY_SETTING_REQUEST,
  payload: data,
});

export const getCreateBirthdayPartyRequest = data => ({
  type: GET_CREATE_BIRTDAYPARTY_REQUEST,
  payload: data,
});

export const clearCreateBirthdayPartyRequest = data => ({
  type: CLEAR_CREATE_BIRTDAYPARTY_REQUEST,
  payload: data,
});

export const getRatingFeedbackRequest = data => ({
  type: GET_CREATE_RATING_REQUEST,
  payload: data,
});

export const clearRatingFeedbackRequest = data => ({
  type: CLEAR_RATING_REQUEST,
  payload: data,
});
