import React, { useState } from 'react';

export default function TodoLiEl({ el, idx, deleteTodo }) {
  // const [isModifyMode, setIsModifyMode] = useState(false);

  // const updateTodoList = async () => {};

  const updateChecked = async () => {};

  return (
    <li key={idx}>
      <span
        className={el.isCompleted ? 'checkbox checked' : 'checkbox'}
        onClick={updateChecked}
      ></span>
      <span>{el.content}</span>
      <span>시간</span>
      {/* <button className="modify" onClick={() => setIsModifyMode((cur) => !cur)}>
        수정
      </button> */}
      <button
        onClick={() => deleteTodo(localStorage.getItem('userId'), el)}
        className="delete"
      >
        삭제
      </button>
    </li>
  );
}
