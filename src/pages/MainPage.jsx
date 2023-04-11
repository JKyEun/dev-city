import React from 'react';
import { Link } from 'react-router-dom';
import '../style/main.scss';
import RecentStudy from '../components/Main/RecentStudy';
export default function MainPage() {
  return (
    <>
      {/* 메인 */}
      <div className="mainTop">
        <div className="minMax">
          <div className="main flexBox">
            <div className="mainText">
              <div className="text">
                개발공부는
                <br /> 데브시티에서
              </div>
              <div className="mycityLink">
                <Link to={'/mycity'}>나의 도시 바로가기</Link>
              </div>
            </div>
            <img
              className="mycityImg"
              src="../images/mycity.svg"
              alt="도시이미지"
            />
          </div>
        </div>
      </div>
      {/* 모집 중인 스터디 */}
      <div className="studyRecruit">
        <div className="minMax">
          <div className="flexBox">
            <div className="subText">모집 중인 스터디</div>
            <p>
              <Link to={'/study'}>더보기+</Link>
            </p>
          </div>
          <div>
            <div className="flexBox">
              <RecentStudy />
            </div>
          </div>
        </div>
      </div>

      {/* 스터디 생성 프로세스 */}
      <div className="process">
        <div className="minMax">
          <div className="subText">스터디 생성 프로세스</div>
          <div className="flexBox">
            <div className="step">
              <img src="/images/step1.jpg" alt="" />
              <div className="title">STEP.1 스터디 생성하기</div>
              <p className="content">
                오른쪽 상단에 '스터디 생성하기' 버튼을 이용해서 생성해주세요
              </p>
            </div>
            <div className="step">
              <img src="/images/step2.jpg" alt="" />
              <div className="title">STEP.2 스터디 상세 설정하기</div>
              <p className="content">
                스터디 이름, 주제, 목적, 인원 수 등 스터디에 필요한 정보를
                입력하여 스터디를 생성합니다.
              </p>
            </div>
            <div className="step">
              <img src="/images/step3.png" alt="" />
              <div className="title">STEP.3 스터디 홍보하기</div>
              <p className="content">
                스터디 링크를 생성하고, 다른 사람들에게 공유합니다.sns, 커뮤니티
                등을 이용하여 홍보합니다.
              </p>
            </div>
            <div className="step">
              <img src="/images/step4.jpg" alt="" />
              <div className="title">STEP.4 사람들과 공부하기</div>
              <p className="content">
                스터디 규칙을 준수하며, 서로 도움을 주고 받으면서 스터디를
                진행합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* 추천친구 */}
      <div>
        <div className="minMax">
          <div className="subText">추천친구</div>
          <div>{/* <AllUsers /> */}</div>
        </div>
      </div>
    </>
  );
}
