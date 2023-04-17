import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import '../../style/detailTab.scss';
import StudyDetail from './StudyDetail';
import StudyBoard from './StudyBoard';

export default function DetailTab() {
  const { id } = useParams();
  // 현재 선택된 탭을 저장
  // 탭이 클릭될 때마다 업데이트
  const [tab, setTab] = useState('info');
  const location = useLocation();

  useEffect(() => {
    location.search.includes('lo=board') && setTab('board');
  }, [location]);

  return (
    <div className="detailTab">
      <ul className="flexBox detailTabBox">
        <li className={tab === 'info' ? 'onDetailPage' : ''}>
          <p onClick={() => setTab('info')}>기본 정보</p>
        </li>
        <li className={tab === 'board' ? 'onDetailPage' : ''}>
          <p onClick={() => setTab('board')}>게시판</p>
        </li>
      </ul>
      {tab === 'info' ? (
        <StudyDetail match={{ params: { id } }} />
      ) : (
        <StudyBoard />
      )}
    </div>
  );
}
