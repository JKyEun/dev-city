import React, { useEffect } from 'react';
import Board from '../components/recruitBoard/Board';
import Sidebar from '../components/recruitBoard/Sidebar';
import Category from '../components/recruitBoard/Category';
import SubHeader from '../components/recruitBoard/SubHeader';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { init } from '../store/modules/study';
import { useNavigate } from 'react-router-dom';
import '../style/recruitBoard/RecruitBoard.scss';
import { getStudy } from '../apis/study';

export default function RecruitBoard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // study 데이터 가져와서 state에 적용시키기
  const getStudyInfo = async () => {
    try {
      const res = getStudy();
      dispatch(init(res));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getStudyInfo();
  }, []);
  return (
    <>
      <div className="minMax">
        <div className="studyboard_subheader">
          <SubHeader />
        </div>
        <div className="studyboard_main">
          <div className="side">
            <Sidebar />
          </div>
          <div className="center">
            <Category />
            <Board />
          </div>
        </div>
      </div>
    </>
  );
}
