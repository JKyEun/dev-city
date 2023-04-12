import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import '../../style/detail.scss';
import { fetchStudy, setStudy } from '../../store/modules/studyDetail';

export default function StudyDetail({ match }) {
  const study = useSelector((state) => state.studyDetail.study);
  const loading = useSelector((state) => state.studyDetail.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchStudyData = async () => {
      try {
        dispatch(fetchStudy(match.params.id));
        const response = await axios.get(
          `http://localhost:4000/study/detail/${match.params.id}`,
        );
        dispatch(setStudy(response.data));
      } catch (err) {
        console.error(err);
      }
    };

    fetchStudyData();
  }, [dispatch, match.params.id]);

  // useEffect(() => {
  //   const fetchStudyData = async () => {
  //     try {
  //       dispatch(fetchStudy(match.params.id));
  //       const response = await axios.get(
  //         `http://localhost:4000/study/detail/${match.params.id}`,
  //       );
  //       const study = response.data;

  //       const currentUserMemberId = localStorage.getItem('userId');
  //       const isLeader =
  //         Array.isArray(study.member) &&
  //         study.member.some(
  //           (member) =>
  //             member.isLeader && member.memberId === currentUserMemberId,
  //         );
  //       const canJoin =
  //         !isLeader &&
  //         Array.isArray(study.member) &&
  //         !study.member.some(
  //           (member) => member.memberId === currentUserMemberId,
  //         );

  //       dispatch(
  //         setStudy({
  //           ...study,
  //           canJoin: canJoin,
  //           isLeader: isLeader,
  //         }),
  //       );
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   fetchStudyData();
  // }, [dispatch, match.params.id]);

  return (
    <div>
      {!loading && study && (
        <>
          <div className="minMax detailDiv">
            <div className="studyTop">
              <div>
                <h1>{study.studyName}</h1>
                <p>
                  닉네임 |{' '}
                  {study.createDate
                    ? new Date(study.createDate).toLocaleString()
                    : '날짜 정보 없음'}
                </p>
              </div>

              {/* 해당 스터디 가입 유무 */}
              <div>
                <button>참여하기</button>
                <a href="/">하트</a>
                <a href="/">수정</a>
                <a href="/">공유</a>
              </div>
            </div>

            <div className="studyContent">
              <h2>스터디 소개</h2>
              <br />
              <p>{study.studyIntro}</p>
            </div>
            <div className="skillsImg">
              {study.skills.map((skill) => (
                <img
                  key={skill}
                  src={`/images/skill_icon/${skill}.svg`}
                  alt={`${skill}이미지`}
                />
              ))}
            </div>
            <div className="studyMemberDiv">
              <h2>스터디 멤버</h2>
              <div className="studyMember">
                <div>멤버 1</div>
                <div>멤버 2</div>
                <div>멤버 3</div>
                <div>멤버 4</div>
                <div>멤버 5</div>
              </div>
            </div>
            <div className="commonGoal">
              <h2>공동목표</h2>
              <div>공동목표</div>
            </div>
            <div className="detailStudyBoard">
              <h2>스터디 게시판</h2>
              <div>스터디</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
