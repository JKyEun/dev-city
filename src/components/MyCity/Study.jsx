import React from "react";
import "../../style/study.scss";
export default function Study() {
  return (
    <div className="studyTab">
      <img src="/images/icon_bell.svg" />
      <div className="study-my">
        <div className="title">
          <h4>나의 스터디</h4>
          <div className="flexBox">
            <p className="totalCnt">총 {}개</p>
            <p>| 현재 참여중인 스터디 정보를 보여드릴게요</p>
          </div>
        </div>
      </div>
      <div className="study-like">
        <div className="title">
          <h4>관심 스터디</h4>
          <div className="flexBox">
            <p className="totalCnt">총 {}개</p>
            <p>| 관심있는 스터디 정보를 보여드릴게요</p>
          </div>
        </div>
      </div>
    </div>
  );
}
