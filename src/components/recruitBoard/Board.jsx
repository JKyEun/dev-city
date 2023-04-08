import React from "react";
import { useSelector } from "react-redux";
import "../../style/recruitBoard/Board.scss";

export default function Board() {
  const title = useSelector((state) => state.study.studyIntro);

  return <div className="study">{title}</div>;
}
