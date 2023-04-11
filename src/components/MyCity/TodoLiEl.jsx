import React, { useEffect, useRef, useState } from 'react';

export default function TodoLiEl({ el, deleteTodo }) {
  const [isModifyMode, setIsModifyMode] = useState(false);
  const modifyInput = useRef(null);
  const date = new Date(el.date);
  const time =
    date.getHours().toString().padStart(2, '0') +
    ':' +
    date.getMinutes().toString().padStart(2, '0');

  // const updateTodoList = async () => {};

  const updateChecked = async () => {};

  useEffect(() => {
    if (modifyInput.current) modifyInput.current.value = el.content;
  });

  return (
    <li key={el.id}>
      <span
        className={el.isCompleted ? 'checkbox checked' : 'checkbox'}
        onClick={updateChecked}
      ></span>
      {isModifyMode ? (
        <>
          <div style={{ display: 'inline-block' }} className="contentWrap">
            <input
              type="text"
              className="content"
              ref={modifyInput}
              autoFocus
            />
            <div className="time">{time}</div>
          </div>
          <button
            className="modify"
            onClick={() => setIsModifyMode((cur) => !cur)}
          >
            수정
          </button>
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
            <div className="content">{el.content}</div>
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
