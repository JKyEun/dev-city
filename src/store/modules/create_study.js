// 초기 상태
const initState = {
  studyName: "",
  studyIntro: "",
  field: "",
  skill: "",
  memberNum: "",
  isLogin: true, // 일단 true로 설정. true면 바로 뜸
};

// 액션 타입 설정
const CREATE = "create_study/CREATE";

export function create(payload) {
  return {
    type: CREATE,
    payload: payload,
  };
}

export default function create_study(state = initState, action) {
  switch (action.type) {
    case CREATE:
      return {
        ...state,
        studyName: action.payload.study_name,
        studyIntro: action.payload.study_intro,
        field: action.payload.study_field,
        skill: action.payload.skill,
        memberNum: action.payload.member_num,
        isLogin: true,
      };
    default:
      return state;
  }
}
