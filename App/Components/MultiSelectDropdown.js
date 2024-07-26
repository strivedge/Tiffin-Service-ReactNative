import React, {useState} from 'react';
import {Alert, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {MultiSelect} from 'react-native-element-dropdown';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {Colors} from '../constants';

const MultiSelectComponent = props => {
  const {data, selectItemId, value} = props;
  const [selected, setSelected] = useState([]);
  const [isFocus, setIsFocus] = useState(false);

  const onSelectAll = isSelectAll => {
    const selectItem = [];
    if (isSelectAll) {
      data.map(item => {
        selectItem.push(item.id);
      });
    }
    setSelected(selectItem);
    selectItemId(selectItem);
  };

  const renderSelectAllIcon = () => {
    const isSelectAll = selected.length === data.length;

    return (
      <TouchableOpacity
        style={{height: 50}}
        onPress={() => onSelectAll(!isSelectAll)}>
        <Text
          style={{fontSize: RFPercentage(2.5), left: 20, color: Colors.black}}>
          {isSelectAll ? `UnSelect All` : 'Select All'}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <MultiSelect
        style={[styles.dropdown, isFocus && {borderColor: Colors.primary}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        itemTextStyle={{color: 'black', fontSize: RFPercentage(2.3)}}
        search
        data={data}
        activeColor="#f79a88"
        labelField="name"
        valueField="id"
        placeholder={props.placeholder}
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setSelected(item);
          selectItemId(item);
        }}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        selectedStyle={styles.selectedStyle}
        flatListProps={{ListHeaderComponent: renderSelectAllIcon}}
      />
    </View>
  );
};

export default MultiSelectComponent;

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
  placeholderStyle: {
    fontSize: RFPercentage(2.5),
    marginLeft: 5,
  },
  selectedTextStyle: {
    fontSize: RFPercentage(2.2),
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

  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.red,
  },
});
