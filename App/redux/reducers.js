import {combineReducers} from 'redux';
import authUser from '../redux/auth/reducer';
import nonAuth from '../redux/nonAuth/reducer';
import deliveryReducer from './Delivery/reducer';

const reducers = combineReducers({
  authUser,
  nonAuth,
  deliveryReducer,
});

export default reducers;
