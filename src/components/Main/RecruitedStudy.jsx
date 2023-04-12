import React from 'react';
import RecentStudy from './RecentStudy';
import { Link } from 'react-router-dom';
import '../../style/main.scss';

export default function RecruitedStudy() {
  return (
    <>
      <div className="part1">
        <div className="minMax">
          <div className="text">
            <div className="mainText">모집 중인 스터디</div>
            <div className="subText">
              현재 진행중인 스터디를 확인하고 참여해보세요
            </div>
          </div>
          <div className="showStudy flexBox">
            {/* <RecentStudy /> */}
            <div className="plusStudy">
              <Link to={'/study'}>
                <img src="/images/icon_plus.svg" alt="스터디 더보기"></img>
                <div>더보기</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
