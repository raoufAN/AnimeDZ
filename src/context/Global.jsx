import { useCallback, useEffect, useReducer, useState } from "react";
import { GlobalContext } from "./GlobalContext";
import { useMemo } from "react";

const baseUrl = "https://api.jikan.moe/v4";

const reducer = (state, action) => {
  switch (action.type) {
    case "Loading":
      return { ...state, loading: true };
    case "AiringNow":
      return {
        ...state,
        AiringNow: action.payload.data,
        Pages: action.payload.page,
        loading: false,
      };
    case "RecentsEpisodes":
      return { ...state, RecentEpisodes: action.payload, Pages: action.page, loading: false };
    case "AiringSeason":
      return {
        ...state,
        AiringSeason: action.payload.data,
        Pages: action.payload.page,
        loading: false,
      };
    case "TopAnime":
      return {
        ...state,
        TopAnime: action.payload.data,
        Pages: action.payload.page,
        loading: false,
      };
    case "TopManga":
      return {
        ...state,
        TopManga: action.payload.data,
        Pages: action.payload.page,
        loading: false,
      };

    case "AnimeGenres":
      return {
        ...state,
        AnimeGenres: action.payload.data,
        GenresPages: action.payload.page,
        loading: false,
      };
    case "AnimeNews":
      return { ...state, AnimeNews: action.payload, loading: false };
    case "Genres":
      return { ...state, Genres: action.payload, loading: false };
    case "Search":
      return { ...state, searchList: action.payload, loading: false };
    default:
      return state;
  }
};

const initialState = {
  AiringNow: [],
  Pages: [],
  TopAnimePage: [],
  AiringSeason: [],
  RecentEpisodes: [],
  TopAnime: [],
  TopManga: [],
  AnimeNews: [],
  searchList: [],
  Genres: [],
  AnimeGenres: [],
  GenresPages: null,
  loading: false,
};

