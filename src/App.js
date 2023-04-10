import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import MyCityPage from './pages/MyCityPage';
import RecruitBoardPage from './pages/RecruitBoardPage';
import CreateStudyPage from './pages/CreateStudyPage';
import MainPage from './pages/MainPage';
import StudyDetailPage from './pages/StudyDetailPage';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/mycity" element={<MyCityPage />} />
        <Route path="/study" element={<RecruitBoardPage />} />
        <Route path="/study/detail" element={<StudyDetailPage />} />
        <Route path="/study/create" element={<CreateStudyPage />} />
      </Routes>
    </div>
  );
}

export default App;
