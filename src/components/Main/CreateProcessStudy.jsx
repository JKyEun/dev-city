import React from 'react';
import { Link } from 'react-router-dom';
import '../../style/main.scss';

export default function CreateProcessStudy() {
  const jwtToken = localStorage.getItem('JWT');
  return (
    <>
      <div className="part2">
        <div className="minMax">
          <div className="text">
            <div className="mainText">스터디 생성하기</div>
            <div className="subText">
              마음에 드는 스터디가 없다면 직접 생성해보세요 <br />
              팀원을 모집하여 함께 발전해요
            </div>
            <div className="createLink">
              {jwtToken ? (
                <Link to={'/study/create'}> + 생성하기</Link>
              ) : (
                <Link to={'/signin'}> + 생성하기</Link>
              )}
            </div>
          </div>
        </div>
        <div className="size">
          <div className="minMax">
            <div className="flexBox">
              <div>
                <img src="/images/icon_step1.svg" alt="step.1" />
                <p>STEP.1</p>
                <p>스터디 생성하기</p>
              </div>
              <img src="/images/icon_next.svg" alt="" className="arrow" />
              <div>
                <img src="/images/icon_step2.svg" alt="step.2" />
                <p>STEP.2</p>
                <p>스터디 상세 설정하기</p>
              </div>
              <img src="/images/icon_next.svg" alt="" className="arrow" />
              <div>
                <img src="/images/icon_step3.svg" alt="step.3" />
                <p>STEP.3</p>
                <p>스터디 홍보하기</p>
              </div>
              <img src="/images/icon_next.svg" alt="" className="arrow" />
              <div>
                <img src="/images/icon_step4.svg" alt="step.4" />
                <p>STEP.4</p>
                <p>사람들과 공부하기</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
