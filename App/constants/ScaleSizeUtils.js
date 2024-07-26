import { Dimensions, Platform } from "react-native";
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
import { getLayoutSize } from "./ResponsiveHelper";

const ScaleSizeUtils = {
  PADDING_DEFAULT: getLayoutSize(15),
  PADDING_AUTH_BUTTON: getLayoutSize(13),
  MARGIN_TOP_AUTH_BUTTON: getLayoutSize(40),
  MARGIN_BOTTOM_REGISTER_TEXT: getLayoutSize(20),
  MARGIN_TEN: getLayoutSize(10),
  RADIUS_SELECTED_MENU_BACKGROUND_RIGHT: getLayoutSize(20),
  MENU_ICON_HEIGHT: getLayoutSize(25),
  HEIGHT_MENU_PROFILE_PICTURE: getLayoutSize(90),
  MARGIN_DEFAULT: getLayoutSize(20),
  MARGIN_DEAFULT_BOTTOM: getLayoutSize(30),

  MENU_APP_ICON: getLayoutSize(40),
  DRAWER_HEIGHT_MENU_PROFILE_PICTURE: getLayoutSize(70),
  PROFILE_PICTURE_MARGIN: getLayoutSize(25),
  MODE_ICON_HEIGHT: getLayoutSize(32),

  DIMEN_MARGIN_VERY_SMALL: getLayoutSize(2),
  DIMEN_MARGIN_SMALL: getLayoutSize(5),
  DIMEN_MARGIN_LARGE: getLayoutSize(20),
  DIMEN_MARGIN_EXTRA_LERGE: getLayoutSize(35),
  DIMENSTION_LARGE: getLayoutSize(55),

  DIMEN_LARGE: getLayoutSize(300),
  DIMEN_LARGE_350: getLayoutSize(350),

  DIMEN_LARGE_400: getLayoutSize(400),
  DIMEN_LARGE_250: getLayoutSize(250),
  DIMEN_MEDIUM: getLayoutSize(200),
  DIMEN_LARGE_MEDIUM: getLayoutSize(340),
  DIMEN_LARGE_MEDIUM_320: getLayoutSize(320),

  LISTING_100: getLayoutSize(100),

  LISTING_VERY_SMALL_SIZE: getLayoutSize(130),
  LISTING_SMALL_SIZE: getLayoutSize(140),
  LISTING_MEDIUM_SMALL_SIZE: getLayoutSize(150),
  LISTING_MEDIUM_LARGE_SIZE: getLayoutSize(160),
  LISTING_VERY_LARGE_SIZE: getLayoutSize(170),

  DATEPICKER_SIZE: getLayoutSize(-95),
  DATEPICKER_HEIGHT: getLayoutSize(-40),
  DATEPICKER_HEIGHT_20: getLayoutSize(-20),
};

export default ScaleSizeUtils;
