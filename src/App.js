import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import MyCityPage from './pages/MyCityPage';
import RecruitBoardPage from './pages/RecruitBoardPage';
import CreateStudyPage from './pages/CreateStudyPage';
import MainPage from './pages/MainPage';
import StudyDetailPage from './pages/StudyDetailPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/mycity" element={<MyCityPage />} />
        <Route path="/study" element={<RecruitBoardPage />} />
        <Route path="/study/detail/:id" element={<StudyDetailPage />} />
        <Route path="/study/create" element={<CreateStudyPage />} />
      </Routes>
    </div>
  );
}

export default App;
