import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Platform,
  Image,
  StatusBar,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from '../constants';
import AppFonts from '../constants/Fonts';

const Texinput = props => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignContent: 'center',
      }}>
      <Text
        style={{
          color: 'black',
          left: 23,
          fontSize: 22,
          fontWeight: 'bold',
        }}>
        {props.lable}
      </Text>
      <View style={{width: '100%', alignSelf: 'center'}}>
        <TextInput
          {...props}
          ref={props.refs}
          secureTextEntry={props.isSecureActive === true ? true : false}
          placeholder={props.placeholder}
          value={props.value}
          placeholderTextColor={'grey'}
          autoCapitalize="none"
          returnKeyType={props.returnKeyType}
          onFocus={props.onFocus}
          numberOfLines={props.numberOfLines}
          onBlur={props.onBlur}
          onEndEditing={props.onEndEditing}
          editable={props.isDisbale}
          blurOnSubmit={props.blurOnSubmit}
          multiline={props.multiline}
          keyboardType={props.keyboardType}
          onSubmitEditing={props.onSubmitEditing}
          style={[
            styles.textInputContainer,
            {
              ...props.styles,
              borderRadius: 20,
              width: props.isPhone ? '60%' : '90%',
              borderColor: props.isFocus ? '#F94A29' : '#E8E8E8',
              backgroundColor: '#F6FDFF',
            },
          ]}
          onChangeText={text => {
            props.onTextChange(text);
          }}
        />

        <View
          style={{
            position: 'absolute',
            right: 40,
            alignSelf: 'center',
            alignItems: 'center',
            marginTop: 35,
          }}>
          {props.isSecure ? (
            <TouchableOpacity
              onPress={() => {
                props.ChangeActivationSecure();
              }}>
              {!props.isSecureActive ? (
                <Image
                  source={require('../assets/view.png')}
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: '#F94A29',
                    marginTop: -10,
                  }}
                />
              ) : (
                <Image
                  source={require('../assets/hidden.png')}
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: 'black',
                    marginTop: -10,
                  }}
                />
              )}
            </TouchableOpacity>
          ) : null}
          {props.isDate ? (
            <TouchableOpacity
              onPress={() => {
                props.DatePickerActive();
              }}>
              <Image
                source={require('../assets/date.png')}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: Colors.primary,
                  marginTop: -10,
                }}
              />
            </TouchableOpacity>
          ) : null}
          {props.isIcone ? (
            <Image
              source={require('../assets/search.png')}
              style={{
                width: 20,
                height: 20,
                tintColor: '#F94A29',
                marginTop: -10,
              }}
            />
          ) : null}
        </View>
      </View>
      {!!props.errorText && props.touched && (
        <Text style={styles.errorText}>{props.errorText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  iconHeader: {
    tintColor: '#484848',
  },
  errorText: {
    fontSize: 15,
    marginLeft: 35,
    marginTop: 5,
    color: '#FF0000',
  },
  hideShowText: {
    fontSize: 16,
    marginTop: 5,
    color: '#ff6efb',
  },
  textInputContainer: {
    color: 'black',
    borderWidth: 1,
    borderRadius: 35,
    marginTop: 5,
    paddingLeft: 15,
    width: '90%',
    alignSelf: 'center',
    paddingTop: Platform.OS === 'ios' ? 15 : 15,
    overflow: 'hidden',
    fontSize: 20,
    paddingBottom: Platform.OS === 'ios' ? 15 : 15,
    fontFamily: AppFonts.FONT_INTER_REGULER,
  },
  txtTitle: {
    color: 'black',
    paddingHorizontal: 20,
    marginBottom: -20,
    fontSize: 14,
  },
});

export default Texinput;
