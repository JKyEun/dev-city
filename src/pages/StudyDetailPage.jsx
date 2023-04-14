import React from 'react';
import { useParams } from 'react-router-dom';
import StudyDetail from '../components/StudyDetail/StudyDetail';
import StudyBoard from '../components/StudyDetail/StudyBoard';

export default function StudyDetailPage() {
  const { id } = useParams();
  return (
    <>
      <StudyDetail match={{ params: { id } }} />
      <StudyBoard />
    </>
  );
}
