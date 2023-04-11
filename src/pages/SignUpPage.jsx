import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
  const navigate = useNavigate();
  const userIdInput = useRef('');
  const passwordInput = useRef('');

  const addAccount = async (e) => {
    e.preventDefault();

    const account = {
      userId: userIdInput.current.value,
      password: passwordInput.current.value,
    };

    try {
      const res = await axios.post(
        `http://localhost:4000/user/signup`,
        account,
      );

      if (res.status === 201) {
        navigate('/signin');
      } else {
        alert('회원가입에 실패했습니다. 다시 시도해주세요.');
        console.log(`요청실패, status는 ${res.status}`);
      }
    } catch (err) {
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
      console.error(`요청실패, 에러는 ${err}`);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('JWT') !== null) {
      navigate('/');
    }
  });

  return (
    <>
      <h1>회원 가입</h1>
      <form onSubmit={addAccount} className="sign-form">
        <input
          type="text"
          ref={userIdInput}
          placeholder="이메일을 입력하세요"
        />
        <input
          type="password"
          ref={passwordInput}
          placeholder="비밀번호를 입력하세요"
        />
        <button type="submit">회원가입</button>
      </form>
    </>
  );
}
