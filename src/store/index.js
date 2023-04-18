import { combineReducers } from 'redux';
import chat from './modules/chat';
import study from './modules/study';
import user from './modules/user';
import studyDetail from './modules/studyDetail';

export default combineReducers({ chat, study, user, studyDetail });
