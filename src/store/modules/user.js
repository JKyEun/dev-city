const initState = {};

// Action Type 설정
const INIT = 'user/INIT';
const CREATE_TODO = 'user/CREATE_TODO';
const REMOVE_TODO = 'user/REMOVE_TODO';
const CONVERT_CHECKED = 'user/CONVERT_CHECKED';
const MODIFY_TODO = 'user/MODIFY_TODO';

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
    type: REMOVE_TODO,
    payload,
  };
}

export function convertChecked(payload) {
  return {
    type: CONVERT_CHECKED,
    payload,
  };
}

export function modifyTodo(payload) {
  return {
    type: MODIFY_TODO,
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
    case REMOVE_TODO:
      return {
        ...state,
        todoList: [
          ...state.todoList.filter((el) => el.id !== action.payload.id),
        ],
      };
    case CONVERT_CHECKED:
      return {
        ...state,
        todoList: state.todoList.map((el) =>
          el.id === action.payload.id
            ? { ...el, isCompleted: !el.isCompleted }
            : el,
        ),
      };
    case MODIFY_TODO:
      return {
        ...state,
        todoList: state.todoList.map((el) =>
          el.id === action.payload.id ? { ...el, ...action.payload } : el,
        ),
      };
    default:
      return {
        ...state,
      };
  }
}
