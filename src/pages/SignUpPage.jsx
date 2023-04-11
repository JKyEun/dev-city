import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
  const navigate = useNavigate();
  const userIdInput = useRef('');
  const passwordInput = useRef('');
  const [isAccountValid, setIsAccountValid] = useState(false);

  const checkPassword = () => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (passwordRegex.test(passwordInput.current.value)) {
      setIsAccountValid(true);
    } else {
      setIsAccountValid(false);
    }
  };

  const addAccount = async (e) => {
    e.preventDefault();

    if (!isAccountValid) {
      passwordInput.current.value = '';
      return alert('비밀번호는 숫자와 영문 조합 8글자 이상이어야 합니다.');
    }

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
        alert('실패');
        console.log(`요청실패, status는 ${res.status}`);
      }
    } catch (err) {
      alert('회원가입에 실패했습니다. 백엔드 에러');
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
          placeholder="아이디를 입력하세요"
        />
        <input
          type="password"
          ref={passwordInput}
          placeholder="비밀번호를 입력하세요"
          onChange={checkPassword}
        />
        <button type="submit">회원가입</button>
      </form>
    </>
  );
}
