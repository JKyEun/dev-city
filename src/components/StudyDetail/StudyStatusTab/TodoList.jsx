import React from 'react';

export default function TodoList({ data }) {
  const nickName = data.nickName;
  const userTodo = data.todoList;
  return (
    <>
      <div className="todo_intro">
        {nickName === '닉네임을 설정하세요'
          ? nickName
          : `${nickName}님의 오늘 할 일`}
      </div>

      {userTodo.length === 0 ? (
        <p>오늘 할 일을 설정해 주세요!</p>
      ) : (
        userTodo.map((el, idx) => (
          <div className="todo_main">
            <div className="checkDiv" key={`userTodo_${idx}`}>
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
            <div className="content"></div>
            {el.content}
          </div>
        ))
      )}
    </>
  );
}
