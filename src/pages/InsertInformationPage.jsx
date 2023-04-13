import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/insertInformationPage.scss';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { updateUser } from '../store/modules/user';

export default function InsertInformationPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const nameInput = useRef();
  const nickNameInput = useRef();
  const emailInput = useRef();
  const githubInput = useRef();
  const fieldInput = useRef();

  const setUserInfo = async (e, id) => {
    e.preventDefault();

    const newInfo = {
      ...userInfo,
      userName: nameInput.current.value,
      nickName: nickNameInput.current.value,
      email: emailInput.current.value,
      githubAddress: githubInput.current.value,
      field: fieldInput.current.value,
    };

    try {
      const res = await axios.post(
        `http://localhost:4000/user/updateuser/${id}`,
        newInfo,
      );
      console.log(res.data);
      dispatch(updateUser(newInfo));
    } catch (err) {
      console.error(err);
    }
    
    navigate('/');
  };

  return (
    <div className="insertInformationWrap">
      <h2>회원가입이 완료되었습니다</h2>
      <div className="intro">추가정보를 입력해주세요</div>
      <form>
        <div>
          <label for="nameInput">이름</label>
          <input
            ref={nameInput}
            id="nameInput"
            type="text"
            placeholder="이름을 입력해주세요"
          />
        </div>
        <div>
          <label for="nickNameInput">닉네임</label>
          <input
            ref={nickNameInput}
            id="nickNameInput"
            type="text"
            placeholder="닉네임을 입력해주세요"
          />
        </div>
        <div>
          <label for="emailInput">이메일</label>
          <input
            ref={emailInput}
            id="emailInput"
            type="email"
            placeholder="이메일을 입력해주세요"
          />
        </div>
        <div>
          <label for="githubInput">깃허브 주소</label>
          <input
            ref={githubInput}
            id="githubInput"
            type="text"
            placeholder="깃허브 주소를 입력해주세요"
          />
        </div>
        <div>
          <label for="fieldInput">관심분야</label>
          <select
            ref={fieldInput}
            id="fieldInput"
            type="text"
            placeholder="관심분야 선택"
          >
            <option value="프론트엔드">프론트엔드</option>
            <option value="백엔드">백엔드</option>
            <option value="앱">앱</option>
            <option value="게임">게임</option>
            <option value="기획">기획</option>
          </select>
        </div>
        <span className="explain">
          추가정보는 나의 도시에서 수정할 수 있습니다
        </span>
        <button
          onClick={(e) => setUserInfo(e, localStorage.getItem('userId'))}
          className="submitBtn"
        >
          작성완료
        </button>
      </form>
      <div
        className="skip"
        onClick={() => {
          navigate('/');
        }}
      >
        건너뛰기
      </div>
    </div>
  );
}
