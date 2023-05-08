import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  convertChecked,
  modifyTodo,
  removeTodo,
} from '../../store/modules/user';
import { deleteTodoList, updateTodoList } from '../../apis/user';

export default function TodoLiEl({ el, selectedDate }) {
  const [isModifyMode, setIsModifyMode] = useState(false);
  const modifyInput = useRef(null);
  const timeInput = useRef(null);
  const date = new Date(el.date);
  const time =
    date.getHours().toString().padStart(2, '0') +
    ':' +
    date.getMinutes().toString().padStart(2, '0');
  const dispatch = useDispatch();

  const deleteTodo = async (id, el) => {
    const todo = { id: el.id };

    try {
      await deleteTodoList(id, todo);
      dispatch(removeTodo(todo));
    } catch (err) {
      console.error(err);
    }
  };

  const updateChecked = async (id, el) => {
    const updatedTodo = {
      id: el.id,
      isCompleted: !el.isCompleted,
      content: el.content,
      date: el.date,
    };

    try {
      updateTodoList(id, updatedTodo);
      dispatch(convertChecked(updatedTodo));
    } catch (err) {
      console.error(err);
    }
  };

  const updateTodo = async (id, el) => {
    const updatedTodo = {
      id: el.id,
      isCompleted: el.isCompleted,
      content: modifyInput.current.value,
      date: new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        timeInput.current.value.split(':')[0],
        timeInput.current.value.split(':')[1],
      ).toString(),
    };

    try {
      updateTodoList(id, updatedTodo);
      dispatch(modifyTodo(updatedTodo));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (modifyInput.current) modifyInput.current.value = el.content;
    if (timeInput.current) timeInput.current.value = time;
  });

  return (
    <li key={el.id}>
      <div
        onClick={() => updateChecked(localStorage.getItem('userId'), el)}
        className="checkDiv"
      >
        <span
          className={el.isCompleted ? 'checkbox checked' : 'checkbox'}
        ></span>
        {el.isCompleted && (
          <img
            src="/images/icon_checked.svg"
            alt="체크표시"
            className="checkImg"
          />
        )}
      </div>
      {isModifyMode ? (
        <>
          <form>
            <div
              style={{ display: 'inline-block' }}
              className="contentWrapInForm"
            >
              <input
                type="text"
                className="contentInForm"
                ref={modifyInput}
                autoFocus
              />
              <input ref={timeInput} type="time" className="timeInForm" />
            </div>
            <button
              className="modifyInForm"
              onClick={() => {
                setIsModifyMode((cur) => !cur);
                updateTodo(localStorage.getItem('userId'), el);
              }}
            >
              수정
            </button>
          </form>
          <button
            onClick={() => {
              deleteTodo(localStorage.getItem('userId'), el);
              setIsModifyMode(false);
            }}
            className="delete"
          >
            삭제
          </button>
        </>
      ) : (
        <>
          <div style={{ display: 'inline-block' }} className="contentWrap">
            <div className={el.isCompleted ? 'content complete' : 'content'}>
              {el.content}
            </div>
            <div className="time">{time}</div>
          </div>
          <button
            className="modify"
            onClick={() => setIsModifyMode((cur) => !cur)}
          >
            수정
          </button>
          <button
            onClick={() => deleteTodo(localStorage.getItem('userId'), el)}
            className="delete"
          >
            삭제
          </button>
        </>
      )}
    </li>
  );
}
