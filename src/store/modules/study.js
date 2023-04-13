// study 데이터 초기상태 설정
const initState = {
  studyName: '',
  studyIntro: '',
  field: '',
  skills: '',
  memberNum: '',
  member: '',
  board: '',
  structureImg: '',
  createDate: '',
  leaderId: '',
  loading: false,
  category: [],
  studies: [],
};

// Action Type 설정
const INIT = 'study/INIT';
const CREATE = 'study/CREATE';
const CHANGE_CATEGORY = 'study/CHANGE_CATEGORY';

// Action 생성 함수
export function init(payload) {
  return {
    type: INIT,
    payload: payload,
  };
}

export function create(payload) {
  return {
    type: CREATE,
    payload: payload,
  };
}

export function changeCategory(payload) {
  return {
    type: CHANGE_CATEGORY,
    payload: payload,
  };
}

// 리듀서
export default function study(state = initState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...state,
        studies: [...action.payload],
      };
    case CREATE:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    case CHANGE_CATEGORY:
      if (state.category.includes(action.payload)) {
        return {
          ...state,
          category: state.category.filter((el) => el !== action.payload),
        };
      }
      return { ...state, category: [...state.category, action.payload] };
    default:
      return state;
  }
}
