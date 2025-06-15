import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/useGlobalContext";
import Debounce from "./Debounce";
import { Link } from "react-router-dom";

const Search = ({ isSearching, setIsSearching, setShowFav }) => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedQuery = Debounce(searchValue, 1000);
  const { searchAnime, searchList } = useGlobalContext();

  useEffect(() => {
    if (debouncedQuery) {
      searchAnime(debouncedQuery);
    }
  }, [debouncedQuery, searchAnime]);

  return (
    <div className="search">
      <input
        type="text"
        placeholder="search your anime here"
        onChange={(e) => setSearchValue(e.target.value)}
        onFocus={() => {
          setShowFav(false);
          setIsSearching(true);
        }}
      />
      <i
        className="fa-sharp fa-solid fa-magnifying-glass"
        onClick={() => searchAnime(debouncedQuery)}></i>
      {debouncedQuery.length > 3 && isSearching === true ? (
        <div className="search-results" key={searchList}>
          {searchList.slice(0, 20).map((item) => (
            <div className="single-result" key={item.mal_id}>
              <Link to={`anime/${item.mal_id}`} target="_blank">
                <span>{item.title}</span>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <>
          {debouncedQuery.length > 1 && isSearching === true ? (
            <div className="search-results less-then-three" key={searchList}>
              <div className="single-result">Please type at least 3 letters to search😇</div>
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
};

export default Search;
