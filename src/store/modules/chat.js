// 초기 상태 정의
const initState = {
  nowChattingWith: null,
  isChatOpen: false,
  roomId: null,
  chatLog: [],
};

// 액션 타입 정의
const CONVERT_OPEN = 'chat/CONVERT_OPEN';
const SET_OTHERSIDE = 'chat/SET_OTHERSIDE';
const SET_ROOMID = 'chat/SET_ROOMID';
const SET_CHATLOG = 'chat/SET_CHATLOG';

// 액션 생성 함수 정의
export const convertOpen = () => ({
  type: CONVERT_OPEN,
});

export const setOtherSide = (payload) => ({
  type: SET_OTHERSIDE,
  payload,
});

export const setRoomId = (payload) => ({
  type: SET_ROOMID,
  payload,
});

export const setChatLog = (payload) => ({
  type: SET_CHATLOG,
  payload,
});

// 리듀서 정의
const chat = (state = initState, action) => {
  switch (action.type) {
    case CONVERT_OPEN:
      return {
        ...state,
        isChatOpen: !state.isChatOpen,
      };
    case SET_OTHERSIDE:
      return {
        ...state,
        nowChattingWith: action.payload,
      };
    case SET_ROOMID:
      return {
        ...state,
        roomId: action.payload,
      };
    case SET_CHATLOG:
      return {
        ...state,
        chatLog: action.payload,
      };
    default:
      return state;
  }
};

export default chat;
