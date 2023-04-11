import { combineReducers } from 'redux';
import study from './modules/study';
import user from './modules/user';
import studyDetail from './modules/studyDetail';

export default combineReducers({ study, user, studyDetail });
