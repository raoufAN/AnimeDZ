import "./App.css";
import HomePage from "./pages/homePage/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExplorePage from "./pages/ExploreAnimes/ExplorePage";
import AnimeDetails from "./pages/AnimeDetails/AnimeDetails";
import Characters from "./pages/character/Characters";
import Recent from "./pages/recentEpisodes/Recent";
import ExploreGenres from "./pages/ExploreAnimes/ExploreGenres";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="home/:explore/:year" element={<ExplorePage />} />
          <Route path=":type/:id" element={<AnimeDetails />} />
          <Route path="character/:id_anime/:name/:id_charcater" element={<Characters />} />
          <Route path="recentEp" element={<Recent />} />
          <Route path="genre/:name/:id_genre" element={<ExploreGenres />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
