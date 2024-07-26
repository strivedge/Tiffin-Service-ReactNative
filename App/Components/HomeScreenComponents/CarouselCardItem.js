import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Platform,
  Linking,
  Alert,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {Colors, ScaleSizeUtils} from '../../constants';
import AppFonts from '../../constants/Fonts';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Dimensions.get('window').width * 1;

const isValidURL = url => {
  return /^(http|https):\/\/[^ "]+$/.test(url) && /\.com$/.test(url);
};

const CarouselCardItem = ({item, index}) => {
  return (
    <View style={styles.container} key={index}>
      <ImageBackground
        source={{uri: item.image}}
        style={styles.image}
        resizeMode="contain">
        <View
          style={{
            marginTop: Platform.OS == 'ios' ? 40 : 20,
            marginHorizontal: 20,
          }}>
          <Text style={styles.header}>{item.title}</Text>
          <Text style={styles.body}>{item.discription}</Text>
        </View>
        {item?.url !== '' ? (
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              if (isValidURL(item?.url)) {
                Linking.openURL(item?.url);
              } else {
                Alert.alert('Invalid URL:', item?.url);
              }
            }}>
            <Text style={styles.more}>Know More</Text>
          </TouchableOpacity>
        ) : null}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: ScaleSizeUtils.DIMEN_LARGE_250,
    top: -12,
  },
  image: {
    width: ITEM_WIDTH,
    height: ScaleSizeUtils.DIMEN_LARGE_250,
  },
  header: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: RFPercentage(3.5),
    fontFamily: AppFonts.FONT_INTER_MEDIUM,
  },
  body: {
    color: Colors.white,
    textAlign: 'center',
    fontFamily: AppFonts.FONT_INTER_REGULER,
    fontSize: RFPercentage(2),
  },
  more: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: RFPercentage(2),
  },
  btn: {
    backgroundColor: '#34A853',
    alignSelf: 'center',
    borderRadius: 25,
    alignItems: 'center',
    position: 'absolute',
    padding: 10,
    bottom: Platform.OS == 'ios' ? 40 : 25,
    width: ScaleSizeUtils.LISTING_100 * 1.5,
  },
});

export default CarouselCardItem;
