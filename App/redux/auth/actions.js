// eslint-disable-next-line import/no-cycle
import {
  LOGIN_USER,
  GET_TOKEN_REQUEST,
  CLEAR_LOGIN_USER,
  RESEND_OTP_REQUEST,
  CLEAR_RESEND_OTP,
  VERIFY_OTP_REQUEST,
  CLEAR_VERIFY_OTP,
  FORGET_PASSWORD_REQUEST,
  CLEAR_FORGET_PASSWORD,
  RESET_PASSWORD_REQUEST,
  CLEAR_RESET_PASSWORD,
  REGISTER_USER,
  CLEAR_REGISTER_USER,
  GET_PROFILE_DETAILS_REQUEST,
  CLEAR_PROFILE_DETAILS,
  GET_PROFILE_UPDATE_REQUEST,
  CLEAR_PROFILE_UPDATE,
  GET_CHANGE_PASSWORD_REQUEST,
  CLEAR_CHANGE_PASSWORD,
  GET_UPLOAD_PHOTO_REQUEST,
  CLEAR_UPLOAD_PHOTO,
  GET_SCHOOL_REQUEST,
  ALL_AUTH_STATE_CLEAR_REQUEST,
} from '../actionTypes';

export const getToken = data => ({
  type: GET_TOKEN_REQUEST,
  payload: data,
});

export const getSchool = () => ({
  type: GET_SCHOOL_REQUEST,
  payload: '',
});

export const loginUser = data => ({
  type: LOGIN_USER,
  payload: data,
});

export const clearUser = data => ({
  type: CLEAR_LOGIN_USER,
  payload: data,
});

export const resendCoderequest = data => ({
  type: RESEND_OTP_REQUEST,
  payload: data,
});

export const clearCoderequest = data => ({
  type: CLEAR_RESEND_OTP,
  payload: data,
});

export const verifyCoderequest = data => ({
  type: VERIFY_OTP_REQUEST,
  payload: data,
});

export const clearverifyCoderequest = data => ({
  type: CLEAR_VERIFY_OTP,
  payload: data,
});

export const forgotPassword = data => ({
  type: FORGET_PASSWORD_REQUEST,
  payload: data,
});

export const clearforgotPassword = data => ({
  type: CLEAR_FORGET_PASSWORD,
  payload: data,
});

export const resetPassword = data => ({
  type: RESET_PASSWORD_REQUEST,
  payload: data,
});

export const clearResetPassword = data => ({
  type: CLEAR_RESET_PASSWORD,
  payload: data,
});

export const registerUser = data => ({
  type: REGISTER_USER,
  payload: data,
});

export const clearRegisterUser = data => ({
  type: CLEAR_REGISTER_USER,
  payload: data,
});

export const getProfileData = data => ({
  type: GET_PROFILE_DETAILS_REQUEST,
  payload: data,
});

export const clearProfileData = data => ({
  type: CLEAR_PROFILE_DETAILS,
  payload: data,
});

export const getProfileUpdate = data => ({
  type: GET_PROFILE_UPDATE_REQUEST,
  payload: data,
});

export const cleargetProfileUpdate = data => ({
  type: CLEAR_PROFILE_UPDATE,
  payload: data,
});

export const getChangePassword = data => ({
  type: GET_CHANGE_PASSWORD_REQUEST,
  payload: data,
});

export const clearChangePassword = data => ({
  type: CLEAR_CHANGE_PASSWORD,
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

export const allAuthStateClearRequest = data => ({
  type: ALL_AUTH_STATE_CLEAR_REQUEST,
  payload: data,
});
