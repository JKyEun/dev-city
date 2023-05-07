import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTodo } from '../../store/modules/user';
import TodoLiEl from './TodoLiEl';
import { setTodoList } from '../../apis/user';

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
  const timeInput = useRef();

  const setMidnight = () => {
    timeInput.current.value = '00:00';
  };

  const addTodo = async (id, e) => {
    e.preventDefault();
    if (todoInput.current.value === '') return;

    const newTodo = {
      id: Number(new Date()),
      isCompleted: false,
      content: todoInput.current.value,
      date: new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        timeInput.current.value.split(':')[0],
        timeInput.current.value.split(':')[1],
      ).toString(),
    };

    try {
      await setTodoList(id, newTodo);
      dispatch(createTodo(newTodo));
    } catch (err) {
      console.error(err);
    }

    todoInput.current.value = '';
  };

  useEffect(() => {
    setMidnight();
  }, []);

  return (
    <div className="todoListWrap">
      <div className="leftSide">
        <span>
          {selectedDate.getMonth() + 1 + '월 ' + selectedDate.getDate() + '일'}
        </span>
        <div>{day[selectedDate.getDay()] + '요일'}</div>
      </div>
      <div className="rightSide">
        <form onSubmit={(e) => addTodo(localStorage.getItem('userId'), e)}>
          <input
            type="text"
            placeholder="할 일을 추가해주세요"
            ref={todoInput}
          />
          <input type="time" ref={timeInput} />
          <button className="addBtn">추가</button>
        </form>
        <ul>
          {todoToday.length > 0 ? (
            todoToday?.map((el) => (
              <TodoLiEl key={el} el={el} selectedDate={selectedDate} />
            ))
          ) : (
            <div className="emptyTodo flexBox-center">
              추가된 할일이 없습니다
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}
