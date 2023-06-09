import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStudy } from '../../store/modules/studyDetail';
import { useParams } from 'react-router-dom';
import '../../style/studyProfile.scss';
import { getUser, joinStudy } from '../../apis/user';
import { updateStudyInfo } from '../../apis/study';
import { removeRequest } from '../../apis/invite';

export default function ParticipationRequest({ userId }) {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const study = useSelector((state) => state.studyDetail.study);
  const dispatch = useDispatch();

  const getMemberInfo = async (id) => {
    try {
      const res = await getUser(id);
      setMember(() => res);
    } catch (err) {
      console.error(err);
    }
  };

  const acceptRequest = async () => {
    try {
      const currentNum = study.memberNum.currentNum;
      const maxNum = study.memberNum.maxNum;

      if (currentNum >= maxNum) {
        alert('최대 참여 인원에 도달하여 더 이상 수락할 수 없습니다.');
        return;
      }

      const currentUserId = member.userId;

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

      await updateStudyInfo(id, { updatedMember });
      await joinStudy({
        userId: currentUserId,
        studyId: id,
      });

      // request에서 제거해주기
      acceptRemoveRequest();
    } catch (err) {
      console.error(err);
    }
  };

  const acceptRemoveRequest = async () => {
    try {
      const currentUserId = member.userId;
      const removedRequest = study.request.filter((el) => el !== currentUserId);
      const currentNum = study.memberNum.currentNum;

      const updatedMember = {
        memberId: currentUserId,
        isLeader: false,
      };

      const newStudy = {
        ...study,
        request: removedRequest,
        member: [...study.member, updatedMember],
        memberNum: {
          ...study.memberNum,
          currentNum: currentNum + 1, // 현재 참여 인원수 +1
        },
      };

      if (currentNum + 1 === study.memberNum.maxNum) {
        newStudy.isClosed = true; // 최대 참여 인원에 도달하면 isClosed를 true로 설정
      }

      dispatch(setStudy(newStudy));

      const toRemoveId = {
        userId: currentUserId,
      };

      await removeRequest(id, toRemoveId);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMemberInfo(userId);
  }, []);

  const refuseRemoveRequest = async () => {
    try {
      const currentUserId = member.userId;
      const removedRequest = study.request.filter((el) => el !== currentUserId);

      const newStudy = {
        ...study,
        request: removedRequest,
      };

      dispatch(setStudy(newStudy));

      const toRemoveId = {
        userId: currentUserId,
      };

      await removeRequest(id, toRemoveId);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMemberInfo(userId);
  }, []);

  return (
    <div className="studyProfile">
      {member && (
        <>
          <img
            className="profilePhoto"
            src={
              member.profileImg
                ? member.profileImg
                : '/images/default-profile.png'
            }
            alt="프로필 사진"
            width="98"
            height="98"
          />

          <div className="nickNameStudy">
            {member?.nickName ? member.nickName : '닉네임 정보없음'}
          </div>
          <div className="userNameStudy">
            {member?.userName ? member.userName : '이름 정보없음'}
          </div>
          <div className="userFieldLevel">
            <span className="fieldStudy">{member.field}</span>
            <span className="levelStudy">Lv.{member.level}</span>
          </div>
          <div className="requestBtn">
            <button className="acceptBtn" onClick={acceptRequest}>
              수락
            </button>
            <button className="refuseBtn" onClick={refuseRemoveRequest}>
              거절
            </button>
          </div>
        </>
      )}
    </div>
  );
}
