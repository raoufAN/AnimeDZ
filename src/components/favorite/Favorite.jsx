import "./favorite.css";
import { useGlobalContext } from "../../context/useGlobalContext";

const Favorite = () => {
  const { heart, handleFavorite } = useGlobalContext();

  return (
    <div
      className={heart.length > 0 ? "favorites" : "favorites empty"}
      style={{
        bottom: `-${heart.length > 0 ? (heart.length < 5 ? heart.length * 50 + 12 : 262) : 62}px`,
        overflowY: `${heart.length <= 5 ? "auto" : "scroll"}`,
      }}>
      {heart.length > 0 ? (
        heart.map((element, index) => (
          <div className="single-fav" key={index}>
            <div className="name-type">
              <div className="fav-name">
                <p>{element.name}</p>
              </div>
              <div className={`fav-type  ${element.type}`}>
                <p>{element.type}</p>
              </div>
            </div>

            <div
              className="delte"
              onClick={(e) => {
                e.stopPropagation();
                handleFavorite(element.id, element.type);
              }}>
              <i className="fa-solid fa-xmark mark"></i>
            </div>
          </div>
        ))
      ) : (
        <div className="empty-fav">The List Is Empty 😭 </div>
      )}
    </div>
  );
};

export default Favorite;
