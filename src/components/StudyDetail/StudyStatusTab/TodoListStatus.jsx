import React from 'react';

export default function TodoListStatus({ data }) {
  const nickName = data.nickName;
  const userTodo = data.todoList;
  console.log(userTodo[0]);
  return (
    <>
      <div className="todo_intro">
        {nickName === ''
          ? '닉네임을 설정해주세요!'
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
            {el.date}
          </div>
        ))
      )}
    </>
  );
}
