import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {connect} from 'react-redux';
import {Colors} from '../../constants';
import AppFonts from '../../constants/Fonts';
import PrefManager from '../../Helper/PrefManager';
import {
  clearDeliveryDashboardReport,
  getDeliveryDashboardReport,
} from '../../redux/Delivery/actions';
import DropdownComponent from '../Dropdown';
import {SLIDER_WIDTH} from '../HomeScreenComponents/CarouselCardItem';
import NonAuthHeader from '../NonAuthHeader';
import ProgressLoader from '../ProgressLoader';
import {SLIDER_HIGHT} from '../VerificationComponets/VerificationComponets';

const DeliveryDashboardComponents = props => {
  const {
    navigation,
    getDeliveryDashboardReport,
    deliveryDashboardDetails,
    loading,
    deliveryDashboardSchool,
  } = props;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [schoolId, setSchoolId] = useState(0);

  useFocusEffect(
    React.useCallback(async () => {
      getUserDetails();
    }, [name, email]),
  );

  async function getUserDetails() {
    PrefManager.getValue('@name').then(name => {
      setName(name);
    });

    PrefManager.getValue('@email').then(email => {
      setEmail(email);
    });
  }

  const selectItemId = async item => {
    setSchoolId(item.id);

    const ids = await PrefManager.getValue('@id');
    getDeliveryDashboardReport(
      `?master_delivery_person_id=${ids}&school_id=${item.id}`,
    );
  };

  useEffect(() => {
    navigation.addListener('focus', pullDown);
    return () => {
      navigation.removeListener('focus', getUserDetails);
    };
  }, [navigation]);

  const pullDown = async () => {
    const ids = await PrefManager.getValue('@id');
    getDeliveryDashboardReport(`?master_delivery_person_id=${ids}`);
  };

  const renderitem = ({item, index}) => {
    return (
      <View style={styles.mainView}>
        <View
          style={[
            styles.card_View,
            {
              backgroundColor: item.color,
            },
          ]}>
          <ImageBackground
            source={require('../../assets/bubble.png')}
            style={{width: SLIDER_WIDTH / 2.3}}>
            <View style={{marginTop: 20, alignItems: 'center'}}>
              <Image
                source={{uri: item.icon}}
                style={{height: 40, width: 40}}
              />

              <Text style={styles.card_count}>{item.count}</Text>
              <Text numberOfLines={2} style={styles.card_title}>
                {item.title}
              </Text>
            </View>
          </ImageBackground>
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <NonAuthHeader
        title={'Dashboard'}
        isDrawer={true}
        navigation={navigation}
      />
      <ProgressLoader loading={loading} />

      <ScrollView>
        <View style={{flexDirection: 'row', marginLeft: 25, marginTop: 30}}>
          <View style={styles.headerView}>
            <Text style={styles.short_name}>
              {name
                .split(' ')
                .map(word => word.charAt(0))
                .join('')}
            </Text>
          </View>
          <View style={{alignSelf: 'center', marginLeft: 20}}>
            <Text style={styles.name_view}>{name}</Text>
            <Text style={styles.email_view}>{email}</Text>
          </View>
        </View>

        <DropdownComponent
          data={deliveryDashboardSchool}
          selectItemId={selectItemId}
          value={schoolId}
          placeholder="Select school"
        />
        <FlatList
          data={deliveryDashboardDetails}
          renderItem={renderitem}
          numColumns={2}
          style={{marginBottom: '25%'}}
        />
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.deliveryReducer.loading,
    deliveryDashboardDetails:
      state.deliveryReducer.deliveryDashboardDetails?.data,
    deliveryDashboardSchool:
      state.deliveryReducer.deliveryDashboardDetails?.schools,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getDeliveryDashboardReport: data => {
      dispatch(getDeliveryDashboardReport(data));
    },
    clearDeliveryDashboardReport: data => {
      dispatch(clearDeliveryDashboardReport(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeliveryDashboardComponents);

const styles = StyleSheet.create({
  headerView: {
    backgroundColor: Colors.green,
    borderRadius: 70,
    padding: 5,
    alignItems: 'flex-start',
  },
  short_name: {
    padding: 5,
    fontSize: RFPercentage(4),
    color: Colors.white,
  },
  name_view: {
    fontSize: RFPercentage(2.5),
    fontFamily: AppFonts.FONT_INTER_BOLD,
    color: 'black',
  },
  email_view: {
    fontSize: RFPercentage(2),
    fontFamily: AppFonts.FONT_INTER_MEDIUM,
    color: 'black',
  },
  card_View: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginHorizontal: 15,
    height: SLIDER_HIGHT / 3.5,
  },
  card_count: {
    fontSize: RFPercentage(2.5),
    fontFamily: AppFonts.FONT_INTER_BOLD,
    color: 'black',
    marginTop: 10,
    textAlign: 'center',
  },
  card_title: {
    maxWidth: 120,
    fontSize: RFPercentage(2.5),
    color: 'black',
    fontFamily: AppFonts.FONT_INTER_MEDIUM,
    textAlign: 'center',
  },
  mainView: {
    marginTop: '7%',
    paddingBottom: 15,
    width: SLIDER_WIDTH / 2,
  },
});
