import React, {Component} from 'react';
import {
  View,
  Modal,
  Image,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import {
  DoubleCircleLoader,
  DotsLoader,
  TextLoader,
} from 'react-native-indicator';
import {Colors} from '../constants';
import Lottie from 'lottie-react-native';

export default class ProgressLoader extends Component {
  render() {
    return (
      <View style={styles.centeredView1}>
        <Modal
          transparent={true}
          animationType="none"
          statusBarTranslucent={true}
          visible={this.props.loading}
          onRequestClose={() => {
            /*this.props.dismissLoader()*/
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ActivityIndicator size="large" color={Colors.primary} />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centeredView1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
