import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import MyCityPage from "./pages/MyCityPage";
import RecruitBoardPage from "./pages/RecruitBoardPage";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/mycity" element={<MyCityPage />} />
        <Route path="/study" element={<RecruitBoardPage />} />
      </Routes>
    </div>
  );
}

export default App;
