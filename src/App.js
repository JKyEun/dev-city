import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { init } from './store/modules/user';
import { useEffect } from 'react';
import Header from './components/Header';
import MyCityPage from './pages/MyCityPage';
import RecruitBoardPage from './pages/RecruitBoardPage';
import CreateStudyPage from './pages/CreateStudyPage';
import MainPage from './pages/MainPage';
import StudyDetailPage from './pages/StudyDetailPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import KakaoRedirectHandler from './KakaoRedirectHandler';
import InsertInformationPage from './pages/InsertInformationPage';
import GithubRedirectHandler from './GithubRedirectHandler';
import Footer from './components/Footer';
import IndividualMyCityPage from './pages/IndividualMyCityPage';
import { getUser } from './apis/user';

function App() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);

  const getUserInfo = async (id) => {
    try {
      const res = await getUser(id);
      dispatch(init(res));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (userInfo.userId === undefined && localStorage.getItem('JWT'))
      getUserInfo(localStorage.getItem('userId'));
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/information" element={<InsertInformationPage />} />
        <Route path="/mycity" element={<MyCityPage />} />
        <Route path="/mycity/:id" element={<IndividualMyCityPage />} />
        <Route path="/study" element={<RecruitBoardPage />} />
        <Route path="/study/detail/:id" element={<StudyDetailPage />} />
        <Route path="/study/create" element={<CreateStudyPage />} />
        <Route
          path="/oauth/callback/kakao"
          element={<KakaoRedirectHandler />}
        />
        <Route
          path="/oauth/callback/github"
          element={<GithubRedirectHandler />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
