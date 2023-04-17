import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import '../../style/recruitBoard/Board.scss';
import ReadyStudy from '../Main/ReadyStudy';

export default function Board() {
  const studies = useSelector((state) => state.study.studies);
  const selectedCategory = useSelector((state) => state.study.category);
  const userId = useSelector((state) => state.user.userId);
  const likedStudy = useSelector((state) => state.user.likedStudy);
  const selectedStatus = useSelector((state) => state.study.status);

  const location = useLocation();
  const searchValue = location.search.replace('?search=', '');

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

  const studiesFiltered =
    selectedStatus === 'all'
      ? studies
      : studies.filter((el) => el.isClosed === (selectedStatus === 'closed'));

  const studiesRender =
    studiesFiltered !== undefined &&
    studiesFiltered.map((el, idx) => {
      if (findCategory(el.skills)) {
        return (
          <ReadyStudy
            key={idx}
            className="studyBoard"
            item={el}
            liked={likedStudy?.findIndex((study) => study === el._id)}
            likedStudy={likedStudy}
            userId={userId}
          />
        );
      }
    });

  const searchRender = studiesFiltered
    .filter((study) => {
      return study.studyName.includes(
        decodeURI(decodeURIComponent(searchValue)),
      );
    })
    .map((el, idx) => {
      return (
        <ReadyStudy
          key={idx}
          className="studyBoard"
          item={el}
          liked={likedStudy?.findIndex((study) => study === el._id)}
          likedStudy={likedStudy}
          userId={userId}
          idx={`study_${idx}`}
        />
      );
    });

  return (
    <div className="study_board">
      {decodeURI(decodeURIComponent(searchValue)) !== ''
        ? searchRender
        : studiesRender}
    </div>
  );
}
