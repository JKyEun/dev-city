import React, { useEffect } from 'react';
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

  return (
    <div>
      {!loading && study && (
        <>
          <div className="minMax">
            <div className="studyTop">
              <div>
                <h1>구조 수정하는 중~~~</h1>
                <h1>{study.studyName}</h1>
                <p>
                  닉네임 |{' '}
                  {study.createDate
                    ? new Date(study.createDate).toLocaleString()
                    : '날짜 정보 없음'}
                </p>
              </div>
              <div>
                <button>참여하기</button>
                <a href="/">하트</a>
              </div>
            </div>
            <div className="studyContent">
              <p>스터디 소개</p>
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
            <div className="studyMember">
              <p>스터디 멤버</p>
            </div>
            <div className="commonGoal">
              <p>공동목표</p>
            </div>
            <div className="studyBoard">
              <p>스터디 게시판</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
