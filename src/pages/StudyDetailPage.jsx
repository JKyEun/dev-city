import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MemberBox from '../components/StudyDetail/MemberBox';
import DetailTab from '../components/StudyDetail/DetailTab';
import ModifyStudy from '../components/StudyDetail/ModifyStudy';
import { useDispatch, useSelector } from 'react-redux';
import { init } from '../store/modules/studyDetail';

export default function StudyDetailPage() {
  const { id } = useParams();
  const [isModifyMode, setIsModifyMode] = useState(false);
  const modifyStatus = useSelector((state) => state.studyDetail.editMode);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(init());
  }, []);
  return (
    <div className="minMax">
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
