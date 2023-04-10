import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTodo, removeTodo } from '../../store/modules/user';
import axios from 'axios';

export default function TodoList({ selectedDate }) {
  const dispatch = useDispatch();
  const day = ['일', '월', '화', '수', '목', '금', '토'];
  const userInfo = useSelector((state) => state.user);
  const curDate =
    selectedDate.getFullYear().toString() +
    selectedDate.getMonth().toString() +
    selectedDate.getDate().toString();
  const todoToday = userInfo.todoList.filter(
    (el) =>
      new Date(el.date).getFullYear().toString() +
        new Date(el.date).getMonth().toString() +
        new Date(el.date).getDate().toString() ===
      curDate,
  );
  const todoInput = useRef();

  const addTodo = async (id, e) => {
    e.preventDefault();

    try {
      const newTodo = {
        id: Number(new Date()),
        isCompleted: false,
        content: todoInput.current.value,
        date: new Date().toString(),
      };
      const res = await axios.post(
        `http://localhost:4000/user/setlist/${id}`,
        newTodo,
      );
      console.log(res.data);
      dispatch(createTodo(newTodo));
    } catch (err) {
      console.error(err);
    }

    todoInput.current.value = '';
  };

  const deleteTodo = async (id, el) => {
    try {
      const todo = { id: el.id };
      const res = await axios.post(
        `http://localhost:4000/user/deletelist/${id}`,
        todo,
      );
      console.log(res.data);
      dispatch(removeTodo(todo));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="todoListWrap">
      <div className="leftSide">
        <span>
          {selectedDate.getMonth() + 1 + '월 ' + selectedDate.getDate() + '일'}
        </span>
        <div>{day[selectedDate.getDay()] + '요일'}</div>
      </div>
      <div className="rightSide">
        <form onSubmit={(e) => addTodo('jke', e)}>
          <input
            type="text"
            placeholder="할 일을 추가해주세요"
            ref={todoInput}
          />
          <img src="/images/icon_time.svg" alt="시간 설정" />
          <button>추가</button>
        </form>
        <ul>
          {todoToday.map((el, idx) => {
            console.log(el);
            return (
              <li key={idx}>
                <input type="checkbox" checked={el.isCompleted} />
                <span>{el.content}</span>
                <button className="modify">수정</button>
                <button
                  onClick={() => deleteTodo('jke', el)}
                  className="delete"
                >
                  삭제
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
