// 초기 상태 정의
const initState = {
  study: null,
  loading: false,
};

// 액션 타입 정의
const INIT = 'studyDetail/INIT';
const FETCH_STUDY = 'studyDetail/FETCH_STUDY';
const SET_STUDY = 'studyDetail/SET_STUDY';
const CLOSE_AND_OPEN_STUDY = 'studyDetail/CLOSE_AND_OPEN_STUDY';
const EDIT_MODE = 'studyDetail/EDIT_MODE';
const MODIFY_STUDY = 'studyDetail/MODIFY_STUDY';

// 액션 생성 함수 정의
export function init() {
  return {
    type: INIT,
  };
}

export const fetchStudy = (id) => ({
  type: FETCH_STUDY,
  payload: id,
});

export const setStudy = (study) => ({
  type: SET_STUDY,
  payload: study,
});

export const closeAndOpenStudy = (boolean) => ({
  type: CLOSE_AND_OPEN_STUDY,
  payload: boolean,
});

export const editMode = (boolean) => ({
  type: EDIT_MODE,
  payload: boolean,
});

export const modify = (payload) => ({
  type: MODIFY_STUDY,
  payload,
});

// 리듀서 정의
const studyDetail = (state = initState, action) => {
  switch (action.type) {
    case INIT:
      return {
        ...state,
        editMode: false,
      };
    case FETCH_STUDY:
      return {
        ...state,
        loading: true,
      };
    case SET_STUDY:
      return {
        ...state,
        study: action.payload,
        loading: false,
        editMode: false,
      };
    case CLOSE_AND_OPEN_STUDY:
      return {
        ...state,
        study: { ...state.study, isClosed: action.payload },
      };

    case EDIT_MODE:
      return {
        ...state,
        editMode: action.payload,
      };
    case MODIFY_STUDY:
      return {
        ...state,
        study: action.payload,
      };
    default:
      return state;
  }
};

export default studyDetail;
