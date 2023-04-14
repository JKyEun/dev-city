import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/signUpPage.scss';

export default function SignUpPage() {
  const navigate = useNavigate();
  const userIdInput = useRef('');
  const passwordInput = useRef('');
  const pwRepeatInput = useRef('');
  const [isAccountValid, setIsAccountValid] = useState(false);
  const [isPwMatched, setIsPwMatched] = useState(false);

  const checkPassword = () => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
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
      const res = await axios.post(
        `http://localhost:4000/user/signup`,
        account,
      );

      const data = res.data;

      if (res.status === 201) {
        localStorage.setItem('JWT', data.token);
        localStorage.setItem('userId', account.userId);
        navigate('/information');
        window.location.reload();
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
    <div className="signUpWrap">
      <h2>회원가입</h2>
      <div className="intro">Dev-City에 오신 것을 환영합니다</div>
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

        <button className="signUpBtn" type="submit">
          회원가입
        </button>
      </form>
      <div className="returnLogin">로그인으로 돌아가기</div>
    </div>
  );
}
