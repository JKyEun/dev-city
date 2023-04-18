import React from 'react';
import IndividualTodoLiEl from './IndividualTodoLiEl';

export default function IndividualTodoList({ selectedDate, individualInfo }) {
  const day = ['일', '월', '화', '수', '목', '금', '토'];
  const userInfo = individualInfo;
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

  return (
    <div className="todoListWrap">
      <div className="leftSide">
        <span>
          {selectedDate.getMonth() + 1 + '월 ' + selectedDate.getDate() + '일'}
        </span>
        <div>{day[selectedDate.getDay()] + '요일'}</div>
      </div>
      <div className="rightSide">
        <ul>
          {todoToday.length > 0 ? (
            todoToday?.map((el) => (
              <IndividualTodoLiEl
                key={el}
                el={el}
                selectedDate={selectedDate}
              />
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
