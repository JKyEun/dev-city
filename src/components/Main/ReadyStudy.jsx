import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateLike } from '../../store/modules/user';
import '../../style/study.scss';
import { pushLikeList } from '../../apis/study';
import { getUser } from '../../apis/user';

export default function ReadyStudy({ item, idx, liked, isMain, userId }) {
  // user의 likedStudy id와 study의 id를 비교하여 포함되어있으면 버튼이 on
  const date = new Date(item.createDate);
  const dispatch = useDispatch();
  liked += 1;

  const updateLikeList = async () => {
    const userId = localStorage.getItem('userId');
    const res = await getUser(userId);
    dispatch(updateLike(res.likedStudy));
  };

  const handleLike = async (e) => {
    e.preventDefault();
    if (liked > 0) {
      await pushLikeList({
        userId: userId,
        studyId: item._id,
        isDelete: true,
      });
    } else {
      await pushLikeList({
        userId: userId,
        studyId: item._id,
        isDelete: false,
      });
    }
    updateLikeList();
  };

  return (
    <Link
      key={idx}
      to={`/study/detail/${item._id}`}
      className="likeStudyBox studyContainer"
    >
      <p className="date">
        {`${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`} |{' '}
        {item.field}
      </p>
      <h3>{item.studyName}</h3>
      <div className="flexBox-alignCenter">
        <ul className="flexBox skills">
          {item?.skills?.map((el) => {
            if (el === 'C#') {
              el = 'cSharp';
            } else {
              el = el.toLowerCase();
            }
            return (
              <p key={el}>
                <img src={`/images/skill_icon/${el}.svg`} alt="" />
              </p>
            );
          })}
        </ul>
        <span className="ellipsis">{item?.skills.length > 4 && '...'}</span>
      </div>
      <p className="memberCount">
        <span>{`${item.memberNum.maxNum}`}</span>명 중
        <span> {`${item.memberNum.currentNum}`}</span>명 모집됨
      </p>
      {isMain ? null : (
        <div className="clickHeart" onClick={(e) => handleLike(e)}>
          <img
            src={`/images/icon_heart${liked > 0 ? 'On' : 'Off'}.svg`}
            alt="heart"
          />
        </div>
      )}
    </Link>
  );
}
