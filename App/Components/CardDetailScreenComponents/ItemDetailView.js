import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import AppFonts from '../../constants/Fonts';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {Colors, ScaleSizeUtils} from '../../constants';
import moment from 'moment';

const ItemDetailView = ({
  title,
  counter,
  payment,
  confirmDelete,
  ids,
  student_name,
  expiryMessage,
  validStartDate,
  validEndDate,
}) => {
  return (
    <View style={styles.cardView}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.cardTitle}>{student_name}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../assets/date.png')}
            style={{width: 20, height: 20, tintColor: Colors.primary}}
          />
          <Text style={styles.cardTitle}>
            {moment(validStartDate).format('DD-MM-YYYY')} To
            <Text style={styles.cardTitle}>
              {' '}
              {moment(validEndDate).format('DD-MM-YYYY')}
            </Text>
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.cardTitle}>{`\u2023 ${title}`}</Text>
          <Text style={styles.cardPayment}>₹{payment}</Text>
        </View>

        {/* <View style={{ flexDirection: 'row' }}>
          //<Text style={styles.cardCounter}>{counter}</Text>
          <Text style={styles.cardPayment}>₹{payment}</Text>
        </View> */}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginStart: 10,
        }}>
        <Text style={{fontSize: 12, maxWidth: ScaleSizeUtils.DIMEN_LARGE_250}}>
          Note:- {expiryMessage}
        </Text>
        <TouchableOpacity
          style={{right: 10}}
          onPress={() => confirmDelete(ids)}>
          <Image
            source={require('../../assets/delete.png')}
            style={{width: 20, height: 20, tintColor: Colors.primary}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ItemDetailView;

const styles = StyleSheet.create({
  cardView: {
    borderWidth: 1,
    backgroundColor: Colors.white,
    marginHorizontal: 10,
    padding: 5,
    marginTop: 10,
    borderRadius: 10,
    borderColor: '#E8E8E8',
    elevation: 3,
  },
  cardTitle: {
    fontSize: RFPercentage(2),
    color: Colors.black,
    fontFamily: AppFonts.FONT_INTER_MEDIUM,
    padding: 10,
  },
  cardCounter: {
    fontSize: RFPercentage(2),
    color: Colors.black,
    fontFamily: AppFonts.FONT_INTER_REGULER,
    padding: 10,
  },
  cardPayment: {
    fontSize: RFPercentage(2),
    color: Colors.black,
    fontFamily: AppFonts.FONT_INTER_MEDIUM,
    padding: 10,
  },
});
