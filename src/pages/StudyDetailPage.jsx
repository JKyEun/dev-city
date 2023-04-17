import React from 'react';
import { useParams } from 'react-router-dom';
import StudyDetail from '../components/StudyDetail/StudyDetail';
import StudyBoard from '../components/StudyDetail/StudyBoard';
import MemberBox from '../components/StudyDetail/MemberBox';
import DetailTab from '../components/StudyDetail/DetailTab';

export default function StudyDetailPage() {
  const { id } = useParams();
  return (
    <div className="minMax">
      <div className="flexBox-between-start">
        <DetailTab />
        <MemberBox match={{ params: { id } }} />
      </div>
    </div>
  );
}
