import "./App.css";
import HomePage from "./pages/homePage/HomePage";
import AnimeDetails from "./pages/AnimeDetails/AnimeDetails";
import ExploreAnimes from "./pages/ExploreAnimes/ExplorePage";
import Characters from "./pages/character/Characters";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExplorePage from "./pages/ExploreAnimes/ExplorePage";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home/:explore/:year" element={<ExplorePage />} />
          <Route path="/:type/:id" element={<AnimeDetails />} />
          <Route path="/character/:id_anime/:name/:id_charcater" element={<Characters />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

// const animeName = decodeURIComponent(name); // turns %20 back to space
