import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudy, setStudy } from '../../store/modules/studyDetail';
import ParticipationRequest from './ParticipationRequest';
import StudyParticipants from './StudyParticipants';
import '../../style/studyDetail.scss';
import ModifyStudy from './ModifyStudy';
import { closeStudy, getStudyDetail } from '../../apis/study';

export default function StudyDetail({ match, studyDetail }) {
  const study = useSelector((state) => state.studyDetail.study);
  const loading = useSelector((state) => state.studyDetail.loading);
  const modifyStatus = useSelector((state) => state.studyDetail.editMode);

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
        const study = await getStudyDetail(match.params.id);

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

        // study 멤버가 꽉 차거나 이미 isClosed가 true 라면 isClosed를 true 로 바꾸기 (리덕스)
        const isClosed =
          study.memberNum.currentNum === study.memberNum.maxNum ||
          study.isClosed
            ? true
            : false;
        // 사람 꽉차면 백엔드 isClosed를 true로 바꾸기
        if (study.memberNum.currentNum === study.memberNum.maxNum) {
          await closeStudy(match.params.id);
        }
        dispatch(
          setStudy({
            ...study,
            canJoin: canJoin,
            isLeader: isLeader,
            isClosed: isClosed,
          }),
        );
      } catch (err) {
        console.error(err);
      }
    };
    fetchStudyData();
  }, [dispatch, match.params.id]);

  return (
    <div>
      {!loading && (
        <div className="studyDetailContainer">
          {modifyStatus ? (
            <ModifyStudy study={study} />
          ) : (
            <div className="studyInfoBox">
              <div className="studyDetail">
                <p className="subTitle">스터디 소개</p>
                <p className="studyInfoContent">{study?.studyIntro}</p>
              </div>
              <br />
              <br />
              <div className="studyDetail">
                <p className="subTitle">진행 방식</p>
                <p className="studyInfoContent">
                  {study?.studySystem
                    ? study?.studySystem
                    : '진행 방식 정보 없음'}
                </p>
              </div>
              <br />
              <br />
              <div className="studyDetail">
                <p className="subTitle">사용 언어</p>
                <p className="studyInfoContent">
                  {study?.skills?.map((skill) => {
                    if (skill === 'C#') {
                      skill = 'cSharp';
                    } else {
                      skill = skill.toLowerCase();
                    }
                    return (
                      <img
                        style={{ marginRight: '7px' }}
                        key={skill}
                        src={`/images/skill_icon/${skill}.svg`}
                        alt={`${skill}이미지`}
                      />
                    );
                  })}
                </p>
              </div>
              <br />
              <br />
              <div className="studyDetail">
                <p className="subTitle">스터디원</p>
                <div className="studyInfoContent studyMember-profile isMember">
                  {study?.member.map((e) => (
                    <StudyParticipants key={e} member={e} />
                  ))}
                </div>
              </div>
              <br />
              <br />
              <div className="studyDetail">
                {isLeader && <p className="subTitle">신청현황</p>}
                <div className="studyInfoContent studyMember-profile">
                  {isLeader && study?.request.length > 0 ? (
                    study?.request.map((el) => (
                      <ParticipationRequest key={el} userId={el} />
                    ))
                  ) : isLeader ? (
                    <p style={{ color: '#999999' }}>참가 신청 인원 없음</p>
                  ) : null}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
