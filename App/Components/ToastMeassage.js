import {style} from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import {Dimensions, StyleSheet} from 'react-native';
import AppFonts from '../constants/Fonts';
import TextFontSize from '../constants/TextFontSize';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {Colors} from '../constants';

const ToastMessage = messge => {
  showMessage({
    message: messge,
  });
};

export default ToastMessage;
