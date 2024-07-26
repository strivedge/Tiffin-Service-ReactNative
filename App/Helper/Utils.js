import {Alert} from 'react-native';
import * as yup from 'yup';
import NetInfo from '@react-native-community/netinfo';

export default class Utils {
  static isValidEmailAddress = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  };

  static validatePhoneNumber = enteredPhonenumber => {
    let reg = /^[0-9]{10}$/;
    if (reg.test(enteredPhonenumber) === false) {
      return false;
    } else {
      return true;
    }
  };
  static isPasswordValid = password => {
    let passwordTest = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{7,}$/;
    if (passwordTest.test(password) === false) {
      return false;
    } else {
      return true;
    }
  };
  static isNameValid = name => {
    let nameTest = /^[a-zA-Z ]{2,40}$/;
    if (nameTest.test(name) === false) {
      return false;
    } else {
      return true;
    }
  };
  static isSurNameValid = surname => {
    let nameTest = /^[a-zA-Z ]{2,40}$/;
    if (nameTest.test(surname) === false) {
      return false;
    } else {
      return true;
    }
  };
  static async isNetworkAvailable() {
    const response = await NetInfo.fetch();
    try {
      return response.isConnected;
    } catch {
      Alert.alert('Alert', 'Please Connect Your Internet Connections');
    }
  }
}
export const loginValidationSchema = yup.object().shape({
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Please enter 10 digit mobile number.')
    .required('Phone number is required'),
  password: yup
    .string()
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required')
    .matches(
      /^.*(?=.{8,})((?=.*[~!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Must contain 8 characters , One UpperCase, One LowerCase, One Number and One Special Character',
    ),
});

export const SignUpValidationSchema = yup.object().shape({
  name: yup.string().trim().required('Name is required'),
  surname: yup.string().trim().required('Surname is required'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required')
    .matches(
      /^.*(?=.{8,})((?=.*[~!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Must contain 8 characters , One UpperCase, One LowerCase, One Number and One Special Character',
    ),
  mobile: yup
    .string()

    .matches(/^[0-9]{10}$/, 'Please enter 10 digit mobile number.')
    .required('Mobile number is require'),
});

export const forgetpassValidationSchema = yup.object().shape({
  mobile: yup
    .string('Please enter 10 digit number')
    .trim()
    .required('Mobile number is require')
    .matches(/^[0-9]{10}$/, 'Please enter 10 digit mobile number.'),
});

export const resetPassValidationSchema = yup.object().shape({
  password: yup
    .string()

    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required')
    .matches(
      /^.*(?=.{8,})((?=.*[~!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Must contain 8 characters , One UpperCase, One LowerCase, One Number and One Special Character',
    ),
  confirmpassword: yup
    .string()
    .oneOf(
      [yup.ref('password'), null],
      'Your password and confirmation password do not match.',
    ),
});

export const addChildValidationSchema = yup.object().shape({
  fname: yup
    .string()
    .trim()
    .required('Full name is required')
    .matches(
      /^[a-zA-Z]+ [a-zA-Z]+$/,
      'Please enter your full name (first & last name).',
    ),
});

export const cardDetailsValidationSchema = yup.object().shape({
  cardNumber: yup.string().required('Credit card number is required'),
  // .test('creditCardNumber', 'Invalid credit card number', function (value) {
  //   // The regular expression for credit card validation
  //   const regex = /^(?:4[0-9]{12}(?:[0-9]{3})?|[5-9][0-9]{14})$/;
  //   if (!regex.test(value)) {
  //     return false;
  //   }

  //   // Determine the credit card type
  //   let cardType;
  //   if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(value)) {
  //     cardType = 'Visa';
  //   } else if (/^5[1-5][0-9]{14}$/.test(value)) {
  //     cardType = 'Mastercard';
  //   } else if (/^3[47][0-9]{13}$/.test(value)) {
  //     cardType = 'American Express';
  //   } else if (/^6(?:011|5[0-9]{2})[0-9]{12}$/.test(value)) {
  //     cardType = 'Discover';
  //   } else {
  //     cardType = null;
  //   }

  //   // Validate the credit card type
  //   if (cardType !== 'Visa') {
  //     return false;
  //   }

  //   return true;
  // }),
});

export const profileUpdateScreenSchema = yup.object().shape({
  name: yup.string().required('Name is required'),

  mobile: yup
    .string('Please enter 10 digit number')
    .required('mobile number is require'),
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email is Required'),
});
