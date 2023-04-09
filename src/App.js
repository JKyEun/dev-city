import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import MyCityPage from "./pages/MyCityPage";
import RecruitBoardPage from "./pages/RecruitBoardPage";
import CreateStudyPage from "./pages/CreateStudyPage";


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/mycity" element={<MyCityPage />} />

        <Route path="/study" element={<RecruitBoardPage />} />
        <Route path="/study/create" element={<CreateStudyPage />} />

      </Routes>
    </div>
  );
}

export default App;
