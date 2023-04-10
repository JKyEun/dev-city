import { useSelector } from 'react-redux';
import '../../style/recruitBoard/Board.scss';

export default function Board() {
  const studies = useSelector((state) => state.study.studies);
  console.log(studies);
  const studiesRender =
    studies !== undefined &&
    studies.map((el, idx) => {
      return (
        <div className="study" key={`study_${idx}`}>
          <div className="study_info-text">
            <div className="study_info-text-small">
              <div className="member_num">
                {el.memberNum.currentNum} / {el.memberNum.maxNum}
              </div>
              <div className="create_date">
                {new Date(el.createDate).toISOString().substring(0, 10)}
              </div>
            </div>
            <div className="study_intro">{el.studyIntro}</div>
          </div>
          <div className="study_info-skill">
            {el.skills.map((skill) => {
              return (
                <img
                  src={`/images/skill_icon/${skill}.svg`}
                  alt={`${skill}이미지`}
                />
              );
            })}
          </div>
        </div>
      );
    });

  return <div className="study_board">{studiesRender}</div>;
}
