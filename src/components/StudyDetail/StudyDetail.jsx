import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import '../../style/studyDetail.scss';
import { fetchStudy, setStudy } from '../../store/modules/studyDetail';
import {
  CircularProgressbar,
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar';

export default function StudyDetail({ match }) {
  const [percent, setPercent] = useState({});
  const [elementContent, setElementContent] = useState([]);
  const study = useSelector((state) => state.studyDetail.study);
  const loading = useSelector((state) => state.studyDetail.loading);

  const dispatch = useDispatch();

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

      const isLeader = study.member.some(
        (member) => member.isLeader && member.memberId === currentUserId,
      );
      const updatedMember = {
        memberId: currentUserId,
        isLeader: false,
      };
      if (isLeader) {
        updatedMember.isLeader = true;
      }

      const response = await axios.put(
        `http://localhost:4000/study/update/${match.params.id}`,
        { updatedMember },
      );

      dispatch(
        setStudy({
          ...study,
          member: [...study.member, updatedMember],
          memberNum: {
            ...study.memberNum,
            currentNum: currentNum + 1, // 현재 참여 인원수 +1
          },
        }),
      );
      alert('스터디 참가 신청이 완료되었습니다.');
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  // useEffect(() => {
  //   if (study) {
  //     const content = [
  //       {
  //         title: `${study.studyName}`,
  //         createInfo: {
  //           leaderId: `${study.leaderId}`,
  //           field: `${study.field}`,
  //           createDate: `${study.createDate}`,
  //         },
  //         detail: [
  //           {
  //             subTitle: '스터디 소개',
  //             studyInfo: `${study.studyIntro}`,
  //           },
  //           {
  //             subTitle: '진행방식',
  //             studyInfo: `${study.studySystem}`,
  //           },
  //           {
  //             subTitle: '사용언어',
  //             studyInfo: `${study.skills.map((skill) => (
  //               <img
  //                 key={skill}
  //                 src={`/images/skill_icon/${skill}.svg`}
  //                 alt={`${skill}이미지`}
  //               />
  //             ))}`,
  //           },
  //           {
  //             subTitle: '스터디원',
  //             studyInfo: `${study.member.memberId}`,
  //           },
  //         ],
  //       },
  //     ];
  //     setElementContent(content);
  //   }
  // }, [study]);

  const handleValue = (e, key) => {
    if (e !== '') {
      setPercent({ ...percent, [key]: e });
    } else {
      setPercent({ ...percent, [key]: 'empty' });
    }
  };

  const perventage = Object.values(percent).filter((el) => {
    return el !== 'empty';
  });

  return (
    <div>
      {!loading && study && (
        <>
          <div className="minMax flexBox-between">
            <div className="box-studyInfo">
              <h4 className="goToHome">&lt; 스터디 홈으로 돌아가기</h4>
              <h1>{study.studyName}</h1>
              <Fragment>
                <h5>
                  {study.leaderId} | {study.field} |{' '}
                  {new Date(study.createDate).toLocaleDateString('ko-KR')}{' '}
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
                      {' '}
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
                      {' '}
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
                  </div>
                </div>
              </Fragment>
            </div>
            <div className="box-confirm">
              <div className="percent">
                <CircularProgressbarWithChildren
                  value={
                    perventage.length !== 0 ? (perventage.length / 5) * 100 : 0
                  }
                  // text={`${
                  //   perventage.length !== 0 ? (perventage.length / 5) * 100 : 0
                  // }%`}
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
                  <p className="percentText">
                    {study.memberNum.currentNum}
                    <span>/</span>
                    {study.memberNum.maxNum}
                  </p>
                </CircularProgressbarWithChildren>
                <p className="percentSubText">
                  {study.memberNum.maxNum}명 중 {study.memberNum.currentNum}명
                  모집됨{' '}
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
