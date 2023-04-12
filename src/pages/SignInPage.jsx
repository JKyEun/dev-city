import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignInPage() {
  const KAKAO_CLIENT_ID = '8b9d9e6f2ac1ce6697298e70eb30186c';
  const KAKAO_REDIRECT_URI = 'http://localhost:3000/oauth/callback/kakao';
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
  // const KAKAO_LOGOUT_URI = 'http://localhost:3000';
  // const KAKAO_LOGOUT_URL = `https://kauth.kakao.com/oauth/logout?client_id=${KAKAO_CLIENT_ID}&logout_redirect_uri=${KAKAO_LOGOUT_URI}`;

  const navigate = useNavigate();
  const userIdInput = useRef('');
  const passwordInput = useRef('');

  const login = async (e) => {
    e.preventDefault();

    const account = {
      userId: userIdInput.current.value,
      password: passwordInput.current.value,
    };

    try {
      const res = await axios.post(
        `http://localhost:4000/user/signin`,
        account,
      );

      if (res.status === 200) {
        const data = res.data;
        console.log(data);
        localStorage.setItem('JWT', data.token);
        localStorage.setItem('userId', account.userId);
        window.location.reload();
        navigate('/');
      } else {
        alert('아이디 또는 비밀번호가 틀렸습니다.');
        console.log(`요청실패, status는 ${res.status}`);
      }
    } catch (err) {
      alert('백엔드 에러');
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
      <h1>로그인</h1>
      <form onSubmit={login} className="sign-form">
        <input
          type="text"
          ref={userIdInput}
          placeholder="아이디를 입력하세요"
        />
        <input
          type="password"
          ref={passwordInput}
          placeholder="비밀번호를 입력하세요"
        />
        <button type="submit">로그인</button>
      </form>
      <Link to={KAKAO_AUTH_URL}>카카오 로그인</Link>
    </>
  );
}
