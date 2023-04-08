import React from "react";
import Board from "../components/recruitBoard/Board";
import Sidebar from "../components/recruitBoard/Sidebar";
import SubHeader from "../components/recruitBoard/SubHeader";

export default function RecruitBoard() {
  return (
    <>
      <div className="side">
        <Sidebar />
      </div>
      <SubHeader />
      <Board />
    </>
  );
}
