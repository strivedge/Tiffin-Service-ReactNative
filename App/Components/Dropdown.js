import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {Dropdown} from 'react-native-searchable-dropdown-kj';

import {Colors} from '../constants';

const DropdownComponent = ({
  data,
  selectItemId,
  value,
  placeholder,
  disable,
}) => {
  // const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: Colors.primary}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        disable={disable}
        search
        maxHeight={300}
        labelField="name"
        valueField="id"
        placeholder={!isFocus ? placeholder : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          selectItemId(item);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
  },
  dropdown: {
    height: 60,
    borderColor: '#E8E8E8',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 8,
    backgroundColor: '#F6FDFF',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: RFPercentage(2.5),
    marginLeft: 5,
  },
  selectedTextStyle: {
    fontSize: RFPercentage(2.5),
    color: Colors.black,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
