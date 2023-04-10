const initState = {};

// Action Type 설정
const INIT = 'user/INIT';

// Action 생성 함수
export function init(payload) {
  return {
    type: INIT,
    payload,
  };
}

// Reducer
export default function user(state = initState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}
