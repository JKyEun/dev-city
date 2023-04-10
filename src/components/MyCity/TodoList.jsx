import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TodoList({ selectedDate }) {
  const day = ['일', '월', '화', '수', '목', '금', '토'];
  const [todoList, setTodoList] = useState({});
  const [loading, setLoading] = useState(true);

  const getUserInfo = async (id) => {
    try {
      const res = await axios.get(`http://localhost:4000/user/${id}`);
      setTodoList(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUserInfo('jke');
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
        <input type="text" placeholder="할 일을 추가해주세요" />
        <img src="/images/icon_time.svg" alt="시간 설정" />
        <button>추가</button>
        <ul>
          {!loading &&
            todoList.todoList.map((el, idx) => (
              <li key={idx}>
                <input type="checkbox" checked={el.isCompleted} />
                <span>{el.content}</span>
                <button className="modify">수정</button>
                <button className="delete">삭제</button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
