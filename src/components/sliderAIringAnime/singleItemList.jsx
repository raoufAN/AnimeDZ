import { useGlobalContext } from "../../context/useGlobalContext";
import { Link } from "react-router-dom";

const SingleItemList = () => {
  const { RecentEpisodes } = useGlobalContext();

  return (
    <>
      {RecentEpisodes?.filter((el) => {
        return el.data?.length !== 0;
      })
        .slice(0, 4)
        .map((item, index) => (
          <div className="single-item" key={index}>
            <img src={item?.data?.[0].images.jpg.image_url} alt={`Thumbnail for ${item.name}`} />
            <div className="details">
              <Link to={item.data?.[0].url} target="_blank" className="name">
                {item.name}
              </Link>
              <h5 className="name-ep">
                Episode Title : {item?.data?.[0].title ?? "No title available"}
              </h5>
              <h5 className="name-ep">Episode {item.data?.[0].mal_id}</h5>
            </div>
          </div>
        ))}
    </>
  );
};

export default SingleItemList;
