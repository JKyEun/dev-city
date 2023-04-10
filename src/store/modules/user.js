const initState = {};

// Action Type 설정
const INIT = 'user/INIT';
const CREATE_TODO = 'user/CREATE_TODO';
const DELETE_TODO = 'user/DELETE_TODO';

// Action 생성 함수
export function init(payload) {
  return {
    type: INIT,
    payload,
  };
}

export function createTodo(payload) {
  return {
    type: CREATE_TODO,
    payload,
  };
}

export function removeTodo(payload) {
  return {
    type: DELETE_TODO,
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
    case CREATE_TODO:
      return {
        ...state,
        todoList: [...state.todoList, action.payload],
      };
    case DELETE_TODO:
      console.log(action.payload);
      return {
        ...state,
        todoList: [
          ...state.todoList.filter((el) => el.id !== action.payload.id),
        ],
      };
    default:
      return {
        ...state,
      };
  }
}