const Global = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const [recentArray, setRecentArray] = useState([]);
  const [recentPages, setRecentPages] = useState([]);
  const [heart, setHeart] = useState(() => {
    const stored = window.localStorage.getItem("favorite");
    return stored ? JSON.parse(stored) : [];
  });

  const [WindowSeize, setWindowSeize] = useState(window.innerWidth);

  const getRecentsEpisodes = useCallback(async (id, name, image) => {
    try {
      const response = await fetch(`${baseUrl}/anime/${id}/videos/episodes`);
      if (!response.ok) {
        console.error("Request failed with status:", response.status);
        return;
      }
      const data = await response.json();

      setRecentArray((prev) => {
        return [...prev, { image, name, data: data.data }];
      });
    } catch (error) {
      console.log("errore fetching getRecentsEpisodes : ", error);
    }
  }, []);

  const Airing = useCallback(
    async (page) => {
      dispatch({ type: "Loading" });
      if (page !== 1) {
        setRecentArray([]);
      }

      try {
        const response = await fetch(`${baseUrl}/seasons/now?page=${page}`);
        if (!response.ok) {
          console.error("Request failed with status:", response.status);
          return;
        }
        const data = await response.json();
        setRecentPages(data.pagination.last_visible_page);
        dispatch({
          type: "AiringNow",
          payload: {
            data: data.data,
            page: data.pagination.last_visible_page,
          },
        });

        for (const el of data.data) {
          await getRecentsEpisodes(
            el.mal_id,
            el.title_english ? el.title_english : el.title,
            el.images.jpg.image_url
          );
          await delay(500);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    [getRecentsEpisodes]
  );

  const getAiringSeason = useCallback(async (year, season, page) => {
    dispatch({ type: "Loading" });
    try {
      const response = await fetch(`${baseUrl}/seasons/${year}/${season}?page=${page}`);
      if (!response.ok) {
        console.error("Request failed with status:", response.status);
        return;
      }
      const data = await response.json();

      dispatch({
        type: "AiringSeason",
        payload: {
          data: data.data,
          page: data.pagination.last_visible_page,
        },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  const getTopAnime = useCallback(async (page) => {
    try {
      const response = await fetch(`${baseUrl}/top/anime?page=${page}`);
      if (!response.ok) {
        console.error("Request failed with status:", response.status);
        return;
      }
      const data = await response.json();

      dispatch({
        type: "TopAnime",
        payload: {
          data: data.data,
          page: data.pagination.last_visible_page,
        },
      });
    } catch (error) {
      console.error("Error fetching Data", error);
    }
  }, []);

  const getTopManga = useCallback(async (page) => {
    try {
      const response = await fetch(`${baseUrl}/top/manga?page=${page}`);
      if (!response.ok) {
        console.error("Request failed with status:", response.status);
        return;
      }
      const data = await response.json();

      dispatch({
        type: "TopManga",
        payload: {
          data: data.data,
          page: data.pagination.last_visible_page,
        },
      });
    } catch (error) {
      console.error("Error fetching Data : ", error);
    }
  }, []);

  const getAnimeNews = async () => {
    try {
      const response = await fetch(
        "https://gnews.io/api/v4/search?q=anime&lang=en&apikey=a8d18521c41aa5603898d5407dcd3004"
      );
      if (!response.ok) {
        console.error("Request failed with status:", response.status);
        return;
      }
      const data = await response.json();

      dispatch({ type: "AnimeNews", payload: data.articles });
    } catch (error) {
      console.error("Error fetching Data", error);
    }
  };

  const searchAnime = useCallback(async (name) => {
    try {
      const response = await fetch(`${baseUrl}/anime?q=${name}&sfw`);
      if (!response.ok) {
        console.error("Request failed with status:", response.status);
        return;
      }
      const data = await response.json();
      dispatch({ type: "Search", payload: data.data });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  const getAnimeGenres = async (genre, page) => {
    try {
      let response = await fetch(`${baseUrl}/anime?genres=${genre}&page=${page}`);
      if (!response.ok) {
        console.error("request faild with : ", response.status);
      }
      let data = await response.json();
      dispatch({
        type: "AnimeGenres",
        payload: {
          data: data.data,
          page: data.pagination.last_visible_page,
        },
      });
    } catch (error) {
      console.error("Errore fetching data :", error);
    }
  };
  const handleFavorite = (fav, whichtype, animeName) => {
    setHeart((prev) => {
      const exists = prev.some((el) => el.id === fav);

      if (exists) {
        let favArray = prev.filter((el) => !(el.type === whichtype && el.id === fav));
        window.localStorage.setItem("favorite", JSON.stringify(favArray));
        return favArray;
      } else {
        let favArray = [...prev, { id: fav, type: whichtype, name: animeName }];
        window.localStorage.setItem("favorite", JSON.stringify(favArray));
        return favArray;
      }
    });
  };

  const GetGenres = useCallback(async () => {
    try {
      const response = await fetch("https://api.jikan.moe/v4/genres/anime");
      if (!response.ok) {
        console.error("Request Failed With status :", response.status);
      }
      const data = await response.json();

      dispatch({ type: "Genres", payload: data.data });
    } catch (error) {
      console.error("Error Fetching Data : ", error);
    }
  }, []);

  useEffect(() => {
    dispatch({
      type: "RecentsEpisodes",
      payload: recentArray.filter((item, index, self) => {
        // this i do it beacuse strict mode
        // self is all the aray t like Item
        return index === self.findIndex((t) => t.name === item.name);
      }),
      page: recentPages,
    });
  }, [recentArray, recentPages]);

  const loadInitialData = useCallback(async () => {
    await Promise.allSettled([Airing(1), getTopAnime(1)]);
    getTopManga(1);
    GetGenres();
    getAnimeNews(); // delayed
  }, [Airing, getTopAnime, getTopManga, GetGenres]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSeize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const contextValue = useMemo(
    () => ({
      ...state,
      getAiringSeason,
      WindowSeize,
      searchAnime,
      Airing,
      getTopAnime,
      getTopManga,
      getAnimeGenres,
      handleFavorite,
      heart,
    }),
    [state, getAiringSeason, WindowSeize, searchAnime, Airing, heart, getTopAnime, getTopManga]
  );

  return <GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>;
};

export default Global;
