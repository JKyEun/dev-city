import React from "react";
import { useSelector } from "react-redux";
import "../../style/recruitBoard/Board.scss";

export default function Board() {
  const title = useSelector((state) => state.study.studyIntro);
  const skills = useSelector((state) => state.study.skills);
  const memberNum = useSelector((state) => state.study.memberNum);
  const createDate = useSelector((state) => state.study.createDate);

  return (
    <div className="study">
      {createDate}
      <hr />
      {memberNum.currentNum}/{memberNum.maxNum}
      <hr />
      Title : {title}
      <hr />
      Skill :{skills}
      <hr />
    </div>
  );
}
