import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TodoList() {
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
      <div>
        <div>4월 9일</div>
        <div>일요일</div>
      </div>
      <div>
        <input type="text" placeholder="할 일을 추가해주세요" />
        <span>⏰</span>
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
