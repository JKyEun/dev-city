import React from 'react';

export default function TodoListStatus({ data }) {
  const { todoList } = data;
  console.log(data);
  return (
    <div className="todo_status flexBox-start">
      <div className="todo_intro">
        <h3>할 일 목록</h3>
        <p className="todo_count">
          <span>{todoList?.length}</span>개 중에{' '}
          <span>
            {
              todoList?.filter((el) => {
                return el.isCompleted;
              })?.length
            }
          </span>
          개 완료됨
        </p>
      </div>
      <div className="todo_main">
        {todoList?.length === 0 ? (
          <p className="empty_todo">오늘 할 일을 설정해 주세요!</p>
        ) : (
          todoList?.map((el, idx) => (
            <div className="flexBox-start">
              <div className="checkDiv" key={`userTodo_${idx}`}>
                <span
                  className={el.isCompleted ? 'checkbox checked' : 'checkbox'}
                >
                  {el.isCompleted && (
                    <img
                      src="/images/icon_checked.svg"
                      alt="체크표시"
                      className="checkImg"
                    />
                  )}
                </span>
              </div>
              <div className="listContent">
                <p>{el.content}</p>
                <p>
                  {new Date(el?.date)?.getHours().toString().padStart(2, '0') +
                    ':' +
                    new Date(el?.date)
                      ?.getMinutes()
                      .toString()
                      .padStart(2, '0')}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
