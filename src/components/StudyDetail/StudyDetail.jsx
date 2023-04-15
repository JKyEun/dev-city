import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import '../../style/studyDetail.scss';
import { fetchStudy, setStudy } from '../../store/modules/studyDetail';
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar';
import ParticipationRequest from './ParticipationRequest';

export default function StudyDetail({ match }) {
  const study = useSelector((state) => state.studyDetail.study);
  const loading = useSelector((state) => state.studyDetail.loading);
  const dispatch = useDispatch();
  const myMemberEl =
    study &&
    study.member.filter((el) => el.memberId === localStorage.getItem('userId'));
  const isLeader =
    myMemberEl && myMemberEl.length > 0 ? myMemberEl[0].isLeader : false;

  useEffect(() => {
    const fetchStudyData = async () => {
      try {
        dispatch(fetchStudy(match.params.id));
        // match.params.id로 스터디 상세 정보를 가져옴
        // match.params.id에 해당하는 스터디 정보는 response에
        const response = await axios.get(
          `http://localhost:4000/study/detail/${match.params.id}`,
        );

        const study = response.data;

        // 현재 사용자의 ID는 로컬스토리지에서 가져옴
        const currentUserId = localStorage.getItem('userId');
        // 현재 로그인한 ID와 (해당 스터디 멤버에 들어있는 memberId가 같거나, isLeader가 true면) isLeader는 true
        const isLeader = study.member?.find(
          (member) => member.memberId === currentUserId && member.isLeader,
        );

        // isLeader가 false면 리더가 아니고 study 컬렉션에 멤버 배열에서 memberId가 현재 로그인한 ID랑 다르면 멤버가 아니란 소리
        const canJoin =
          !isLeader &&
          !study.member?.some((member) => member.memberId === currentUserId);

        dispatch(
          setStudy({
            ...study,
            canJoin: canJoin,
            isLeader: isLeader,
          }),
        );
      } catch (err) {
        console.error(err);
      }
    };
    fetchStudyData();
  }, [dispatch, match.params.id]);

  // 참여하기
  const joinStudy = async () => {
    try {
      const currentUserId = localStorage.getItem('userId');
      const memberExists = study.member.some(
        (member) => member.memberId === currentUserId,
      );
      if (memberExists) {
        alert('이미 스터디에 참여한 멤버입니다.');
        return;
      }
      const maxNum = study.memberNum.maxNum;
      const currentNum = study.memberNum.currentNum;

      if (currentNum >= maxNum) {
        alert('스터디 최대 참여 인원을 초과하였습니다.');
        return;
      }

      const getRes = await axios.get(
        `http://localhost:4000/invite/get/${match.params.id}`,
      );

      const requestList = getRes.data.request;
      if (requestList.includes(currentUserId)) {
        alert('이미 참가신청이 완료되었습니다.');
        return;
      }

      const requestUser = {
        userId: currentUserId,
      };

      const addRes = await axios.post(
        `http://localhost:4000/invite/add/${match.params.id}`,
        requestUser,
      );

      console.log(addRes.data);

      const newStudy = {
        ...study,
        request: [...study.request, currentUserId],
      };

      dispatch(setStudy(newStudy));

      alert('스터디 참가 신청이 완료되었습니다.');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {!loading && study && (
        <>
          <div className="minMax flexBox-between">
            <div className="box-studyInfo">
              <h4 className="goToHome">
                <img
                  className="left-arrow"
                  src="/images/chevron-left-solid.svg"
                  alt="left-arrow"
                />
                스터디 홈으로 돌아가기
              </h4>
              <h1>{study.studyName}</h1>
              <Fragment>
                <h5>
                  {study.leaderId} | {study.field} |
                  {new Date(study.createDate).toLocaleDateString('ko-KR')}
                </h5>
                <div className="studyInfoBox">
                  <div className="flexBox">
                    <p className="subTitle">스터디 소개</p>
                    <p className="studyInfoContent"> {study.studyIntro}</p>
                  </div>
                  <br />
                  <br />
                  <div className="flexBox">
                    <p className="subTitle">진행 방식</p>
                    <p className="studyInfoContent">
                      {study.studySystem
                        ? study.studySystem
                        : '진행 방식 정보 없음'}
                    </p>
                  </div>
                  <br />
                  <br />
                  <div className="flexBox">
                    <p className="subTitle">사용 언어</p>
                    <p>
                      {study.skills.map((skill) => (
                        <img
                          key={skill}
                          src={`/images/skill_icon/${skill}.svg`}
                          alt={`${skill}이미지`}
                        />
                      ))}
                    </p>
                  </div>
                  <br />
                  <br />
                  <div className="flexBox">
                    <p className="subTitle">스터디원</p>
                    {/* 이걸 지우고 이곳에 스터디 멤버를 map으로 돌리시오 */}
                    {isLeader &&
                      study.request.map((el) => (
                        <ParticipationRequest key={el} userId={el} />
                      ))}
                  </div>
                </div>
              </Fragment>
            </div>
            <div className="box-confirm">
              <div className="percent">
                <CircularProgressbarWithChildren
                  value={
                    (`${study.memberNum.currentNum}` /
                      `${study.memberNum.maxNum}`) *
                    100
                  }
                  styles={
                    (buildStyles({
                      textSize: '16px',
                      textColor: '#605CFF',
                    }),
                    {
                      path: {
                        stroke: `#605CFF`,
                      },
                      text: {
                        // Text color
                        fill: '#605CFF',
                        // Text size
                        fontSize: '16px',
                        fontWeight: 700,
                      },
                    })
                  }
                >
                  {study.memberNum.currentNum === study.memberNum.maxNum ? (
                    <p className="percentText">모집 마감</p>
                  ) : (
                    <p className="percentText">
                      {study.memberNum.currentNum}
                      <span>/</span>
                      {study.memberNum.maxNum}
                    </p>
                  )}
                </CircularProgressbarWithChildren>
                <p className="percentSubText">
                  {study.memberNum.currentNum === study.memberNum.maxNum
                    ? '모집이 마감되었습니다.'
                    : `${study.memberNum.maxNum}명 중 ${study.memberNum.currentNum}명 모집됨`}
                </p>
              </div>
              <div>
                {study.isLeader ? (
                  <div>
                    <a className="btn btn--cancel">공유하기</a>
                    <a className="btn btn--create">수정하기</a>
                  </div>
                ) : study.member.some(
                    (member) =>
                      member.memberId === localStorage.getItem('userId'),
                  ) ? (
                  <div>
                    <a className="btn btn--cancel">공유하기</a>
                    <a className="btn btn--create">탈퇴하기</a>
                  </div>
                ) : (
                  <div>
                    <a className="btn btn--cancel">공유하기</a>
                    <a
                      className="btn btn--create"
                      onClick={joinStudy}
                      disabled={!study.canJoin}
                    >
                      참여하기
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
