import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/insertInformationPage.scss';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../store/modules/user';
import { updateUserInfo } from '../apis/user';

export default function InsertInformationPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const nameInput = useRef();
  const nickNameInput = useRef();
  const emailInput = useRef();
  const githubInput = useRef();
  const fieldInput = useRef();
  const phoneNumber = useRef();

  const setUserInfo = async (e, id) => {
    e.preventDefault();
    const regex = /^\d{3}\d{4}\d{4}$/;
    if (regex.test(phoneNumber?.current?.value)) {
      const newInfo = {
        ...userInfo,
        userName: nameInput?.current?.value,
        nickName: nickNameInput?.current?.value,
        email: emailInput?.current?.value,
        githubAddress: githubInput?.current?.value,
        field: fieldInput?.current?.value,
        phoneNumber: phoneNumber?.current?.value.replaceAll('-', ''),
      };

      try {
        await updateUserInfo(id, newInfo);
        dispatch(updateUser(newInfo));
      } catch (err) {
        console.error(err);
      }
      navigate('/');
    } else {
      alert('휴대폰 번호를 입력하세요');
    }
  };

  const setUserInfoGithub = async (e, id) => {
    e.preventDefault();

    const newInfoGithub = {
      ...userInfo,
      nickName: nickNameInput.current.value,
      field: fieldInput.current.value,
    };

    const newInfoGithubContainEmail = {
      ...userInfo,
      nickName: nickNameInput.current.value,
      field: fieldInput.current.value,
      email: emailInput.current?.value,
    };

    const newInfo = !userInfo.email ? newInfoGithubContainEmail : newInfoGithub;

    try {
      await updateUserInfo(id, newInfo);
      dispatch(updateUser(newInfoGithub));
    } catch (err) {
      console.error(err);
    }
    navigate('/');
  };

  return (
    <div className="insertInformationWrap">
      <img src="/images/logo_deep.svg" alt="데브시티 로고" width="220" />
      <div className="intro">
        <strong>회원가입 |</strong> 더 많은 서비스 이용을 위해 추가정보를
        입력해주세요
      </div>
      <form>
        <div>
          <label htmlFor="phoneNumberInput">
            휴대폰 번호<span className="require">*</span>
          </label>
          <input
            ref={phoneNumber}
            id="phoneNumber"
            type="tel"
            pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
            required
            placeholder="- 제외하여 입력해주세요"
          />
        </div>

        {userInfo.userName === '이름을 입력하세요' && (
          <div>
            <label htmlFor="nameInput">이름</label>
            <input
              ref={nameInput}
              id="nameInput"
              type="text"
              placeholder="이름을 입력해주세요"
            />
          </div>
        )}
        <div>
          <label htmlFor="nickNameInput">닉네임</label>
          <input
            ref={nickNameInput}
            id="nickNameInput"
            type="text"
            placeholder="닉네임을 입력해주세요"
          />
        </div>
        {(userInfo.email === '이메일을 설정하세요' ||
          userInfo.email === null) && (
          <div>
            <label htmlFor="emailInput">이메일</label>
            <input
              ref={emailInput}
              id="emailInput"
              type="email"
              oninvalid="this.setCustomValidity('Please select the item.')"
              oninput="this.setCustomValidity('Okay')"
              placeholder="이메일을 입력해주세요"
            />
          </div>
        )}

        {userInfo.userName === '이름을 입력하세요' && (
          <div>
            <label htmlFor="githubInput">깃허브 주소</label>
            <input
              ref={githubInput}
              id="githubInput"
              type="text"
              placeholder="깃허브 주소를 입력해주세요"
            />
          </div>
        )}
        <div>
          <label htmlFor="fieldInput">관심분야</label>
          <select
            ref={fieldInput}
            id="fieldInput"
            type="text"
            placeholder="관심분야 선택"
          >
            <option value="프론트엔드">프론트엔드</option>
            <option value="백엔드">백엔드</option>
            <option value="웹">웹</option>
            <option value="앱">앱</option>
            <option value="게임">게임</option>
            <option value="기획">기획</option>
            <option value="AI">AI</option>
            <option value="데이터 분석">데이터 분석</option>
            <option value="블록체인">블록체인</option>
            <option value="보안">보안</option>
            <option value="임베디드">임베디드</option>
            <option value="UX/UI">UX/UI</option>
          </select>
        </div>
        {userInfo.userName === '이름을 입력하세요' ? (
          <button
            onClick={(e) => setUserInfo(e, localStorage.getItem('userId'))}
            className="submitBtn"
          >
            작성완료
          </button>
        ) : (
          <button
            onClick={(e) =>
              setUserInfoGithub(e, localStorage.getItem('userId'))
            }
            className="submitBtn"
          >
            작성완료
          </button>
        )}
      </form>
      <div className="explain">추가정보는 나의 도시에서 수정할 수 있습니다</div>
    </div>
  );
}
