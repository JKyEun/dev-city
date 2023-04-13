import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../style/recruitBoard/SubHeader.scss';
export default function SubHeader() {
  const studies = useSelector((state) => state.study.studies);
  const totalStudyNumber = () => {
    if (studies !== undefined) {
      return studies.length;
    }
  };
  return (
    <div className="subheader">
      <div className="subheader_text">
        <p>스터디</p>
        <p>
          <span>총 {totalStudyNumber()}개</span> | 다양한 스터디를 확인 해보세요
        </p>
      </div>
      <div className="subheader_createbutton">
        <Link to={'/study/create'}>스터디 생성하기</Link>
      </div>
    </div>
  );
}
