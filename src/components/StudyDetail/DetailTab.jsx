import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import StudyDetail from './StudyDetail';
import StudyBoard from './StudyBoard';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../style/detailTab.scss';

export default function DetailTab() {
  const { id } = useParams();
  // 현재 선택된 탭을 저장
  // 탭이 클릭될 때마다 업데이트
  const [tab, setTab] = useState('info');
  const location = useLocation();
  const study = useSelector((state) => state.studyDetail.study);

  useEffect(() => {
    location.search.includes('lo=board') && setTab('board');
  }, [location]);

  return (
    <div className="detailTab">
      <div className="detailTextBox">
        {study !== null && (
          <Link to={'/study'}>
            <img
              className="left-arrow"
              src="/images/left-arrow.svg"
              alt="left-arrow"
            />
            스터디홈으로 돌아가기
          </Link>
        )}
        <h1>{study?.studyName}</h1>
        <h5>
          {study?.nickName} | {study?.field} |{' '}
          {new Date(study?.createDate).toLocaleDateString('ko-KR')}
        </h5>
      </div>
      <ul className="flexBox detailTabBox">
        <li className={tab === 'info' ? 'onDetailPage' : ''}>
          <p onClick={() => setTab('info')}>기본 정보</p>
        </li>
        <li className={tab === 'board' ? 'onDetailPage' : ''}>
          <p onClick={() => setTab('board')}>게시판</p>
        </li>
        <li className={tab === 'currentLearning' ? 'onDetailPage' : ''}>
          <p onClick={() => setTab('currentLearning')}>학습 현황</p>
        </li>
      </ul>
      {tab === 'info' ? (
        <StudyDetail match={{ params: { id } }} />
      ) : tab === 'board' ? (
        <StudyBoard />
      ) : (
        <div></div>
        // <CurrentLearning />
      )}
    </div>
  );
}
