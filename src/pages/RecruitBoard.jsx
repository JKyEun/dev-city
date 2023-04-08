import React, { useEffect } from "react";
import "../style/recruitBoard/RecruitBoard.scss";
import Board from "../components/recruitBoard/Board";
import Sidebar from "../components/recruitBoard/Sidebar";
import SubHeader from "../components/recruitBoard/SubHeader";
import axios from "axios";
import { useDispatch } from "react-redux";
import { init } from "../store/modules/study";

export default function RecruitBoard() {
  const dispatch = useDispatch();

  // study 데이터 가져와서 state에 적용시키기
  const getStudyInfo = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/study/getdata`);
      dispatch(init(res.data[0]));
      console.log(res.data[0]);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getStudyInfo();
  });
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
