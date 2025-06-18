import { useEffect, useState } from "react";
import "./animeDetails.css";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const AnimeDetails = () => {
  const { type, id } = useParams();
  console.log(type, id);

  const [fullAnime, setFullAnime] = useState([]);
  const [fullcharacters, setFullCharacters] = useState([]);

  const getFullAnime = async (id) => {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
      if (!response.ok) {
        console.error("Request failed with status:", response.status);
        return;
      }
      const data = await response.json();
      setFullAnime(data.data);
    } catch (error) {
      console.error("Error fetching Data", error);
    }
  };

  const getCharcters = async (id) => {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/characters`);
      if (!response.ok) {
        console.error("Request failed with status:", response.status);
        return;
      }
      const data = await response.json();
      console.log(data);

      setFullCharacters(data.data);
    } catch (error) {
      console.error("Error fetching Data", error);
    }
  };

  const getFullManga = async (id) => {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/manga/${id}/full`);
      if (!response.ok) {
        console.error("Request failed with status:", response.status);
        return;
      }
      const data = await response.json();
      setFullAnime(data.data);
    } catch (error) {
      console.error("Error fetching Data", error);
    }
  };

  const getFullMangaCharacter = async (id) => {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/manga/${id}/recommendations`);
      if (!response.ok) {
        console.error("Request failed with status:", response.status);
        return;
      }
      const data = await response.json();
      setFullCharacters(data.data);
      console.log(data.data);
    } catch (error) {
      console.error("Error fetching Data", error);
    }
  };

  useEffect(() => {
    if (type === "anime") {
      getFullAnime(id);
      getCharcters(id);
    } else {
      getFullManga(id);
      getFullMangaCharacter(id);
    }
  }, [id, type]);

  return (
    <div className="anime-details">
      <Header />
      {type === "anime" ? (
        <div className="container continer-anime-details">
          <h1>{fullAnime?.title_english || fullAnime?.title || "Untitled"}</h1>
          <div className="box-details">
            <div className="top-details">
              <img src={fullAnime?.images?.jpg.image_url} alt={fullAnime?.title} />
              <div className="box-details-right">
                <div className="left">
                  <div className="info-item">
                    <span>aired :</span>
                    <p>{fullAnime?.aired?.string || "not available"}</p>
                  </div>
                  <div className="info-item">
                    <span>demographics :</span>
                    <p>
                      {fullAnime?.demographics?.length > 0
                        ? fullAnime.demographics.map((el) => el?.name).join(", ")
                        : "not available"}
                    </p>
                  </div>
                  <div className="info-item">
                    <span>episodes :</span>
                    <p>{fullAnime?.episodes || "not available"}</p>
                  </div>
                  <div className="info-item">
                    <span>duration :</span>
                    <p>{fullAnime?.duration || "not available"} </p>
                  </div>
                  <div className="info-item">
                    <span>score :</span>
                    <p>
                      {fullAnime?.score || "not available"} <i className="fa-solid fa-star"></i>
                    </p>
                  </div>
                </div>
                <div className="right">
                  <div className="info-item">
                    <span>rating :</span>
                    <p>{fullAnime?.rating || "not available"} </p>
                  </div>
                  <div className="info-item">
                    <span>source :</span>
                    <p>{fullAnime?.source || "not available"} </p>
                  </div>
                  <div className="info-item">
                    <span>status :</span> <p>{fullAnime?.status || "not available"} </p>
                  </div>
                  <div className="info-item">
                    <span>themes :</span>
                    <p>
                      {fullAnime?.themes
                        ?.map((el) => {
                          return el.name;
                        })
                        .join(", ") || "not available"}
                    </p>
                  </div>
                  <div className="info-item">
                    <span>genres :</span>
                    <p>
                      {fullAnime?.genres
                        ?.map((el) => {
                          return el.name + " ";
                        })
                        .join(", ") || "not available"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="desc">
              <strong>description :</strong> {fullAnime.synopsis}
            </div>
          </div>
          <h3>{fullAnime?.trailer?.embed_url ? "Trailer" : ""} </h3>
          <div className="trailer-container">
            {fullAnime?.trailer?.embed_url && (
              <iframe
                src={fullAnime?.trailer?.embed_url}
                title={fullAnime.title}
                width="800"
                height={"450"}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>
            )}
          </div>
          <h3>All Characters</h3>
          <div className="box-characters">
            {fullcharacters.map((el) => (
              <div className="character">
                <img
                  src={el.character.images.jpg.image_url}
                  alt={el.character.name}
                  loading="lazy"
                />
                <div className="character-details">
                  <Link to={`/character/${id}/${el.character.name}/${el.character.mal_id}`}>
                    <span>
                      <strong>name : </strong>
                      {el.character.name}
                    </span>
                  </Link>

                  <span>
                    <strong>role : </strong>
                    {el.character.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="container  continer-anime-details">
          <h1>{fullAnime?.title_english || fullAnime?.title || "Untitled"}</h1>
          <div className="box-details">
            <div className="top-details">
              <img src={fullAnime?.images?.jpg.image_url} alt={fullAnime?.title} />
              <div className="box-details-right">
                <div className="left">
                  <div className="info-item">
                    <span>published :</span>
                    <p>{fullAnime?.published?.string.split("t")[0] || "not available"}</p>
                  </div>
                  <div className="info-item">
                    <span>demographics :</span>
                    <p>
                      {fullAnime?.demographics?.length > 0
                        ? fullAnime.demographics.map((el) => el?.name).join(", ")
                        : "not available"}
                    </p>
                  </div>
                  <div className="info-item">
                    <span>popularity :</span>
                    <p>{fullAnime?.popularity || "not available"}</p>
                  </div>
                  <div className="info-item">
                    <span>type :</span>
                    <p>{fullAnime?.type || "not available"} </p>
                  </div>
                  <div className="info-item">
                    <span>score :</span>
                    <p>{fullAnime?.score || "not available"} </p>
                  </div>
                </div>
                <div className="right">
                  <div className="info-item">
                    <span>rank :</span>
                    <p>{fullAnime?.rank || "not available"} </p>
                  </div>
                  <div className="info-item">
                    <span>authors :</span>
                    <p>
                      {fullAnime?.authors?.length > 0
                        ? fullAnime?.authors
                            ?.map((el) => {
                              return el.name;
                            })
                            .join(", ")
                        : "not available"}
                    </p>
                  </div>
                  <div className="info-item">
                    <span>status :</span> <p>{fullAnime?.status || "not available"} </p>
                  </div>
                  <div className="info-item">
                    <span>themes :</span>
                    <p>
                      {fullAnime?.themes
                        ?.map((el) => {
                          return el.name;
                        })
                        .join(", ") || "not available"}
                    </p>
                  </div>
                  <div className="info-item">
                    <span>genres :</span>
                    <p>
                      {fullAnime?.genres
                        ?.map((el) => {
                          return el.name + " ";
                        })
                        .join(", ") || "not available"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="desc">
              <strong>description :</strong> {fullAnime.synopsis}
            </div>
          </div>

          <h3>Recommandation</h3>
          <div className="box-characters">
            {fullcharacters.map((el, index) => (
              <div className="character" key={index}>
                <img src={el.entry.images.jpg.image_url} alt={el.entry.title} loading="lazy" />
                <div className="character-details">
                  <Link to={`/manga/${el.entry.mal_id}`}>
                    <span>
                      <strong>name : </strong>
                      {el.entry.title}
                    </span>
                  </Link>

                  <span>
                    <strong>vote : </strong>
                    {el.votes}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default AnimeDetails;
