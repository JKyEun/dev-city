import { combineReducers } from 'redux';
import study from './modules/study';
import user from './modules/user';

export default combineReducers({ study, user });
