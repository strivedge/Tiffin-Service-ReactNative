import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const DatePicker = ({
  minimumDate,
  onChange,
  isVisible,
  mode,
  value,
  isClose,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDateChange = selectedDate => {
    // Handle date change for both setting the state and calling the onChange prop
    if (selectedDate !== undefined) {
      onChange(null, selectedDate); // Pass null as the event for consistency
    }

    // Hide the date picker for both platforms
    setShowDatePicker(false);
  };

  return (
    <View style={styles.container}>
      {isVisible && (
        <>
          {Platform.OS === 'ios' ? (
            <DateTimePickerModal
              isVisible={isVisible}
              mode={mode ? mode : 'date'}
              onConfirm={onDateChange}
              onCancel={isClose}
              minimumDate={minimumDate}
            />
          ) : (
            isVisible && (
              <DateTimePicker
                value={value ? value : new Date()}
                mode={mode ? mode : 'date'}
                display={'default'}
                is24Hour={false}
                onChange={onChange}
                style={styles.datePicker}
                minimumDate={minimumDate}
              />
            )
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
  pickedDateContainer: {
    padding: 20,
    backgroundColor: '#eee',
    borderRadius: 10,
    marginTop: 50,
  },
  pickedDate: {
    fontSize: 18,
    color: 'black',
  },
});

export default DatePicker;

// import React, { useState } from "react";
// import {
//   View,
//   StyleSheet,
//   Platform,
//   Dimensions,
//   Modal,
//   Text,
//   TouchableOpacity,
// } from "react-native";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import moment from "moment";
// import { Colors } from "../constants";
// import { SLIDER_HIGHT } from "./HomeScreenComponents/HomeScreenComponents";
// const { width, height } = Dimensions.get("window");

// const DatePicker = (props) => {
//   const {
//     isClose,
//     containerStyle,
//     onDateChange,
//     onRequestClose,
//     label,
//     isVisible,
//     onChange,
//     minimumDate,
//     maximumDate,
//     mode,
//     value,
//   } = props;
//   const [iosHeaderDate, setIosHeaderDate] = useState("");
//   return Platform.OS == "ios" ? (
//     <View style={[s.datePickerWrap]}>
//        {isVisible == true && (
//         <>
//              <TouchableOpacity
//               onPress={isClose}
//               style={{
//                 height: 30,
//                 width: "20%",
//                 justifyContent: "center",
//                 marginLeft: 30,
//                 backgroundColor: Colors.primary,
//                 borderRadius:5,
//                 alignSelf:"flex-end"

//               }}
//             >
//               <Text style={{ textAlign: "center", fontSize: 20,color:"white" }}>
//                 {"Cancel"}
//               </Text>
//             </TouchableOpacity>

//             {minimumDate == true ? (
//             <DateTimePicker
//               testID="dateTimePicker"
//               value={value ? value : new Date()}
//               mode={mode ? mode : "date"}
//               is24Hour={false}
//               display={Platform.OS === "ios" ? "spinner" : "default"}
//               minimumDate={minimumDate ? minimumDate : new Date()}
//                onChange={onChange}
//                textColor={"black"}
//             />
//           ) : (
//             <DateTimePicker
//               testID="dateTimePicker"
//               value={value ? value : new Date()}
//               mode={mode ? mode : "date"}
//               is24Hour={false}
//               display={Platform.OS === "ios" ? "spinner" : "default"}
//                minimumDate={minimumDate ? minimumDate : new Date()}
//               maximumDate={maximumDate ? maximumDate : new Date("01-01-3000")}
//               onChange={onChange}
//               textColor={"black"}

//             />
//           )}

//         </>
//       )}
//     </View>
//   ) : (
//     <>
//       {minimumDate ? (
//         <DateTimePicker
//           testID="dateTimePicker"
//           value={value ? value : new Date()}
//           mode={mode ? mode : "date"}
//           is24Hour={false}
//           display="default"
//           minimumDate={minimumDate}
//           style={{ flex: 1,color:"red" }}
//           onChange={onChange}
//         />
//       ) : (
//         <DateTimePicker
//           testID="dateTimePicker"
//           value={value ? value : new Date()}
//           mode={mode ? mode : "date"}
//           is24Hour={false}
//           display="default"
//           style={{ flex: 1 }}
//           onChange={onChange}
//         />
//       )}
//     </>
//   );
// };

// const s = StyleSheet.create({
//   datePickerWrap: {
//     height:SLIDER_HIGHT/2.5,
//      color: Colors.white,
//     },
//   datePicker: {
//     justifyContent: "center",
//     width: "100%",
//     height: 200,
//     borderBottomWidth: 1,
//     borderBottomColor: Colors.light_gray,
//   },

//   headerText: {
//     fontSize: 14,
//     color: Colors.black,
//   },
//   modalBackground: {
//     flex: 1,
//     alignItems: "center",
//     flexDirection: "column",
//     justifyContent: "space-around",
//     backgroundColor: "#00000010",
//   },
//   dateContainer: {
//     backgroundColor: Colors.white,
//     width: "80%",
//     minHeight: 100,
//     paddingBottom: 10,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
// export default DatePicker;
