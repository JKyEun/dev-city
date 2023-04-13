import React from 'react';
import ReadyStudy from '../../components/Main/ReadyStudy';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../../style/main.scss';

export default function RecruitedStudy() {
  const studies = useSelector((el) => el.study.studies);

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
            {studies?.map((item) => {
              return <ReadyStudy item={item} />;
            })}
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
