import "./animeNews.css";
import { useGlobalContext } from "../../context/useGlobalContext";

const AnimeNews = () => {
  const { AnimeNews } = useGlobalContext();
  return (
    <div className="anime-news">
      <div className="container">
        <h1>Anime News</h1>
        <div className="boxes">
          {AnimeNews.map((item, index) => (
            <div className="box" key={index}>
              <img src={item.image} alt={item.title} />
              <div className="right-box">
                <h6>Posted On {item.publishedAt.slice(0, 10)}</h6>
                <h5>{item.title}</h5>
                <p>{item.content.split("[")[0].trim()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimeNews;
