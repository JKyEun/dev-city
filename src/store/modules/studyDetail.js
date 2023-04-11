// 초기 상태 정의
const initState = {
  study: null,
  loading: false,
};

// 액션 타입 정의
const FETCH_STUDY = 'studyDetail/FETCH_STUDY';
const SET_STUDY = 'studyDetail/SET_STUDY';

// 액션 생성 함수 정의
export const fetchStudy = (id) => ({
  type: FETCH_STUDY,
  payload: id,
});

export const setStudy = (study) => ({
  type: SET_STUDY,
  payload: study,
});

// 리듀서 정의
const studyDetail = (state = initState, action) => {
  switch (action.type) {
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
      };
    default:
      return state;
  }
};

export default studyDetail;
