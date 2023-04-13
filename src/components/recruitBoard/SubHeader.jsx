import React from 'react';
import { Link } from 'react-router-dom';
import '../../style/recruitBoard/SubHeader.scss';
export default function SubHeader() {
  return (
    <div className="subheader">
      <div className="subheader_text">
        <p>스터디</p>
        <p>총 ~~개 | 다양한 스터디를 확인 해보세요</p>
      </div>
      <div className="subheader_createbutton">
        <Link to={''}>스터디 생성하기</Link>
      </div>
    </div>
  );
}
