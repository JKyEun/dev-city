import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/insertInformationPage.scss';

export default function InsertInformationPage() {
  const navigate = useNavigate();

  return (
    <div className="insertInformationWrap">
      <h2>회원가입이 완료되었습니다</h2>
      <div className="intro">추가정보를 입력해주세요</div>
      <form>
        <div>
          <label for="nameInput">이름</label>
          <input id="nameInput" type="text" placeholder="이름을 입력해주세요" />
        </div>
        <div>
          <label for="nickNameInput">닉네임</label>
          <input
            id="nickNameInput"
            type="text"
            placeholder="닉네임을 입력해주세요"
          />
        </div>
        <div>
          <label for="emailInput">이메일</label>
          <input
            id="emailInput"
            type="text"
            placeholder="이메일을 입력해주세요"
          />
        </div>
        <div>
          <label for="githubInput">깃허브 주소</label>
          <input
            id="githubInput"
            type="text"
            placeholder="깃허브 주소를 입력해주세요"
          />
        </div>
        <div>
          <label for="fieldInput">관심분야</label>
          <input id="fieldInput" type="text" placeholder="관심분야 선택" />
        </div>
        <span className="explain">
          추가정보는 나의 도시에서 수정할 수 있습니다
        </span>
        <button className="submitBtn">작성완료</button>
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
