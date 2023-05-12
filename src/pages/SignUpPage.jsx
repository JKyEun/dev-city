import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/signUpPage.scss';
import { signUp } from '../apis/user';
import { GITHUB_AUTH_URL, KAKAO_AUTH_URL } from '../utils/constant';

export default function SignUpPage() {
  const navigate = useNavigate();
  const userIdInput = useRef('');
  const passwordInput = useRef('');
  const pwRepeatInput = useRef('');
  const [isAccountValid, setIsAccountValid] = useState(false);
  const [isPwMatched, setIsPwMatched] = useState(true);

  const checkPassword = () => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W]{8,}$/;
    if (passwordRegex.test(passwordInput.current.value)) {
      setIsAccountValid(true);
    } else {
      setIsAccountValid(false);
    }

    if (passwordInput.current.value === pwRepeatInput.current.value) {
      setIsPwMatched(true);
    } else {
      setIsPwMatched(false);
    }
  };

  const addAccount = async (e) => {
    e.preventDefault();

    if (!isAccountValid) {
      passwordInput.current.value = '';
      pwRepeatInput.current.value = '';
      return alert('비밀번호는 숫자와 영문 조합 8글자 이상이어야 합니다.');
    }

    if (!isPwMatched) {
      passwordInput.current.value = '';
      pwRepeatInput.current.value = '';
      return alert('비밀번호가 일치하지 않습니다.');
    }

    const account = {
      userId: userIdInput.current.value,
      password: passwordInput.current.value,
    };

    try {
      const res = await signUp(account);
      const data = res.data;

      if (res.status === 201) {
        localStorage.setItem('JWT', data.token);
        localStorage.setItem('userId', account.userId);
        navigate('/information');
        window.location.reload();
      } else {
        alert('이미 존재하는 아이디입니다.');
        console.log(`요청실패, status는 ${res.status}`);
      }
    } catch (err) {
      alert('이미 존재하는 아이디입니다.');
      console.error(`요청실패, 에러는 ${err}`);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('JWT') !== null) {
      navigate('/');
    }
  });

  return (
    <div className="signUpWrap">
      <img src="/images/logo_deep.svg" alt="데브시티 로고" width="220" />
      <div className="intro">
        <strong>회원가입 |</strong> Dev-City에 오신것을 환영합니다
      </div>
      <form onSubmit={addAccount} className="sign-form">
        <div>
          <label for="idInput">
            아이디 <span>*</span>
          </label>
          <input
            id="idInput"
            type="text"
            ref={userIdInput}
            placeholder="아이디를 입력해주세요"
          />
        </div>
        <div className="pwInputWrap">
          <label for="pwInput">
            비밀번호 <span>*</span>
          </label>
          <input
            id="pwInput"
            type="password"
            ref={passwordInput}
            placeholder="비밀번호를 입력해주세요"
            onChange={checkPassword}
          />
        </div>
        <div>
          <div className="filler"> </div>
          <span className="valid">* 숫자, 영문 포함 8글자 이상</span>
        </div>
        <div>
          <label for="pwInputRepeat">
            비밀번호 확인 <span>*</span>
          </label>
          <input
            id="pwInputRepeat"
            type="password"
            ref={pwRepeatInput}
            placeholder="다시 한 번 입력해주세요"
            onChange={checkPassword}
          />
        </div>
        {!isPwMatched && (
          <div>
            <div className="filler"> </div>
            <span className="match">* 비밀번호가 일치하지 않습니다</span>
          </div>
        )}
        <button className="signUpBtn" type="submit">
          회원가입
        </button>
      </form>
      <hr />
      <Link to={KAKAO_AUTH_URL} className="kakaoBtn">
        <img src="/images/icon_kakao.svg" alt="카카오 아이콘" />
        카카오 회원가입
      </Link>
      <Link to={GITHUB_AUTH_URL} className="githubBtn">
        <img src="/images/icon_github.svg" alt="깃허브 아이콘" />
        깃허브 회원가입
      </Link>
    </div>
  );
}
