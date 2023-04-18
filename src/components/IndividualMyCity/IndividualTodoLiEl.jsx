import React from 'react';

export default function IndividualTodoLiEl({ el }) {
  const date = new Date(el.date);
  const time =
    date.getHours().toString().padStart(2, '0') +
    ':' +
    date.getMinutes().toString().padStart(2, '0');

  return (
    <li key={el.id}>
      <div
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

      <div style={{ display: 'inline-block' }} className="contentWrap">
        <div className={el.isCompleted ? 'content complete' : 'content'}>
          {el.content}
        </div>
        <div className="time">{time}</div>
      </div>
    </li>
  );
}
