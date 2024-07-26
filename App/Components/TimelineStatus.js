import moment from 'moment';
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import {Colors} from '../constants';
import AppFonts from '../constants/Fonts';

export default class TimelineExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          title: 'Order Confirmed',
          description: moment(props?.start_date).format('ddd ,DD MMM YY'),
        },
        {
          title: 'Order End-date',
          description: moment(props?.end_date).format('ddd ,DD MMM YY'),
        },
      ],
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Timeline
          circleSize={10}
          lineWidth={3}
          circleColor="#59A044"
          lineColor="#59A044"
          descriptionStyle={styles.description}
          titleStyle={{
            color: Colors.black,
            fontFamily: AppFonts.FONT_INTER_MEDIUM,
            fontSize: 14,
            marginTop: -10,
          }}
          style={styles.list}
          data={this.state.data}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  list: {
    left: -50,
    marginTop: 10,
  },

  description: {
    color: '#8A8A8A',
    fontSize: 14,
  },
});
