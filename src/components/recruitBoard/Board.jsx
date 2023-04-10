import { useSelector } from "react-redux";
import "../../style/recruitBoard/Board.scss";

export default function Board() {
  const studies = useSelector((state) => state.study.studies);
  console.log(studies);
  const studiesRender =
    studies !== undefined &&
    studies.map((el, idx) => {
      return (
        <div className="study" key={idx}>
          {el.memberNum.currentNum} / {el.memberNum.maxNum}
          <hr />
          {el.createDate}
          <hr />
          {el.studyIntro}
          <hr />
          {el.skills}
        </div>
      );
    });

  return <div className="study_board">{studiesRender}</div>;
}
