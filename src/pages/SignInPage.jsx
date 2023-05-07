import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/signInPage.scss';
import { signIn } from '../apis/user';
import { GITHUB_AUTH_URL, KAKAO_AUTH_URL } from '../utils/constant';

export default function SignInPage() {
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
      const res = await signIn(account);
      const data = res.data;

      if (res.status === 200) {
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
    <div className="signInWrap">
      <img src="/images/logo_deep.svg" alt="데브시티 로고" width="220" />
      <div className="intro">
        <strong>로그인 |</strong> Dev-City에 오신것을 환영합니다
      </div>
      <form onSubmit={login} className="sign-form">
        <input
          type="text"
          ref={userIdInput}
          placeholder="아이디를 입력해주세요"
          className="idInput"
        />
        <input
          type="password"
          ref={passwordInput}
          placeholder="비밀번호를 입력해주세요"
          className="pwInput"
        />
        <button className="loginBtn" type="submit">
          로그인
        </button>
      </form>
      <Link className="btn-line" to="/signup">
        Dev-City 가 처음이신가요?
      </Link>
      <hr />
      <Link to={KAKAO_AUTH_URL} className="kakaoBtn">
        <img src="/images/icon_kakao.svg" alt="카카오 아이콘" />
        카카오 로그인
      </Link>
      <Link to={GITHUB_AUTH_URL} className="githubBtn">
        <img src="/images/icon_github.svg" alt="깃허브 아이콘" />
        깃허브 로그인
      </Link>
    </div>
  );
}
