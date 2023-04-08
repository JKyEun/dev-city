import { combineReducers } from "redux";
import study from "./modules/study";
import create_study from "./modules/create_study";

export default combineReducers({ study, create_study });
