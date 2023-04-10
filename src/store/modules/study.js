// study 데이터 초기상태 설정
const initState = {
  studyName: '',
  studyIntro: '',
  field: '',
  skills: '',
  memberNum: '',
};

// Action Type 설정
const INIT = 'study/INIT';
const CREATE = 'study/CREATE';

// Action 생성 함수
export function init(data) {
  return {
    type: INIT,
    payload: data,
  };
}
export function create(payload) {
  return {
    type: CREATE,
    payload: payload,
  };
}

// 리듀서
export default function study(state = initState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...state,
        studies: action.payload,
      };
    case CREATE:
      console.log(action.payload);
      return {
        ...state,
        studyName: action.payload.study_name,
        studyIntro: action.payload.study_intro,
        field: action.payload.study_field,
        skills: action.payload.skills,
        memberNum: action.payload.member_num,
      };
    default:
      return state;
  }
}
