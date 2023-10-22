import { Routes, Route, } from "react-router-dom";
import Home from "./assets/Home";
import FavoriteCharities from "./assets/FavoriteCharities";
import CharityDetail from "./assets/CharityDetail";
import { CauseDetail } from "./assets/CauseDetail";

export default function App() {
  return (
    <div>

      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path={"/search/:Searchid"} element={<CauseDetail />}/>
        <Route path="/favorites" element={<FavoriteCharities />}/>
        <Route path={"/charity/:id"} element={<CharityDetail />}/>
        
      </Routes>
    </div>
  );
}