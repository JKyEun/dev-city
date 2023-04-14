import { Link } from 'react-router-dom';
import RecruitedStudy from '../components/Main/RecruitedStudy';
import CreateProcessStudy from '../components/Main/CreateProcessStudy';
import AllUsers from '../components/Main/AllUsers';
import '../style/main.scss';

export default function MainPage() {
  return (
    <>
      {/* 메인 */}
      <div className="mainTop">
        <div className="minMax">
          <div className="main flexBox">
            <div className="mainText">
              <div className="text">
                개발공부는
                <br /> <strong>데브시티에서</strong>
              </div>
              <div className="mycityLink">
                <Link to={'/mycity'}>나의 도시 바로가기</Link>
              </div>
            </div>
          </div>
        </div>
        <img
          className="mycityImg"
          src="../images/mycity.svg"
          alt="도시이미지"
        />
      </div>
      {/* 모집 중인 스터디 */}
      <div className="flexBox cardBox recruitedStudy">
        <RecruitedStudy />
      </div>
      {/* 스터디 생성 프로세스 */}
      <CreateProcessStudy />
      {/* 추천친구 */}
      <AllUsers />

      <div className="bottom">
        <img src="../images/main-4.svg" alt="" className="lastImg" />
      </div>
    </>
  );
}
