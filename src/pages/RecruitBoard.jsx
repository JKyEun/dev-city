import React from "react";
import "../style/recruitBoard/RecruitBoard.scss";
import Board from "../components/recruitBoard/Board";
import Sidebar from "../components/recruitBoard/Sidebar";
import SubHeader from "../components/recruitBoard/SubHeader";

export default function RecruitBoard() {
  return (
    <>
      <div className="inner">
        <div className="side">
          <Sidebar />
        </div>
        <div className="center">
          <SubHeader />
          <Board />
        </div>
      </div>
    </>
  );
}
