import { useSelector } from "react-redux";
import "../../style/recruitBoard/Board.scss";

export default function Board() {
  const studies = useSelector((state) => state.study.studies);
  console.log(studies)
  const studiesRender =
    studies !== undefined &&
    studies.map((el, idx) => {
      return (
        <div className="study" key={idx}>
          {el.memberNum.currentNum} / {el.memberNum.maxNum}
          <hr />
          {new Date(el.createDate).toISOString().substring(0,10)}
          <hr />
          {el.studyIntro}
          <hr />
          <img
                src={`/images/${el.skills[0]}.PNG`}
                alt={`${el.skill}이미지`}
              />
        </div>
      );
    });

  return <div className="study_board">{studiesRender}</div>;
}
