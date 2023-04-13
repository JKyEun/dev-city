import { useSelector } from 'react-redux';
import '../../style/recruitBoard/Board.scss';
import ReadyStudy from '../Main/ReadyStudy';

export default function Board() {
  const studies = useSelector((state) => state.study.studies);
  const selectedCategory = useSelector((state) => state.study.category);
  const user = useSelector((state) => state.user.userId);
  const findCategory = (el) => {
    const intersectionArr = selectedCategory.filter((x) => el.includes(x));
    if (selectedCategory.length === 0) {
      return true;
    }
    if (intersectionArr.length === selectedCategory.length) {
      return true;
    } else {
      return false;
    }
  };

  const studiesRender =
    studies !== undefined &&
    studies.map((el, idx) => {
      if (findCategory(el.skills)) {
        return <ReadyStudy item={el} userId={user} />;
      }
    });

  return <div className="study_board">{studiesRender}</div>;
}
