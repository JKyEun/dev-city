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
  status: 'all',
};

// Action Type 설정
const INIT = 'study/INIT';
const CREATE = 'study/CREATE';
const CHANGE_CATEGORY = 'study/CHANGE_CATEGORY';
const SET_STATUS = 'study/SET_STATUS';

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

export function setStatus(payload) {
  return {
    type: SET_STATUS,
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
        category: [],
        status: 'all',
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
    case SET_STATUS:
      return {
        ...state,
        status: action.payload,
      };

    default:
      return state;
  }
}
