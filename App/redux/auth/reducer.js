import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  GET_TOKEN_REQUEST,
  GET_TOKEN_SUCCESS,
  GET_TOKEN_ERROR,
  CLEAR_LOGIN_USER,
  RESEND_OTP_REQUEST,
  RESEND_OTP__SUCCESS,
  RESEND_OTP__ERROR,
  CLEAR_RESEND_OTP,
  VERIFY_OTP__SUCCESS,
  VERIFY_OTP__ERROR,
  VERIFY_OTP_REQUEST,
  CLEAR_VERIFY_OTP,
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD__SUCCESS,
  FORGET_PASSWORD__ERROR,
  CLEAR_FORGET_PASSWORD,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD__SUCCESS,
  RESET_PASSWORD__ERROR,
  CLEAR_RESET_PASSWORD,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  CLEAR_REGISTER_USER,
  GET_PROFILE_DETAILS_REQUEST,
  GET_PROFILE_DETAILS_SUCCESS,
  GET_PROFILE_DETAILS_ERROR,
  CLEAR_PROFILE_DETAILS,
  GET_PROFILE_UPDATE_REQUEST,
  GET_PROFILE_UPDATE_SUCCESS,
  GET_PROFILE_UPDATE_ERROR,
  CLEAR_PROFILE_UPDATE,
  GET_CHANGE_PASSWORD_REQUEST,
  GET_CHANGE_PASSWORD_SUCCESS,
  GET_CHANGE_PASSWORD_ERROR,
  CLEAR_CHANGE_PASSWORD,
  GET_UPLOAD_PHOTO_REQUEST,
  GET_UPLOAD_PHOTO_SUCCESS,
  GET_UPLOAD_PHOTO_ERROR,
  CLEAR_UPLOAD_PHOTO,
  GET_SCHOOL_ERROR,
  GET_SCHOOL_SUCCESS,
  GET_SCHOOL_REQUEST,
  ALL_AUTH_STATE_CLEAR_REQUEST,
} from '../actionTypes';

const INIT_STATE = {
  loading: false,
  error: '',

  tokenDetail: [],
  schoolDetail: [],
  currentUser: [],
  registerUser: [],
  resendOTP: [],
  verifyOTP: [],
  forgetPass: [],
  resetPass: [],
  profileDetails: [],
  profileUpdate: [],
  photoUpload: [],
};

const authUser = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_TOKEN_REQUEST:
      return {...state, loading: true, error: ''};
    case GET_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        tokenDetail: action.payload,
        error: '',
      };
    case GET_TOKEN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case GET_SCHOOL_REQUEST:
      return {...state, loading: true, error: ''};
    case GET_SCHOOL_SUCCESS:
      return {
        ...state,
        loading: false,
        schoolDetail: action.payload,
        error: '',
      };
    case GET_SCHOOL_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case LOGIN_USER:
      return {...state, forgotUserMail: null, loading: true, error: ''};
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
        error: '',
      };
    case LOGIN_USER_ERROR:
      return {
        ...state,
        loading: false,
        currentUser: null,
        error: action.payload.message,
      };
    case CLEAR_LOGIN_USER:
      return {
        ...state,
        loading: false,
        currentUser: [],
        error: [],
      };

    case RESEND_OTP_REQUEST:
      return {...state, loading: true, error: ''};
    case RESEND_OTP__SUCCESS:
      return {
        ...state,
        loading: false,
        resendOTP: action.payload,
        error: '',
      };
    case RESEND_OTP__ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case CLEAR_RESEND_OTP:
      return {
        ...state,
        loading: false,
        resendOTP: [],
        error: [],
      };

    case VERIFY_OTP_REQUEST:
      return {...state, loading: true, error: ''};
    case VERIFY_OTP__SUCCESS:
      return {
        ...state,
        loading: false,
        verifyOTP: action.payload,
        error: '',
      };
    case VERIFY_OTP__ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case CLEAR_VERIFY_OTP:
      return {
        ...state,
        loading: false,
        verifyOTP: [],
        error: [],
      };

    case FORGET_PASSWORD_REQUEST:
      return {...state, loading: true, error: ''};
    case FORGET_PASSWORD__SUCCESS:
      return {
        ...state,
        loading: false,
        forgetPass: action.payload,
        error: '',
      };
    case FORGET_PASSWORD__ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case CLEAR_FORGET_PASSWORD:
      return {
        ...state,
        loading: false,
        forgetPass: [],
        error: [],
      };

    case RESET_PASSWORD_REQUEST:
      return {...state, loading: true, error: ''};
    case RESET_PASSWORD__SUCCESS:
      return {
        ...state,
        loading: false,
        resetPass: action.payload,
        error: '',
      };
    case RESET_PASSWORD__ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case CLEAR_RESET_PASSWORD:
      return {
        ...state,
        loading: false,
        resetPass: [],
        error: [],
      };

    case REGISTER_USER:
      return {...state, loading: true, error: ''};
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        registerUser: action.payload,
        error: '',
      };
    case REGISTER_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case CLEAR_REGISTER_USER:
      return {
        ...state,
        loading: false,
        registerUser: [],
        error: [],
      };

    case GET_PROFILE_DETAILS_REQUEST:
      return {...state, loading: true, error: ''};
    case GET_PROFILE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        profileDetails: action.payload,
        error: '',
      };
    case GET_PROFILE_DETAILS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case CLEAR_PROFILE_DETAILS:
      return {
        ...state,
        loading: false,
        profileDetails: [],
        error: [],
      };

    case GET_PROFILE_UPDATE_REQUEST:
      return {...state, loading: true, error: ''};
    case GET_PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        profileUpdate: action.payload,
        error: '',
      };
    case GET_PROFILE_UPDATE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case CLEAR_PROFILE_UPDATE:
      return {
        ...state,
        loading: false,
        profileUpdate: [],
        error: [],
      };

    case GET_CHANGE_PASSWORD_REQUEST:
      return {...state, loading: true, error: ''};
    case GET_CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        changePass: action.payload,
        error: '',
      };
    case GET_CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case CLEAR_CHANGE_PASSWORD:
      return {
        ...state,
        loading: false,
        changePass: [],
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

    case ALL_AUTH_STATE_CLEAR_REQUEST:
      return {
        ...state,
        loading: false,
        error: '',
        tokenDetail: [],
        schoolDetail: [],
        currentUser: [],
        registerUser: [],
        resendOTP: [],
        verifyOTP: [],
        forgetPass: [],
        resetPass: [],
        profileDetails: [],
        profileUpdate: [],
        photoUpload: [],
      };

    default:
      return {...state};
  }
};

export default authUser;
