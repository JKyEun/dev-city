import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function InsertInformationPage() {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        이름: <input type="text" />
      </div>
      <div>
        닉네임: <input type="text" />
      </div>
      <div>
        깃허브 주소: <input type="text" />
      </div>
      <div>
        이메일 주소: <input type="text" />
      </div>
      <div>
        관심 분야: <input type="text" />
      </div>
      <button
        onClick={() => {
          navigate('/');
        }}
      >
        건너뛰기
      </button>
      <button>저장하기</button>
    </div>
  );
}
