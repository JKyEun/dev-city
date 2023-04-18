import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import StudyDetail from '../components/StudyDetail/StudyDetail';
import StudyBoard from '../components/StudyDetail/StudyBoard';
import MemberBox from '../components/StudyDetail/MemberBox';
import DetailTab from '../components/StudyDetail/DetailTab';
import ModifyStudy from '../components/StudyDetail/ModifyStudy';
import { useSelector } from 'react-redux';

export default function StudyDetailPage() {
  const { id } = useParams();
  const [isModifyMode, setIsModifyMode] = useState(false);
  const modifyStatus = useSelector((state) => state.studyDetail.isModify);
  return (
    <div className="minMax">
      {/* <div className="flexBox-between-start">
        {modifyStatus ? <ModifyStudy /> : <DetailTab />}

        <MemberBox
          match={{ params: { id } }}
          setIsModifyMode={setIsModifyMode}
        />
      </div> */}

      <div className="flexBox-between-start">
        {modifyStatus ? (
          <ModifyStudy match={{ params: { id } }} />
        ) : (
          <>
            <DetailTab />
            <MemberBox
              match={{ params: { id } }}
              setIsModifyMode={setIsModifyMode}
            />
          </>
        )}
      </div>
    </div>
  );
}
