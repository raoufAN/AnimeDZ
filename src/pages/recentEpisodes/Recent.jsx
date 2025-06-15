import "./recent.css";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/useGlobalContext";
import { useEffect, useRef, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Footer from "../../components/footer/Footer";

const Recent = () => {
  const { RecentEpisodes, Airing, Pages } = useGlobalContext();
  const [currentPage, setCurrentPages] = useState(1);
  const topRef = useRef(null);

  useEffect(() => {
    Airing(currentPage);
  }, [Airing, currentPage]);

  return (
    <div className="recent" ref={topRef}>
      <Link className="back" to={"/"}>
        <i className="fa-solid fa-arrow-left "></i> Go Back
      </Link>
      <div className="container">
        <h1>Recent Episodes</h1>

        <div className="boxes">
          {RecentEpisodes.filter((el) => {
            return el.data.length !== 0;
          }).map((item, index) => (
            <div className="box" key={index}>
              <img src={item.data[0]?.images.jpg.image_url} alt={`Thumbnail for ${item.name}`} />
              <div className="details">
                <Link to={item.data[0]?.url} className="name">
                  {item.name}
                </Link>
                <span className="name-ep">
                  Episode Title : {item?.data[0]?.title ?? "No title available"}
                </span>
                <span className="name-ep">Episode {item.data[0]?.mal_id}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination-box">
          <Stack spacing={2}>
            <Pagination
              count={Pages}
              onChange={(event, value) => {
                setCurrentPages(value);
                topRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
              variant="outlined"
              color="primary"
            />
          </Stack>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Recent;
