import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import NonAuthHeader from '../NonAuthHeader';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {Colors} from '../../constants';
import AppFonts from '../../constants/Fonts';
import PrefManager from '../../Helper/PrefManager';

const DeliveryCalendarComponents = props => {
  const {navigation} = props;
  const [selected, setSelected] = useState('');

  const handlechnage = date => {
    PrefManager.setValue('@select_Date', date);
    navigation.navigate('DeliveryHistoryScreen');
  };

  return (
    <View>
      <NonAuthHeader navigation={navigation} title="Calendar" isDrawer={true} />
      <View>
        <Calendar
          onDayPress={day => {
            handlechnage(day.dateString);
          }}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedDotColor: 'orange',
            },
          }}
          theme={{
            backgroundColor: Colors.white,
            calendarBackground: Colors.white,
            textSectionTitleColor: Colors.primary,
            textSectionTitleDisabledColor: Colors.primary,
            selectedDayBackgroundColor: Colors.primary,
            selectedDayTextColor: Colors.white,
            todayTextColor: Colors.black,
            dayTextColor: Colors.black,
            textDisabledColor: Colors.black,
            dotColor: Colors.primary,
            selectedDotColor: Colors.primary,
            arrowColor: Colors.primary,
            disabledArrowColor: Colors.primary,
            monthTextColor: Colors.black,
            indicatorColor: Colors.primary,
            textMonthFontFamily: AppFonts.FONT_INTER_MEDIUM,
            textDayHeaderFontFamily: AppFonts.FONT_INTER_MEDIUM,
            textDayFontFamily: AppFonts.FONT_INTER_MEDIUM,
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 14,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 14,
            sundaytextSectionTitleColor: 'red',
          }}
        />
      </View>
    </View>
  );
};

export default DeliveryCalendarComponents;

const styles = StyleSheet.create({});
