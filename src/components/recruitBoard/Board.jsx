import { useSelector } from 'react-redux';
import '../../style/recruitBoard/Board.scss';
import ReadyStudy from '../Main/ReadyStudy';
import Studies from './Studies';

export default function Board() {
  const studies = useSelector((state) => state.study.studies);
  const selectedCategory = useSelector((state) => state.study.category);
  const user = useSelector((state) => state.user._id);
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
        return <ReadyStudy item={el} />;
        // return <Studies el={el} idx={idx} userId={user} />;
      }
    });

  return <div className="study_board">{studiesRender}</div>;
}
