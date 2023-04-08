// study 데이터 초기상태 설정
const initState = {
  studyIntro: "",
  skills: [],
  memberNum: {},
  createDate: "",
};

// Action Type 설정
const INIT = "study/INIT";

// Action 생성 함수
export function init(data) {
  return {
    type: INIT,
    payload: data,
  };
}

// 리듀서
export default function study(state = initState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...state,
        studyIntro: action.payload.studyIntro,
        skills: action.payload.skills,
        memberNum: action.payload.memberNum,
        createDate: action.payload.createDate,
      };
    default:
      return state;
  }
}
